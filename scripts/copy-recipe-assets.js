#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const srcRoot = path.resolve('src', 'content', 'recipes');
const destRoot = path.resolve('public', 'content', 'recipes');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // ignore
  }
}

async function walkAndCopy(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndCopy(fullPath);
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
    await ensureDir(destRoot);
    const stat = await fs.stat(srcRoot).catch(() => null);
    if (!stat || !stat.isDirectory()) {
      console.warn(`Source recipes directory not found: ${srcRoot}`);
      process.exit(0);
    }
    await walkAndCopy(srcRoot);
    console.log('Recipe assets copy complete.');
  } catch (err) {
    console.error('Error copying recipe assets:', err);
    process.exit(1);
  }
}

run();
