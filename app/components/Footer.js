import Link from "next/link";
import Logo from "./Logo";

const CLIENT_PHONE_DISPLAY = "0721 917 972";
const CLIENT_PHONE_TEL = "+254721917972";
const CLIENT_PHONE_WHATSAPP = "254721917972";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <Logo size={36} />
            Siha Span
          </div>
          <p>
            Stronger health systems for better care — advisory for providers, insurers,
            government agencies, NGOs, foundations and health-technology companies.
          </p>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Explore</div>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/who-we-serve">Who we serve</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Get in touch</div>
          <a href={`tel:${CLIENT_PHONE_TEL}`}>{CLIENT_PHONE_DISPLAY}</a>
          <a href={`https://wa.me/${CLIENT_PHONE_WHATSAPP}`} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <div className="social-row">
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

      <div className="wrap footer-bottom">
        <div>© {new Date().getFullYear()} Siha Span. All rights reserved.</div>
        <div>Site by Gilvon Software Solutions</div>
      </div>
    </footer>
  );
}
