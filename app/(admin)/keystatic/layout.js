// Standalone root layout for the CMS so the public site's CSS/header/footer don't leak into it.
export const metadata = { title: "SihaSpan — Content editor", robots: { index: false, follow: false } };

export default function KeystaticLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
