/**
 * Line icons used by the strip and the service cards.
 * Keys are stored in the CMS ("icon" select fields), so keep them stable.
 */
const PATHS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4.5" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M6.5 20v-1.5a4.2 4.2 0 0 1 4.2-4.2h2.6a4.2 4.2 0 0 1 4.2 4.2V20" />
      <circle cx="5" cy="9.5" r="2.3" />
      <path d="M1.5 18v-.8A3.2 3.2 0 0 1 4.7 14h.4" />
      <circle cx="19" cy="9.5" r="2.3" />
      <path d="M22.5 18v-.8a3.2 3.2 0 0 0-3.2-3.2h-.4" />
    </>
  ),
  "target-arrow": (
    <>
      <circle cx="11" cy="13" r="8.5" />
      <circle cx="11" cy="13" r="4.5" />
      <circle cx="11" cy="13" r="1" />
      <path d="M11 13 20.5 3.5" />
      <path d="M16.5 3H21v4.5" />
    </>
  ),
  growth: (
    <>
      <path d="M3 21h18" />
      <path d="m3 16 6-6 4 4 8-8" />
      <path d="M15 6h6v6" />
    </>
  ),
  technology: (
    <>
      <rect x="3" y="3.5" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 16.5V21" />
      <path d="M6 10h3l1.5-3 3 6 1.5-3h3" />
    </>
  ),
  governance: (
    <>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  facility: (
    <>
      <path d="M5 21V8h14v13" />
      <path d="M3 21h18" />
      <path d="M12 2.5v5M9.5 5h5" />
      <path d="M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01" strokeWidth="2.2" />
      <path d="M10.5 21v-2.5h3V21" />
    </>
  ),
  advisory: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </>
  ),
};

export const ICON_OPTIONS = [
  "user",
  "team",
  "target-arrow",
  "growth",
  "technology",
  "governance",
  "facility",
  "advisory",
];

export default function Icon({ name, size = 56, strokeWidth = 1.4, className = "" }) {
  const shape = PATHS[name] || PATHS.advisory;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shape}
    </svg>
  );
}
