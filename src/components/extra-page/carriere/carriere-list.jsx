"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import { useSiteContent } from "@/context/site-content-provider";

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const CarriereList = () => {
  const { getPageMeta } = useSiteContent();
  const pageMeta = getPageMeta("carriere-offres");
  const [offers, setOffers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/job-offers?populate=*&filters[isOpen][$eq]=true&sort=sortOrder:asc`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setOffers(response?.data?.data ?? []);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message || error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="carriere-offres" />

      <section className="ca-career-area pt-70 pb-70">
        <div className="container">
          <div
            className="ca-sec-content-2 text-center mb-50"
            data-aos="fade-up"
          >
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
              {pageMeta?.subtitle || "Opportunités"}
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-600 pt-16">
              {pageMeta?.pageTitle || "Rejoignez notre équipe"}
            </h2>
            {pageMeta?.intro ? (
              <p className="pt-16">{pageMeta.intro}</p>
            ) : (
              <p className="pt-16">
                Découvrez nos offres d&apos;emploi et postulez en ligne en
                envoyant votre CV.
              </p>
            )}
          </div>

          {isLoading ? (
            <p className="text-center ca-career-status">Chargement des offres...</p>
          ) : null}

          {!isLoading && errorMsg ? (
            <div className="ca-career-empty">
              <p className="text-danger mb-0">{errorMsg}</p>
            </div>
          ) : null}

          {!isLoading && !errorMsg && offers.length === 0 ? (
            <div className="ca-career-empty" data-aos="fade-up">
              <h4 className="fnw-600 theme-black-2 mb-16">
                Aucune offre disponible
              </h4>
              <p className="mb-0">
                Revenez bientôt pour découvrir nos prochaines opportunités.
              </p>
            </div>
          ) : null}

          {!isLoading && !errorMsg && offers.length > 0 ? (
            <div className="row">
              {offers.map((offer, index) => {
                const attrs = offer.attributes;
                const preview = stripHtml(attrs?.description).slice(0, 160);

                return (
                  <div
                    className="col-lg-6 mb-30"
                    key={offer.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                  >
                    <div className="ca-job-card cream-bg-2 br-7 h-100">
                      <div className="ca-job-tags mb-20">
                        {attrs?.contractType ? (
                          <span className="ca-job-tag">{attrs.contractType}</span>
                        ) : null}
                        {attrs?.department ? (
                          <span className="ca-job-tag">{attrs.department}</span>
                        ) : null}
                      </div>

                      <h3 className="ca-job-title fnw-600 mb-12">
                        <Link href={`/carriere/${offer.id}`}>{attrs?.title}</Link>
                      </h3>

                      {attrs?.location ? (
                        <p className="ca-job-location mb-16">
                          <i className="fa-solid fa-location-dot" /> {attrs.location}
                        </p>
                      ) : null}

                      {preview ? (
                        <p className="ca-job-excerpt mb-20">{preview}...</p>
                      ) : null}

                      {attrs?.deadline ? (
                        <p className="ca-job-deadline mb-24">
                          <i className="fa-regular fa-calendar" /> Date limite :{" "}
                          {formatDate(attrs.deadline)}
                        </p>
                      ) : null}

                      <Link
                        href={`/carriere/${offer.id}`}
                        className="ca-btn-primary-22"
                      >
                        Postuler{" "}
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default CarriereList;
