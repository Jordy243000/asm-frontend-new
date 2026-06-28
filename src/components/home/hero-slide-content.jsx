"use client";

import Link from "next/link";
import React from "react";

function HeroButtons({ slide }) {
  return (
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
            <Link href={slide.buttonLink} className="ca-btn-primary-22 mr-16">
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
            <Link href={slide.secondaryButtonLink} className="ca-btn-primary-22">
              {slide.secondaryButtonText}{" "}
              <span>
                <i className="fa-solid fa-arrow-right" />
              </span>
            </Link>
          )
        ) : null}
      </div>
      {slide.videoLabel ? (
        <div className="ca-slider-2-video">
          {slide.videoUrl ? (
            <>
              <a href={slide.videoUrl} className="video-play-button-2 popup-video">
                <span />
              </a>
              <div className="ca-slider-video-text-2">
                <a href={slide.videoUrl} className="popup-video">
                  {slide.videoLabel}
                </a>
              </div>
            </>
          ) : slide.videoLink ? (
            <>
              <Link href={slide.videoLink} className="video-play-button-2">
                <span />
              </Link>
              <div className="ca-slider-video-text-2">
                <Link href={slide.videoLink}>{slide.videoLabel}</Link>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function HeroSlideContent({ slide, contentKey }) {
  return (
    <div key={contentKey} className="ca-hero-slide-content ca-hero-story-text is-visible">
      {slide.subtitle ? (
        <h5 className="ca-section-subtitle subtitle-bg-5 text-white theme-color-2">
          {slide.subtitle}
        </h5>
      ) : null}
      {slide.title ? (
        <h1 className="ca-slider-heading text-white pt-20 pb-20 ca-text-cap">{slide.title}</h1>
      ) : null}
      {slide.description ? (
        <p className="pb-32 slider-sub-content text-white">{slide.description}</p>
      ) : null}
      <HeroButtons slide={slide} />
    </div>
  );
}

export default HeroSlideContent;
