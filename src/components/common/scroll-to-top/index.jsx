import React, { useEffect } from "react";
import BackToTop from "@lib/back-to-top";

function BackToTopCom({ className }) {
  useEffect(() => {
    BackToTop(".scroll-top");
  }, []);
  return (
    <div className="progress-wrap active-progress scroll-top">
      <svg className="progress-circle svg-content" style={{ width: "100%", height: "100%" }} viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
}

export default BackToTopCom;
