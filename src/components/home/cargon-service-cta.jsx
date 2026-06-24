"use client";
import Link from "next/link";
import React from "react";
import { useSiteContent } from "@/context/site-content-provider";

const CargonServiceCta = () => {
  const { homePage } = useSiteContent();

  return (
    <section className="ca-products-cta theme-black-bg-2 pt-100 pb-100 p-relative z-index-1 fix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="ca-section-title text-white fnw-700 pb-32 ca-text-cap">
              {homePage.serviceCtaTitle}
            </h2>
            {homePage.serviceCtaText ? (
              <p className="text-white pb-24">{homePage.serviceCtaText}</p>
            ) : null}
            <Link href={homePage.serviceCtaButtonLink} className="ca-btn-primary-22">
              {homePage.serviceCtaButtonText}{" "}
              <span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CargonServiceCta;
