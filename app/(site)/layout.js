import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageFade from "./components/PageFade";

const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SihaSpan — Stronger Health Systems for Better Care",
    template: "%s",
  },
  description:
    "SihaSpan is a health systems advisory helping providers, insurers, government agencies, NGOs, foundations and health-technology companies design and deliver services that hold up under real-world pressure.",
  openGraph: {
    title: "SihaSpan — Stronger Health Systems for Better Care",
    description:
      "Specialised advisory services and sector expertise across the healthcare ecosystem — strategy & growth, facility development, clinical governance and quality, and specialised assignments.",
    url: SITE_URL,
    siteName: "SihaSpan",
    images: ["/logo-full-maroon.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SihaSpan — Stronger Health Systems for Better Care",
    description: "Health systems advisory for providers, insurers, government, NGOs, foundations and health-tech.",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SihaSpan",
  alternateName: "SihaSpan",
  description:
    "Specialised advisory services and sector expertise across the healthcare ecosystem, including healthcare providers and hospital systems, insurers and health financing institutions, government agencies and parastatals, non-governmental and development organizations, foundations, and health technology companies.",
  slogan: "Stronger Health Systems for Better Care",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark-maroon.png`,
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Public+Sans:wght@400;500;600;700&display=swap"
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
