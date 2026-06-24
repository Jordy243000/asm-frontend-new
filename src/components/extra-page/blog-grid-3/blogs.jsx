"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NiceSelect from "@/ui/niceSelect";
import moment from "moment";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";

const BlogGrid3 = () => {
  const [serviceData, setServiceData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectCategory, setSelectCategory] = useState(null);

  //console.log(serviceData, "blogyyyyyy");

  const selectHandler = (e) => {
    //console.log(e?.value, "jhgfjgfjh");
    setPage(1);
    setPages(0);
    setSelectCategory(e?.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Base API URL
        let caseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=6&sort=publishedAt:desc`;

        // Add filter if a category is selected
        if (selectCategory !== null) {
          caseUrl += `&filters[
type
][$eq]=${encodeURIComponent(selectCategory)}`;
        }

        const caseResponse = await axios.get(caseUrl, {
          headers: { "Content-Type": "application/json" },
        });

        setServiceData(caseResponse?.data?.data);
        setPages(caseResponse?.data?.meta?.pagination?.pageCount);

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
  }, [page, selectCategory]);

  return (
    <section className="dp-blog-area pt-70 pb-90">
      <div className="container">
        <div className="row">
          <NiceSelect
            className={""}
            options={[
              { value: null, text: "Tout" },
              { value: "article", text: "Articles" },
              { value: "news", text: "Actualités" },
              { value: "statement", text: "Communications" },
            ]}
            defaultCurrent={0}
            onChange={selectHandler}
            name="Select Subject"
          />
        </div>
        <br />
        <div className="row">
          {serviceData?.map((item, idx) => (
            <div className="col-xl-4 col-lg-6 col-md-6 col-12" key={idx}>
              <div className="dp-blog-grid-wrapper mb-30">
                <div className="dp-blog-grid-thumb">
                  <Link href={`/blog/${item?.id}`}>
                    <img
                      // src={item.image}
                      src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`}
                      style={{ width: "100%", height: "auto" }}
                      className="img-fluid"
                      alt={`Blog-${item?.attributes?.title}-African Shipping Management(ASM) RDC`}
                    />
                  </Link>
                </div>
                <div className="dp-blog-grid-content-wrapper">
                  <div
                    className="dp-blog-grid-meta-wrapper d-flex"
                    style={{ flexWrap: "wrap" }}
                  >
                    <span>
                      <Link href={`/blog/${item?.id}`}>
                        <i aria-hidden="true" className="fas fa-list"></i>
                        {item?.attributes?.type === "article"
                          ? `Article`
                          : item?.attributes?.type === "news"
                          ? `Actualité`
                          : "Communication"}
                      </Link>
                    </span>
                    <span>
                      <Link href={`/blog/${item?.id}`}>
                        <i
                          aria-hidden="true"
                          className="far fa-calendar-alt"
                        ></i>
                        {moment(item?.attributes?.publishedAt).format(
                          "DD MMM YYYY, h:mm a"
                        )}
                      </Link>
                    </span>
                    <span>
                      <Link href={`/blog/${item.id}`}>
                        <i aria-hidden="true" className="far fa-user"></i>
                        {item.attributes?.author}
                      </Link>
                    </span>
                  </div>
                  <div className="dp-blog-grid-content bdevs-el-content">
                    <h2 className="dp-grid-title bdevs-el-title">
                      <Link href={`/blog/${item?.id}`}>
                        {item?.attributes?.title}
                      </Link>
                    </h2>
                    <div className="blog__item-text">
                      <p>
                        {item?.attributes?.description?.length > 100
                          ? `${item?.attributes?.description?.substring(
                              0,
                              100
                            )}...`
                          : item?.attributes?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        {serviceData?.length > 0 ? (
          <Stack sx={{ alignItems: "center" }}>
            <form autoComplete="off" noValidate onSubmit={() => {}}>
              <Pagination
                count={pages}
                // variant="outlined"
                color="primary"
                //defaultPage={page}
                page={page}
                onChange={(event, val) => {
                  // formik.setFieldValue("page", val);
                  setPage(val);
                }}
              />
            </form>
          </Stack>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default BlogGrid3;
