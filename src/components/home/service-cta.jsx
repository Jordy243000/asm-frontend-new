import React from "react";
import bg_overlay from "@/assets/img/cta/software.png";
import Link from "next/link";
//import VideoModal from "@components/common/modals/modal-video";
//import "react-modal-video/css/modal-video.min.css";
import useModal from "@/hooks/use-modal";

const ServiceCta = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <>
      <section
        className="services__cta bg-css overlay pt-125 pb-120"
        style={{ backgroundImage: `url(${bg_overlay.src})` }}
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
                <h2 className="services__cta-3-title">
                  Avec ASM RDC, Optimisez l’organisation et le suivi des
                  activités de votre entreprise avec nos produits logiciel.
                </h2>
                <div className="services__cta-3-btn">
                  <Link className="fill-btn" href="/products">
                    Découvrir nos produits
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
      {/* <VideoModal
        videoId="vWLcyFtni6U"
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
      /> */}
    </>
  );
};

export default ServiceCta;
