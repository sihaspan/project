/**
 * Brand mark: four interlocking loops forming a cross.
 * Drawn with currentColor so it follows the theme; the "gap" stroke
 * (var(--paper)) creates the over/under weave where the loops cross.
 */
const LOOPS = {
  top: { x: 32, y: 2.44, w: 26, h: 58 },
  right: { x: 39.56, y: 32, w: 58, h: 26 },
  bottom: { x: 42, y: 39.56, w: 26, h: 58 },
  left: { x: 2.44, y: 42, w: 58, h: 26 },
};

const loop = (a, key, extra = {}) => (
  <rect key={key} x={a.x} y={a.y} width={a.w} height={a.h} rx={Math.min(a.w, a.h) / 2} {...extra} />
);

export function LogoMark({ size = 36, title }) {
  const gap = { stroke: "var(--paper)", strokeWidth: 11.5 };
  const { top, right, bottom, left } = LOOPS;
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="-2 -2 104 104"
      fill="none"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
    >
      {loop(top, "t")}
      {loop(right, "rg", gap)}
      {loop(right, "r")}
      {loop(bottom, "bg", gap)}
      {loop(bottom, "b")}
      {loop(left, "lg", gap)}
      {loop(left, "l")}
      <clipPath id="logo-weave">
        <rect x="-2" y="-2" width="52" height="52" />
      </clipPath>
      <g clipPath="url(#logo-weave)">
        {loop(top, "tg", gap)}
        {loop(top, "t2")}
      </g>
    </svg>
  );
}

export default function Logo({ size = 36 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }}>
      <LogoMark size={size} />
    </span>
  );
}
