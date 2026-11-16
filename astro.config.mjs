import { defineConfig } from 'astro/config';

// BASE_PATH is set by the Pages workflow (empty once the custom domain is live).
export default defineConfig({ site: 'https://shadetreeit.biz', base: process.env.BASE_PATH || '/' });
