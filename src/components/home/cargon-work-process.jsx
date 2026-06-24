"use client";
import React from "react";
import { useSiteContent } from "@/context/site-content-provider";

const CargonWorkProcess = () => {
  const { homePage, workSteps } = useSiteContent();

  return (
    <section className="ca-about-2 off-wh pt-100 pb-70">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-30">
            <div className="ca-about-2-img p-relative z-index-1">
              <img
                data-aos="fade-right"
                src={homePage.workProcessImageMain}
                alt="Vue aérienne du port — ASM RDC"
              />
              <div
                className="ca-about-2-overlay p-absolute"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <img
                  src={homePage.workProcessImageOverlay}
                  alt="Équipe ASM en opérations portuaires"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-30">
            <div className="ca-about-content-2 ca-sec-content-2 mb-40" data-aos="fade-left">
              <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2">
                {homePage.workProcessSubtitle}
              </h5>
              <h2 className="ca-about-title theme-black-2 fnw-600 pt-16 ca-text-cap">
                {homePage.workProcessTitle}
              </h2>
            </div>
            <div className="row">
              {workSteps.map((item, index) => (
                <div key={item.id} className="col-md-6 mb-24">
                  <div
                    className="ca-choose-item p-relative"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <h4 className="ca-title fnw-600 theme-black-2 pb-16">
                      {index + 1}. {item.title}
                    </h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CargonWorkProcess;
