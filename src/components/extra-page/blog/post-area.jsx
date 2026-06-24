"use client";
import React from "react";
import axios from "axios";
import ProductTitleMenu from "@/components/common/product-title-menu";
import { Pagination, Stack } from "@mui/material";

const PostArea = () => {
  const [serviceData, setServiceData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?populate[photo]=*&populate[menuLinks]=*&pagination[page]=${page}&pagination[pageSize]=12`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServiceData(solutionResponse?.data?.data);

        setPages(solutionResponse?.data?.meta?.pagination?.pageCount);

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
  }, [page]);

  return (
    <>
      <div className="">
        <div className="row postbox__wrapper">
          {serviceData?.map((item, idx) => (
            <div
              key={idx}
              className="col-lg-6 postbox__item format-image mb-55"
            >
              <div className="postbox__thumb w-img mb-10">
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.photo?.data?.attributes.url}`}
                  alt={`Produit-${item?.attributes?.title} - African Shipping Management(ASM) RDC`}
                />
              </div>
              <div className="postbox__content">
                <div className="section__title mb-20">
                  <ProductTitleMenu
                    title={item?.attributes?.title}
                    productId={item?.id}
                    menuLinks={item?.attributes?.menuLinks}
                  />
                </div>
                <div className="postbox__text mb-30">
                  <blockquote>
                    {item?.attributes?.description?.length > 150
                      ? `${item?.attributes?.description?.substring(0, 150)}...`
                      : item?.attributes?.description}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
        {serviceData?.length > 0 ? (
          <Stack sx={{ alignItems: "center" }}>
            <form autoComplete="off" noValidate onSubmit={() => {}}>
              <Pagination
                count={pages}
                color="primary"
                page={page}
                onChange={(event, val) => {
                  setPage(val);
                }}
              />
            </form>
          </Stack>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostArea;
