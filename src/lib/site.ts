export const SITE = {
  name: "João Rivero",
  handle: "joao.rivero",
  role: "Software Engineer",
  description:
    "Personal site and technical notebook of João Rivero — systems, infrastructure, tooling, and Pinacoteca, a theme sampled from paintings.",
  locale: "en",
  author: {
    github: "https://github.com/joaovrivero",
    linkedin: "https://www.linkedin.com/in/joaovrivero",
    /* Update when a hosted resume exists. */
    resume: "/resume.pdf",
  },
  source: "https://github.com/joaovrivero/homepage-v2",
} as const;

export type Section = "home" | "writing" | "projects" | "uses" | "about";

export const NAV: { label: string; path: string; section: Section }[] = [
  { label: "~/writing", path: "/writing", section: "writing" },
  { label: "~/projects", path: "/projects", section: "projects" },
  { label: "~/uses", path: "/uses", section: "uses" },
  { label: "~/about", path: "/about", section: "about" },
];

export function pageTitle(title?: string): string {
  return title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.role}`;
}
