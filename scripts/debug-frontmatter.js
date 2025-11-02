import { readFileSync } from 'fs';
const path = process.argv[2];
if (!path) { console.error('Usage: node debug-frontmatter.js <file>'); process.exit(1); }
const raw = readFileSync(path, 'utf8');
console.log('=== FILE START ===');
console.log(raw.slice(0, 400));
console.log('=== FILE END (first 400 chars) ===');
const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
if (!m) { console.log('No frontmatter match'); process.exit(0);} 
console.log('FRONTMATTER:\n', m[1]);
try {
  // very naive YAML parse for simple key: value pairs
  const lines = m[1].split(/\n/).map(l => l.trim()).filter(Boolean);
  const obj = {};
  for (const line of lines) {
    if (line.startsWith('#')) continue;
    const kv = line.match(/^([^:]+):\s*(.*)$/);
    if (kv) {
      obj[kv[1].trim()] = kv[2].trim();
    }
  }
  console.log('NAIVE PARSE OBJ:', obj);
} catch (err) { console.error('parse err', err); }
