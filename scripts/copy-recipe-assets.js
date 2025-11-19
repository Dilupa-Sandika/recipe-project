// scripts/copy-recipe-assets.js
import { promises as fs } from 'fs';
import path from 'path';

// We now handle multiple content sources
const contentSources = [
  {
    src: path.resolve('src', 'content', 'recipes'),
    dest: path.resolve('public', 'content', 'recipes')
  },
  {
    src: path.resolve('src', 'content', 'blog'),
    dest: path.resolve('public', 'content', 'blog')
  }
];

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // ignore if already exists
  }
}

async function walkAndCopy(dir, srcRoot, destRoot) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return; // Source dir doesn't exist, skip
    throw err;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await walkAndCopy(fullPath, srcRoot, destRoot);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!imageExts.has(ext)) continue; // only copy images

    const relPath = path.relative(srcRoot, fullPath);
    const destPath = path.join(destRoot, relPath);
    
    await ensureDir(path.dirname(destPath));
    await fs.copyFile(fullPath, destPath);
    console.log(`Copied: ${relPath}`);
  }
}

async function run() {
  try {
    for (const source of contentSources) {
      console.log(`Syncing ${source.src} -> ${source.dest}...`);
      await ensureDir(source.dest);
      await walkAndCopy(source.src, source.src, source.dest);
    }
    console.log('Asset copy complete.');
  } catch (err) {
    console.error('Error copying assets:', err);
    process.exit(1);
  }
}

run();