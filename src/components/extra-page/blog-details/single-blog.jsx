"use client";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import React from "react";
import PostBoxArea from "./postbox-area";
import { useParams } from "next/navigation";
import axios from "axios";

const SingleBlog = ({}) => {
  const id = useParams()?.id;

  const [serviceData, setServiceData] = React.useState({});
  const [allData, setAllData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  //console.log(serviceData, "one service", allData);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs?populate[0]=content&populate[1]=content.textual&populate[2]=content.textual.image&populate[3]=content.textual.list&populate[4]=image&sort=publishedAt:desc`,
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

  //console.log(serviceData, id, "lolllllll");
  //console.log(item, "Single Blog");
  return (
    <main className="cargon-inner-page">
      <Breadcrumb
        title={
          serviceData?.attributes?.title || "Cette page n'existe pas"
        }
        subTitle="Article"
        variant="blog"
        back="Blog"
        backLink="/blog"
      />
      <PostBoxArea item={serviceData} blogData={allData} />
    </main>
  );
};

export default SingleBlog;
