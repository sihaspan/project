import { SITE_NAME } from "@/lib/site";

/** "Core practice areas" -> ["Core practice", "areas"] so it fits inside the circle. */
const wrapLabel = (label) => {
  const words = label.trim().split(/\s+/);
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

/**
 * Logo in the middle with one circle per node.
 * nodes: [{ number?: "1", title: "Point of contact" }]  (plain strings also work)
 */
export default function EcosystemDiagram({ nodes = [] }) {
  const items = nodes
    .map((n) => (typeof n === "string" ? { title: n } : n))
    .filter((n) => n && n.title);
  const cx = 210;
  const cy = 210;
  const r = 150;
  // Three circles sit in the upper part of the square, so trim the empty space below them.
  const height = items.length === 3 ? 352 : 420;

  const positions = items.map((item, i) => {
    // Counter-clockwise from the top, so a bottom row reads left to right.
    const angle = -Math.PI / 2 - (Math.PI * 2 * i) / items.length;
    return { ...item, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="diagram-frame">
      <svg
        viewBox={`0 0 420 ${height}`}
        role="img"
        aria-label={`Diagram showing ${SITE_NAME} at the centre, connected to ${items
          .map((n) => n.title)
          .join(", ")}`}
      >
        <g>
          {positions.map((p, i) => (
            <line
              key={`line-${p.title}`}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              className="link-line diagram-line"
              style={{ animationDelay: `${i * 70}ms, ${900 + i * 70}ms` }}
            />
          ))}
        </g>

        <g className="diagram-center">
          <circle cx={cx} cy={cy} r={64} fill="none" stroke="var(--accent)" strokeWidth="1.2" className="diagram-pulse" />
          <circle cx={cx} cy={cy} r={58} fill="var(--ink)" />
          <image
            href="/logo-mark-cream.png"
            x={cx - 40}
            y={cy - 40}
            width={80}
            height={80}
            className="diagram-logo diagram-logo--cream"
          />
          <image
            href="/logo-mark-maroon.png"
            x={cx - 40}
            y={cy - 40}
            width={80}
            height={80}
            className="diagram-logo diagram-logo--maroon"
          />
        </g>

        <g>
          {positions.map((p, i) => {
            const rows = wrapLabel(p.title);
            const numberH = p.number ? 26 : 0;
            const textH = rows.length * 15;
            const top = p.y - (numberH + textH) / 2;
            return (
              <g key={p.title} className="diagram-node" style={{ animationDelay: `${300 + i * 90}ms` }}>
                <circle cx={p.x} cy={p.y} r={56} className="node-dot" />
                {p.number ? (
                  <text x={p.x} y={top + 20} textAnchor="middle" className="node-number">
                    {p.number}
                  </text>
                ) : null}
                <text x={p.x} y={top + numberH + 11} textAnchor="middle" className="node-label">
                  {rows.map((row, k) => (
                    <tspan key={row} x={p.x} dy={k === 0 ? 0 : 15}>
                      {row}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
