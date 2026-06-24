"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAboutContent } from "@/hooks/use-about-content";
import { useCargonInit } from "@/hooks/use-cargon-init";
import { AboutParagraphText } from "@/utils/about-paragraph-format";

const VALUE_META = [
  { key: "Audace", icon: "fa-solid fa-rocket" },
  { key: "Respect", icon: "fa-solid fa-handshake" },
  { key: "Intégrité", icon: "fa-solid fa-shield-halved" },
  { key: "Loyauté", icon: "fa-solid fa-gem" },
];

const PRESENCE_TEXT =
  "Présente dans plusieurs villes de la RDC, ASM s'appuie sur des équipes engagées et proches des réalités locales. Cette implantation nationale nous permet de mieux comprendre les besoins du terrain, d'accompagner efficacement les institutions publiques et les opérateurs privés, et de proposer des solutions adaptées aux enjeux concrets du secteur.";

const STORY_MEDIA = [
  {
    image: "/assets/img/breadcrumb/aboutBanner.png",
    icon: "fa-solid fa-building-columns",
    label: "Qui sommes-nous",
  },
  {
    image: "/cargon/img/about/about-2.1.png",
    icon: "fa-solid fa-laptop-code",
    label: "Gouvernance numérique",
  },
  {
    image: "/assets/img/hero/hero-aerial-ship.png",
    icon: "fa-solid fa-cubes",
    label: "SYGREM",
  },
  {
    image: "/assets/img/breadcrumb/careerBanner.png",
    icon: "fa-solid fa-network-wired",
    label: "Services & impact",
  },
];

function parseValues(html = "") {
  const items = [];
  const regex = /<strong>([^<]+):<\/strong>\s*([^<]*)/gi;
  let match = regex.exec(html);
  while (match) {
    items.push({ title: match[1].trim(), text: match[2].trim() });
    match = regex.exec(html);
  }
  return items;
}

function getValueIcon(title = "") {
  const found = VALUE_META.find((item) =>
    title.toLowerCase().includes(item.key.toLowerCase())
  );
  return found?.icon || "fa-solid fa-star";
}

const CargonAboutPage = () => {
  const aboutContent = useAboutContent();
  const [bigNumbers, setBigNumbers] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const [activePillar, setActivePillar] = React.useState("vision");

  const valueItems = parseValues(aboutContent.values);
  const storyParagraphs = aboutContent.paragraphs?.slice(0, 4) || [];
  const closingParagraph =
    aboutContent.paragraphs?.[aboutContent.paragraphs.length - 1] || "";

  const pillars = {
    vision: {
      title: "Notre vision",
      text: aboutContent.vision,
      icon: "fa-regular fa-eye",
    },
    mission: {
      title: "Notre mission",
      text: aboutContent.mission,
      icon: "fa-solid fa-bullseye",
    },
    values: {
      title: "Nos valeurs",
      text: valueItems.map((v) => v.title).join(" · ") || "Audace · Respect · Intégrité · Loyauté",
      icon: "fa-solid fa-heart",
    },
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bignumbers?populate=*`)
      .then((res) => setBigNumbers(res?.data?.data || []))
      .catch(console.error)
      .finally(() => setReady(true));
  }, []);

  useCargonInit([ready, "base"]);

  return (
    <>
      {/* Intro */}
      <section className="ca-about-page-intro pt-70 pb-80">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="ca-about-page-intro__content" data-aos="fade-right">
                <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2">
                  {aboutContent.subtitle}
                </h5>
                <h1 className="ca-about-page-title theme-black-2 fnw-700 pt-16">
                  {aboutContent.title}
                </h1>
                <p className="ca-about-page-lead pt-20">
                  {aboutContent.paragraphs?.[0]}
                </p>
                <div className="ca-about-page-intro__actions pt-28">
                  <Link href="/contact" className="ca-btn-primary-22">
                    Nous contacter{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                  <Link href="/equipe" className="ca-about-page-link">
                    Découvrir notre équipe
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="ca-about-2-img p-relative z-index-1" data-aos="fade-left">
                <img src="/cargon/img/about/about-2.1.png" alt="ASM RDC — opérations portuaires" />
                <div className="ca-about-2-overlay p-absolute" data-aos="fade-left" data-aos-delay="150">
                  <img
                    src="/cargon/img/about/about-2.2.png"
                    alt="Équipe ASM en opérations portuaires"
                  />
                </div>
                <div className="ca-about-page-badge" data-aos="zoom-in" data-aos-delay="300">
                  <i className="fa-solid fa-award" />
                  <div>
                    <strong>Partenariat public-privé</strong>
                    <span>Ministère des Transports & PADS Corporation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      {bigNumbers.length > 0 ? (
        <section className="ca-about-page-stats">
          <div className="container">
            <div className="row g-4">
              {bigNumbers.map((item, index) => (
                <div
                  className="col-6 col-lg-3"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="ca-about-page-stat">
                    <div className="ca-about-page-stat__icon">
                      <Icon icon={item.attributes?.icon} width="28" height="28" />
                    </div>
                    <h3 className="ca-about-page-stat__number">
                      <span className="counter">{item.attributes?.number}</span>+
                    </h3>
                    <p className="mb-0">{item.attributes?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Vision · Mission · Valeurs */}
      <section className="ca-about-page-pillars pt-90 pb-100">
        <div className="container">
          <div className="ca-about-page-section-head ca-about-page-section-head--pillars text-center" data-aos="fade-up">
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
              Notre ADN
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-600 pt-16 ca-about-page-pillars__title">
              Ce qui nous guide au quotidien
            </h2>
          </div>

          <div className="row g-4 ca-about-page-pillar-tabs">
            {Object.entries(pillars).map(([key, pillar], index) => (
              <div className="col-md-4" key={key} data-aos="fade-up" data-aos-delay={index * 100}>
                <button
                  type="button"
                  className={`ca-about-page-pillar-tab${activePillar === key ? " is-active" : ""}`}
                  onClick={() => setActivePillar(key)}
                >
                  <i className={pillar.icon} />
                  {pillar.title}
                </button>
              </div>
            ))}
          </div>

          <div className="ca-about-page-pillar-panel" data-aos="fade-up" data-aos-delay="120">
            <div className="ca-about-page-pillar-panel__glow" />
            <div className="row align-items-center g-4">
              <div className="col-lg-4">
                <div className="ca-about-page-pillar-panel__icon">
                  <i className={pillars[activePillar].icon} />
                </div>
                <h3 className="fnw-700 theme-black-2 mb-0">
                  {pillars[activePillar].title}
                </h3>
              </div>
              <div className="col-lg-8">
                {activePillar === "values" && valueItems.length > 0 ? (
                  <div className="ca-about-page-pillar-panel__values">
                    {valueItems.map((value) => (
                      <p key={value.title} className="ca-about-page-pillar-panel__value-item">
                        <strong>{value.title}</strong>
                        <span>{value.text}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="ca-about-page-pillar-panel__text mb-0">
                    {pillars[activePillar].text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs en cartes */}
      {valueItems.length > 0 ? (
        <section className="ca-about-page-values off-wh">
          <div className="container">
            <div
              className="ca-about-page-section-head ca-about-page-section-head--values text-center"
              data-aos="fade-up"
            >
              <h2 className="ca-section-title theme-black-2 fnw-600 ca-about-page-values__title">
                Nos valeurs fondamentales
              </h2>
            </div>
            <div className="row ca-about-page-values__grid">
              {valueItems.map((value, index) => (
                <div
                  className="col-md-6 col-xl-3"
                  key={value.title}
                  data-aos="flip-left"
                  data-aos-delay={index * 90}
                >
                  <article className="ca-about-page-value-card h-100">
                    <div className="ca-about-page-value-card__icon">
                      <i className={getValueIcon(value.title)} />
                    </div>
                    <h4 className="fnw-700 theme-black-2">{value.title}</h4>
                    <p className="mb-0">{value.text}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Histoire — disposition alternée */}
      <section className="ca-about-page-story pt-90 pb-40">
        <div className="container">
          <div className="ca-about-page-section-head text-center mb-60" data-aos="fade-up">
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
              Notre histoire
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-600 pt-16">
              La transformation digitale du transport maritime
            </h2>
          </div>

          {storyParagraphs.map((paragraph, index) => {
            const media = STORY_MEDIA[index] || STORY_MEDIA[0];
            const reversed = index % 2 === 1;

            return (
              <div
                className={`row align-items-center g-4 ca-about-page-story-row${reversed ? " flex-lg-row-reverse" : ""}`}
                key={index}
                data-aos={reversed ? "fade-left" : "fade-right"}
              >
                <div className="col-lg-6">
                  <div className="ca-about-page-story-media">
                    <img src={media.image} alt={media.label} loading="lazy" />
                    <span className="ca-about-page-story-media__tag">
                      <i className={media.icon} /> {media.label}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ca-about-page-story-content">
                    <span className="ca-about-page-story-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <AboutParagraphText text={paragraph} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bloc SYGREM */}
      <section className="ca-about-page-sygrem pt-70 pb-70" data-aos="fade-up">
        <div className="container">
          <div className="ca-about-page-sygrem__inner">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <h5 className="ca-about-page-sygrem__label">Plateforme phare</h5>
                <h2 className="ca-about-page-sygrem__title">SYGREM & SYGREM 2</h2>
                <p className="ca-about-page-sygrem__text">
                  {aboutContent.paragraphs?.[2]}
                </p>
                <AboutParagraphText
                  text={aboutContent.paragraphs?.[3]}
                  className="ca-about-page-sygrem__text mb-0"
                />
              </div>
              <div className="col-lg-5">
                <div className="ca-about-page-sygrem__cards">
                  {["FERI", "ADC", "ADR", "FERE", "Commission d'intervention"].map(
                    (item, i) => (
                      <div
                        className="ca-about-page-sygrem__chip"
                        key={item}
                        data-aos="zoom-in"
                        data-aos-delay={i * 60}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Présence nationale */}
      <section className="ca-about-page-cities pt-90 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
                Implantation
              </h5>
              <h2 className="ca-section-title theme-black-2 fnw-600 pt-16 ca-about-page-cities__title">
                Présents dans toute la RDC
              </h2>
              <p className="ca-about-page-cities__text pt-20 mb-0">
                {PRESENCE_TEXT}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion + CTA */}
      <section className="ca-about-page-cta pt-70 pb-90">
        <div className="container">
          <div className="ca-about-page-cta__card text-center" data-aos="zoom-in">
            <p className="ca-about-page-cta__quote">{closingParagraph}</p>
            <div className="d-flex flex-wrap justify-content-center gap-3 pt-24">
              <Link href="/contact" className="ca-btn-primary-22">
                Parlons de votre projet{" "}
                <span>
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
              <Link href="/services" className="ca-about-page-cta__secondary">
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CargonAboutPage;
