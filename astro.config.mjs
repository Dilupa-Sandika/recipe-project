import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

export default defineConfig({
  site: 'https://recipes.702o2.com',
  integrations: [
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 4096,
    },
  },
  headers: {
    'Content-Security-Policy': 
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
});