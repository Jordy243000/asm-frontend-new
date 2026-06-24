import React from "react";
import CargonContactInfo from "@/components/home/cargon-contact-info";
import OfficesSection from "./offices-section";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";

const CtcForm = () => {
  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="contact" />
      <CargonContactInfo />
      <OfficesSection />
    </main>
  );
};

export default CtcForm;
