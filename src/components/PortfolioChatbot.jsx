import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, BriefcaseBusiness, ExternalLink, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { experience, keyProjects, personalProjects, profile, skills, education } from '../data/portfolio';
import cvData from '../data/generated-cv.json';

const starterPrompts = ['Why hire him?', 'Experience', 'Best project?', 'Resume'];
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const welcomeMessage =
  "Hey there, hope you're doing well. What would you like to know about Rishabh? You can ask about his experience, projects, skills, LinkedIn, GitHub, resume, or contact details.";

const gentleRedirect =
  "I don't have reliable information for that topic here. This assistant is focused on Rishabh Mishra's portfolio: experience, projects, skills, education, resume, LinkedIn, GitHub, and contact details.";

const secondRedirect =
  "Still outside my portfolio scope. The useful options here are Rishabh's experience, projects, skills, resume, LinkedIn, GitHub, education, and contact details.";

const closingMessage =
  'No problem. Bye for now.';

const reassuranceMessage =
  "Yes. I'm intentionally limited to Rishabh Mishra's portfolio so I don't give random or ungrounded answers. Ask about his experience, projects, skills, resume, LinkedIn, GitHub, or contact details.";

const greetingWords = ['hi', 'hello', 'hey', 'heyy', 'hey there', 'good morning', 'good afternoon', 'good evening', 'namaste'];

const intentWords = {
  strongestProject: ['best project', 'strongest project', 'top project', 'main project', 'flagship project', 'key project'],
  linkedin: ['linkedin', 'linked in', 'professional profile'],
  github: ['github', 'git hub', 'code', 'repository', 'repositories', 'repo'],
  contact: ['contact', 'email', 'phone', 'number', 'location', 'where', 'reach', 'address'],
  resume: ['resume', 'cv', 'curriculum vitae', 'about cv', 'cv details', 'resume details', 'download cv', 'download resume'],
  experience: [
    'experience',
    'experiecne',
    'experiance',
    'work experience',
    'tell me about his experience',
    'work',
    'job',
    'role',
    'roles',
    'company',
    'career',
    'google',
    'highspring',
    'thefinansol',
    'internship',
    'intern',
  ],
  skills: ['skill', 'skills', 'tools', 'technology', 'technologies', 'tech stack', 'sql', 'python', 'dashboard', 'analytics', 'fastapi', 'postgres'],
  projects: ['project', 'projects', 'what projects', 'portfolio', 'built', 'build', 'what has he built', 'ai', 'ml', 'machine learning', 'nlp', 'rag', 'chatbot'],
  education: ['education', 'college', 'degree', 'university', 'gpa', 'course', 'courses', 'btech', 'graduation'],
  hire: ['hire', 'why hire', 'why hire him', 'why should we hire', 'why rishabh', 'why him', 'hiring', 'fit', 'candidate', 'recruiter', 'shortlist', 'interview'],
  more: ['more', 'tell me more', 'explain more', 'details', 'what else'],
  about: [
    'about rishabh',
    'about him',
    'about his profile',
    'who is rishabh',
    'who is he',
    'intro',
    'summary',
    'profile',
  ],
};

const intentPriority = [
  'strongestProject',
  'linkedin',
  'github',
  'contact',
  'resume',
  'experience',
  'skills',
  'projects',
  'education',
  'hire',
  'more',
  'about',
];

const portfolioSubjectWords = [
  'rishabh',
  'mishra',
  'him',
  'his',
  'he',
  'portfolio',
  'profile',
  'resume',
  'cv',
  'linkedin',
  'github',
  'experience',
  'skills',
  'projects',
  'education',
  'contact',
  'hire',
  'candidate',
];

const conversationalCheckWords = [
  'are you sure',
  'sure',
  'really',
  'hmm',
  'hm',
  'okay',
  'ok',
  'yes',
  'no',
];

const acknowledgementWords = [
  'hmm',
  'hm',
  'nice',
  'great',
  'good',
  'cool',
  'awesome',
  'interesting',
  'sounds good',
  'looks good',
  'okay',
  'ok',
  'acha',
  'accha',
  'sahi',
  'badhiya',
  'haan',
  'yes',
  'yup',
];

const closeWords = [
  'i dont want',
  'i don t want',
  'i do not want',
  'dont want',
  'don t want',
  'do not want',
  'nothing',
  'not now',
  'no thanks',
  'no thank you',
  'leave it',
  'stop',
  'bye',
  'goodbye',
  'never mind',
  'nevermind',
  'cancel',
  'thats it',
  'that s it',
  'that is it',
  'thats all',
  'that s all',
  'i am done',
  'im done',
  'done',
  'enough',
];

const thanksWords = ['thanks', 'thank you', 'thx', 'got it', 'okay thanks', 'ok thanks'];

const reassuranceWords = ['are you sure', 'you sure', 'sure about that', 'really'];

function normalize(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTokens(text) {
  return normalize(text).split(/\s+/).filter(Boolean);
}

function hasWordOrPhrase(text, target) {
  const cleanTarget = normalize(target);
  if (!cleanTarget) return false;
  const cleanText = ` ${normalize(text)} `;
  return cleanText.includes(` ${cleanTarget} `);
}

function includesAny(text, words) {
  return words.some((word) => hasWordOrPhrase(text, word));
}

function editDistance(first, second) {
  const a = first.toLowerCase();
  const b = second.toLowerCase();
  const matrix = Array.from({ length: a.length + 1 }, (_, row) => [row]);

  for (let col = 1; col <= b.length; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let col = 1; col <= b.length; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function matchesIntent(text, words) {
  const tokens = extractTokens(text);
  const cleanText = ` ${normalize(text)} `;

  return words.some((word) => {
    const cleanWord = normalize(word);
    if (!cleanWord) return false;

    // Multi-word phrase check (e.g. "why hire", "best project")
    if (cleanWord.includes(' ')) {
      return cleanText.includes(` ${cleanWord} `);
    }

    // Exact token match (e.g. "experience", "hire", "projects", "resume")
    if (tokens.includes(cleanWord)) return true;

    // Fuzzy matching only for longer single words (5+ letters) to handle simple typos
    if (cleanWord.length >= 5) {
      return tokens.some((token) => {
        if (Math.abs(token.length - cleanWord.length) > 2) return false;
        const typoTolerance = Math.max(token.length, cleanWord.length) >= 8 ? 2 : 1;
        return editDistance(token, cleanWord) <= typoTolerance;
      });
    }

    return false;
  });
}

function getIntent(text) {
  return intentPriority.find((intent) => matchesIntent(text, intentWords[intent])) || 'unknown';
}

function isPortfolioScoped(text, intent) {
  if (['unknown', 'about', 'more'].includes(intent)) {
    return matchesIntent(text, portfolioSubjectWords);
  }

  return true;
}

function isGreeting(text) {
  const tokens = extractTokens(text);
  if (!tokens.length) return false;

  const isGreetingWord = tokens.some((t) => ['hi', 'hello', 'hey', 'heyy', 'namaste', 'greetings'].includes(t)) ||
    hasWordOrPhrase(text, 'good morning') ||
    hasWordOrPhrase(text, 'good afternoon') ||
    hasWordOrPhrase(text, 'good evening') ||
    hasWordOrPhrase(text, 'hey there');

  if (!isGreetingWord) return false;

  // If the query asks about a specific topic along with greeting (e.g. "Hi, what is your experience?"), don't treat it as just a greeting!
  const hasSpecificTopic = tokens.some((t) =>
    ['experience', 'work', 'project', 'projects', 'skill', 'skills', 'hire', 'resume', 'cv', 'contact', 'email', 'phone', 'linkedin', 'github', 'education', 'college', 'google', 'thefinansol'].includes(t)
  );

  return !hasSpecificTopic;
}

function isConversationalCheck(text) {
  return includesAny(text, conversationalCheckWords);
}

function isAcknowledgement(text) {
  return includesAny(text, acknowledgementWords);
}

function isCloseRequest(text) {
  return includesAny(text, closeWords);
}

function isThanks(text) {
  return includesAny(text, thanksWords);
}

function isReassuranceQuestion(text) {
  return includesAny(text, reassuranceWords);
}

function getExperienceAnswer() {
  return `Rishabh brings deep experience in enterprise-scale analytics and production AI systems:

🔹 Google xWS via Highspring (Associate Analyst | Dec 2024 – Present):
• Large-Scale SQL: Analyzes 3B+ weekly search queries in Google's internal PLX environment to prioritize high-impact datasets.
• AI Rating Engine: Built an automated evaluation workflow using prompt engineering and semantic similarity (90% precision across 5,000+ queries, 70% manual review effort reduction).
• Extraction Pipeline: Engineered a Python + Regex frontend pipeline processing 10,000+ weekly Google AI Mode queries.
• Leadership: POC leading a 15-member delivery team maintaining a 95% quality benchmark.

🔹 TheFinansol (AI Engineer Intern | May 2024 – Sept 2024):
• Conversational AI & TTS: Built Claude-powered voice agents and low-latency FastAPI + CoquiTTS systems reducing audio synthesis latency by 30%.
• Grounded RAG: Developed a PDF knowledge assistant with FAISS embeddings & Claude Haiku with strict refusal guardrails.`;
}

function getRecruiterExperienceAnswer() {
  return getExperienceAnswer();
}

function getProjectsAnswer() {
  return `Here are Rishabh's flagship projects across AI and analytics:

1. ⚡ AI Response Rating Engine (Google xWS)
An automated evaluation system using prompt engineering and semantic similarity to grade AI response quality at scale across 5,000+ queries with 90% precision.

2. 📄 PDF-Based Knowledge Base Assistant (TheFinansol)
A document-grounded RAG chatbot using FAISS vector search and Claude Haiku that strictly answers from uploaded PDFs and refuses out-of-scope queries.

3. 🏥 MedClaimsAI (Applied GenAI)
A healthcare document QA assistant that combines chunking, FAISS vector search, and Gemini API to answer medical billing queries rapidly.

4. 📊 E-Commerce Sales Analytics Dashboard
An end-to-end analytics dashboard in Python, SQL, and Tableau identifying sales trends, cohort behavior, and customer funnel insights.`;
}

function getStrongestProjectAnswer() {
  return `Rishabh's strongest projects highlight both enterprise scale and AI engineering:

1. AI Helpfulness Rating Engine (Google xWS):
Automated the evaluation of 5,000+ AI responses with semantic similarity and prompt engineering, cutting manual review effort by 70% with 90% precision.

2. PDF-Based Knowledge Base Assistant (TheFinansol):
Production RAG architecture combining document chunking, FAISS embeddings, and Claude Haiku with custom guardrails that eliminate hallucinated answers.

3. MedClaimsAI:
Applied healthcare assistant utilizing Gemini API and FAISS retrieval for billing and claims documents.`;
}

function getWhyHireAnswer() {
  return `Here is what makes Rishabh a standout candidate:

1. ⚡ Proven Impact at Massive Scale: Handled analytics across 3B+ weekly queries at Google xWS using GoogleSQL (PLX) and automated AI evaluation pipelines with 90% precision.
2. 🤖 End-to-End AI & RAG Engineering: Deep expertise in prompt engineering, FAISS vector search, Claude & Gemini APIs, chunking strategies, and low-latency FastAPI architectures.
3. 🎯 Leadership & Reliability: Leads a 15-member delivery team as POC, consistently maintaining a 95% quality benchmark with structured data storytelling.`;
}

function getSkillsAnswer() {
  return `Rishabh's core technical skillset includes:

🔹 AI & Machine Learning:
RAG, Prompt Engineering, Semantic Search, FAISS, Sentence Transformers, LLM Orchestration, NLP, Text-to-Speech (TTS).

🔹 Languages & Backend:
Python, SQL (GoogleSQL, MySQL, PostgreSQL), FastAPI, Flask, JavaScript, Regex.

🔹 Analytics & Visualization:
EDA, Statistical Modeling, Cohort & Funnel Analysis, Pandas, NumPy, Tableau, Power BI, Excel, Dashboards.`;
}

function getIntroAnswer() {
  return `Rishabh Mishra is an Associate Analyst & AI Engineer based in Haryana, India.

He works on Google xWS projects via Highspring, specializing in large-scale data analytics, AI response evaluation, and GenAI systems (RAG, LLM orchestration, NLP). He holds a B.Tech in CSE (AI & ML) from J.C. Bose University (YMCA).`;
}

function getEducationAnswer() {
  return `🎓 Degree: ${education.degree}
🏫 University: ${education.school}, ${education.location} (${education.period})
📊 GPA: ${education.gpa}
📚 Core Courses: ${education.courses.join(', ')}`;
}

function getContactAnswer() {
  return `You can reach Rishabh directly via:
📧 Email: ${profile.email}
📞 Phone: ${profile.phone}
📍 Location: ${profile.location}
💼 LinkedIn: ${profile.social.linkedin}
💻 GitHub: ${profile.social.github}`;
}

function getCvSection(sectionName) {
  return cvData.sections?.[sectionName]?.trim();
}

function getSectionLines(sectionName) {
  return getCvSection(sectionName)
    ?.split('\n')
    .map((line) => line.trim())
    .filter(Boolean) || [];
}

function compactText(text, maxLength = 520) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  return `${normalized.slice(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

function formatCvList(title, lines, limit = 4) {
  if (!lines.length) {
    return `I could not find ${title.toLowerCase()} in the current CV. You can still open the resume here: ${cvData.source}`;
  }

  return `From his current CV, ${title.toLowerCase()} include:\n${lines
    .slice(0, limit)
    .map((line) => `- ${compactText(line, 230)}`)
    .join('\n')}`;
}

function getCvProjectLines() {
  const projects = [];

  getSectionLines('projects').forEach((line) => {
    const looksLikeProjectStart = /^[A-Z0-9][^:]{3,140}\([^)]{2,}\):/.test(line) || /^[A-Z0-9][^:]{3,120}:/.test(line);

    if (looksLikeProjectStart || !projects.length) {
      projects.push(line);
      return;
    }

    projects[projects.length - 1] = `${projects[projects.length - 1]} ${line}`;
  });

  return projects.map((project) => compactText(project, 260)).filter(Boolean);
}

function getCvSkillLines() {
  return getSectionLines('skills').map((line) => compactText(line, 220));
}

function getCvEducationAnswer() {
  const lines = getSectionLines('education');
  if (!lines.length) {
    return `I could not find education details in the current CV. Resume link: ${cvData.source}`;
  }

  return `From his current CV: ${compactText(lines[0], 180)}
Degree: ${compactText(lines[1] || '', 180)}
${lines.find((line) => /specialization/i.test(line)) || ''}
${lines.find((line) => /gpa/i.test(line)) || ''}`.trim();
}

function getCvExperienceAnswer() {
  const lines = getSectionLines('experience');
  if (!lines.length) {
    return `I could not find experience details in the current CV. Resume link: ${cvData.source}`;
  }

  const headline = lines.slice(0, 2).join(' | ');
  const highlights = lines.slice(2, 5);

  return `From his current CV, his experience is ${compactText(headline, 220)}.

Key points:
${highlights.map((line) => `- ${compactText(line, 190)}`).join('\n')}`;
}

function getCvOverviewAnswer() {
  const summary = compactText(getCvSection('summary'), 360);
  const educationLine = getSectionLines('education')[1];
  const experienceLine = getSectionLines('experience')[1] || getSectionLines('experience')[0];
  const skillLine = getSectionLines('skills')[0];

  return `From his current CV, Rishabh is focused on AI/ML and data science roles. ${summary}

Quick highlights:
- Education: ${compactText(educationLine, 170)}
- Experience: ${compactText(experienceLine, 170)}
- Skills: ${compactText(skillLine, 170)}

You can ask me for CV projects, CV skills, CV education, or CV experience for more detail.`;
}

function getCvAnswer(text) {
  if (matchesIntent(text, ['project', 'projects', 'built'])) {
    return formatCvList('CV projects', getCvProjectLines(), 4);
  }

  if (matchesIntent(text, ['skill', 'skills', 'tools', 'technology', 'technologies'])) {
    return formatCvList('CV skills', getCvSkillLines(), 4);
  }

  if (matchesIntent(text, ['experience', 'internship', 'work', 'job'])) {
    return getCvExperienceAnswer();
  }

  if (matchesIntent(text, ['education', 'college', 'degree', 'gpa', 'course'])) {
    return getCvEducationAnswer();
  }

  if (matchesIntent(text, ['certificate', 'certificates', 'certification', 'achievement', 'achievements'])) {
    const certificates = getSectionLines('certificates');
    const achievements = getSectionLines('achievements');

    if (certificates.length && achievements.length) {
      return `${formatCvList('CV certificates', certificates, 4)}

${formatCvList('CV achievements', achievements, 3)}`;
    }

    return formatCvList('CV certificates and achievements', certificates.length ? certificates : achievements, 5);
  }

  return getCvOverviewAnswer();
}

function getAcknowledgementAnswer(lastIntent) {
  const nextSuggestions = getFollowUps(lastIntent && lastIntent !== 'unknown' ? lastIntent : 'about');

  return {
    intent: lastIntent && lastIntent !== 'unknown' ? lastIntent : 'about',
    text: "Glad that helped. What would you like to explore next about Rishabh?",
    suggestions: nextSuggestions,
    actions: lastIntent && lastIntent !== 'unknown' ? getActions(lastIntent) : [],
  };
}


function getFollowUps(intent) {
  const followUps = {
    greeting: ['Why hire him?', 'Tell me about his experience', 'What projects has he built?'],
    experience: ['Why is this experience useful?', 'Which tools did he use there?', 'Show his resume'],
    projects: ['Which project is strongest?', 'Tell me about MedClaimsAI', 'Show his GitHub'],
    skills: ['Which tools does he use for analytics?', 'What AI/ML skills does he have?', 'Tell me about his projects'],
    education: ['What AI/ML courses did he study?', 'Tell me about his skills', 'Show his resume'],
    contact: ['Show his LinkedIn', 'Show his GitHub', 'Open his resume'],
    linkedin: ['Show his GitHub too', 'Tell me about his experience', 'How can I contact him?'],
    github: ['What projects are listed?', 'Show his LinkedIn too', 'What skills does he have?'],
    resume: ['Summarize CV projects', 'What skills are in his CV?', 'Open resume'],
    hire: ['Show his experience', 'What is his strongest project?', 'How can I contact him?'],
    strongestProject: ['Show his GitHub', 'What skills does it show?', 'Tell me about his experience'],
    about: ['Tell me about his experience', 'What projects has he built?', 'Show his LinkedIn'],
    unknown: ['Tell me about his experience', 'Show his projects', 'How can I contact him?'],
  };

  return followUps[intent] || followUps.unknown;
}

function getActions(intent) {
  const baseActions = {
    linkedin: [{ label: 'Open LinkedIn', href: profile.social.linkedin }],
    github: [{ label: 'Open GitHub', href: profile.social.github }],
    resume: [{ label: 'Open Resume', href: profile.cvUrl }],
    contact: [
      { label: 'Email Rishabh', href: `mailto:${profile.email}` },
      { label: 'Open LinkedIn', href: profile.social.linkedin },
    ],
    experience: [{ label: 'View Experience', href: '#experience' }, { label: 'Open Resume', href: profile.cvUrl }],
    projects: [{ label: 'View Projects', href: '#projects' }, { label: 'Open GitHub', href: profile.social.github }],
    skills: [{ label: 'View Skills', href: '#skills' }, { label: 'Open Resume', href: profile.cvUrl }],
    education: [{ label: 'View Education', href: '#education' }, { label: 'Open Resume', href: profile.cvUrl }],
    hire: [
      { label: 'Open Resume', href: profile.cvUrl },
      { label: 'Open LinkedIn', href: profile.social.linkedin },
      { label: 'Email Rishabh', href: `mailto:${profile.email}` },
    ],
    strongestProject: [{ label: 'View Projects', href: '#projects' }, { label: 'Open GitHub', href: profile.social.github }],
  };

  return baseActions[intent] || [];
}

function resolveContextualIntent(intent, text, lastIntent) {
  if (intent !== 'more') return intent;

  if (!isPortfolioScoped(text, intent) && text.split(/\s+/).filter(Boolean).length > 3) {
    return 'unknown';
  }

  if (matchesIntent(text, ['tool', 'tools', 'technology', 'tech'])) return 'skills';
  if (matchesIntent(text, ['project', 'github', 'code'])) return 'projects';
  if (matchesIntent(text, ['contact', 'reach', 'email'])) return 'contact';

  return lastIntent && lastIntent !== 'greeting' && lastIntent !== 'unknown' ? lastIntent : 'about';
}

function buildReply(input, lastIntent = 'greeting', consecutiveFallbacks = 0) {
  const text = normalize(input);

  if (!text.trim()) {
    return { intent: 'greeting', text: welcomeMessage, suggestions: getFollowUps('greeting'), actions: [] };
  }

  if (isGreeting(text)) {
    return {
      intent: 'greeting',
      text: "Hey, nice to see you here. What would you like to know about Rishabh? I can share his experience, projects, skills, LinkedIn, GitHub, resume, or contact details.",
      suggestions: getFollowUps('greeting'),
      actions: [],
    };
  }

  if (isCloseRequest(text)) {
    return { intent: 'closed', text: closingMessage, suggestions: [], actions: [] };
  }

  if (isThanks(text)) {
    return {
      intent: lastIntent && lastIntent !== 'unknown' ? lastIntent : 'about',
      text: "You're welcome. I can also help with his experience, projects, skills, CV, LinkedIn, GitHub, or contact details.",
      suggestions: getFollowUps(lastIntent && lastIntent !== 'unknown' ? lastIntent : 'about').slice(0, 3),
      actions: [],
    };
  }

  if (isAcknowledgement(text) && !matchesIntent(text, portfolioSubjectWords)) {
    return getAcknowledgementAnswer(lastIntent);
  }

  if (isReassuranceQuestion(text)) {
    return { intent: 'unknown', text: reassuranceMessage, suggestions: getFollowUps('unknown').slice(0, 2), actions: [] };
  }

  if (isConversationalCheck(text) && !matchesIntent(text, portfolioSubjectWords)) {
    return {
      intent: 'unknown',
      text: consecutiveFallbacks > 0 ? secondRedirect : gentleRedirect,
      suggestions: getFollowUps('unknown').slice(0, 2),
      actions: [],
    };
  }

  const detectedIntent = getIntent(text);

  if (detectedIntent !== 'more' && !isPortfolioScoped(text, detectedIntent)) {
    return {
      intent: 'unknown',
      text: consecutiveFallbacks > 0 ? secondRedirect : gentleRedirect,
      suggestions: getFollowUps('unknown').slice(0, 2),
      actions: [],
    };
  }

  const intent = resolveContextualIntent(detectedIntent, text, lastIntent);

  if (intent === 'unknown') {
    return {
      intent: 'unknown',
      text: consecutiveFallbacks > 0 ? secondRedirect : gentleRedirect,
      suggestions: getFollowUps('unknown').slice(0, 2),
      actions: [],
    };
  }

  if (intent === 'linkedin') {
    return { intent, text: `Rishabh's LinkedIn profile is ${profile.social.linkedin}`, suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'github') {
    return { intent, text: `Rishabh's GitHub profile is ${profile.social.github}`, suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'contact') {
    return { intent, text: getContactAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'resume') {
    if (matchesIntent(text, ['open', 'show', 'download', 'link'])) {
      return {
        intent,
        text: `Sure. You can open Rishabh's latest resume here: ${profile.cvUrl}`,
        suggestions: getFollowUps(intent),
        actions: getActions(intent),
      };
    }

    return { intent, text: getCvAnswer(text), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'experience') {
    const answer = getExperienceAnswer();
    return { intent, text: answer, suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'skills') {
    return { intent, text: getSkillsAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'projects') {
    return { intent, text: getProjectsAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'strongestProject') {
    return { intent, text: getStrongestProjectAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'education') {
    return { intent, text: getEducationAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'hire') {
    return { intent, text: getWhyHireAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  if (intent === 'about') {
    return { intent, text: getIntroAnswer(), suggestions: getFollowUps(intent), actions: getActions(intent) };
  }

  return {
    intent: 'unknown',
    text: consecutiveFallbacks > 0 ? secondRedirect : gentleRedirect,
    suggestions: getFollowUps('unknown').slice(0, 2),
    actions: [],
  };
}

function splitReply(reply) {
  return reply
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function linkify(text) {
  return text.split(/(https?:\/\/[^\s]+|\/RishabhCV\.pdf)/g).map((part) => {
    if (part.startsWith('http') || part.startsWith('/RishabhCV.pdf') || part.includes('drive.google.com')) {
      return (
        <a
          key={part}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-light hover:decoration-accent transition-colors"
        >
          {part}
          <ExternalLink size={12} />
        </a>
      );
    }

    return part;
  });
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
        source: cvData.source,
        sections: cvData.sections,
      },
    },
    null,
    2,
  );
}

async function getAiReply({ value, mode, messages }) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key is not configured.');
  }

  const history = messages
    .slice(-8)
    .filter((message) => message.text)
    .map((message) => ({
      role: message.role === 'bot' ? 'assistant' : 'user',
      content: String(message.text).slice(0, 900),
    }));

  const systemPrompt = `You are a friendly, knowledgeable chatbot on Rishabh Mishra's portfolio website. Your job is to help visitors learn about Rishabh in a warm, conversational, and genuinely helpful way.

Portfolio context (use ONLY this — do not invent or add anything):
${buildPortfolioContext()}

RESPONSE STYLE:
- Be warm, natural and conversational — not robotic or stiff.
- For greetings like "hi", "hey", "how are you", "huh?" — respond warmly and briefly, then invite a question about Rishabh. Never redirect harshly.
- For portfolio questions: give clear, specific, well-structured answers. Use 2-4 bullets when listing things, but keep each bullet sharp and informative.
- Never dump entire data. Summarize, highlight what's interesting, and invite follow-ups.
- Use confident, professional language — you're an ambassador for Rishabh, not a FAQ bot.
- If asked something outside the portfolio scope, say something like: "I'm focused on Rishabh's portfolio, but happy to help with anything about his experience, projects, skills, or how to reach him!"

CONTENT RULES:
- Only use facts present in the portfolio context above. Never invent tech, roles, or details.
- For "why hire him" questions: be persuasive and specific — mention real experience (Google xWS), real projects (AI Rating Engine, MedClaimsAI), and tangible skills.
- For project questions: lead with AI Rating Engine (real impact, Google work), then MedClaimsAI (applied AI). Mention others as relevant.
- For experience: highlight the Google xWS role prominently — it's his current, strongest credential.
- Keep replies concise — aim for 3-6 sentences or 3-4 tight bullets. Never write walls of text.
- Maintain a balanced, confident, and engaging tone suitable for recruiters, hiring managers, and tech leads alike.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: value },
      ],
      temperature: 0.35,
      top_p: 0.85,
      max_tokens: 420,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Groq request failed with ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('Groq returned an empty response.');
  }

  return text;
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lastIntent, setLastIntent] = useState('greeting');
  const [consecutiveFallbacks, setConsecutiveFallbacks] = useState(0);
  const [conversationClosed, setConversationClosed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: welcomeMessage,
      suggestions: getFollowUps('greeting'),
    },
  ]);
  const inputRef = useRef(null);
  const timeoutsRef = useRef([]);
  const intervalsRef = useRef([]);
  const nextMessageId = useRef(1);

  const visibleMessages = useMemo(() => messages.slice(-10), [messages]);
  const lastVisibleMessage = visibleMessages[visibleMessages.length - 1];
  const showTypingIndicator = isTyping && lastVisibleMessage?.role !== 'bot';
  const hasUserMessages = messages.some((message) => message.role === 'user');

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
      intervalsRef.current.forEach(window.clearInterval);
    };
  }, []);

  function typeBotChunk(chunk, messageId, suggestions, actions, onDone) {
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                text: chunk.slice(0, index),
                suggestions: index >= chunk.length ? suggestions : [],
                actions: index >= chunk.length ? actions : [],
              }
            : message,
        ),
      );

      if (index >= chunk.length) {
        window.clearInterval(interval);
        onDone();
      }
    }, 14);

    intervalsRef.current.push(interval);
  }

  function streamBotReply(chunks, suggestions, actions, chunkIndex = 0, fromGroq = false) {
    if (chunkIndex >= chunks.length) {
      setIsTyping(false);
      return;
    }

    const messageId = `bot-${nextMessageId.current}`;
    nextMessageId.current += 1;

    setMessages((current) => [...current, { id: messageId, role: 'bot', text: '', suggestions: [], actions: [], fromGroq: chunkIndex === 0 ? fromGroq : false }]);

    const timeout = window.setTimeout(() => {
      typeBotChunk(chunks[chunkIndex], messageId, chunkIndex === chunks.length - 1 ? suggestions : [], chunkIndex === chunks.length - 1 ? actions : [], () => {
        streamBotReply(chunks, suggestions, actions, chunkIndex + 1, fromGroq);
      });
    }, chunkIndex === 0 ? 420 : 360);

    timeoutsRef.current.push(timeout);
  }

  async function sendMessage(text = input) {
    const value = text.trim();
    if (!value || isTyping || conversationClosed) return;

    const previousMessages = messages;
    setMessages((current) => [...current, { id: `user-${nextMessageId.current}`, role: 'user', text: value }]);
    nextMessageId.current += 1;
    setInput('');
    setIsTyping(true);

    // Always get metadata (intent, suggestions, actions) from rule engine
    const fallbackReply = buildReply(value, lastIntent, consecutiveFallbacks);
    let reply = fallbackReply;

    // Only skip Groq for hard conversation-enders (bye, stop, etc.)
    const isHardClose = fallbackReply.intent === 'closed';

    if (!isHardClose) {
      try {
        const aiText = await getAiReply({ value, messages: previousMessages });
        reply = {
          ...fallbackReply,
          intent: fallbackReply.intent === 'unknown' ? 'about' : fallbackReply.intent,
          text: aiText,
          fromGroq: true,
        };
        console.log('%c⚡ Groq response received', 'color: #22c55e; font-weight: bold;', aiText.slice(0, 80) + '...');
      } catch (error) {
        console.warn('Groq unavailable, using local fallback.', error);
      }
    }

    const chunks = splitReply(reply.text);
    setLastIntent(reply.intent);
    setConsecutiveFallbacks((count) => (reply.intent === 'unknown' ? count + 1 : 0));
    if (reply.intent === 'closed') {
      setConversationClosed(true);
    }
    streamBotReply(chunks, reply.suggestions, reply.actions, 0, reply.fromGroq);
  }

  function openChat() {
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }

  function startNewChat() {
    timeoutsRef.current.forEach(window.clearTimeout);
    intervalsRef.current.forEach(window.clearInterval);
    timeoutsRef.current = [];
    intervalsRef.current = [];
    setMessages([
      {
        id: `bot-${nextMessageId.current}`,
        role: 'bot',
        text: welcomeMessage,
        suggestions: getFollowUps('greeting'),
        actions: [],
      },
    ]);
    nextMessageId.current += 1;
    setInput('');
    setLastIntent('greeting');
    setConsecutiveFallbacks(0);
    setConversationClosed(false);
    setIsTyping(false);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 24, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="flex h-[min(490px,calc(100vh-5rem))] w-[calc(100vw-2rem)] sm:w-[365px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/15 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="border-b border-slate-200/80 bg-white px-4 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-blue/10 text-accent-blue">
                    <Sparkles size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-display text-sm font-bold text-slate-900">Portfolio AI</p>
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-slate-500">Ask about work, projects & skills</p>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close chatbot"
                >
                  <X size={17} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5 bg-slate-50/70">
              {visibleMessages.map((message, index) => (
                <div key={message.id || `${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`whitespace-pre-line text-[13px] leading-relaxed shadow-xs ${
                        message.role === 'user'
                          ? 'bg-accent text-white rounded-2xl rounded-tr-xs px-3.5 py-2 font-normal'
                          : 'border border-slate-200/90 bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5'
                      }`}
                    >
                      {linkify(message.text)}
                    </div>
                    {message.role === 'bot' && message.fromGroq && message.text && (
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                        <span>⚡</span><span>Groq · {GROQ_MODEL}</span>
                      </p>
                    )}
                    {message.role === 'bot' && message.suggestions?.length > 0 && !isTyping && !conversationClosed && (
                      <>
                        {message.actions?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {message.actions.map((action) => (
                              <a
                                key={`${action.label}-${action.href}`}
                                href={action.href}
                                target={action.href.startsWith('#') || action.href.startsWith('mailto:') ? undefined : '_blank'}
                                rel={action.href.startsWith('#') || action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/90 px-2 py-1 text-[11px] font-semibold text-amber-900 transition-colors hover:border-amber-400 hover:bg-amber-100 shadow-xs"
                              >
                                <BriefcaseBusiness size={11} />
                                {action.label}
                              </a>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {message.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => sendMessage(suggestion)}
                              className="rounded-lg border border-blue-200 bg-blue-50/80 px-2 py-1 text-left text-[11px] font-medium text-blue-700 transition-all hover:border-blue-300 hover:bg-blue-100/90 shadow-xs"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {showTypingIndicator && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-slate-200 bg-white px-3 py-2 text-slate-400 shadow-xs">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-blue" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-yellow [animation-delay:240ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Chat Input Bar */}
            <div className="border-t border-slate-200 bg-white p-2.5">
              {conversationClosed ? (
                <button
                  type="button"
                  onClick={startNewChat}
                  className="mb-2 w-full rounded-lg border border-accent-blue/30 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  Start new chat
                </button>
              ) : !hasUserMessages && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isTyping || conversationClosed}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 transition-all hover:border-accent-blue/40 hover:bg-blue-50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              <form
                className="flex items-end gap-1.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Rishabh..."
                  disabled={isTyping || conversationClosed}
                  className="min-h-9 max-h-24 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-accent-blue focus:bg-white focus:ring-2 focus:ring-accent-blue/15 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  disabled={isTyping || conversationClosed}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-white shadow-xs transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-trigger-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            type="button"
            onClick={openChat}
            className="group relative flex items-center gap-2.5 rounded-full border border-accent-blue/30 bg-white/95 px-4 py-2.5 text-slate-900 shadow-xl shadow-slate-400/25 backdrop-blur-xl transition-all hover:border-accent-blue hover:shadow-accent-blue/20"
            aria-label="Open portfolio chatbot"
          >
            {/* Animated ping ring */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-blue border-2 border-white" />
            </span>

            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors">
              <MessageCircle size={16} />
            </span>
            <span className="text-left">
              <span className="block text-xs font-bold text-slate-900 leading-tight">Ask AI</span>
              <span className="block text-[10px] text-slate-500 leading-tight">Instant answers</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
