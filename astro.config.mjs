import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// --- @astrojs/image වලට අදාළ කිසිම import එකක් මෙතන නෑ ---

// https://astro.build/config
export default defineConfig({
  // ඔයාගේ Subdomain එක
  site: 'https://recipes.702o2.com',
  integrations: [
    sitemap(),
    // --- integrations array එක ඇතුලෙත් image() කියන එක නෑ ---
  ],
});