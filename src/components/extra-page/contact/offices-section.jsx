"use client";

import React from "react";
import Link from "next/link";
import { useSiteContent } from "@/context/site-content-provider";

const OfficeCard = ({ office, index }) => (
  <div className="ca-office-card">
    <span className="ca-office-card__index">
      {String(index + 1).padStart(2, "0")}
    </span>
    <h4 className="ca-office-card__city">{office.city}</h4>
    <div className="ca-office-card__row">
      <span className="ca-office-card__icon" aria-hidden="true">
        <i className="fa-solid fa-location-dot" />
      </span>
      <p>{office.address}</p>
    </div>
    {office.email && (
      <div className="ca-office-card__row">
        <span className="ca-office-card__icon" aria-hidden="true">
          <i className="fa-solid fa-envelope" />
        </span>
        <Link href={`mailto:${office.email}`}>{office.email}</Link>
      </div>
    )}
  </div>
);

const CountryBlock = ({ group }) => (
  <div className="ca-office-country" data-aos="fade-up">
    <div className="ca-office-country__header">
      <span className="ca-office-country__flag">{group.flag}</span>
      <div>
        <span className="ca-office-country__label">Pays</span>
        <h3 className="ca-office-country__name">{group.country}</h3>
      </div>
      <span className="ca-office-country__count">
        {group.offices.length} bureau{group.offices.length > 1 ? "x" : ""}
      </span>
    </div>
    <div className="row g-4">
      {group.offices.map((office, index) => (
        <div key={office.id} className="col-xl-4 col-lg-6 col-md-6">
          <OfficeCard office={office} index={index} />
        </div>
      ))}
    </div>
  </div>
);

const OfficesSection = () => {
  const { offices } = useSiteContent();

  return (
    <section className="ca-offices-section pt-80 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-xl-8 col-lg-10 text-center" data-aos="fade-up">
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block mb-16">
              Présence internationale
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-700 ca-text-cap">
              Nos différents bureaux
            </h2>
            <p className="ca-offices-section__intro pt-16">
              ASM est présent à travers l&apos;Afrique et au-delà. Retrouvez nos
              équipes locales classées par pays pour un accompagnement de
              proximité.
            </p>
          </div>
        </div>

        <div className="ca-offices-section__list">
          {offices.map((group) => (
            <CountryBlock key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficesSection;
