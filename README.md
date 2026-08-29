# Bobby's Knowledge Base

A personal knowledge base built with [Quarto](https://quarto.org/), bringing together structured notes on mathematics, physics, and deep learning alongside essays about writing, tools, AI, and creative work.

Visit the site at [bobby50792.com](https://bobby50792.com).

## What is here

- **Notes** — Long-form, topic-based reference material covering calculus, physics, mathematics for computer science and AI, and deep learning.
- **Blog** — Essays, project notes, and reflections on writing, technology, and the process of building this site.
- **Homepage** — A custom Quarto landing page designed to make the growing collection easier to explore.

## Project structure

```text
.
├── docs/
│   ├── notes/          # Structured learning notes
│   └── blog/           # Blog index, posts, and media
├── index.qmd           # Homepage content
├── index.css           # Homepage-specific styles
├── styles.css          # Shared site styles
├── theme.scss          # Light theme
├── theme-dark.scss     # Dark theme
└── _quarto.yml         # Site navigation and build configuration
```

## Run locally

Install [Quarto](https://quarto.org/docs/get-started/) and Python, then set up the project environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
quarto preview
```

Quarto will start a local development server and rebuild pages as files change.

## Build

Render the complete static site with:

```bash
quarto render
```

Generated files are written to `_site/` and are intentionally excluded from version control.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/publish.yml`. The workflow installs Quarto and Python dependencies, renders the site, and publishes it to the `gh-pages` branch. The custom domain is configured through `CNAME`.
