import Link from "next/link";
import Icon from "../components/Icons";
import Reveal from "../components/Reveal";
import { getServices } from "@/lib/content";
import { slugify } from "@/lib/site";

export async function generateMetadata() {
  const { seo } = await getServices();
  return { title: seo.title, description: seo.description };
}

export default async function ServicesPage() {
  const { head, items, serve, cta } = await getServices();

  return (
    <>
      <section style={{ paddingBottom: "24px" }}>
        <div className="wrap">
          <Reveal as="div" className="page-head">
            <div className="kicker">{head.kicker}</div>
            <h1>{head.heading}</h1>
            <p className="page-lede">{head.lede}</p>
          </Reveal>

          <div className="service-list">
            {items.map((s, i) => (
              <Reveal key={s.title} as="div" className="service-row" id={slugify(s.title)} delay={i * 70}>
                <div className="service-mark">
                  <Icon name={s.icon} size={48} />
                </div>
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

      <section className="serve-section" id="who-we-serve">
        <div className="wrap">
          <Reveal as="div" className="page-head">
            <div className="kicker">{serve.head.kicker}</div>
            <h2>{serve.head.heading}</h2>
            <p className="page-lede">{serve.head.lede}</p>
          </Reveal>

          <div className="serve-grid">
            {serve.items.map((cell, i) => (
              <Reveal key={cell.title} as="div" className="serve-cell" delay={i * 60}>
                <h3>{cell.title}</h3>
                <p>{cell.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <Reveal as="div" className="cta-inner">
            <h2>{cta.heading}</h2>
            <p>{cta.text}</p>
            <Link href="/contact" className="btn-primary">
              {cta.button}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
