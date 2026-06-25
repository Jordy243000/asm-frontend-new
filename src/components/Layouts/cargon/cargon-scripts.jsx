"use client";
import Script from "next/script";
import React from "react";

const DEPENDENCY_SCRIPTS = [
  "/cargon/js/bootstrap.bundle.min.js",
  "/cargon/js/jquery.magnific-popup.min.js",
  "/cargon/js/waypoints.min.js",
  "/cargon/js/jquery.counterup.min.js",
  "/cargon/js/slick.min.js",
  "/cargon/js/jquery.nice-select.js",
  "/cargon/js/aos.js",
];

const CargonScripts = () => {
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.jQuery?.fn) {
      setStage(DEPENDENCY_SCRIPTS.length + 1);
    }
  }, []);

  return (
    <>
      <Script
        src="/cargon/js/jquery-3.7.1.min.js"
        strategy="afterInteractive"
        onLoad={() => setStage(1)}
      />
      {stage >= 1 && stage <= DEPENDENCY_SCRIPTS.length ? (
        <Script
          key={DEPENDENCY_SCRIPTS[stage - 1]}
          src={DEPENDENCY_SCRIPTS[stage - 1]}
          strategy="afterInteractive"
          onLoad={() => setStage((current) => current + 1)}
        />
      ) : null}
      {stage > DEPENDENCY_SCRIPTS.length ? (
        <Script
          src="/cargon/js/main.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("cargon:plugins-ready"));
            }
          }}
        />
      ) : null}
    </>
  );
};

export default CargonScripts;
