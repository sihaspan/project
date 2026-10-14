// Each label is split into lines so it fits inside its circle.
const NODES = [
  ["Financial", "Management"],
  ["Investment", "Planning"],
  ["Strategic", "Planning"],
];

export default function EcosystemDiagram() {
  const cx = 210;
  const cy = 245; // lowered so the triangle of three circles sits centred in the frame
  const r = 140;
  const nodeR = 56;

  const positions = NODES.map((lines, i) => {
    const angle = (Math.PI * 2 * i) / NODES.length - Math.PI / 2;
    return {
      lines,
      label: lines.join(" "),
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  return (
    <div className="diagram-frame">
      <svg
        viewBox="0 0 420 420"
        role="img"
        aria-label="Diagram showing Healthcare et Omnia at the centre of the healthcare ecosystem, connected to financial management, investment planning and strategic planning"
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
              <circle cx={p.x} cy={p.y} r={nodeR} className="node-dot" />
              <text x={p.x} y={p.y - 2} textAnchor="middle" className="node-label">
                {p.lines.map((line, n) => (
                  <tspan key={line + n} x={p.x} dy={n === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
