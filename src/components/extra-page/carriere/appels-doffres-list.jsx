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

const AppelsDoffresList = () => {
  const { getPageMeta } = useSiteContent();
  const pageMeta = getPageMeta("carriere-appels");
  const [tenders, setTenders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchTenders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tenders?populate=*&filters[isOpen][$eq]=true&sort=sortOrder:asc`,
          { headers: { "Content-Type": "application/json" } }
        );
        setTenders(response?.data?.data ?? []);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message || error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenders();
  }, []);

  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="carriere-appels" />

      <section className="ca-career-area pt-70 pb-70">
        <div className="container">
          <div className="ca-sec-content-2 text-center mb-50" data-aos="fade-up">
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
              {pageMeta?.subtitle || "Marchés publics"}
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-600 pt-16">
              {pageMeta?.pageTitle || "Appels d'offres"}
            </h2>
            <p className="pt-16 mb-0">
              {pageMeta?.intro ||
                "Consultez nos appels d'offres en cours et téléchargez les documents associés."}
            </p>
          </div>

          {isLoading ? (
            <p className="text-center ca-career-status">Chargement...</p>
          ) : null}

          {!isLoading && errorMsg ? (
            <div className="ca-career-empty">
              <p className="text-danger mb-0">{errorMsg}</p>
            </div>
          ) : null}

          {!isLoading && !errorMsg && tenders.length === 0 ? (
            <div className="ca-career-empty" data-aos="fade-up">
              <h4 className="fnw-600 theme-black-2 mb-16">
                Aucun appel d&apos;offres disponible
              </h4>
              <p className="mb-0">
                Revenez bientôt pour découvrir nos prochains marchés.
              </p>
            </div>
          ) : null}

          {!isLoading && !errorMsg && tenders.length > 0 ? (
            <div className="row">
              {tenders.map((tender, index) => {
                const attrs = tender.attributes;
                const preview = stripHtml(attrs?.description).slice(0, 180);
                const docPath = attrs?.document?.data?.attributes?.url;
                const docUrl = docPath
                  ? `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN || ""}${docPath}`
                  : null;

                return (
                  <div
                    className="col-lg-6 mb-30"
                    key={tender.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                  >
                    <div className="ca-job-card cream-bg-2 br-7 h-100">
                      <div className="ca-job-tags mb-20">
                        {attrs?.reference ? (
                          <span className="ca-job-tag">Réf. {attrs.reference}</span>
                        ) : null}
                        {attrs?.location ? (
                          <span className="ca-job-tag">{attrs.location}</span>
                        ) : null}
                      </div>

                      <h3 className="ca-job-title fnw-600 mb-12">{attrs?.title}</h3>

                      {preview ? (
                        <p className="ca-job-excerpt mb-20">{preview}...</p>
                      ) : null}

                      {attrs?.deadline ? (
                        <p className="ca-job-deadline mb-24">
                          <i className="fa-regular fa-calendar" /> Date limite :{" "}
                          {formatDate(attrs.deadline)}
                        </p>
                      ) : null}

                      {docUrl ? (
                        <a
                          href={docUrl}
                          className="ca-btn-primary-22"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Télécharger le dossier{" "}
                          <span>
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </a>
                      ) : (
                        <Link href="/contact" className="ca-btn-primary-22">
                          Nous contacter{" "}
                          <span>
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </Link>
                      )}
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

export default AppelsDoffresList;
