import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export const getSettings = () => reader.singletons.settings.readOrThrow();
export const getHome = () => reader.singletons.home.readOrThrow();
export const getAbout = () => reader.singletons.about.readOrThrow();
export const getServices = () => reader.singletons.services.readOrThrow();
export const getWhoWeServe = () => reader.singletons.whoWeServe.readOrThrow();
export const getContact = () => reader.singletons.contact.readOrThrow();
export const getBlog = () => reader.singletons.blog.readOrThrow();
export const getInsights = () => reader.singletons.insights.readOrThrow();

/** Posts saved before categories existed count as "blog". */
const categoryOf = (entry) => entry.category || "blog";

/** Today's date (YYYY-MM-DD) in Kenya, so a post dated "today" shows immediately. */
const todayInKenya = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });

/**
 * All published posts, newest first. Drafts and future-dated posts are hidden.
 * Pass "blog" or "insight" to get only that category.
 */
export async function getPosts(category) {
  const all = await reader.collections.posts.all();
  const today = todayInKenya();
  return all
    .filter(({ entry }) => !entry.draft && entry.publishedDate && entry.publishedDate <= today)
    .filter(({ entry }) => !category || categoryOf(entry) === category)
    .map(({ slug, entry }) => ({ slug, ...entry, category: categoryOf(entry) }))
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

/** One published post of the given category (with content resolved), or null. */
export async function getPost(slug, category) {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) return null;
  if (category && categoryOf(entry) !== category) return null;
  const today = todayInKenya();
  if (!entry.publishedDate || entry.publishedDate > today) return null;
  return { slug, ...entry, category: categoryOf(entry), content: await entry.content() };
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Builds the social-link list, skipping any the client hasn't filled in. */
export function getSocialLinks(settings) {
  const s = settings.social || {};
  return [
    { label: "LinkedIn", href: s.linkedin },
    { label: "Facebook", href: s.facebook },
    { label: "Instagram", href: s.instagram },
    { label: "TikTok", href: s.tiktok },
  ].filter((l) => l.href);
}
