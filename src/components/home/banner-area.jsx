import Link from "next/link";
import React from "react";

//swiper style
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css/bundle";

//home img
import slider_img_1 from "@/assets/img/slider/ship1.png";
import slider_img_2 from "@/assets/img/slider/ship2.png";
import Logo from "@/assets/img/logo/logo.png";

const bannerData = [
  {
    id: 1,
    image: slider_img_1,
    subtitle: "Optimisez votre logistique maritime",
    title: "Digitalisation & Sécurité",
    title_2: "Pour une gestion efficace.",
  },
  {
    id: 2,
    image: slider_img_2,
    subtitle: "Gestion innovante du transport",
    title: "Traçabilité en temps réel",
    title_2: "Fiabilité et transparence.",
  },
];

const BannerArea = ({ bannerData }) => {
  return (
    <section className="banner-area banner-area1 pos-rel">
      <div className="slider__active">
        <div>
          <Swiper
            modules={[Autoplay, Navigation, EffectFade, Pagination]}
            slidesPerView={1}
            slidespercolumn={1}
            pagination={{
              clickable: true,
            }}
            loop={true}
            effect={"fade"}
            autoplay={{
              delay: 6000,
            }}
            // Navigation arrows
            navigation={{
              nextEl: ".slider-button-next",
              prevEl: ".slider-button-prev",
            }}
            a11y={false}
          >
            {bannerData?.map((item) => (
              <SwiperSlide key={item?.id}>
                <div>
                  <div className="single-banner banner-overlay single-banner-1 banner-830">
                    <div
                      className="banner-bg banner-bg1 banner-bg1-1"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes?.url})`,
                      }}
                      //`url(${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${productData?.attributes?.banner?.data?.attributes?.url})`
                    ></div>
                    <div className="container pos-rel">
                      <div className="row align-items-center">
                        <div className="col-lg-8">
                          <div className="banner-content banner-content1 banner-content1-1">
                            <div
                              className="banner-meta-text"
                              data-animation="fadeInUp"
                              data-delay=".3s"
                            >
                              <span className="fw-bold">
                                {" "}
                                {item?.attributes?.subtitle}
                              </span>
                            </div>
                            <h1
                              className="banner-title"
                              data-animation="fadeInUp"
                              data-delay=".5s"
                              style={{ textTransform: "none" }}
                            >
                              {item?.attributes?.title}
                            </h1>
                            <div
                              className="banner-btn"
                              data-animation="fadeInUp"
                              data-delay=".7s"
                            >
                              <Link
                                href={`/${item?.attributes?.buttonLink}`}
                                className="fill-btn clip-btn"
                              >
                                {item?.attributes?.buttonText}
                              </Link>
                              <Link className="skew-btn" target="_blank" href="/brochure.pdf">
                                Notre Brochure
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* If we need navigation

            {/* If we need navigation buttons  */}
      <div className="slider-nav d-none d-md-block">
        <div className="dp-nav-btn slider-button-prev">
          <i className="far fa-angle-left"></i>
        </div>
        <div className="dp-nav-btn slider-button-next">
          <i className="far fa-angle-right"></i>
        </div>
      </div>
      {/* If we need pagination  */}
      <div className="slider-pagination slider1-pagination"></div>
    </section>
  );
};

export default BannerArea;
