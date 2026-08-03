/* Страница "Блог": рендер ленты новостей (закреплённый пост + остальные по дате) */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof BLOG === "undefined") return;

  const sorted = [...BLOG].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = sorted.find((p) => p.featured) || sorted[0];
  const rest = sorted.filter((p) => p.id !== featured.id);

  const featuredWrap = document.getElementById("blogFeatured");
  if (featuredWrap) featuredWrap.innerHTML = renderFeaturedBlogPost(featured);

  const feed = document.getElementById("blogFeed");
  if (feed) feed.innerHTML = rest.map(renderBlogCard).join("");
});
