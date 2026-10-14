import Link from "next/link";
import BrandLockup from "./BrandLockup";
import { SITE_NAME } from "@/lib/site";

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
            <BrandLockup size={40} />
          </div>
          <p>{settings.footer.blurb}</p>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Explore</div>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/insights">Insights</Link>
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
        <div>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</div>
        <div>Site by Gilvon Software Solutions</div>
      </div>
    </footer>
  );
}
