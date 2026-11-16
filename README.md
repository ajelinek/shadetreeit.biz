# ShadeTree.IT LLC

A single-page static Astro site. Node 24 is required (`nvm use` if you use nvm).

## Local development

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Open the local preview URL and check navigation, phone and email links, mobile layout, keyboard focus, and sharing metadata. `npm test` builds the site before checking the generated output. The production files are in `dist/`.

## Making changes

Business details and services live in `src/features/home/content.ts`; the page and its styles are in `src/features/home/pages/Home/`. The headshot is `src/assets/adam.jpg` and is optimized at build time. The cropped brand mark, icons and 1200 × 630 social image are in `public/`. If the social image changes, keep its metadata in `src/app/Shell.astro` in sync.

## GitHub Pages (not yet published)

The workflow is **manual only** (`workflow_dispatch`). Before running it, configure the repository Pages source to GitHub Actions, arrange the custom domain DNS for `shadetreeit.biz`, and enable HTTPS once available. These external setup steps are not performed by this repository. Once publication is approved, an automatic `push` trigger for the main branch can be added to `.github/workflows/deploy.yml`. The `CNAME` file is included in the build.
