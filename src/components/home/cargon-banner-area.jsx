"use client";
import React, { memo, useLayoutEffect, useMemo } from "react";
import { unslickHeroSlider } from "@/hooks/use-cargon-init";
import { mapBannerSlides } from "@/utils/banner-helpers";
import HeroVideoStorySlide from "./hero-video-story-slide";
import { HeroSlideContent } from "./hero-slide-content";

const HeroThumbnails = memo(function HeroThumbnails({ slides }) {
  if (!slides?.length) {
    return null;
  }

  return (
    <div className="slider-nav sm-slider-img d-none d-md-block">
      {slides.map((slide) => (
        <div key={`hero-thumb-${slide.id}`} className="ca-hero-thumb-slide">
          <span
            className={`ca-hero-thumb${slide.isVideoStory ? " ca-hero-thumb--video" : ""}`}
            style={{
              backgroundImage: slide.thumb ? `url(${slide.thumb})` : undefined,
            }}
            role="img"
            aria-label={slide.isVideoStory ? "Vidéo hero" : slide.title || slide.subtitle || "Slide"}
          />
        </div>
      ))}
    </div>
  );
});

function HeroImageSlide({ slide }) {
  return (
    <div
      className="slider-text slider-2 p-relative z-index-1 pt-208 pb-70 fix"
      style={
        slide.image ? { backgroundImage: `url(${slide.image})` } : undefined
      }
    >
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
              <HeroSlideContent slide={slide} contentKey={`hero-image-${slide.id}`} />
            </div>
          </div>
        </div>
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

  useLayoutEffect(() => {
    return () => {
      if (window.jQuery) {
        try {
          unslickHeroSlider(window.jQuery);
        } catch {
          // ignore
        }
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
        {slides.map((slide, index) =>
          slide.type === "video-story" || slide.isVideoStory ? (
            <HeroVideoStorySlide key={slide.id} slide={slide} slideIndex={index} />
          ) : (
            <HeroImageSlide key={slide.id} slide={slide} />
          )
        )}
      </div>

      {slides.length > 1 ? <HeroThumbnails slides={slides} /> : null}
    </>
  );
};

export default CargonBannerArea;
