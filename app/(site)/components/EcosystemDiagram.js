import { SITE_NAME } from "@/lib/site";

const DEFAULT_NODES = ["Financial management", "Investment planning", "Strategic planning"];

/** "Financial management" -> ["Financial", "management"] so it fits inside the circle. */
const wrapLabel = (label) => {
  const words = label.trim().split(/\s+/);
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

export default function EcosystemDiagram({ nodes = DEFAULT_NODES }) {
  const labels = nodes.filter(Boolean);
  const cx = 210;
  const cy = 210;
  const r = 150;
  // Three circles sit in the upper part of the square, so trim the empty space below them.
  const height = labels.length === 3 ? 352 : 420;

  const positions = labels.map((label, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    return { label, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="diagram-frame">
      <svg
        viewBox={`0 0 420 ${height}`}
        role="img"
        aria-label={`Diagram showing ${SITE_NAME} at the centre, connected to ${labels.join(", ")}`}
      >
        <g>
          {positions.map((p, i) => (
            <line
              key={`line-${p.label}`}
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
            const rows = wrapLabel(p.label);
            const firstY = p.y + 4 - ((rows.length - 1) * 15) / 2;
            return (
              <g key={p.label} className="diagram-node" style={{ animationDelay: `${300 + i * 90}ms` }}>
                <circle cx={p.x} cy={p.y} r={56} className="node-dot" />
                <text x={p.x} y={firstY} textAnchor="middle" className="node-label">
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
