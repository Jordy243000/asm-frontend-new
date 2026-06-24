import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenus from "./mobile-menus";
import logo from "@/assets/img/logo/logo.png";
//import { Icon } from "@iconify/react";

const OffCanvasMain = ({ isOffCanvasOpen, setIsOffCanvasOpen, socialData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div
        className={`sidebar__area ${isOffCanvasOpen ? "sidebar-opened" : ""}`}
      >
        <div className="sidebar__wrapper">
          <div className="sidebar__close">
            <button
              className="sidebar__close-btn"
              id="sidebar__close-btn"
              onClick={() => setIsOffCanvasOpen(false)}
            >
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="sidebar__content">
            <div className="sidebar__logo mb-40">
              <Link href="/">
                <Image
                  src={logo}
                  style={{ width: "100px", height: "auto" }}
                  alt="Logo African Shipping Management (ASM)"
                />
              </Link>
            </div>
            {/* <div className="sidebar__search mb-25">
              <form onSubmit={handleSubmit}>
                <div className="single-input-field">
                  <input name="name" type="text" placeholder="Search Here" />
                  <i className="fas fa-search"></i>
                </div>
              </form>
            </div> */}

            <div className="mobile-menu fix mb-10 mean-container">
              <div className="mean-bar">
                <MobileMenus />
              </div>
            </div>

            <div className="sidebar__contact mt-30 mb-30">
              <div className="sidebar__info fix">
                <div className="sidebar__info-item">
                  <div className="sidebar__info-icon">
                    <i className="flaticon-telephone-call"></i>
                  </div>
                  <div className="sidebar__info-text">
                    <span>Nous appeler</span>
                    <h5>
                      <a href="tel:+243857513492">+243857513492</a>
                    </h5>
                  </div>
                </div>
                <div className="sidebar__info-item">
                  <div className="sidebar__info-icon">
                    <i className="flaticon-envelope"></i>
                  </div>
                  <div className="sidebar__info-text">
                    <span>Nous écrire</span>
                    <h5>
                      <a href="mailto:contact@africansm-rdc.com">
                        contact@africansm-rdc.com
                      </a>
                    </h5>
                  </div>
                </div>
                <div className="sidebar__info-item">
                  <div className="sidebar__info-icon">
                    <i className="flaticon-pin"></i>
                  </div>
                  <div className="sidebar__info-text">
                    <span>
                      Blvd du 30 juin, Immeuble Kiyo ya Sita 9ème Niveau
                      Appartement 902 & 903
                    </span>
                    <h5>Kinshasa-Gombe, RDC</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar__social">
              <ul>
                {socialData?.map((datum, idx) => {
                  return (
                    <li key={idx}>
                      {/* <Link target="_blank" href={datum?.attributes?.link}>
                        <Icon icon={datum?.attributes?.icon} />
                      </Link> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
        onClick={() => setIsOffCanvasOpen(false)}
      ></div>
    </React.Fragment>
  );
};

export default OffCanvasMain;
