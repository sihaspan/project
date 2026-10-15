import Image from "next/image";
import Link from "next/link";
import Icon from "./components/Icons";
import Reveal from "./components/Reveal";
import { getHome, getServices } from "@/lib/content";
import { slugify } from "@/lib/site";

export async function generateMetadata() {
  const { seo } = await getHome();
  return { title: seo.title, description: seo.description };
}

/** CMS text fields use new lines for deliberate line breaks. */
const lines = (text = "") => text.split("\n").filter(Boolean);

export default async function Home() {
  const [home, services] = await Promise.all([getHome(), getServices()]);
  const { hero, strip, why, whatWeDo, cta } = home;

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/hero.jpg"
            alt="A healthcare professional in a white coat looking out over a city and hills"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>

        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>
              {lines(hero.heading).map((line) => (
                <span key={line} className="line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="lede">{hero.lede}</p>
            {hero.primaryButton || hero.secondaryButton ? (
              <div className="hero-ctas">
                {hero.primaryButton ? (
                  <Link href="/contact" className="btn-primary">
                    {hero.primaryButton}
                  </Link>
                ) : null}
                {hero.secondaryButton ? (
                  <Link href="/about" className="btn-secondary">
                    {hero.secondaryButton}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {hero.tagline ? (
          <p className="hero-tagline">
            {lines(hero.tagline).map((line) => (
              <span key={line} className="line">
                {line}
              </span>
            ))}
            <span className="tagline-rule" aria-hidden="true" />
          </p>
        ) : null}
      </section>

      <section className="stats" aria-label="At a glance">
        <div className="wrap stats-grid">
          {strip.map((item) => (
            <div className="stat-item" key={item.name}>
              <div className="stat-icon">
                <Icon name={item.icon} size={56} />
              </div>
              <div className="stat-body">
                {item.number ? <p className="stat-num">{item.number}</p> : null}
                <p className="stat-title">{item.name}</p>
                {item.detail ? <p className="stat-detail">{item.detail}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="wrap services-layout">
          <div className="services-intro">
            <p className="eyebrow">{whatWeDo.head.kicker}</p>
            <h2>
              {lines(whatWeDo.head.heading).map((line) => (
                <span key={line} className="line">
                  {line}
                </span>
              ))}
            </h2>
            <span className="rule" aria-hidden="true" />
            <p className="intro-desc">{whatWeDo.head.description}</p>
          </div>

          <ul className="service-cols">
            {services.items.map((s) => (
              <li className="svc" key={s.title}>
                <Icon name={s.icon} size={60} className="svc-icon" />
                <h3>{s.title}</h3>
                <p>{s.capabilities.join(" · ")}</p>
                <Link
                  href={`/services#${slugify(s.title)}`}
                  className="svc-link"
                  aria-label={`Read more about ${s.title}`}
                >
                  <Icon name="arrow" size={24} strokeWidth={1.6} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap services-more">
          <Link href="/services" className="btn-secondary">
            {whatWeDo.buttonText}
          </Link>
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <div>
              <p className="eyebrow">{why.head.kicker}</p>
              <h2>{why.head.heading}</h2>
            </div>
            <div className="desc">{why.head.description}</div>
          </Reveal>
          <div className="highlight-grid">
            {why.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="highlight-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
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
