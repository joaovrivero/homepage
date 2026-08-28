#!/usr/bin/env bun
/**
 * Create a new draft post:
 *
 *   bun run post "Why I Use NixOS"
 *   → src/content/posts/why-i-use-nixos.mdx
 */

export {};

const title = process.argv[2];

if (!title) {
  console.error('usage: bun run post "Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error(`error: could not derive a slug from "${title}"`);
  process.exit(1);
}

const path = `src/content/posts/${slug}.mdx`;
const file = Bun.file(path);

if (await file.exists()) {
  console.error(`error: ${path} already exists — refusing to overwrite`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
published: ${today}
draft: true
tags: []
---

`;

await Bun.write(path, frontmatter);
console.log(`created ${path}`);
console.log(`  title:     ${title}`);
console.log(`  published: ${today}`);
console.log("  draft:     true (won't ship to production)");
