import Link from "next/link";
import React from "react";

const WidgetServices = ({ servicesData }) => {
  //console.log(servicesData, "Alllllll");

  return (
    <div className="sidebar__widget mb-40">
      <div className="sidebar-title mb-25">
        <h4>Nos Services</h4>
      </div>
      <ul className="widget-services">
        {servicesData?.map((datum, idx) => {
          return (
            <li key={idx}>
              <Link href={`/services/${datum?.id}`}>
                {/* <i className="fas fa-truck"></i>  */}
                {datum?.attributes?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WidgetServices;
