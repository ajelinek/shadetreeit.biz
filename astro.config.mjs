import { defineConfig } from 'astro/config';

// Served from the custom domain root, so no base path.
export default defineConfig({ site: 'https://shadetreeit.biz', base: '/' });
