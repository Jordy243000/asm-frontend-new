"use client";
import axios from "axios";
//import { Icon } from "@iconify/react";

import Link from "next/link";
import React from "react";

const ServicesAreaTwo = () => {
  const [serviceData, setServiceData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/services?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServiceData(solutionResponse?.data?.data);

        //setPages(solutionResponse?.data?.meta?.pagination?.pageCount);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(
          error.response?.data?.error?.message
            ? error?.response?.data?.error?.message
            : error.toString()
        );
      }
    };

    fetchData();
  }, []);
  return (
    <section className="services__3 grey-bg-4 pt-70 pb-90">
      <div className="container">
        <div
          className="row justify-content-center wow fadeInUp align-items-center"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="col-md-8">
            <div className="section__title mb-55 text-center">
              <span className="sub-title">services</span>
              <h2 className="title">Ce que nous faisons</h2>
            </div>
          </div>
        </div>
        <div
          className="row wow fadeInUp justify-content-center"
          data-wow-duration="1.5s"
          data-wow-delay=".5s"
        >
          {serviceData?.map((item, idx) => (
            <div className="col-xl-4 col-md-6" key={item?.id}>
              <div className="services__3-item mb-30">
                <div className="services__3-item-num">
                  <h3>{idx + 1}</h3>
                </div>
                <div className="services__3-item-icon">
                  {/* <Icon icon={item?.attributes?.icon} /> */}
                </div>
                <h3 className="services__3-item-title">
                  <Link href={`/services/${item?.id}`}>
                    {item?.attributes?.title}
                  </Link>
                </h3>
                <p className="services__3-item-text">
                  {item?.attributes?.description?.length > 100
                    ? `${item?.attributes?.description?.substring(0, 100)}...`
                    : item?.attributes?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAreaTwo;
