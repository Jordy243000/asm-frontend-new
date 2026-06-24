import Image from "next/image";
import React from "react";
import Logo from "@/assets/img/logo/logo.png";

const Preloader = () => {
  return (
    <>
      <div id="preloader">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div className="loading-icon text-center d-flex flex-column align-items-center justify-content-center">
              <div className="preloader-logo-wrap preloader-logo-wrap--compact">
                <Image
                  src={Logo}
                  alt="African Shipping Management (ASM) RDC"
                  className="preloader-logo preloader-logo-swing"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Preloader;
