import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { education, experience, keyProjects, personalProjects, profile, skills } from '../src/data/portfolio.js';

const PORT = Number(process.env.CHAT_PORT || 8787);
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const MODEL = process.env.CHAT_MODEL || 'llama3.2:latest';
const CV_DATA = JSON.parse(readFileSync(resolve('src/data/generated-cv.json'), 'utf8'));

function readJsonBody(request) {
  return new Promise((resolveBody, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 64_000) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON request body.'));
      }
    });
    request.on('error', reject);
  });
}

function writeJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(payload));
}

function buildPortfolioContext() {
  return JSON.stringify(
    {
      profile,
      experience,
      education,
      skills,
      projects: [...keyProjects, ...personalProjects],
      cv: {
        source: CV_DATA.source,
        sections: CV_DATA.sections,
      },
    },
    null,
    2,
  );
}

function buildMessages({ message, mode = 'visitor', history = [] }) {
  const recentHistory = history
    .slice(-8)
    .filter((item) => ['user', 'assistant'].includes(item.role) && item.content)
    .map((item) => ({ role: item.role, content: String(item.content).slice(0, 900) }));

  return [
    {
      role: 'system',
      content: `You are Rishabh Mishra's portfolio chatbot.
Answer only using the provided portfolio and CV context.
Portfolio and CV context:
${buildPortfolioContext()}

If the user asks outside Rishabh's portfolio, do not answer the outside topic and do not suggest external sites. Reply with: "I can only help with Rishabh Mishra's portfolio: experience, projects, skills, education, CV, LinkedIn, GitHub, and contact details."
For strongest project questions, mention AI Rating Engine first because it is tied to real AI evaluation work, then mention MedClaimsAI as a personal/applied AI example if useful.
Keep replies conversational, concise, and useful. Use 2-5 short bullets only when helpful.
Do not dump the full CV. For CV questions, summarize the relevant section and invite a follow-up.
Do not expand acronyms, invent project details, or add technologies unless they are explicitly present in the context.
Mode: ${mode}.`,
    },
    ...recentHistory,
    { role: 'user', content: message },
  ];
}

async function askOllama(payload) {
  const ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: buildMessages(payload),
      stream: false,
      options: {
        temperature: 0.35,
        top_p: 0.85,
        num_predict: 420,
      },
    }),
  });

  if (!ollamaResponse.ok) {
    const errorText = await ollamaResponse.text();
    throw new Error(errorText || `Ollama request failed with ${ollamaResponse.status}`);
  }

  const data = await ollamaResponse.json();
  return data.message?.content?.trim();
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    writeJson(response, 204, {});
    return;
  }

  if (request.url !== '/api/chat' || request.method !== 'POST') {
    writeJson(response, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = await readJsonBody(request);
    if (!body.message?.trim()) {
      writeJson(response, 400, { error: 'Message is required.' });
      return;
    }

    const text = await askOllama(body);
    if (!text) {
      writeJson(response, 502, { error: 'Model returned an empty response.' });
      return;
    }

    writeJson(response, 200, { text, model: MODEL });
  } catch (error) {
    writeJson(response, 500, { error: error.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Portfolio AI chat server running on http://127.0.0.1:${PORT}/api/chat`);
  console.log(`Using Ollama model: ${MODEL}`);
});
