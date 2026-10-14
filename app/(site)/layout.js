import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageFade from "./components/PageFade";
import { SITE_NAME } from "@/lib/site";

const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Better systems. Healthier tomorrows.`,
    template: "%s",
  },
  description:
    `${SITE_NAME} is a healthcare advisory and consulting firm helping providers, insurers, government agencies, NGOs, foundations and health-technology companies design and deliver services that hold up under real-world pressure.`,
  openGraph: {
    title: `${SITE_NAME} — Better systems. Healthier tomorrows.`,
    description:
      "Specialised advisory services and sector expertise across the healthcare ecosystem — strategy & growth, facility development, clinical governance and quality, and specialised assignments.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/logo-full-teal.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Better systems. Healthier tomorrows.`,
    description: "Health systems advisory for providers, insurers, government, NGOs, foundations and health-tech.",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: SITE_NAME,
  description:
    "Specialised advisory services and sector expertise across the healthcare ecosystem, including healthcare providers and hospital systems, insurers and health financing institutions, government agencies and parastatals, non-governmental and development organizations, foundations, and health technology companies.",
  slogan: "Better systems. Healthier tomorrows.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark-teal.png`,
  areaServed: "Global",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Header />
        <PageFade>{children}</PageFade>
        <Footer />
      </body>
    </html>
  );
}
