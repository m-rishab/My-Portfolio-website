import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cvPath = resolve(rootDir, 'public/RishabhCV.pdf');
const outputPath = resolve(rootDir, 'src/data/generated-cv.json');

const headingAliases = {
  summary: ['SUMMARY'],
  education: ['EDUCATION'],
  experience: ['EXPERIENCE'],
  skills: ['SKILLS'],
  projects: ['PERSONAL PROJECTS', 'PROJECTS'],
  achievements: ['ACHIEVEMENTS & LEADERSHIPS', 'ACHIEVEMENTS', 'LEADERSHIPS'],
  certificates: ['CERTIFICATES', 'CERTIFICATIONS'],
};

function cleanText(text) {
  return text
    .replace(/\f/g, '')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
    .trim();
}

function extractSections(text) {
  const headingToKey = new Map();
  Object.entries(headingAliases).forEach(([key, headings]) => {
    headings.forEach((heading) => headingToKey.set(heading, key));
  });

  const headingPattern = [...headingToKey.keys()]
    .sort((a, b) => b.length - a.length)
    .map((heading) => heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const sectionRegex = new RegExp(`^(${headingPattern})$`, 'gim');
  const matches = [...text.matchAll(sectionRegex)];

  return matches.reduce((sections, match, index) => {
    const key = headingToKey.get(match[1].toUpperCase());
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    sections[key] = text.slice(start, end).trim();
    return sections;
  }, {});
}

function main() {
  if (!statSync(cvPath, { throwIfNoEntry: false })) {
    console.log(`CV PDF not found at ${cvPath} — skipping extraction.`);
    return;
  }

  const rawText = execFileSync('pdftotext', ['-layout', cvPath, '-'], { encoding: 'utf8' });
  const text = cleanText(rawText);
  const stats = statSync(cvPath);
  const data = {
    source: '/RishabhCV.pdf',
    extractedAt: new Date().toISOString(),
    pdfModifiedAt: stats.mtime.toISOString(),
    text,
    sections: extractSections(text),
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Extracted CV text from ${cvPath}`);
}

main();
