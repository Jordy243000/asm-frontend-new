import React from "react";
import FaqSection from "./faq";

const Overview = ({ item }) => {
  return (
    <div className="services__details-wrapper mb-60">
      <div className="services__details-img mb-35 m-img">
        <img
          // src={item.image}
          src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.banner?.data?.attributes?.url}`}
          style={{ width: "100%", height: "auto" }}
          className="img-fluid"
          alt={`Service-${item?.attributes?.title}-African Shipping Management(ASM) RDC`}
        />
        {/* <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.banner?.data?.attributes?.url}`}
          style={{ width: "100%", height: "100%" }}
          alt="services"
        /> */}
      </div>
      <div className="service__details-content mb-25">
        <div className="section__title mb-20">
          <h3 className="title-sm">{item?.attributes?.title}</h3>
        </div>
        {item?.attributes?.paragraph?.map((datum, idx) => {
          return (
            <p className="content-para" key={idx}>
              {datum?.description}
            </p>
          );
        })}

        <div className="row align-items-center overview-list services-overview-space mb-30">
          {/* <div className="col-sm-6">
            <div className="overview-list-img w-img mb-25">
              <Image
                src={item?.bannerImg}
                style={{ width: "100%", height: "100%" }}
                alt="services"
              />
            </div>
          </div> */}
          <div className="col-sm-6">
            <ul className="mb-25">
              {item?.attributes?.checklist?.map((datum, idx) => {
                return <li key={idx}>{datum?.list}</li>;
              })}
            </ul>
          </div>
        </div>
        <FaqSection faq={item?.attributes?.faq} />
      </div>
    </div>
  );
};

export default Overview;
