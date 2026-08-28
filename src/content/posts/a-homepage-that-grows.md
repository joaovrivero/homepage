---
title: "A Homepage That Grows"
description: "Replacing a Next.js and Three.js homepage with a static Astro site anchored by an ASCII bonsai."
published: 2026-08-28
draft: false
tags:
  - astro
  - meta
---

The previous version of this site carried a full Three.js scene, a React runtime,
and a UI framework — all to display a name, some links, and a handful of posts.

This version replaces the 3D object with a bonsai drawn in text, rendered as text.
It weighs almost nothing, it persists across page navigations, and once in a while
it moves — just enough that you're not sure it did.

The stack is intentionally boring: Astro, a static build, a single Svelte island
for the tree, and CSS for nearly every animation. The theme is
[Solarized Osaka Jade](/uses), the same one running in my terminal.

Old growth: [rivero-homepage](https://github.com/joaovrivero/rivero-homepage).
