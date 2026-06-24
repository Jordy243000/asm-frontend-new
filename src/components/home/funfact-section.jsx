import React from "react";
import breadcrumb_bg from "@/assets/img/breadcrumb/servBanner.png";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const Counter = dynamic(() => import("../common/counter/CountUpContent"), {
  ssr: false,
});

const FunfactSection = ({ numberData }) => {
  return (
    <section
      className="dp-funfact-area dp-funfact-area-03 grey-bg p-relative pt-120 pb-90"
      style={{ backgroundImage: `url(${breadcrumb_bg.src})` }}
    >
      <div
        className="container wow fadeInUp"
        data-wow-duration="1.5s"
        data-wow-delay=".3s"
      >
        <div className="row">
          {numberData?.map((item) => (
            <div
              className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12"
              key={item.id}
            >
              <div className="dp-funfact-wrapper dp-funfact-wrapper-03 mb-30">
                <div className="dp-funfact-icon">
                  <Icon className="icon" icon={item?.attributes?.icon} />
                </div>
                <div className="dp-funfact-content">
                  <h3 className="counter">
                    <Counter number={item?.attributes?.number}></Counter>
                  </h3>
                  <p>{item?.attributes?.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunfactSection;
