"use client";

import React, { useEffect, useRef, useState } from "react";
import { HeroSlideContent } from "./hero-slide-content";
import { getHeroStorySegmentIndex } from "@/utils/banner-helpers";

const HeroVideoStorySlide = ({ slide, slideIndex }) => {
  const slideRef = useRef(null);
  const videoRef = useRef(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [isSlideActive, setIsSlideActive] = useState(false);
  const segments = slide.segments || [];

  useEffect(() => {
    const $ = window.jQuery;
    if (!$) {
      return undefined;
    }

    const $slider = $(".slider-for");
    if (!$slider.length) {
      return undefined;
    }

    const syncActiveState = (_event, _slick, currentIndex) => {
      const active = currentIndex === slideIndex;
      setIsSlideActive(active);

      const video = videoRef.current;
      if (!video) {
        return;
      }

      if (active) {
        setActiveSegment(0);
        video.currentTime = 0;
        video.play().catch(() => {});
        $slider.slick("slickPause");
      } else {
        video.pause();
        video.currentTime = 0;
        setActiveSegment(0);
        $slider.slick("slickPlay");
      }
    };

    const bindWhenReady = () => {
      if (!$slider.hasClass("slick-initialized")) {
        return false;
      }

      try {
        const slick = $slider.slick("getSlick");
        syncActiveState(null, slick, slick.currentSlide);
      } catch {
        // Slick pas encore prêt
      }

      $slider.on("afterChange.heroVideoStory", syncActiveState);
      return true;
    };

    if (!bindWhenReady()) {
      const onReady = () => {
        if (bindWhenReady()) {
          window.removeEventListener("cargon:plugins-ready", onReady);
        }
      };
      window.addEventListener("cargon:plugins-ready", onReady);
      const retry = setInterval(() => {
        if (bindWhenReady()) {
          clearInterval(retry);
          window.removeEventListener("cargon:plugins-ready", onReady);
        }
      }, 300);

      return () => {
        clearInterval(retry);
        window.removeEventListener("cargon:plugins-ready", onReady);
        $slider.off("afterChange.heroVideoStory", syncActiveState);
      };
    }

    return () => {
      $slider.off("afterChange.heroVideoStory", syncActiveState);
    };
  }, [slideIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isSlideActive) {
      return undefined;
    }

    const onTimeUpdate = () => {
      setActiveSegment(getHeroStorySegmentIndex(video.currentTime, slide.segmentDurations));
    };

    const onEnded = () => {
      const $slider = window.jQuery?.(".slider-for");
      if (!$slider?.length) {
        return;
      }

      try {
        $slider.slick("slickNext");
        $slider.slick("slickPlay");
      } catch {
        // ignore
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [isSlideActive, slide.segmentDurations]);

  const currentSegment = segments[activeSegment] || segments[0];

  return (
    <div
      ref={slideRef}
      className="slider-text slider-2 p-relative z-index-1 pt-208 pb-70 fix ca-hero-story-slide"
      data-hero-slide-type="video-story"
    >
      <video
        ref={videoRef}
        className="ca-hero-bg-video"
        muted
        playsInline
        preload="metadata"
        poster={slide.image || undefined}
      >
        <source src={slide.backgroundVideo} type="video/mp4" />
      </video>

      <div className="ca-hero-story-overlay" aria-hidden="true" />

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
              {currentSegment ? (
                <HeroSlideContent
                  key={`hero-story-segment-${activeSegment}`}
                  slide={currentSegment}
                  contentKey={`hero-story-segment-${activeSegment}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoStorySlide;
