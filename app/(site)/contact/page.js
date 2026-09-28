import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import { getContact, getSettings, getSocialLinks } from "@/lib/content";

export async function generateMetadata() {
  const { seo } = await getContact();
  return { title: seo.title, description: seo.description };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContact(), getSettings()]);
  const { head, infoHeading } = page;
  const { phoneDisplay, phoneTel, whatsapp, location } = settings.contact;
  const socials = getSocialLinks(settings);
  const waLink = `https://wa.me/${whatsapp}`;

  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head" style={{ marginBottom: "44px" }}>
          <div className="kicker">{head.kicker}</div>
          <h1>{head.heading}</h1>
          <p className="page-lede">{head.lede}</p>
        </Reveal>

        <div className="contact-wrap">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100} className="contact-info">
            <h3>{infoHeading}</h3>
            <div className="info-row">
              <div className="k">Phone</div>
              <div className="v">
                <a href={`tel:${phoneTel}`}>{phoneDisplay}</a>
              </div>
            </div>
            <div className="info-row">
              <div className="k">WhatsApp</div>
              <div className="v">
                <a href={waLink} target="_blank" rel="noopener">
                  Message us on WhatsApp
                </a>
              </div>
            </div>
            <div className="info-row">
              <div className="k">Based in</div>
              <div className="v">{location}</div>
            </div>
            <div className="social-row">
              <a className="social-chip" href={waLink} target="_blank" rel="noopener">
                WhatsApp
              </a>
              {socials.map((s) => (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
