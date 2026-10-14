// Single source of truth for the brand name shown across the site.
export const SITE_NAME = "SihaSpan";

/** "Clinical Governance & Quality" -> "clinical-governance-and-quality" (used for #anchors). */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
