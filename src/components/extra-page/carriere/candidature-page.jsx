"use client";
import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import { useSiteContent } from "@/context/site-content-provider";
import CandidatureForm from "./candidature-form";

const CandidaturePage = () => {
  const { getPageMeta } = useSiteContent();
  const pageMeta = getPageMeta("carriere-candidature");

  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="carriere-candidature" />

      <section className="ca-candidature-area pt-70 pb-100">
        <div className="container">
          <div className="ca-candidature-intro text-center mb-50" data-aos="fade-up">
            <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
              {pageMeta?.subtitle || "Candidature"}
            </h5>
            <h2 className="ca-section-title theme-black-2 fnw-600 pt-16">
              {pageMeta?.pageTitle || "Envoyez votre candidature"}
            </h2>
            <p className="pt-16 mb-0">
              {pageMeta?.intro ||
                "Déposez votre CV et présentez votre profil. Notre équipe RH étudiera votre dossier avec attention."}
            </p>
          </div>

          <div className="ca-candidature-card" data-aos="fade-up" data-aos-delay="100">
            <CandidatureForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CandidaturePage;
