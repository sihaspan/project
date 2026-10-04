const NODES = ["Providers", "Insurers", "Government", "NGOs", "Foundations", "Health-tech"];

export default function EcosystemDiagram() {
  const cx = 210;
  const cy = 210;
  const r = 150;

  const positions = NODES.map((label, i) => {
    const angle = (Math.PI * 2 * i) / NODES.length - Math.PI / 2;
    return {
      label,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  return (
    <div className="diagram-frame">
      <svg
        viewBox="0 0 420 420"
        role="img"
        aria-label="Diagram showing SihaSpan at the centre of the healthcare ecosystem, connected to providers, insurers, government, NGOs, foundations and health-tech companies"
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
          <circle cx={cx} cy={cy} r={64} fill="none" stroke="var(--gold)" strokeWidth="1.2" className="diagram-pulse" />
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
          {positions.map((p, i) => (
            <g key={p.label} className="diagram-node" style={{ animationDelay: `${300 + i * 90}ms` }}>
              <circle cx={p.x} cy={p.y} r={50} className="node-dot" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" className="node-label">
                {p.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
