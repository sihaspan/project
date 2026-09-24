export default function Home() {
  return (
    <main className="stage">
      <header className="brand">
        <span className="dot" />
        Siha Span
      </header>

      <div className="copy">
        <h1 className="title">
          Under
          <br />
          development.
        </h1>
        <a
          className="credit"
          href="https://gilvon.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>By Gilvon Software Solutions</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M4 12L12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>

      <svg className="arc" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
        <path className="arc-faint" d="M-20 360 Q600 -140 1220 360" pathLength={1} />
        <path className="arc-line" d="M-20 360 Q600 -140 1220 360" pathLength={1} />
      </svg>
    </main>
  );
}
