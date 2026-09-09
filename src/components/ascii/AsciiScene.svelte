<script lang="ts">
import { onMount } from "svelte";
import lgArt from "../../assets/ascii/bonsai-lg.txt?raw";
import mdArt from "../../assets/ascii/bonsai-md.txt?raw";
import smArt from "../../assets/ascii/bonsai-sm.txt?raw";

/**
 * The persistent ASCII bonsai.
 *
 * Lives across client-side navigations (transition:persist) and stays
 * almost still: occasional single-character glints, a rare falling
 * leaf, a very slow breathing filter. The current site section
 * (read from <body data-section>) nudges the frequencies.
 */

const LEAF_CHARS = new Set(["&", "%", "*"]);

function escapeHtml(ch: string): string {
  if (ch === "&") return "&amp;";
  if (ch === "<") return "&lt;";
  if (ch === ">") return "&gt;";
  return ch;
}

/** Wrap each leaf glyph in a span so it can glint individually. */
function toHtml(art: string): string {
  let out = "";
  let run = "";
  for (const ch of art) {
    if (LEAF_CHARS.has(ch)) {
      out += escapeHtml(run);
      run = "";
      out += `<span class="leaf">${escapeHtml(ch)}</span>`;
    } else {
      run += ch;
    }
  }
  return out + escapeHtml(run);
}

const html = {
  lg: toHtml(lgArt),
  md: toHtml(mdArt),
  sm: toHtml(smArt),
};

/** Per-section behavior. Everything stays within the same visual world. */
const MOODS = {
  home: { glintChance: 0.32, fallEvery: [16000, 30000], glintTint: "glint", fireflies: true },
  writing: { glintChance: 0.3, fallEvery: [7000, 14000], glintTint: "glint", fireflies: true },
  projects: {
    glintChance: 0.34,
    fallEvery: [24000, 40000],
    glintTint: "glint-cool",
    fireflies: false,
  },
  uses: { glintChance: 0.3, fallEvery: [22000, 36000], glintTint: "glint-cool", fireflies: true },
  about: { glintChance: 0.16, fallEvery: [0, 0], glintTint: "glint", fireflies: false },
} as const;

type Mood = keyof typeof MOODS;

let mood: Mood = "home";
let root: HTMLDivElement;
let timers: ReturnType<typeof setTimeout>[] = [];
let glintInterval: ReturnType<typeof setInterval> | undefined;
let stopped = false;

function currentMood() {
  return MOODS[mood];
}

function readSection() {
  const section = document.body.dataset.section ?? "home";
  mood = (section in MOODS ? section : "home") as Mood;
}

function visiblePre(): HTMLPreElement | null {
  for (const pre of root.querySelectorAll<HTMLPreElement>("pre.ascii")) {
    if (pre.offsetParent !== null) return pre;
  }
  return null;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

/** One or two leaves briefly shift toward bright gold, then settle back. */
function glintTick() {
  const pre = visiblePre();
  if (!pre) return;
  const { glintChance, glintTint, fireflies } = currentMood();
  if (Math.random() > glintChance) return;

  const leaves = Array.from(pre.querySelectorAll<HTMLElement>(".leaf"));
  const count = Math.random() < 0.3 ? 2 : 1;
  for (let i = 0; i < count; i++) {
    const leaf = pick(leaves);
    if (leaf?.className !== "leaf") continue;
    const roll = Math.random();
    const cls = fireflies && roll < 0.06 ? "firefly" : roll < 0.4 ? "glint-bright" : glintTint;
    leaf.classList.add(cls);
    const t = setTimeout(() => leaf.classList.remove(cls), rand(1100, 2100));
    timers.push(t);
  }
}

/** A single leaf character detaches and drifts to the ground. */
function dropLeaf() {
  const pre = visiblePre();
  if (!pre || stopped) return;
  const box = pre.getBoundingClientRect();
  const leaf = document.createElement("span");
  leaf.className = "falling";
  leaf.textContent = pick(["&", "*", "%"]) ?? "&";
  leaf.style.left = `${pre.offsetLeft + rand(0.15, 0.8) * box.width}px`;
  leaf.style.top = `${pre.offsetTop + rand(0.05, 0.3) * box.height}px`;
  leaf.style.setProperty("--dx", `${rand(-28, 22)}px`);
  leaf.style.setProperty("--dy", `${rand(0.5, 0.72) * box.height}px`);
  leaf.style.setProperty("--dur", `${rand(4200, 6800)}ms`);
  leaf.addEventListener("animationend", () => leaf.remove());
  root.appendChild(leaf);
}

function scheduleFall() {
  if (stopped) return;
  const [min, max] = currentMood().fallEvery;
  if (max === 0) {
    // Calm sections drop nothing; check again later in case of navigation.
    timers.push(setTimeout(scheduleFall, 8000));
    return;
  }
  timers.push(
    setTimeout(
      () => {
        dropLeaf();
        scheduleFall();
      },
      rand(min, max),
    ),
  );
}

function handleSwap() {
  readSection();
}

onMount(() => {
  readSection();
  document.addEventListener("astro:after-swap", handleSwap);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reduced.matches) {
    glintInterval = setInterval(glintTick, 900);
    scheduleFall();
  }

  return () => {
    stopped = true;
    document.removeEventListener("astro:after-swap", handleSwap);
    if (glintInterval) clearInterval(glintInterval);
    for (const t of timers) clearTimeout(t);
  };
});
</script>

<div class="ascii-scene" bind:this={root} aria-hidden="true">
  <span class="file-tag">bonsai.txt</span>
  <div class="glow"></div>
  <pre class="ascii ascii-lg">{@html html.lg}</pre>
  <pre class="ascii ascii-md">{@html html.md}</pre>
  <pre class="ascii ascii-sm">{@html html.sm}</pre>
</div>

<style>
  /* The tree sits in a slightly recessed technical display,
     embedded into the journal surface. */
  .ascii-scene {
    position: relative;
    color: var(--fg-muted);
    font-size: 0.8125rem;
    padding: 1.5rem 1.6rem 1.1rem;
    background: var(--bg-dark);
    border: 1px solid var(--selection);
    border-radius: 8px;
    box-shadow:
      inset 0 2px 5px rgba(0, 0, 0, 0.35),
      0 1px 0 rgba(226, 233, 229, 0.035);
  }

  /* Tiny file label set into the top border, like a fieldset legend. */
  .file-tag {
    position: absolute;
    top: 0;
    left: 0.9rem;
    transform: translateY(-55%);
    z-index: 2;
    padding-inline: 0.45em;
    background: var(--bg);
    font-family: var(--font-mono);
    font-size: 0.6563rem;
    letter-spacing: 0.04em;
    color: var(--fg-muted);
    user-select: none;
  }

  /* Slow radial gold glow sitting behind the tree. */
  .glow {
    position: absolute;
    inset: -12% -18%;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
      55% 48% at 50% 38%,
      color-mix(in srgb, var(--gold-dark) 13%, transparent),
      transparent 72%
    );
  }

  .ascii {
    display: none;
    position: relative;
    z-index: 1;
    font-family: var(--font-mono);
    line-height: 1.18;
    white-space: pre;
    user-select: none;
  }

  .ascii-lg {
    display: block;
  }

  @media (max-width: 1023px) {
    .ascii-lg {
      display: none;
    }

    .ascii-md {
      display: block;
    }
  }

  @media (max-width: 639px) {
    .ascii-md {
      display: none;
    }

    .ascii-sm {
      display: block;
      font-size: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .ascii {
      animation: breathe 11s ease-in-out infinite;
    }
  }

  @keyframes breathe {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.94;
    }
  }

  .ascii :global(.leaf) {
    color: var(--gold-dark);
    transition:
      color 900ms ease,
      text-shadow 900ms ease;
  }

  .ascii :global(.leaf.glint) {
    color: var(--gold);
  }

  .ascii :global(.leaf.glint-cool) {
    color: var(--aqua);
  }

  .ascii :global(.leaf.glint-bright) {
    color: var(--gold-bright);
    text-shadow: 0 0 10px color-mix(in srgb, var(--gold-bright) 35%, transparent);
  }

  .ascii :global(.leaf.firefly) {
    color: var(--aqua-bright);
    text-shadow: 0 0 12px color-mix(in srgb, var(--aqua-bright) 45%, transparent);
  }

  .ascii-scene :global(.falling) {
    position: absolute;
    z-index: 1;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--gold);
    pointer-events: none;
    animation: leaf-fall var(--dur) ease-in both;
  }

  @keyframes leaf-fall {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0;
    }

    12% {
      opacity: 0.75;
    }

    80% {
      opacity: 0.5;
    }

    100% {
      transform: translate(var(--dx), var(--dy)) rotate(38deg);
      opacity: 0;
    }
  }
</style>
