import React from "react";
import ServicesAreaTwo from "@components/home-2/services-area-two";
import Breadcrumb from "@components/common/breadcrumb/breadcrumb";
import BrandSection from "./brand-section";
import breadcrumb_bg from "@assets/img/breadcrumb/aboutBanner.png";
import AboutUsArea from "@components/home-3/about-us-area";
import TestimonialArea from "@components/home-3/testimonial-area";
import WorkProcessArea from "@components/home-3/work-process-area";

const index = () => {
  return (
    <main>
      <Breadcrumb
        title="à propos de nous"
        subTitle="African Shipping Management"
        breadcrumb_bg={breadcrumb_bg.src}
        back={"Accueil"}
        backLink={"/"}
      />
      <AboutUsArea />
      <ServicesAreaTwo />
      <TestimonialArea />
      <WorkProcessArea />
      {/* <ApproachArea /> */}
      {/* <MissionSection /> */}
      <BrandSection />
    </main>
  );
};

export default index;
