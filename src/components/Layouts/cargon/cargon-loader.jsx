"use client";

import Image from "next/image";
import Logo from "@/assets/img/logo/logo.png";

const CargonLoader = ({ phase = "visible" }) => {
  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      id="preloader"
      className={`asm-preloader asm-preloader--${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement en cours"
    >
      <div id="ctn-preloader" className="ctn-preloader">
        <div className="animation-preloader">
          <div className="preloader-logo-wrap">
            <Image
              src={Logo}
              alt="African Shipping Management (ASM) RDC"
              className="preloader-logo preloader-logo-swing"
              priority
            />
          </div>
          <div className="txt-loading">
            {["A", "S", "M"].map((letter) => (
              <span
                key={letter}
                data-text-preloader={letter}
                className="letters-loading"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargonLoader;
