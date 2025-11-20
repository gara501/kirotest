// scripts/generate-docs.js
const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  try { return execSync(cmd, { encoding: 'utf8' }).trim(); }
  catch (e) { return ''; }
}

// 1) Última tag (si existe)
let prevTag = run('git describe --tags --abbrev=0 2>/dev/null');
let range = prevTag ? `${prevTag}..HEAD` : 'HEAD~1..HEAD';

// 2) Commits en el rango
const commits = run(`git log --pretty=format:"* %s" ${range}`) || run('git log --pretty=format:"* %s" -n 20 HEAD');

// 3) Files changed in the merge/push (names)
const filesChanged = run(`git diff --name-status ${range}`) || run('git diff --name-status HEAD~1 HEAD');

// 4) Diff stat
const diffStat = run(`git diff --stat ${range}`) || run('git diff --stat HEAD~1 HEAD');

// 5) Meta
const author = run('git log -1 --pretty=format:"%an <%ae>"');
const sha = run('git rev-parse --short HEAD');
const date = new Date().toISOString();

// 6) Write docs folder
if (!fs.existsSync('docs')) fs.mkdirSync('docs');

fs.writeFileSync('docs/PR_SUMMARY.md', `# PR Summary (Auto-generated)
Date: ${date}
Commit: ${sha}
Author: ${author}

## Commits included
${commits || 'No commits found'}

## Files changed
\`\`\`
${filesChanged || 'No file changes found'}
\`\`\`

## Diff stat
\`\`\`
${diffStat || 'No diff stat'}
\`\`\`
`);

fs.writeFileSync('docs/changed_files.txt', filesChanged || '');
console.log('docs/PR_SUMMARY.md and docs/changed_files.txt generated.');

// 7) Optionally update README.md with a short release note (append)
const readmePath = 'README.md';
let readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '# Project\n';
const releaseLine = `\n\n## Auto-update: ${date}\n- Commit: ${sha}\n- Author: ${author}\n- Summary: See docs/PR_SUMMARY.md\n`;
fs.writeFileSync(readmePath, readme + releaseLine);
console.log('README.md updated (appended).');
