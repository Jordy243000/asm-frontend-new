"use client";
import Image from "next/image";
import React from "react";
import about_img from "../../../public/assets/img/about/about.png";
import { useAboutContent } from "@/hooks/use-about-content";

const AboutUsArea = () => {
  const aboutContent = useAboutContent();

  return (
    <section
      className="about__area-2 pt-120 pb-60 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
    >
      <div className="container">
        <div
          className="row align-items-center wow fadeInU"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="col-lg-6 col-xl-6">
            <div
              className="about__content-2 mb-60 wow fadeInRight"
              data-wow-duration="1.5s"
              data-wow-delay=".5s"
            >
              <div className="section__title mb-50">
                <span className="sub-title">{aboutContent.subtitle}</span>
                <h2 className="title">{aboutContent.title}</h2>
              </div>
              <div className="about__content-tab-2 mt-40">
                <ul className="nav mb-5" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active clip-lg-btn"
                      id="approch-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#approch"
                      type="button"
                      role="tab"
                      aria-controls="approch"
                      aria-selected="true"
                    >
                      Notre Vision
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link clip-lg-btn"
                      id="goal-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#goal"
                      type="button"
                      role="tab"
                      aria-controls="goal"
                      aria-selected="false"
                    >
                      Notre Mission
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link clip-lg-btn"
                      id="mision-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#mision"
                      type="button"
                      role="tab"
                      aria-controls="mision"
                      aria-selected="false"
                    >
                      Nos Valeurs
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="approch"
                    role="tabpanel"
                    aria-labelledby="approch-tab"
                  >
                    <p>{aboutContent.vision}</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="goal"
                    role="tabpanel"
                    aria-labelledby="goal-tab"
                  >
                    <p>{aboutContent.mission}</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="mision"
                    role="tabpanel"
                    aria-labelledby="mision-tab"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: aboutContent.values }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="about__3-img-wrapper p-relative mb-60">
              <div className="about__3-main w-img">
                <Image
                  src={about_img}
                  style={{ width: "100%", height: "auto" }}
                  alt={"A propos de African Shipping Management (ASM) RDC"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsArea;
