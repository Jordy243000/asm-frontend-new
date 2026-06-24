import React from "react";
import WidgetServices from "../portfolio-details/widget-services";
import Overview from "./overview";

const ServiceDetails = ({ item, servicesData }) => {
  return (
    <div className="services__details pt-70 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            {item ? <Overview item={item} /> : ""}
          </div>
          <div className="col-xl-4 col-lg-4">
            <WidgetServices servicesData={servicesData} />
            {/* <SearchInput /> */}
            {/* <Contact /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
