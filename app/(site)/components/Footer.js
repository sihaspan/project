import Link from "next/link";
import Logo from "./Logo";

import { getSettings, getSocialLinks } from "@/lib/content";

export default async function Footer() {
  const settings = await getSettings();
  const { phoneDisplay, phoneTel, whatsapp } = settings.contact;
  const socials = getSocialLinks(settings);

  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <Logo size={36} />
            SihaSpan
          </div>
          <p>{settings.footer.blurb}</p>
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
          <a href={`tel:${phoneTel}`}>{phoneDisplay}</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <div className="social-row">
            {socials.map((s) => (
              <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <div>© {new Date().getFullYear()} SihaSpan. All rights reserved.</div>
        <div>Site by Gilvon Software Solutions</div>
      </div>
    </footer>
  );
}
