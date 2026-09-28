import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export const getSettings = () => reader.singletons.settings.readOrThrow();
export const getHome = () => reader.singletons.home.readOrThrow();
export const getAbout = () => reader.singletons.about.readOrThrow();
export const getServices = () => reader.singletons.services.readOrThrow();
export const getWhoWeServe = () => reader.singletons.whoWeServe.readOrThrow();
export const getContact = () => reader.singletons.contact.readOrThrow();

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
