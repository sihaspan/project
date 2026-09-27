import EcosystemDiagram from "./components/EcosystemDiagram";
import ContactForm from "./components/ContactForm";

const SERVICES = [
  {
    mark: "S",
    title: "Strategy & Growth",
    tag: "Direction",
    body: "Market entry, service-line expansion and positioning for providers, insurers and health-tech companies deciding where to invest next.",
  },
  {
    mark: "F",
    title: "Health Facility Development",
    tag: "Infrastructure",
    body: "Feasibility, planning and project oversight for new and expanding health facilities, from concept through to commissioning.",
  },
  {
    mark: "C",
    title: "Clinical Governance & Quality",
    tag: "Standards",
    body: "Governance frameworks, quality systems and compliance support that hold up to regulatory and accreditation scrutiny.",
  },
  {
    mark: "A",
    title: "Specialised Assignments",
    tag: "Bespoke",
    body: "Focused, time-bound assignments for government agencies, NGOs and foundations — research, evaluation and technical support.",
  },
];

const APPROACH = [
  { phase: "Scope", title: "Understand the problem", body: "We start by listening — to clinicians, administrators and the data — before proposing a way forward." },
  { phase: "Design", title: "Build the approach", body: "A practical plan, sized to your context, budget and timeline — not a generic template." },
  { phase: "Deliver", title: "Work alongside your team", body: "We embed with your people rather than handing over a report and disappearing." },
  { phase: "Sustain", title: "Hand over what lasts", body: "Documentation, training and systems your team can run without us once we've left." },
];

const SERVED = [
  { title: "Healthcare providers", body: "Hospitals, clinics and networks planning growth or resolving operational strain." },
  { title: "Insurers", body: "Health financing organisations shaping products, claims and provider networks." },
  { title: "Government agencies", body: "Ministries and regulators developing policy, standards and oversight capacity." },
  { title: "NGOs", body: "Implementing partners delivering programmes on the ground." },
  { title: "Foundations", body: "Funders looking for rigorous evaluation and evidence of impact." },
  { title: "Health-tech companies", body: "Digital health innovators navigating clinical and regulatory realities." },
];

const CLIENT_PHONE_DISPLAY = "0721 917 972";
const CLIENT_PHONE_TEL = "+254721917972";
const CLIENT_PHONE_WHATSAPP = "254721917972";

export default function Home() {
  return (
    <>
      <header>
        <div className="nav">
          <div className="brand">
            <span className="brand-mark">S</span>
            Siha Span
          </div>
          <nav className="links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#serve">Who we serve</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="nav-cta">
            Talk to us
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="wrap" style={{ display: "contents" }}>
          <div>
            <div className="eyebrow-plain">Health systems advisory</div>
            <h1>Stronger health systems for better care.</h1>
            <p className="lede">
              Siha Span helps providers, insurers, government agencies, NGOs, foundations and
              health-technology companies design and deliver services that hold up under
              real-world pressure.
            </p>
            <div className="hero-ctas">
              <a href="#contact" className="btn-primary">
                Start a conversation
              </a>
              <a href="#services" className="btn-secondary">
                See how we work
              </a>
            </div>
          </div>
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

      <section id="about">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">About us</div>
              <h2>Advisory built for the realities of healthcare.</h2>
            </div>
            <div className="desc">
              We work across the full healthcare ecosystem — bringing strategic, operational and
              clinical governance expertise to organisations that carry real responsibility for
              people&rsquo;s health.
            </div>
          </div>
          <div className="about-grid">
            <div>
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
            </div>
            <div className="stat-list">
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
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={{ background: "var(--paper-alt)" }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">What we do</div>
              <h2>Four areas of practice.</h2>
            </div>
            <div className="desc">
              Each engagement is scoped to the problem in front of you, drawing on whichever of
              these areas it touches.
            </div>
          </div>
          <div className="service-list">
            {SERVICES.map((s) => (
              <div className="service-row" key={s.title}>
                <div className="service-mark">{s.mark}</div>
                <div>
                  <h3>{s.title}</h3>
                  <div className="tag">{s.tag}</div>
                </div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="approach">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">How we work</div>
              <h2>A clear path from problem to delivery.</h2>
            </div>
            <div className="desc">
              Every engagement follows the same disciplined arc, scaled to the size of the
              assignment.
            </div>
          </div>
          <div className="approach">
            {APPROACH.map((step) => (
              <div className="step" key={step.phase}>
                <div className="phase">{step.phase}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="serve" style={{ background: "var(--paper-alt)" }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Who we serve</div>
              <h2>Every part of the health ecosystem.</h2>
            </div>
            <div className="desc">
              Different mandates, one shared need: services that actually work for the people who
              depend on them.
            </div>
          </div>
          <div className="serve-grid">
            {SERVED.map((cell) => (
              <div className="serve-cell" key={cell.title}>
                <h3>{cell.title}</h3>
                <p>{cell.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="section-head" style={{ borderBottom: "none", marginBottom: "44px" }}>
            <div>
              <div className="kicker">Get in touch</div>
              <h2>Tell us about your project.</h2>
            </div>
            <div className="desc">
              Whether it&rsquo;s a facility to plan, a governance framework to build, or a
              strategy to pressure-test — we&rsquo;d like to hear about it.
            </div>
          </div>
          <div className="contact-wrap">
            <ContactForm />
            <div className="contact-info">
              <h3>Siha Span</h3>
              <div className="info-row">
                <div className="k">Phone</div>
                <div className="v">
                  <a href={`tel:${CLIENT_PHONE_TEL}`}>{CLIENT_PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="info-row">
                <div className="k">WhatsApp</div>
                <div className="v">
                  <a
                    href={`https://wa.me/${CLIENT_PHONE_WHATSAPP}`}
                    target="_blank"
                    rel="noopener"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
              <div className="info-row">
                <div className="k">Based in</div>
                <div className="v">Nairobi, Kenya</div>
              </div>
              <div className="social-row">
                <a
                  className="social-chip"
                  href={`https://wa.me/${CLIENT_PHONE_WHATSAPP}`}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a className="social-chip" href="#" target="_blank" rel="noopener">
                  LinkedIn
                </a>
                <a className="social-chip" href="#" target="_blank" rel="noopener">
                  Facebook
                </a>
                <a className="social-chip" href="#" target="_blank" rel="noopener">
                  Instagram
                </a>
                <a className="social-chip" href="#" target="_blank" rel="noopener">
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div>© {new Date().getFullYear()} Siha Span. All rights reserved.</div>
          <div>Site by Gilvon Software Solutions</div>
        </div>
      </footer>
    </>
  );
}
