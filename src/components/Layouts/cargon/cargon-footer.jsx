"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import CargonFooterCta from "./cargon-footer-cta";
import CargonPartnersArea from "./cargon-partners-area";
import { useSiteContent } from "@/context/site-content-provider";

const FALLBACK_SOCIAL = [
  { icon: "fa-brands fa-instagram", link: "#" },
  { icon: "fa-brands fa-facebook-f", link: "#" },
  { icon: "fa-brands fa-linkedin-in", link: "#" },
  { icon: "fa-brands fa-x-twitter", link: "#" },
];

const CargonFooter = () => {
  const { settings, footerLinks } = useSiteContent();
  const [socialData, setSocialData] = React.useState([]);
  const [email, setEmail] = React.useState("");

  const siteLogo = settings.siteLogo || "/assets/img/logo/logo.png";
  const quickLinks = footerLinks.quick;
  const otherLinks = footerLinks.other;

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/socialmedias?populate=*`)
      .then((res) => setSocialData(res?.data?.data || []))
      .catch(console.error);
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <>
      <CargonPartnersArea />
      <CargonFooterCta />

      <footer className="ca-ft-area-2 off-wh p-relative z-index-1 pt-258">
        <div className="ca-footer-area">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="ca-footer widget-1">
                  <div className="ca-ft-logo">
                    <Link href="/">
                      <img src={siteLogo} alt="ASM RDC" />
                    </Link>
                  </div>
                  <div className="ca-ft-content-2 mb-24">
                    <p className="pt-16">{settings.footerDescription}</p>
                  </div>
                  <div className="ca-footer-social ca-footer-social-2">
                    <ul>
                      {socialData.length > 0
                        ? socialData.map((datum, idx) => (
                            <li key={idx}>
                              <Link target="_blank" href={datum?.attributes?.link || "#"}>
                                <Icon icon={datum?.attributes?.icon} width="16" height="16" />
                              </Link>
                            </li>
                          ))
                        : FALLBACK_SOCIAL.map((item, idx) => (
                            <li key={idx}>
                              <Link href={item.link}>
                                <i className={item.icon}></i>
                              </Link>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="ca-footer widget-2">
                  <h4 className="ca-title fnw-700 theme-black-2 pb-24">Liens rapides</h4>
                  <div className="ca-footer-menu ca-footer-menu-2">
                    <ul>
                      {quickLinks.map((item) => (
                        <li key={item.link}>
                          <Link href={item.link}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="ca-footer widget-3">
                  <h4 className="ca-title fnw-700 theme-black-2 pb-24">Autres liens</h4>
                  <div className="ca-footer-menu ca-footer-menu-2">
                    <ul>
                      {otherLinks.map((item) => (
                        <li key={item.link}>
                          {item.isExternal ? (
                            <Link href={item.link} target="_blank">
                              {item.title}
                            </Link>
                          ) : (
                            <Link href={item.link}>{item.title}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="ca-footer widget-4">
                  <h4 className="ca-title fnw-700 theme-black-2 pb-24">Newsletter</h4>
                  <div className="ca-ft-content">
                    <p className="pb-32">
                      Inscrivez-vous et recevez nos dernières actualités et articles.
                    </p>
                  </div>
                  <div className="ca-footer-email-sub ca-footer-email-sub-2">
                    <form onSubmit={handleSubscribe}>
                      <input
                        type="email"
                        placeholder={settings.newsletterPlaceholder}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      <button className="ca-btn-primary-22" type="submit">
                        {settings.newsletterButtonText}{" "}
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="copy-right-border border-1"></div>
              </div>
              <div className="col-lg-6 col-md-6">
                <p className="copry-right-text copry-right-text-2 pt-24 pb-24">
                  Copyright &copy;{new Date().getFullYear()} African Shipping Management ASM RDC.
                  Tous droits réservés.
                </p>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="copy-right-menu copy-right-menu-2 text-end pt-24 pb-24">
                  <ul>
                    <li>
                      <Link href="/contact">Conditions générales</Link>
                    </li>
                    <li>
                      <Link href="/contact">Politique de confidentialité</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CargonFooter;
