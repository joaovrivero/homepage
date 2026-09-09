// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { pinacoteca } from "./src/lib/shiki/pinacoteca.mjs";

export default defineConfig({
  // Update this when the final domain is decided.
  site: "https://rivero.dev",
  output: "static",
  trailingSlash: "never",
  integrations: [mdx(), svelte(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  markdown: {
    shikiConfig: {
      theme: pinacoteca,
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
