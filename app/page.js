import Link from "next/link";
import EcosystemDiagram from "./components/EcosystemDiagram";
import Reveal from "./components/Reveal";

export const metadata = {
  title: "Siha Span Advisory — Stronger Health Systems for Better Care",
  description:
    "Siha Span Advisory helps healthcare providers, insurers, government agencies, NGOs, foundations and health-technology companies design and deliver services that hold up under real-world pressure.",
};

const HIGHLIGHTS = [
  {
    title: "Practical, not theoretical",
    body: "Every recommendation is sized to what your team can actually implement, with your budget and timeline.",
  },
  {
    title: "Embedded delivery",
    body: "We work alongside your staff rather than handing over a report and moving on to the next client.",
  },
  {
    title: "Built to last",
    body: "Documentation, training and systems your team can run independently once the engagement ends.",
  },
];

const SERVICE_PREVIEW = [
  { mark: "S", title: "Strategy & Growth", tag: "Financial Management · Investment Planning · Strategic Planning" },
  { mark: "F", title: "Health Facility Development", tag: "Pre-Feasibility · Feasibility · Service Design · Digital Health" },
  { mark: "C", title: "Clinical Governance & Quality", tag: "Quality · Systems · Performance · Leadership" },
  { mark: "A", title: "Specialised Assignments", tag: "Due Diligence · Technical Review · Project Validation" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <Reveal>
            <div className="eyebrow-plain">Health systems advisory</div>
            <h1>Stronger health systems for better care.</h1>
            <p className="lede">
              Siha Span helps providers, insurers, government agencies, NGOs, foundations and
              health-technology companies design and deliver services that hold up under
              real-world pressure.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn-primary">
                Start a conversation
              </Link>
              <Link href="/services" className="btn-secondary">
                See how we work
              </Link>
            </div>
          </Reveal>
          <EcosystemDiagram />
        </div>
      </section>

      <div className="strip">
        <div className="wrap">
          <span>
            <strong>Providers</strong> · hospitals &amp; clinics
          </span>
          <span>
            <strong>Insurers</strong> · health financing
          </span>
          <span>
            <strong>Government</strong> · policy &amp; regulation
          </span>
          <span>
            <strong>NGOs &amp; foundations</strong> · programme delivery
          </span>
          <span>
            <strong>Health-tech</strong> · digital health
          </span>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <div>
              <div className="kicker">Why Siha Span</div>
              <h2>Advisory that gets implemented.</h2>
            </div>
            <div className="desc">
              We've seen too many good strategies stall at handover. Our approach is designed to
              survive contact with the day-to-day.
            </div>
          </Reveal>
          <div className="highlight-grid">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="highlight-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-alt)" }}>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <div>
              <div className="kicker">What we do</div>
              <h2>Four areas of practice.</h2>
            </div>
            <div className="desc">
              From strategy through to specialised assignments — explore the full detail on our
              services page.
            </div>
          </Reveal>
          <div className="preview-grid">
            {SERVICE_PREVIEW.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} as="div" className="preview-card">
                <div className="service-mark">{s.mark}</div>
                <h3>{s.title}</h3>
                <p className="preview-tag">{s.tag}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="preview-cta">
            <Link href="/services" className="btn-secondary">
              View all services
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <Reveal as="div" className="cta-inner">
            <h2>Have a healthcare challenge that needs a systems-level solution?</h2>
            <p>Tell us what you're trying to solve and we'll tell you how we can help.</p>
            <Link href="/contact" className="btn-primary">
              Let&rsquo;s Talk
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
