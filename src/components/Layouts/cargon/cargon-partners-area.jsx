"use client";
import React from "react";
import axios from "axios";
import { getPartnerLogo, mergePartnerList } from "@/utils/partner-logos";

const MIN_LOGOS_FOR_LOOP = 8;

function buildMarqueeLogos(partners) {
  const logos = mergePartnerList(partners)
    .map((item) => {
      const resolved = getPartnerLogo(item);
      if (!resolved) return null;

      return {
        id: item.id,
        name: item?.attributes?.name,
        logo: resolved.logo,
        className: resolved.className,
      };
    })
    .filter(Boolean);

  if (!logos.length) return [];

  const uniqueLogos = logos.filter(
    (item, index, list) =>
      list.findIndex((entry) => entry.logo === item.logo) === index
  );

  const repeated = [];
  while (repeated.length < MIN_LOGOS_FOR_LOOP) {
    repeated.push(...uniqueLogos);
  }

  return [...repeated, ...repeated];
}

const CargonPartnersArea = () => {
  const [partnerData, setPartnerData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/partners?populate=*&sort=sortOrder:asc`
      )
      .then((res) => setPartnerData(res?.data?.data || []))
      .catch(console.error);
  }, []);

  const marqueeLogos = buildMarqueeLogos(partnerData);

  if (!marqueeLogos.length) {
    return null;
  }

  return (
    <section className="ca-partners-section pt-80 pb-80">
      <div className="container">
        <div className="ca-partners-heading text-center">
          <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
            Nos partenaires
          </h5>
          <h2 className="ca-section-title theme-black-2 fnw-600 pt-16 pb-0">
            Ils nous font confiance
          </h2>
        </div>
      </div>

      <div className="ca-partners-marquee-wrap">
        <div className="ca-partners-marquee" aria-label="Logos des partenaires">
          <div className="ca-partners-marquee-track">
            {marqueeLogos.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`ca-partners-marquee-item ${item.className || ""}`.trim()}
              >
                <img src={item.logo} alt={item.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CargonPartnersArea;
