import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- මේ Script එකෙන් කරන්නේ src/content/recipes/ වල තියෙන images ---
// --- public/content/recipes/ වලට copy කරන එක ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src', 'content', 'recipes');
const publicDir = path.join(projectRoot, 'public', 'content', 'recipes');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);

function copyFiles(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory not found: ${src}`);
    return;
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFiles(srcPath, destPath);
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      fs.copyFileSync(srcPath, destPath);
      // console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

console.log('Copying recipe assets...');
copyFiles(srcDir, publicDir);
console.log('Asset copying complete.');