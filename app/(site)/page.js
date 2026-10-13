import Link from "next/link";
import EcosystemDiagram from "./components/EcosystemDiagram";
import Reveal from "./components/Reveal";
import HeroVideo from "./components/HeroVideo";
import HeroWave from "./components/HeroWave";
import MorphBlob from "./components/MorphBlob";
import ParallaxController from "./components/ParallaxController";
import { getHome, getServices } from "@/lib/content";

export async function generateMetadata() {
  const { seo } = await getHome();
  return { title: seo.title, description: seo.description };
}

export default async function Home() {
  const [home, services] = await Promise.all([getHome(), getServices()]);
  const { hero, strip, why, whatWeDo, cta } = home;

  return (
    <>
      <ParallaxController />
      <section className="hero hero--video">
        <HeroVideo />
        <div className="wrap hero-grid" data-parallax="0.12" data-parallax-fade>
          <Reveal>
            <div className="eyebrow-plain">{hero.eyebrow}</div>
            <h1>{hero.heading}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn-primary">
                {hero.primaryButton}
              </Link>
              <Link href="/services" className="btn-secondary">
                {hero.secondaryButton}
              </Link>
            </div>
          </Reveal>
          <div className="hero-panel" data-parallax="-0.06" data-parallax-max="60">
            <EcosystemDiagram />
          </div>
        </div>
        <HeroWave />
      </section>

      <div className="strip">
        <div className="wrap">
          {strip.map((item) => (
            <span key={item.name}>
              <strong>{item.name}</strong> · {item.detail}
            </span>
          ))}
        </div>
      </div>

      <section className="section-blobs">
        <MorphBlob className="blob-why-1" speed={0.18} variant="a" />
        <MorphBlob className="blob-why-2" speed={-0.1} variant="b" />
        <div className="wrap">
          <Reveal as="div" variant="left" className="section-head">
            <div>
              <div className="kicker">{why.head.kicker}</div>
              <h2>{why.head.heading}</h2>
            </div>
            <div className="desc">{why.head.description}</div>
          </Reveal>
          <div className="highlight-grid">
            {why.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} variant="scale" className="highlight-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blobs" style={{ background: "var(--paper-alt)" }}>
        <MorphBlob className="blob-what-1" speed={0.14} variant="b" />
        <div className="wrap">
          <Reveal as="div" variant="left" className="section-head">
            <div>
              <div className="kicker">{whatWeDo.head.kicker}</div>
              <h2>{whatWeDo.head.heading}</h2>
            </div>
            <div className="desc">{whatWeDo.head.description}</div>
          </Reveal>
          <div className="preview-grid">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} as="div" variant="blur" className="preview-card">
                <div className="service-mark">{s.mark}</div>
                <h3>{s.title}</h3>
                <p className="preview-tag">{s.capabilities.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="preview-cta">
            <Link href="/services" className="btn-secondary">
              {whatWeDo.buttonText}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <MorphBlob className="blob-cta-1" speed={0.2} variant="a" />
        <MorphBlob className="blob-cta-2" speed={-0.12} variant="b" />
        <div className="wrap">
          <Reveal as="div" variant="scale" className="cta-inner">
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
