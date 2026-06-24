"use client";
import React from "react";
import CargonHomeContactForm from "./cargon-home-contact-form";
import { getCountryMapMarkers, useSiteContent } from "@/context/site-content-provider";

const CargonContactInfo = () => {
  const { homePage, offices, settings } = useSiteContent();
  const siteLogo = settings.siteLogo || "/assets/img/logo/logo.png";
  const countryMarkers = getCountryMapMarkers(offices);

  return (
    <section className="ca-contact-area-2 ca-contact-area-2--map p-relative z-index-1 fix pt-100 pb-70">
      <div className="container">
        <div className="row ca-contact-layout-row">
          <div className="col-lg-4 col-xl-4 mb-30 ca-contact-form-col">
            <div
              className="ca-contact-from ca-contact-from-2 off-wh"
              data-aos="fade-right"
            >
              <div className="ca-contact-content-2">
                <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block mb-16">
                  {homePage.contactSubtitle}
                </h5>
                <h4 className="ca-contact-title-2 theme-black-2 fnw-600">
                  {homePage.contactTitle}
                </h4>
                <p className="pt-16 pb-24">{homePage.contactDescription}</p>
              </div>
              <CargonHomeContactForm />
            </div>
          </div>

          <div className="col-lg-8 col-xl-8 mb-30 d-none d-lg-block ca-contact-map-col">
            <div
              className="ca-location-area2 p-relative z-index-1"
              data-aos="fade-left"
            >
              {countryMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className="ca-location-item ca-location-item--office p-absolute"
                  style={{
                    top: marker.mapPosition.top,
                    left: marker.mapPosition.left,
                  }}
                >
                  <img
                    className="ca-location-logo"
                    src={siteLogo}
                    alt={`ASM — ${marker.country}`}
                  />
                  <div className="ca-top-lc">
                    <img src="/cargon/img/icon/ca-lc-2.1.svg" alt="" />
                  </div>
                  <div className="ca-lc-box ca-lc-box--country">
                    <p>
                      <strong>
                        {marker.flag} {marker.country}
                      </strong>
                    </p>
                    <ul className="ca-lc-box__cities">
                      {marker.cities.map((city) => (
                        <li key={city}>{city}</li>
                      ))}
                    </ul>
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

export default CargonContactInfo;
