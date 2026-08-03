# Leyre Alcalde Sancho — Web CV

A bilingual single-page web CV for Leyre Alcalde Sancho, positioned around her experience in internal audit, process clarity, and virtual assistance. Spanish is the default language; visitors can switch to English with the ES/EN toggle.

## Run locally

Because this is a static GitHub Pages site, no build step is required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

Push the repository to GitHub and choose **Settings → Pages → Deploy from a branch**, using the repository's main branch and `/ (root)` folder. The included `.nojekyll` file keeps the site fully static.
