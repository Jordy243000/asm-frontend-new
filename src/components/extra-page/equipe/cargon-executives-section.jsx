"use client";
import React from "react";
import axios from "axios";
import {
  getExecutiveInitials,
  getStrapiImageUrl,
  useTeamPageContent,
} from "@/hooks/use-team-page-content";

const CargonExecutivesSection = () => {
  const pageContent = useTeamPageContent();
  const [executives, setExecutives] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchExecutives = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/teams?filters[tier][$eq]=executive&populate=*&sort=sortOrder:asc`
        );
        setExecutives(response?.data?.data ?? []);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message
            ? error.response.data.error.message
            : error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  return (
    <section className="ca-teams-inner pt-100 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="ca-sec-content-2 text-center mb-55">
              <h5 className="ca-section-subtitle subtitle-bg-6 p-relative theme-black-4 br-50">
                Équipe
              </h5>
              <h2 className="ca-section-title theme-black-4 fnw-600 pt-16 ca-text-cap">
                {pageContent.executivesTitle}
              </h2>
              {pageContent.executivesIntro ? (
                <p className="pt-16">{pageContent.executivesIntro}</p>
              ) : null}
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="text-center">Chargement de la direction...</p>
        ) : null}

        {!isLoading && errorMsg ? (
          <p className="text-center text-danger">{errorMsg}</p>
        ) : null}

        {!isLoading && !errorMsg && executives.length === 0 ? (
          <p className="text-center">Aucun cadre enregistré pour le moment.</p>
        ) : null}

        <div className="row">
          {executives.map((item) => {
            const name = item?.attributes?.name ?? "";
            const designation = item?.attributes?.designation ?? "";
            const photoUrl = getStrapiImageUrl(item?.attributes?.photo);

            return (
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30" key={item.id}>
                <div className="ca-executive-card br-7 cream-bg-2 p-relative z-index-1 h-100">
                  <div className="ca-executive-card__media">
                    {photoUrl ? (
                      <img src={photoUrl} alt={`${name} - ${designation}`} />
                    ) : (
                      <div className="ca-executive-card__placeholder">
                        <span>{getExecutiveInitials(name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="ca-executive-card__content br-7">
                    <h4 className="ca-executive-card__name">{name}</h4>
                    <span className="ca-executive-card__role">{designation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CargonExecutivesSection;
