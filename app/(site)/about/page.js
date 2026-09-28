import Reveal from "../components/Reveal";
import { getAbout } from "@/lib/content";

export async function generateMetadata() {
  const { seo } = await getAbout();
  return { title: seo.title, description: seo.description };
}

export default async function AboutPage() {
  const { head, paragraphs, stats, approach } = await getAbout();

  return (
    <>
      <section style={{ paddingBottom: "48px" }}>
        <div className="wrap">
          <Reveal as="div" className="page-head">
            <div className="kicker">{head.kicker}</div>
            <h1>{head.heading}</h1>
            <p className="page-lede">{head.lede}</p>
          </Reveal>

          <div className="about-grid">
            <Reveal>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={100} className="stat-list">
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <b>{s.number}</b>
                  <span>{s.text}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-alt)" }}>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <div>
              <div className="kicker">{approach.head.kicker}</div>
              <h2>{approach.head.heading}</h2>
            </div>
            <div className="desc">{approach.head.description}</div>
          </Reveal>
          <div className="approach">
            {approach.steps.map((step, i) => (
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
