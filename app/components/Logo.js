export default function Logo({ size = 34 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }}>
      <img
        src="/logo-mark-maroon.png"
        alt="Siha Span"
        className="brand-mark-img brand-mark-img--light"
        width={size}
        height={size}
      />
      <img
        src="/logo-mark-cream.png"
        alt=""
        aria-hidden="true"
        className="brand-mark-img brand-mark-img--dark"
        width={size}
        height={size}
      />
    </span>
  );
}
