import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ඔයාගේ Subdomain එක
  site: 'https://recipes.702o2.com',
  integrations: [
    sitemap(),
    // අපි 'astro-seo' component එක layout file එකේදී add කරමු
  ],
});