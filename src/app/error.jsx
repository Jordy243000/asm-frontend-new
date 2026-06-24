"use client";
import React from "react";
import bg_overlay from "@/assets/img/cta/404.png";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <section
          className="services__cta bg-css overlay pt-125 pb-120 mb-0"
          style={{ backgroundImage: `url(${bg_overlay.src})`, height: "100vh" }}
        >
          <div className="container">
            <div
              className="row justify-content-center wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay=".3s"
            >
              <div className="col-lg-8">
                <div className="services__cta-3-content text-center">
                  {/* <div className="services__cta-3-play">
                  <button 
                    type="button"
                    className="popup-video play-btn play-btn-white"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <i className="fas fa-play"></i>
                  </button>
                </div> */}
                  <h2
                    className="services__cta-3-title"
                    style={{ textTransform: "none" }}
                  >
                    Désolé, Page introuvable!
                  </h2>
                  <div className="services__cta-3-btn">
                    <Link className="fill-btn" href="/">
                      {"Aller à page d'acceuil"}
                    </Link>
                    {/* <Link href="/contact" className="skew-btn">
                    get a quote
                  </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default ErrorPage;
