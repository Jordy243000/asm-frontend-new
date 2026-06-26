"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

const SLICK_SELECTORS = [
  ".slider-nav",
  ".slider-for",
  ".ca-service-slier-2",
  ".ca-testimonial-2",
  ".ca-hero1-active",
  ".slider-main",
  ".sm-slider-nav",
];

const HERO_SLICK_SELECTORS = [".slider-for", ".slider-nav"];

/** Instances Slick encore en mémoire après destruction du DOM React */
const trackedSlickInstances = new Set();

function runSlickCleanup($) {
  if (!$?.fn?.slick) {
    return;
  }

  clearAllSlickAutoplay($);
  unslickAll($);
}

function initAos() {
  if (!window.AOS) {
    return;
  }

  if (window.__cargonAosInitialized) {
    window.AOS.refresh();
    return;
  }

  window.AOS.init({
    disable: "mobile",
    once: true,
    duration: 800,
    startEvent: "DOMContentLoaded",
  });
  window.__cargonAosInitialized = true;
}

export function refreshAos() {
  if (typeof window === "undefined" || !window.AOS) {
    return;
  }

  if (!window.__cargonAosInitialized) {
    initAos();
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.AOS.refresh();
      forceAosVisible();
    });
  });
}

/** Évite le contenu invisible après navigation SPA (AOS laisse opacity: 0). */
export function forceAosVisible(root) {
  if (typeof document === "undefined") {
    return;
  }

  const scope = root?.querySelectorAll ? root : document;
  scope.querySelectorAll("[data-aos]").forEach((element) => {
    element.classList.add("aos-animate");
  });
}

const PRELOADER_FADE_MS = 500;

export function showNavigationPreloader() {
  if (typeof window === "undefined" || !window.jQuery) {
    return;
  }

  const $preloader = window.jQuery("#preloader");
  if (!$preloader.length) {
    return;
  }

  $preloader.stop(true, true).css({ display: "block", opacity: 1 });
  window.jQuery("#ctn-preloader").removeClass("loaded");
}

export function hideNavigationPreloader() {
  if (typeof window === "undefined" || !window.jQuery) {
    return;
  }

  window.jQuery("#preloader").fadeOut(PRELOADER_FADE_MS);
}

function pauseSlickInstance(instance) {
  if (!instance) {
    return;
  }

  try {
    if (instance.autoPlayTimer) {
      clearInterval(instance.autoPlayTimer);
      instance.autoPlayTimer = null;
    }
    instance.autoPlay = false;
    instance.paused = true;
  } catch {
    // Instance déjà invalide
  }
}

function trackSlickElement($el) {
  if (!$el?.length || !$el.hasClass("slick-initialized")) {
    return;
  }

  try {
    const instance = $el.slick("getSlick");
    if (instance) {
      trackedSlickInstances.add(instance);
    }
  } catch {
    // ignore
  }
}

export function clearAllSlickAutoplay($) {
  trackedSlickInstances.forEach(pauseSlickInstance);
  trackedSlickInstances.clear();

  if (!$?.fn?.slick) {
    return;
  }

  $(".slick-initialized").each(function collectInstance() {
    try {
      pauseSlickInstance($(this).slick("getSlick"));
    } catch {
      // ignore
    }
  });
}

function safeUnslickElement($, $el) {
  if (!$el?.length || !$el.hasClass("slick-initialized")) {
    return;
  }

  try {
    const instance = $el.slick("getSlick");
    pauseSlickInstance(instance);
    if (instance) {
      trackedSlickInstances.delete(instance);
    }
    $el.slick("slickPause");
  } catch {
    // Slider déjà partiellement détruit
  }

  try {
    $el.slick("unslick");
  } catch {
    $el.removeClass("slick-initialized");
    $el.removeAttr("style");
  }
}

export function unslickAll($) {
  if (!$?.fn?.slick) {
    return;
  }

  clearAllSlickAutoplay($);

  SLICK_SELECTORS.forEach((selector) => {
    $(selector).each(function unslickNode() {
      safeUnslickElement($, $(this));
    });
  });
}

export function unslickHeroSlider($) {
  if (!$?.fn?.slick) {
    return;
  }

  HERO_SLICK_SELECTORS.forEach((selector) => {
    $(selector).each(function pauseHeroInstance() {
      try {
        pauseSlickInstance($(this).slick("getSlick"));
      } catch {
        // ignore
      }
    });
  });

  HERO_SLICK_SELECTORS.forEach((selector) => {
    $(selector).each(function unslickNode() {
      safeUnslickElement($, $(this));
    });
  });
}

function slickPluginReady($) {
  return typeof $.fn?.slick === "function";
}

function initHome2Sliders($) {
  function slickReady(selector) {
    const $el = $(selector);
    return (
      $el.length > 0 &&
      $el.children().length > 0 &&
      !$el.hasClass("slick-initialized")
    );
  }

  if (slickReady(".slider-for") && slickReady(".slider-nav")) {
    const slideCount = $(".slider-for").children().length;
    const thumbCount = $(".slider-nav").children().length;
    const navSlidesToShow = Math.min(3, Math.max(1, thumbCount));

    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      autoplay: slideCount > 1,
      autoplaySpeed: 4000,
      speed: 1200,
    });
    trackSlickElement($(".slider-for"));

    $(".slider-nav").slick({
      slidesToShow: navSlidesToShow,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: false,
      centerMode: thumbCount > 1,
      focusOnSelect: true,
      vertical: true,
      arrows: false,
      verticalSwiping: true,
      autoplay: false,
      speed: 1200,
    });
    trackSlickElement($(".slider-nav"));
  }

  if (slickReady(".ca-service-slier-2")) {
    $(".ca-service-slier-2").slick({
      arrows: false,
      dots: true,
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } },
      ],
    });
    trackSlickElement($(".ca-service-slier-2"));
  }

  if (slickReady(".ca-testimonial-2")) {
    $(".ca-testimonial-2").slick({
      arrows: true,
      dots: false,
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-regular fa-arrow-right"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-regular fa-arrow-left"></i></span>',
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } },
      ],
    });
    trackSlickElement($(".ca-testimonial-2"));
  }
}

function initCargonPlugins(mode = "full") {
  if (typeof window === "undefined" || !window.jQuery) {
    return false;
  }

  const $ = window.jQuery;

  if (mode === "full" && !slickPluginReady($)) {
    return false;
  }

  if (mode === "full") {
    unslickAll($);
    initHome2Sliders($);
  }

  if (window.AOS) {
    initAos();
  }

  if ($(".counter").length && $.fn.counterUp) {
    $(".counter").counterUp({ delay: 10, time: 1000 });
  }

  if (mode === "full") {
    if ($(".popup-video").length && $.fn.magnificPopup) {
      $(".popup-video").magnificPopup({ type: "iframe" });
    }
  }

  return true;
}

export function useCargonInit(deps = [], options = {}) {
  const mode = deps.includes("base") ? "base" : "full";
  const onReadyRef = useRef(options.onReady);

  onReadyRef.current = options.onReady;

  useLayoutEffect(() => {
    if (mode !== "full") {
      return undefined;
    }

    return () => {
      if (window.jQuery) {
        try {
          runSlickCleanup(window.jQuery);
        } catch {
          // ignore
        }
      }
    };
  }, deps);

  useEffect(() => {
    let attempts = 0;
    let timer;
    let rafId = 0;
    let cancelled = false;

    const tryInit = () => {
      if (cancelled) {
        return;
      }

      if (initCargonPlugins(mode)) {
        if (mode === "full") {
          forceAosVisible();
          onReadyRef.current?.();
        }
        return;
      }

      attempts += 1;
      if (attempts >= 60) {
        if (mode === "full") {
          onReadyRef.current?.();
        }
        return;
      }

      timer = setTimeout(tryInit, 200);
    };

    const scheduleInit = () => {
      if (cancelled) {
        return;
      }

      if (window.jQuery && mode === "full") {
        unslickAll(window.jQuery);
      }

      tryInit();
    };

    const onPluginsReady = () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(scheduleInit);
      });
    };

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        timer = setTimeout(scheduleInit, 50);
      });
    });
    window.addEventListener("cargon:plugins-ready", onPluginsReady);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("cargon:plugins-ready", onPluginsReady);
    };
  }, deps);
}

export default useCargonInit;
