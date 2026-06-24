"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { Icon } from "@iconify/react";

const TeamSectionArea = ({ hideTitle = false }) => {
  const [teamData, setTeamData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/teams?populate=*&sort=sortOrder:asc`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTeamData(response?.data?.data ?? []);
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

    fetchData();
  }, []);

  return (
    <section
      className="team__3 pt-120 pb-70 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
    >
      <div className="container">
        {!hideTitle && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="section__title mb-55 text-center">
                <span className="sub-title">Équipe</span>
                <h2 className="title">Nos experts</h2>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <p className="text-center">Chargement de l&apos;équipe...</p>
        )}

        {!isLoading && errorMsg && (
          <p className="text-center text-danger">{errorMsg}</p>
        )}

        {!isLoading && !errorMsg && teamData.length === 0 && (
          <p className="text-center">
            Aucun membre de l&apos;équipe pour le moment.
          </p>
        )}

        <div className="row">
          {teamData.map((item) => {
            const photoUrl =
              item?.attributes?.photo?.data?.attributes?.url ?? null;
            const memberName = item?.attributes?.name ?? "";
            const memberRole = item?.attributes?.designation ?? "";

            return (
              <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
                <div className="team__3-item mb-50">
                  <div className="team__3-item-img w-img">
                    {photoUrl ? (
                      <img
                        style={{ width: "100%", height: "auto" }}
                        src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${photoUrl}`}
                        alt={`${memberName} - ${memberRole} - African Shipping Management (ASM) RDC`}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          background: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Photo non disponible
                      </div>
                    )}
                    {item?.attributes?.social?.length > 0 && (
                      <div className="team__3-item-social">
                        <ul>
                          {item.attributes.social.map((datum, idx) => (
                            <li key={idx}>
                              <Link target="_blank" href={datum.link}>
                                <Icon
                                  icon={datum.icon}
                                  width="16"
                                  height="16"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="team__3-item-content">
                      <span className="team__3-item-subtitle">
                        {memberRole}
                      </span>
                      <h4 className="team__3-item-title">{memberName}</h4>
                    </div>
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

export default TeamSectionArea;
