"use client";
import React from "react";
//import ServiceDetails from "./service-details";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductTitleMenu from "@/components/common/product-title-menu";
import Link from "next/link";
import { Icon } from "@iconify/react";

const SingleProduct = ({}) => {
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
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?populate[0]=techstack&populate[1]=user&populate[2]=module&populate[3]=module.feature&populate[4]=photo&populate[5]=document&populate[6]=menuLinks
`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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

  return (
    <main className="cargon-inner-page">
      <Breadcrumb
        title={
          serviceData?.attributes?.title || "Cette page n'existe pas"
        }
        subTitle="Détail"
        variant="products"
        back="Produits"
        backLink="/products"
      />
      <div className="postbox-area postbox-area-padd pt-70 pb-60">
        <div className="container">
          <div className="row">
            {serviceData ? (
              <div className="col-lg-12">
                <div className="postbox__wrapper mb-60">
                  <div className="postbox__item format-image mb-55">
                    <div className="postbox__thumb w-img mb-35">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${serviceData?.attributes?.photo?.data?.attributes.url}`}
                        alt={`Produit-${serviceData?.attributes?.title} - African Shipping Management(ASM) RDC`}
                      />
                    </div>
                    <div className="postbox__content">
                      <div className="section__title mb-20">
                        <ProductTitleMenu
                          title={serviceData?.attributes?.title}
                          productId={serviceData?.id}
                          menuLinks={serviceData?.attributes?.menuLinks}
                        />
                      </div>
                      <div className="postbox__text mb-30">
                        <p className="content-para">
                          {serviceData?.attributes?.description}
                        </p>
                        <br />
                        <h4 className="">Modules</h4>
                        <br />
                        <div className="row">
                          {serviceData?.attributes?.module?.map(
                            (datum, idx) => {
                              return (
                                <div key={idx} className="col-lg-4 col-12">
                                  {datum?.name?.length > 0 ? (
                                    <div className="section__title mb-20">
                                      <h5 className="">{datum?.name}</h5>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <p className="content-para">
                                    {datum?.description}
                                  </p>

                                  {datum?.feature?.length > 0 ? (
                                    <ul className="mb-25">
                                      {datum?.feature?.map((datum, idx) => {
                                        return <li key={idx}>{datum?.list}</li>;
                                      })}
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                        {serviceData?.attributes?.techstack?.length > 0 ? (
                          <div className="tagcloud details">
                            <div className="section__title mb-25">
                              <h4 className="">Stack de technologies</h4>
                            </div>
                            {serviceData?.attributes?.techstack?.map(
                              (datum, idx) => {
                                return (
                                  <Link
                                    href="#"
                                    key={idx}
                                    className="d-inline-flex align-items-center"
                                    title={`${datum?.description}`}
                                  >
                                    <Icon
                                      icon={`${datum?.icon}`}
                                      className="me-1"
                                    />{" "}
                                    {datum?.name}
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        ) : (
                          ""
                        )}

                        <br />
                        <br />
                        <div className="post-comment-form">
                          <div className="bd-contact-form-wrapper mb-30">
                            <div className="col-12">
                              <div
                                className="banner-btn"
                                data-animation="fadeInUp"
                                data-delay=".7s"
                              >
                                {serviceData?.attributes?.documentLink? (
                                  <Link
                                    target="_blank"
                                    href={`${serviceData?.attributes?.documentLink}`}
                                    className="fill-btn clip-btn d-inline-flex align-items-center"
                                  >
                                    <Icon
                                      icon="line-md:download-loop"
                                      className="me-1"
                                      width="24"
                                      height="24"
                                    />{" "}
                                    Document
                                  </Link>
                                ) : (
                                  ""
                                )}

                                <Link className="skew-btn" href="/contact">
                                  Demander une démo
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
