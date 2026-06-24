import React from "react";
import ServicesAreaTwo from "@/components/home/service-area";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";

const MainServices = () => {
  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="services" />
      <ServicesAreaTwo />
    </main>
  );
};

export default MainServices;
