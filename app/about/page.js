import Reveal from "../components/Reveal";

const APPROACH = [
  {
    phase: "Scope",
    title: "Understand the problem",
    body: "We start by listening — to clinicians, administrators and the data — before proposing a way forward.",
  },
  {
    phase: "Design",
    title: "Build the approach",
    body: "A practical plan, sized to your context, budget and timeline — not a generic template.",
  },
  {
    phase: "Deliver",
    title: "Work alongside your team",
    body: "We embed with your people rather than handing over a report and disappearing.",
  },
  {
    phase: "Sustain",
    title: "Hand over what lasts",
    body: "Documentation, training and systems your team can run without us once we've left.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section style={{ paddingBottom: "48px" }}>
        <div className="wrap">
          <Reveal as="div" className="page-head">
            <div className="kicker">About us</div>
            <h1>Advisory built for the realities of healthcare.</h1>
            <p className="page-lede">
              We work across the full healthcare ecosystem — bringing strategic, operational and
              clinical governance expertise to organisations that carry real responsibility for
              people&rsquo;s health.
            </p>
          </Reveal>

          <div className="about-grid">
            <Reveal>
              <p>
                Healthcare doesn&rsquo;t fail in strategy documents — it fails in referral
                pathways, staffing gaps, claims backlogs and unclear governance. We help
                organisations close that gap between plans and practice.
              </p>
              <p>
                Our work spans facility development, clinical governance, growth strategy and
                specialised assignments for clients who need advisors that understand both the
                clinical and commercial sides of health.
              </p>
            </Reveal>
            <Reveal delay={100} className="stat-list">
              <div className="stat">
                <b>5</b>
                <span>
                  Sectors served across the health ecosystem — providers, insurers, government,
                  NGOs and health-tech
                </span>
              </div>
              <div className="stat">
                <b>4</b>
                <span>Core practice areas, from strategy through to specialised assignments</span>
              </div>
              <div className="stat">
                <b>1</b>
                <span>Point of contact throughout your engagement, from scoping to delivery</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-alt)" }}>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <div>
              <div className="kicker">How we work</div>
              <h2>A clear path from problem to delivery.</h2>
            </div>
            <div className="desc">
              Every engagement follows the same disciplined arc, scaled to the size of the
              assignment.
            </div>
          </Reveal>
          <div className="approach">
            {APPROACH.map((step, i) => (
              <Reveal key={step.phase} as="div" className="step" delay={i * 80}>
                <div className="phase">{step.phase}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
