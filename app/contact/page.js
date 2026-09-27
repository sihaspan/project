import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Contact — Siha Span Advisory",
  description:
    "Tell Siha Span Advisory about your healthcare project — facility planning, governance frameworks or strategy — and we'll help you scope the right engagement.",
};

const CLIENT_PHONE_DISPLAY = "0721 917 972";
const CLIENT_PHONE_TEL = "+254721917972";
const CLIENT_PHONE_WHATSAPP = "254721917972";

export default function ContactPage() {
  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head" style={{ marginBottom: "44px" }}>
          <div className="kicker">Get in touch</div>
          <h1>Tell us about your project.</h1>
          <p className="page-lede">
            Whether it&rsquo;s a facility to plan, a governance framework to build, or a strategy
            to pressure-test — we&rsquo;d like to hear about it.
          </p>
        </Reveal>

        <div className="contact-wrap">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100} className="contact-info">
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
                <a href={`https://wa.me/${CLIENT_PHONE_WHATSAPP}`} target="_blank" rel="noopener">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
