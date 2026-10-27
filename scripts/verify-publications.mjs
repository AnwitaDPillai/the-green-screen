/**
 * Build verification script:
 * Ensures no draft/review entries are published or leak required metadata.
 */
import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.resolve('src/content');
let hasError = false;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    console.error(`[VERIFY-ERROR] Missing frontmatter in: ${filePath}`);
    hasError = true;
    return;
  }

  const rawFm = frontmatterMatch[1];
  const isPublished = /status:\s*["']?published["']?/.test(rawFm);

  if (isPublished) {
    // Check for approvedBy
    if (!/approvedBy:\s*["']?.+["']?/.test(rawFm)) {
      console.error(`[VERIFY-ERROR] Published piece missing approvedBy: ${filePath}`);
      hasError = true;
    }
    // Check for approvedAt
    if (!/approvedAt:\s*.+/.test(rawFm)) {
      console.error(`[VERIFY-ERROR] Published piece missing approvedAt: ${filePath}`);
      hasError = true;
    }
    // Check for publishDate
    if (!/publishDate:\s*.+/.test(rawFm)) {
      console.error(`[VERIFY-ERROR] Published piece missing publishDate: ${filePath}`);
      hasError = true;
    }
  }
}

console.log('--- Checking Content Integrity & Publication Rules ---');
scanDir(contentDir);

if (hasError) {
  console.error('\nFAIL: Publication validation failed. Fix metadata before building.');
  process.exit(1);
} else {
  console.log('SUCCESS: All publication metadata verified.');
}
