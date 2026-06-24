"use client";
import React from "react";
//import ServiceDetails from "./service-details";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import { useParams } from "next/navigation";
import axios from "axios";
import ServiceDetails from "./service-details";

const SingleService = ({}) => {
  const id = useParams()?.id;
  const [service, setService] = React.useState({});

  const [serviceData, setServiceData] = React.useState({});
  const [allData, setAllData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  //console.log(serviceData, "one service", allData);

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
        setAllData(solutionResponse?.data?.data);
        setServiceData(
          solutionResponse?.data?.data?.find((item) => item.id == id)
        );
        //setService(servicesData.find((item) => item.id == id));

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
  }, [id]);

  console.log(serviceData, id, "lolllllll");

  return (
    <main className="cargon-inner-page">
      <Breadcrumb
        title={
          serviceData?.attributes?.title || "Cette page n'existe pas"
        }
        subTitle="Détail"
        variant="services"
        back="Nos services"
        backLink="/services"
      />
      <ServiceDetails item={serviceData} servicesData={allData} />
    </main>
  );
};

export default SingleService;
