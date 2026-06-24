"use client";
import Link from "next/link";
import React, { memo, useEffect, useMemo } from "react";
import { unslickHeroSlider } from "@/hooks/use-cargon-init";
import { mapBannerSlides } from "@/utils/banner-helpers";

const HeroThumbnails = memo(function HeroThumbnails({ slides }) {
  if (!slides?.length) {
    return null;
  }

  return (
    <div className="slider-nav sm-slider-img d-none d-md-block">
      {slides.map((slide) => (
        <div key={`hero-thumb-${slide.id}`} className="ca-hero-thumb-slide">
          <span
            className="ca-hero-thumb"
            style={{
              backgroundImage: slide.thumb ? `url(${slide.thumb})` : undefined,
            }}
            role="img"
            aria-label={slide.title || slide.subtitle || "Slide"}
          />
        </div>
      ))}
    </div>
  );
});

function HeroBackground({ slide }) {
  if (slide.backgroundType === "video" && slide.backgroundVideo) {
    return (
      <video
        className="ca-hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        poster={slide.image || undefined}
      >
        <source src={slide.backgroundVideo} />
      </video>
    );
  }

  return null;
}

function HeroVideoLink({ slide }) {
  if (!slide.videoLabel) {
    return null;
  }

  if (slide.videoUrl) {
    return (
      <div className="ca-slider-2-video">
        <a href={slide.videoUrl} className="video-play-button-2 popup-video">
          <span />
        </a>
        <div className="ca-slider-video-text-2">
          <a href={slide.videoUrl} className="popup-video">
            {slide.videoLabel}
          </a>
        </div>
      </div>
    );
  }

  if (!slide.videoLink) {
    return null;
  }

  return (
    <div className="ca-slider-2-video">
      <Link href={slide.videoLink} className="video-play-button-2">
        <span />
      </Link>
      <div className="ca-slider-video-text-2">
        <Link href={slide.videoLink}>{slide.videoLabel}</Link>
      </div>
    </div>
  );
}

const CargonBannerArea = ({ bannerData = [], dataReady = false }) => {
  const slides = useMemo(
    () =>
      mapBannerSlides(bannerData, undefined, {
        useFallback: dataReady && bannerData.length === 0,
      }),
    [bannerData, dataReady]
  );

  useEffect(() => {
    return () => {
      if (window.jQuery) {
        unslickHeroSlider(window.jQuery);
      }
    };
  }, []);

  if (!dataReady) {
    return (
      <div className="ca-hero-2-slider--loading" aria-hidden="true">
        <div className="slider-text slider-2 p-relative z-index-1 pt-208 pb-70 fix" />
      </div>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <>
      <div className="slider-for slider-2-img" data-react-hero-slider>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slider-text slider-2 p-relative z-index-1 pt-208 pb-70 fix"
            style={
              slide.backgroundType === "image" && slide.image
                ? { backgroundImage: `url(${slide.image})` }
                : undefined
            }
          >
            <HeroBackground slide={slide} />
            <div className="ca-slider-2-shape p-absolute shape-2-slider">
              <img src="/cargon/img/shape/slider-shape-2.1.png" alt="" />
            </div>
            <div className="ca-slider-2-shape p-absolute shape-1-slider">
              <img src="/cargon/img/shape/slider-shape-2.2.png" alt="" />
            </div>
            <div className="ca-slider-2-shape p-absolute shape-3-slider">
              <img src="/cargon/img/shape/ca-black-shpae-2.png" alt="" />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 mb-30">
                  <div className="ca-slider-content-2 p-relative">
                    {slide.subtitle ? (
                      <h5 className="ca-section-subtitle subtitle-bg-5 text-white theme-color-2">
                        {slide.subtitle}
                      </h5>
                    ) : null}
                    {slide.title ? (
                      <h1 className="ca-slider-heading text-white pt-20 pb-20 ca-text-cap">
                        {slide.title}
                      </h1>
                    ) : null}
                    {slide.description ? (
                      <p className="pb-32 slider-sub-content text-white">
                        {slide.description}
                      </p>
                    ) : null}
                    <div className="ca-slider-2-btn d-flex mb-60">
                      <div className="ca-slider-btn-2 d-flex flex-wrap gap-2">
                        {slide.buttonLink && slide.buttonText ? (
                          slide.buttonExternal ? (
                            <a
                              href={slide.buttonLink}
                              className="ca-btn-primary-22 mr-16"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {slide.buttonText}{" "}
                              <span>
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={slide.buttonLink}
                              className="ca-btn-primary-22 mr-16"
                            >
                              {slide.buttonText}{" "}
                              <span>
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </Link>
                          )
                        ) : null}
                        {slide.secondaryButtonLink && slide.secondaryButtonText ? (
                          slide.secondaryButtonExternal ? (
                            <a
                              href={slide.secondaryButtonLink}
                              className="ca-btn-primary-22"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {slide.secondaryButtonText}{" "}
                              <span>
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={slide.secondaryButtonLink}
                              className="ca-btn-primary-22"
                            >
                              {slide.secondaryButtonText}{" "}
                              <span>
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </Link>
                          )
                        ) : null}
                      </div>
                      <HeroVideoLink slide={slide} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 ? <HeroThumbnails slides={slides} /> : null}
    </>
  );
};

export default CargonBannerArea;
