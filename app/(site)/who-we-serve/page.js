import Reveal from "../components/Reveal";
import { getWhoWeServe } from "@/lib/content";

export async function generateMetadata() {
  const { seo } = await getWhoWeServe();
  return { title: seo.title, description: seo.description };
}

export default async function WhoWeServePage() {
  const { head, items } = await getWhoWeServe();

  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head">
          <div className="kicker">{head.kicker}</div>
          <h1>{head.heading}</h1>
          <p className="page-lede">{head.lede}</p>
        </Reveal>

        <div className="serve-grid">
          {items.map((cell, i) => (
            <Reveal key={cell.title} as="div" className="serve-cell" delay={i * 60}>
              <h3>{cell.title}</h3>
              <p>{cell.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
