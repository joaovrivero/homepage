import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../lib/posts";
import { SITE } from "../lib/site";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `${SITE.name} — Writing`,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/writing/${post.id}`,
    })),
    customData: "<language>en</language>",
  });
}
