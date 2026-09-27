import Reveal from "../components/Reveal";

const SERVED = [
  {
    title: "Healthcare providers",
    body: "Hospitals, clinics and networks planning growth or resolving operational strain.",
  },
  {
    title: "Insurers",
    body: "Health financing organisations shaping products, claims and provider networks.",
  },
  {
    title: "Government agencies",
    body: "Ministries and regulators developing policy, standards and oversight capacity.",
  },
  {
    title: "NGOs",
    body: "Implementing partners delivering programmes on the ground.",
  },
  {
    title: "Foundations",
    body: "Funders looking for rigorous evaluation and evidence of impact.",
  },
  {
    title: "Health-tech companies",
    body: "Digital health innovators navigating clinical and regulatory realities.",
  },
];

export default function WhoWeServePage() {
  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head">
          <div className="kicker">Who we serve</div>
          <h1>Every part of the health ecosystem.</h1>
          <p className="page-lede">
            Different mandates, one shared need: services that actually work for the people who
            depend on them.
          </p>
        </Reveal>

        <div className="serve-grid">
          {SERVED.map((cell, i) => (
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
