"use client";
import React from "react";
import { useAboutContent } from "@/hooks/use-about-content";

const AboutUsDetail = () => {
  const aboutContent = useAboutContent();

  return (
    <section className="about__detail-area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="about__detail-content">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsDetail;
