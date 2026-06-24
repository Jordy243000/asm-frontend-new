"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
//import "react-modal-video/css/modal-video.min.css";
import useModal from "@/hooks/use-modal";
import about_img from "../../../public/assets/img/about/about.png";

const WorkProcessArea = () => {
  const work_data = [
    {
      id: 1,
      title: "Expertise reconnue",
      reason:
        "Une maîtrise approfondie de la digitalisation du secteur maritime et portuaire pour optimiser vos opérations.",
    },
    {
      id: 2,
      title: "Solutions sur mesure",
      reason:
        "Des services adaptés aux besoins spécifiques des acteurs publics et privés pour une gestion efficace.",
    },
    {
      id: 3,
      title: "Fiabilité et transparence",
      reason:
        "Un engagement fort pour la traçabilité, la sécurité et une transparence totale dans toutes les opérations.",
    },
    {
      id: 4,
      title: "Innovation et engagement",
      reason:
        "Une équipe passionnée qui met la technologie au service de votre croissance et de votre compétitivité.",
    },
  ];

  const { isVideoOpen, setIsVideoOpen } = useModal();

  return (
    <>
      <section className="work grey-bg">
        <div className="container">
          <div
            className="work__wrapper p-relative wow fadeInUp"
            data-wow-duration="1.5s"
            data-wow-delay=".3s"
          >
            <div className="row align-items-center align-items-xxl-end">
              <div className="col-xl-6 col-lg-6">
                <div className="about__3-img-wrapper p-relative mb-60">
                  <div className="about__3-main w-img">
                    <Image
                      src={about_img}
                      style={{ width: "100%", height: "auto" }}
                      alt={"African Shipping Management (ASM) RDC"}
                    />
                  </div>
                  <div className="about__3-text clip-box-sm">
                    <h4 className="about__3-title">
                      African Shipping Management ASM RDC
                      {/* Votre partenaire de confiance en gestion maritime */}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="work__content">
                  <div className="section__title mb-45">
                    <span className="sub-title">Pourquoi choisir</span>
                    <h2 className="title">
                      African Shipping Management ASM RDC
                    </h2>
                  </div>
                  <div className="work__content-list pr-60">
                    {work_data.map((item, idx) => (
                      <div className="work__item" key={idx}>
                        <div className="work__item-num">
                          <h5>{idx + 1}</h5>
                        </div>
                        <div className="work__item-text">
                          <h4>{item?.title}</h4>
                          <p>{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkProcessArea;
