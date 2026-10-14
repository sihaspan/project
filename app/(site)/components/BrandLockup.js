import Logo from "./Logo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/** Mark + name + tagline, as in the header of the design. */
export default function BrandLockup({ size = 56 }) {
  return (
    <>
      <Logo size={size} />
      <span className="brand-text">
        <span className="brand-name">{SITE_NAME}</span>
        <span className="brand-tagline">{SITE_TAGLINE}</span>
      </span>
    </>
  );
}
