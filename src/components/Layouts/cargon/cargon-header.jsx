"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Icon } from "@iconify/react";
import { isChildActive, isMenuActive } from "@/constants/cargon-menu";
import { DEFAULT_NAVIGATION } from "@/constants/site-content-fallbacks";
import { useSiteContent } from "@/context/site-content-provider";

const CargonHeader = () => {
  const { navigation, settings } = useSiteContent();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuItems = navigation?.length ? navigation : DEFAULT_NAVIGATION;
  const siteLogo = settings.siteLogo || "/assets/img/logo/logo.png";
  const [current, setCurrent] = React.useState("");
  const [socialData, setSocialData] = React.useState([]);
  const [mobileOpenKey, setMobileOpenKey] = React.useState(null);

  React.useEffect(() => {
    const header = document.querySelector("header.header-2.stiky");
    if (!header) {
      return undefined;
    }

    if (!isHome) {
      header.dataset.headerPinned = "true";
      header.classList.add("scroll-header");
      return () => {
        delete header.dataset.headerPinned;
      };
    }

    delete header.dataset.headerPinned;

    const onScroll = () => {
      if (window.scrollY < 1) {
        header.classList.remove("scroll-header");
      } else {
        header.classList.add("scroll-header");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  React.useEffect(() => {
    setCurrent(window.location.pathname);
  }, []);

  React.useEffect(() => {
    const open = () => {
      document.querySelector(".ca-offcanvas")?.classList.add("ca-offcanvas-open");
      document.querySelector(".ca-offcanvas-overlay")?.classList.add("ca-offcanvas-overlay-open");
    };
    const close = () => {
      document.querySelector(".ca-offcanvas")?.classList.remove("ca-offcanvas-open");
      document.querySelector(".ca-offcanvas-overlay")?.classList.remove("ca-offcanvas-overlay-open");
      setMobileOpenKey(null);
    };

    document.querySelectorAll(".ca-offcanvas-toogle").forEach((btn) => {
      btn.addEventListener("click", open);
    });
    document.querySelectorAll(".ca-offcanvas-close-toggle, .ca-offcanvas-overlay").forEach((btn) => {
      btn.addEventListener("click", close);
    });

    return () => {
      document.querySelectorAll(".ca-offcanvas-toogle").forEach((btn) => {
        btn.removeEventListener("click", open);
      });
      document.querySelectorAll(".ca-offcanvas-close-toggle, .ca-offcanvas-overlay").forEach((btn) => {
        btn.removeEventListener("click", close);
      });
    };
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/socialmedias?populate=*`)
      .then((res) => setSocialData(res?.data?.data || []))
      .catch(console.error);
  }, []);

  const renderDesktopItem = (menu) => {
    if (menu.children?.length) {
      const active = isMenuActive(current, menu);
      return (
        <li key={menu.title} className={`has-dropdown${active ? " active" : ""}`}>
          <Link href={menu.link} className={active ? "active" : ""}>
            {menu.title}
            <i className="fa-solid fa-chevron-right ca-nav-dropdown-icon" aria-hidden="true" />
          </Link>
          <ul className="sub-menu">
            {menu.children.map((child) => (
              <li key={child.link}>
                <Link
                  href={child.link}
                  className={isChildActive(current, child.link) ? "active" : ""}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={menu.link}>
        <Link href={menu.link} className={current === menu.link ? "active" : ""}>
          {menu.title}
        </Link>
      </li>
    );
  };

  const renderMobileItem = (menu) => {
    if (menu.children?.length) {
      const active = isMenuActive(current, menu);
      const isOpen = mobileOpenKey === menu.title;

      return (
        <li key={menu.title} className={`has-dropdown${active ? " active" : ""}${isOpen ? " submenu-open" : ""}`}>
          <div className="ca-mobile-nav-row">
            <Link href={menu.link}>{menu.title}</Link>
            <button
              type="button"
              className="ca-menu-close2"
              aria-expanded={isOpen}
              aria-label={`Afficher le sous-menu ${menu.title}`}
              onClick={() => setMobileOpenKey(isOpen ? null : menu.title)}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
          <ul className="sub-menu" style={{ display: isOpen ? "block" : undefined }}>
            {menu.children.map((child) => (
              <li key={child.link}>
                <Link href={child.link}>{child.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={menu.link}>
        <Link href={menu.link}>{menu.title}</Link>
      </li>
    );
  };

  const renderLogo = (maxHeight) => {
    if (!isHome) {
      return <img src={siteLogo} alt="ASM RDC" style={{ maxHeight }} />;
    }

    return (
      <div className="preloader-logo-wrap preloader-logo-wrap--header">
        <img
          src={siteLogo}
          alt="ASM RDC"
          className="header-logo-swing"
          style={{ maxHeight }}
        />
      </div>
    );
  };

  return (
    <>
      <header className={`header-2 stiky${isHome ? "" : " scroll-header"}`}>
        <div className="container ca-header-bg-2">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-6">
              <div className="ca-logo">
                <Link href="/">{renderLogo(48)}</Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="ca-main-menu-2">
                <nav className="ca-mobile-menu-active-2">
                  <ul>{menuItems.map(renderDesktopItem)}</ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="ca-btn-header text-end d-none d-lg-block">
                <Link href="/contact" className="ca-btn-primary-22">
                  Nous contacter{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
              <div className="ca-header-action-item d-lg-none text-end">
                <button type="button" className="ca-offcanvas-toogle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                    <rect x="10" width="20" height="2" fill="currentColor"></rect>
                    <rect x="5" y="7" width="25" height="2" fill="currentColor"></rect>
                    <rect x="10" y="14" width="20" height="2" fill="currentColor"></rect>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="ca-offcanvas w-bg">
        <div className="ca-offcanvas-wrapper">
          <div className="ca-offcanvas-header d-flex justify-content-between align-items-center mb-40">
            <div className="ca-offcanvas-logo">
              <Link href="/">{renderLogo(44)}</Link>
            </div>
            <div className="ca-offcanvas-close">
              <button className="ca-offcanvas-close-toggle" type="button">
                <i className="fal fa-times"></i>
              </button>
            </div>
          </div>
          <div className="ca-offcanvas-menu-2 mb-40">
            <nav>
              <ul>{menuItems.map(renderMobileItem)}</ul>
            </nav>
          </div>
          <div className="ca-offcanvas-contact mb-40">
            <Link href="/contact" className="ca-btn-primary ca-btn-primary-2 theme-bg-2 text-white">
              Nous contacter{" "}
              <span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
          <div className="ca-offcanvas-social mb-40">
            <h3 className="ca-offcanvas-sm-title">Suivez-nous</h3>
            <div className="ca-footer-social ca-footer-social-2">
              <ul>
                {socialData.map((datum, idx) => (
                  <li key={idx}>
                    <Link target="_blank" href={datum?.attributes?.link}>
                      <Icon icon={datum?.attributes?.icon} width="16" height="16" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="ca-offcanvas-overlay"></div>
    </>
  );
};

export default CargonHeader;
