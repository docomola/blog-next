import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import config from "@shConfig";

export async function GET(context) {
  // RSS feed 只顯示非 draft 文章
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const heroImage = post.data.heroImage;
      const enclosure = heroImage
        ? (() => {
            const imageUrl = new URL(heroImage.src, context.site);
            const pathname = imageUrl.pathname || "";
            const ext = pathname.split(".").pop()?.toLowerCase();
            const mimeTypes = {
              jpg: "image/jpeg",
              jpeg: "image/jpeg",
              png: "image/png",
              webp: "image/webp",
              gif: "image/gif",
              svg: "image/svg+xml",
              avif: "image/avif",
            };
            const type = (ext && mimeTypes[ext]) || "image/*";
            return {
              url: imageUrl.href,
              type,
            };
          })()
        : undefined;

      return {
        ...post.data,
        link: `/blog/${post.id}/`,
        enclosure,
        content: config.behavior.rss.protectContent
          ? post.body.slice(0, 50) + (post.body.length > 50 ? "..." : "")
          : post.body,
      };
    }),
    customData: `<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    stylesheet: config.behavior.rss.enableStylesheet
      ? "/rss/styles.xsl"
      : undefined,
  });
}
