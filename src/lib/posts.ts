import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** All publishable posts, newest first. Drafts never ship in production. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
