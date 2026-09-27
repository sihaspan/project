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
        aria-label="Diagram showing Siha Span at the centre of the healthcare ecosystem, connected to providers, insurers, government, NGOs, foundations and health-tech companies"
      >
        <g>
          {positions.map((p) => (
            <line
              key={`line-${p.label}`}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              className="link-line"
            />
          ))}
        </g>

        <circle cx={cx} cy={cy} r={58} fill="var(--ink)" />
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fill="var(--paper)"
          fontFamily="Fraunces, serif"
          fontSize="15"
          fontWeight="500"
        >
          Siha Span
        </text>

        <g>
          {positions.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={30} className="node-dot" />
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
