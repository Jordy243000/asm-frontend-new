"use client";
import Link from "next/link";
import React from "react";
import { useSiteContent } from "@/context/site-content-provider";

const CargonFooterCta = () => {
  const { settings } = useSiteContent();

  return (
    <div className="ca-cta-area-2 p-relative z-index-1 fix">
      <div className="cta-shape-2 c-shape-1 p-absolute">
        <img src="/cargon/img/shape/cat-shape-2.1.png" alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="ca-cta-2 theme-black-bg-2 fix p-relative">
              <div className="row">
                <div className="col-lg-7 mb-30">
                  <div className="ca-cta-content">
                    <h2 className="ca-section-title cta-title-1 text-white fnw-700 pb-32 ca-text-cap">
                      {settings.footerCtaTitle}
                    </h2>
                    <div className="ca-btn-cta-2">
                      <Link href={settings.footerCtaButtonLink} className="ca-btn-primary-22">
                        {settings.footerCtaButtonText}{" "}
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 mb-30">
                  <div className="cta-shape-2 c-shape-2 p-absolute">
                    <img
                      src={settings.footerCtaImage}
                      alt="Transport multimodal — maritime, routier et aérien"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargonFooterCta;
