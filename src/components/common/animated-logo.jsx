import Image from "next/image";
import Logo from "@/assets/img/logo/logo.png";

/**
 * Animation du logo header (toutes les 5 secondes).
 * Options : "half-spin" | "logo-pulse" | "logo-float" | "logo-spin"
 * half-spin = même effet que le chargement de page (défaut)
 * Intervalle modifiable dans _header.scss ($header-logo-interval)
 */
export const HEADER_LOGO_ANIMATION = "half-spin";
export const HEADER_LOGO_INTERVAL_SECONDS = 5;

const AnimatedLogo = ({
  animation = HEADER_LOGO_ANIMATION,
  width = 100,
  alt = "Logo African Shipping Management (ASM) RDC",
  className = "",
}) => {
  return (
    <Image
      src={Logo}
      alt={alt}
      className={`header-logo-animated ${animation} ${className}`.trim()}
      style={{ width: `${width}px`, height: "auto" }}
    />
  );
};

export default AnimatedLogo;
