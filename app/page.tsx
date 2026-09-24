export default function Home() {
  return (
    <main className="stage">
      <p className="brand">Siha Span Advisory</p>

      <div className="copy">
        <h1 className="title">Under development.</h1>
        <p className="credit">By Gilvon Software Solutions</p>
      </div>

      <svg className="arc" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
        <path className="arc-faint" d="M-20 360 Q600 -140 1220 360" pathLength={1} />
        <path className="arc-line" d="M-20 360 Q600 -140 1220 360" pathLength={1} />
      </svg>
    </main>
  );
}
