import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Services — Siha Span Advisory",
  description:
    "Four areas of practice: Strategy & Growth, Health Facility Development, Clinical Governance & Quality, and Specialised Assignments for the healthcare ecosystem.",
};

const SERVICES = [
  {
    mark: "S",
    title: "Strategy & Growth",
    tag: "Direction",
    body: "Market entry, service-line expansion and positioning for providers, insurers and health-tech companies deciding where to invest next.",
    capabilities: ["Financial Management", "Investment Planning", "Strategic Planning"],
  },
  {
    mark: "F",
    title: "Health Facility Development",
    tag: "Infrastructure",
    body: "Feasibility, planning and project oversight for new and expanding health facilities, from concept through to commissioning.",
    capabilities: ["Pre-Feasibility", "Feasibility", "Service Design", "Digital Health"],
  },
  {
    mark: "C",
    title: "Clinical Governance & Quality",
    tag: "Standards",
    body: "Governance frameworks, quality systems and compliance support that hold up to regulatory and accreditation scrutiny.",
    capabilities: ["Quality", "Systems", "Performance", "Leadership"],
  },
  {
    mark: "A",
    title: "Specialised Assignments",
    tag: "Bespoke",
    body: "Focused, time-bound assignments for government agencies, NGOs and foundations — research, evaluation and technical support.",
    capabilities: ["Due Diligence", "Technical Review", "Project Validation", "Change Management"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section style={{ paddingBottom: "24px" }}>
        <div className="wrap">
          <Reveal as="div" className="page-head">
            <div className="kicker">What we do</div>
            <h1>Four areas of practice.</h1>
            <p className="page-lede">
              Each engagement is scoped to the problem in front of you, drawing on whichever of
              these areas it touches.
            </p>
          </Reveal>

          <div className="service-list">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} as="div" className="service-row" delay={i * 70}>
                <div className="service-mark">{s.mark}</div>
                <div>
                  <h3>{s.title}</h3>
                  <div className="tag">{s.tag}</div>
                </div>
                <div>
                  <p>{s.body}</p>
                  <ul className="capability-list">
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <Reveal as="div" className="cta-inner">
            <h2>Have a healthcare challenge that needs a systems-level solution?</h2>
            <p>Tell us about the challenge and we&rsquo;ll help you scope the right engagement.</p>
            <Link href="/contact" className="btn-primary">
              Let&rsquo;s Talk
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
