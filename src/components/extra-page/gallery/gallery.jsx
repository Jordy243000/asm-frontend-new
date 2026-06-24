"use client";
import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageViewer from "react-simple-image-viewer";
import { ImageList, ImageListItem, Pagination, Stack } from "@mui/material";
import axios from "axios";

const Gallery = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [images, setImages] = React.useState([]);

  const [serviceData, setServiceData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  //console.log(serviceData, "Pictures");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/galleries?populate=*&pagination[page]=${page}&pagination[pageSize]=12`,
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

  const openImageViewer = React.useCallback(
    (index) => {
      setCurrentImage(index);
      setImages(
        serviceData?.map(
          (item) =>
            `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes.url}`
        )
      );
      setIsViewerOpen(true);
    },
    [serviceData]
  );

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <main className="cargon-inner-page">
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
          }}
          closeOnClickOutside={true}
        />
      )}
      <Breadcrumb slug="gallery" />
      <section className="portfolio__area pt-70 pb-60">
        <div className="container g-0 g-max-30">
          {serviceData?.length > 0 ? (
            <ImageList
              sx={{ width: "100%", height: "auto" }}
              variant={"masonry"}
              cols={smallScreen ? 1 : mediumScreen ? 2 : 3}
              gap={8}
              //rowHeight={121}
            >
              {serviceData?.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    openImageViewer(index);
                  }}
                  cols={smallScreen ? 1 : mediumScreen ? 2 : 3}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes.url}`}
                    alt={`Galerie - ${item?.attributes?.title} - African Shipping Management(ASM) RDC`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            ""
          )}
        </div>
        <br />
        {serviceData?.length > 0 ? (
          <Stack sx={{ alignItems: "center" }}>
            <form autoComplete="off" noValidate onSubmit={() => {}}>
              <Pagination
                count={pages}
                // variant="outlined"
                color="primary"
                page={page}
                // onClick={handleSubmit}
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
      </section>
    </main>
  );
};

export default Gallery;
