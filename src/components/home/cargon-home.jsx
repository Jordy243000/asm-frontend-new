"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import CargonBannerArea from "./cargon-banner-area";
import CargonContactInfo from "./cargon-contact-info";
import CargonBlogSection from "./cargon-blog-section";
import CargonServiceCta from "./cargon-service-cta";
import CargonWorkProcess from "./cargon-work-process";
import HomeProductsSection from "./home-products-section";
import { useAboutContent } from "@/hooks/use-about-content";
import { useCargonInit } from "@/hooks/use-cargon-init";
import { useReportPageReady } from "@/context/page-transition-provider";
import { useSiteContent } from "@/context/site-content-provider";
import { BANNER_POPULATE_QUERY } from "@/utils/banner-helpers";
import {
  getServiceIcon,
  truncateText,
} from "@/utils/cargon-helpers";

const PRODUCTION_API = "https://api.africansm-rdc.com/api";
const PRODUCTION_ASSETS = "https://api.africansm-rdc.com";

async function fetchHomeBlogs() {
  const query =
    "populate=*&pagination[pageSize]=3&sort=publishedAt:desc";
  const localUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs?${query}`;
  let useProduction = false;

  try {
    const localRes = await axios.get(localUrl);
    const data = localRes?.data?.data || [];
    if (data.length) {
      return data;
    }
    useProduction = true;
  } catch (error) {
    console.warn("Blogs locaux indisponibles, repli production.", error?.message);
    useProduction = true;
  }

  if (!useProduction) {
    return [];
  }

  try {
    const prodRes = await axios.get(`${PRODUCTION_API}/blogs?${query}`);
    return (prodRes?.data?.data || []).map((item) => ({
      ...item,
      _assetsOrigin: PRODUCTION_ASSETS,
    }));
  } catch (error) {
    console.error("Impossible de charger les blogs.", error);
    return [];
  }
}

const CargonHome = () => {
  const aboutContent = useAboutContent();
  const { homePage } = useSiteContent();
  const [bannerData, setBannerData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [numberData, setNumberData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [ready, setReady] = useState(false);
  const [pluginsReady, setPluginsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bannerRes,
          servicesRes,
          numbersRes,
          testimonialsRes,
          blogs,
        ] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/banners?${BANNER_POPULATE_QUERY}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/services?populate=*`),
          axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/bignumbers?populate=*`),
          axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/testimonials?populate=*`),
          fetchHomeBlogs(),
        ]);

        setBannerData(bannerRes?.data?.data || []);
        setServiceData(servicesRes?.data?.data || []);
        setBlogData(blogs);
        setNumberData(numbersRes?.data?.data || []);
        setTestimonialData(testimonialsRes?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    };

    fetchData();
  }, []);

  const bannerKey = ready
    ? bannerData.map((entry) => entry.id).join("-") || "fallback"
    : "loading";

  useEffect(() => {
    setPluginsReady(false);
  }, [bannerKey]);

  useCargonInit(
    [
      bannerKey,
      serviceData.length,
      blogData.length,
      testimonialData.length,
      numberData.length,
    ],
    {
      onReady: () => setPluginsReady(true),
    }
  );

  useReportPageReady(ready && pluginsReady);

  return (
    <main className="cargon-home-index-2">
      <CargonBannerArea
        key={bannerKey}
        bannerData={bannerData}
        dataReady={ready}
      />

      <section className="ca-about-2 pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-30">
              <div className="ca-about-content-2 ca-sec-content-2 mb-40" data-aos="fade-down">
                <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2">
                  {aboutContent.subtitle}
                </h5>
                <h2 className="ca-about-title theme-black-2 fnw-600 pt-16 ca-text-cap">
                  {aboutContent.title}
                </h2>
                <p className="pt-16">
                  {truncateText(aboutContent.paragraphs?.[0] || aboutContent.vision, 420)}
                </p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="ca-choose-item p-relative" data-aos="fade-up">
                    <h4 className="ca-title fnw-600 theme-black-2 pb-16">Notre vision</h4>
                    <p>{truncateText(aboutContent.vision, 140)}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="ca-choose-item p-relative" data-aos="fade-up" data-aos-delay="100">
                    <h4 className="ca-title fnw-600 theme-black-2 pb-16">Notre mission</h4>
                    <p>{truncateText(aboutContent.mission, 140)}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="ca-choose-item p-relative" data-aos="fade-up" data-aos-delay="200">
                    <h4 className="ca-title fnw-600 theme-black-2 pb-16">Nos valeurs</h4>
                    <p>{truncateText(aboutContent.values, 140)}</p>
                  </div>
                </div>
              </div>
              <div className="ca-about-2-btn d-flex align-items-center" data-aos="fade-right">
                <Link href={homePage.aboutButtonLink} className="ca-btn-primary-22">
                  {homePage.aboutButtonText}{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
                <div className="ca-about-2-contact d-flex align-items-center">
                  <div className="ca-about-2-icon">
                    <img src="/cargon/img/icon/about-2.svg" alt="" />
                  </div>
                  <div className="ca-about-2-content">
                    <p>{homePage.aboutPhoneLabel}</p>
                    <a href={`tel:${homePage.aboutPhone.replace(/\s/g, "")}`} className="ca-about-2-num">
                      {homePage.aboutPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-30">
              <div className="ca-about-2-img p-relative z-index-1">
                <img data-aos="fade-left" src={homePage.aboutImageMain} alt="ASM RDC" />
                <div className="ca-about-2-overlay p-absolute" data-aos="fade-left" data-aos-delay="200">
                  <img src={homePage.aboutImageOverlay} alt="Équipe ASM en opérations portuaires" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {serviceData.length > 0 ? (
        <section className="ca-service-2 off-wh pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 mb-30">
                <div className="ca-service-content-2 ca-sec-content-2" data-aos="fade-up">
                  <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2">
                    {homePage.servicesSubtitle}
                  </h5>
                  <h2 className="ca-about-title theme-black-2 fnw-600 pt-16 ca-text-cap">
                    {homePage.servicesTitle}
                  </h2>
                  <p className="pt-16 pb-32">
                    Des services adaptés aux institutions publiques et aux opérateurs privés.
                  </p>
                </div>
                <div className="ca-service-2-btn" data-aos="fade-right">
                  <Link href={homePage.servicesButtonLink} className="ca-btn-primary-22">
                    {homePage.servicesButtonText}{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 mb-30">
                <div className="ca-service-bg" data-aos="fade-left">
                  <img className="w-100" src="/cargon/img/service/ca-service-bg-2.1.png" alt="" />
                </div>
                <div className="ca-service-slier-2" data-aos="zoom-out-down">
                  {serviceData.map((item, index) => (
                    <div key={item.id} className="ca-servic-2">
                      <div className="ca-servic-2-ic mb-24">
                        <span>
                          <img src={getServiceIcon(index)} alt="" />
                        </span>
                      </div>
                      <div className="ca-servic-2-content">
                        <h3 className="ca-servic-2-title pb-16">{item?.attributes?.title}</h3>
                      </div>
                      <div className="ca-service-2-desc">
                        <p>{truncateText(item?.attributes?.description, 120)}</p>
                        <Link href={`/services/${item.id}`} className="seread-more">
                          En savoir plus{" "}
                          <span>
                            <i className="fa-solid fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CargonServiceCta />

      <HomeProductsSection />

      <CargonWorkProcess />

      {numberData.length > 0 ? (
        <section className="ca-counter-area off-wh pt-70 pb-70">
          <div className="container">
            <div className="row">
              {numberData.map((item, index) => (
                <div key={item.id} className="col-lg-3 col-md-6 mb-30" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="text-center">
                    {item?.attributes?.icon ? (
                      <div className="ca-servic-2-ic mb-16 d-flex justify-content-center">
                        <span>
                          <Icon icon={item.attributes.icon} width={40} height={40} />
                        </span>
                      </div>
                    ) : null}
                    <h2 className="counter theme-black-2 fnw-700">{item?.attributes?.number}</h2>
                    <p className="pt-8">{item?.attributes?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {testimonialData.length > 0 ? (
        <section className="ca-testimonial2 theme-black-bg-2 pt-100 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="ca-testimonial-content ca-sec-content-2 mb-60" data-aos="fade-right">
                  <h5 className="ca-section-subtitle subtitle-bg-5 text-white p-relative theme-color-2">
                    {homePage.testimonialsSubtitle}
                  </h5>
                  <h2 className="ca-about-title text-white fnw-600 pt-16 ca-text-cap">
                    {homePage.testimonialsTitle}
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ca-about-desc mb-60" data-aos="fade-left">
                  <p className="text-white">{homePage.testimonialsDescription}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ca-testimonials">
                <div className="ca-testimonial-2">
                  {testimonialData.map((item) => {
                    const photo = item?.attributes?.image?.data?.attributes?.url
                      ? `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item.attributes.image.data.attributes.url}`
                      : null;

                    return (
                      <div key={item.id} className="ca-testimonial-card">
                        <div className="ca-test-2-icon">
                          <span>
                            <img src="/cargon/img/icon/ca-test-2-qu.svg" alt="" />
                          </span>
                        </div>
                        <div className="ca-test-2-content">
                          <p>
                            &ldquo;{truncateText(item?.attributes?.testimonial, 180)}&rdquo;
                          </p>
                        </div>
                        <div className="ca-test-2-user">
                          {photo ? (
                            <div className="ca-test-2-user-img">
                              <span>
                                <img src={photo} alt={item?.attributes?.name} />
                              </span>
                            </div>
                          ) : null}
                          <div className="ca-test-2-user-name">
                            <h4 className="test-2-title">{item?.attributes?.name}</h4>
                            <span>
                              {item?.attributes?.job}
                              {item?.attributes?.company
                                ? `, ${item.attributes.company}`
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CargonContactInfo />

      <CargonBlogSection blogData={blogData} />
    </main>
  );
};

export default CargonHome;
