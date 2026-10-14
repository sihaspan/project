import Logo from "./Logo";
import { SITE_NAME } from "@/lib/site";

/** Logo mark + brand name. */
export default function BrandLockup({ size = 44 }) {
  return (
    <>
      <Logo size={size} />
      <span className="brand-name">{SITE_NAME}</span>
    </>
  );
}
