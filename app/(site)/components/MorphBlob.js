/**
 * Soft, slowly morphing background shape that drifts with the scroll.
 * Position/size it with the `className` (see .blob-* classes in globals.css).
 */
export default function MorphBlob({ className = "", speed = 0.15, variant = "a" }) {
  return (
    <div className={`blob-layer ${className}`} data-parallax={speed} aria-hidden="true">
      <div className={`morph-blob morph-blob--${variant}`} />
    </div>
  );
}
