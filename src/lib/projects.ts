export interface Project {
  name: string;
  description: string;
  tags: string[];
  repo?: string;
  url?: string;
  status?: "active" | "maintained" | "archived";
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: "osaka-jade",
    description: "Cross-platform development environment theme",
    tags: ["Nix", "Astro", "Lua", "JSON"],
    status: "active",
    featured: true,
  },
  {
    name: "Parks",
    description: "Location-based activity and event application",
    tags: ["Expo", "TypeScript", "Supabase"],
    status: "active",
    featured: true,
  },
  {
    name: "Zyra",
    description: "Marketing infrastructure and analytics platform",
    tags: ["Laravel", "React", "AWS"],
    status: "active",
    featured: true,
  },
  {
    name: "homepage-v2",
    description: "This site — a static, ASCII-anchored technical notebook",
    tags: ["Astro", "Svelte", "Tailwind", "Bun"],
    repo: "https://github.com/joaovrivero/homepage-v2",
    status: "active",
  },
  {
    name: "rivero-homepage",
    description: "Previous homepage, built on Next.js and Three.js",
    tags: ["Next.js", "Chakra UI", "Three.js"],
    repo: "https://github.com/joaovrivero/rivero-homepage",
    status: "archived",
  },
];
