# homepage-v2

Personal homepage and technical notebook — a static Astro site themed with
**Solarized Osaka Jade** and anchored by a persistent ASCII bonsai.

Replaces [rivero-homepage](https://github.com/joaovrivero/rivero-homepage)
(Next.js + Three.js) with something far lighter.

## Stack

- [Astro](https://astro.build) — static-first, View Transitions for page navigation
- [Svelte](https://svelte.dev) — one island: the persistent `AsciiScene`
- [Tailwind CSS 4](https://tailwindcss.com) — on top of canonical theme tokens
- MDX + Content Collections — writing lives in `src/content/posts/`
- Shiki — custom Solarized Osaka Jade syntax theme
- [Bun](https://bun.sh) — runtime and package manager

## Local development

```bash
bun install
bun run dev        # http://localhost:4321
```

## Scripts

| command             | what it does                                  |
| ------------------- | --------------------------------------------- |
| `bun run dev`       | dev server with HMR                           |
| `bun run build`     | production build to `dist/`                   |
| `bun run preview`   | serve the production build locally            |
| `bun run check`     | `astro check` (types + templates)             |
| `bun run lint`      | Biome lint                                    |
| `bun run format`    | Biome format                                  |
| `bun run post "T"`  | scaffold `src/content/posts/t.mdx` as a draft |

## Writing

Create a post:

```bash
bun run post "Why I Use NixOS"
```

This generates `src/content/posts/why-i-use-nixos.mdx` with today's date and
`draft: true`. Drafts render in dev but never ship to production. Plain `.md`
works too; MDX unlocks the components in `src/components/mdx/`.

## Deployment (Cloudflare)

The site is fully static — no adapter, no backend.

**Option A — Workers static assets (wrangler):**

```bash
bun run build
bunx wrangler deploy
```

**Option B — Cloudflare Pages (git integration):**

- Build command: `bun run build`
- Output directory: `dist`

Update `site` in `astro.config.mjs` and `Sitemap` in `public/robots.txt` when the
final domain is decided.

## Theme

Canonical color tokens live in `src/styles/theme.css`. The same palette drives:

- site UI (via Tailwind theme mapping in `global.css`)
- syntax highlighting (`src/lib/shiki/solarized-osaka-jade.mjs`)
- the ASCII scene (`src/components/ascii/AsciiScene.svelte`)
