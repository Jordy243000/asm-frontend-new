import React from "react";
import Image from "next/image";
import Link from "next/link";

const ContactInfoArea = () => {
  const contact__info = [
    {
      id: 1,
      text: "Appellez-nous",
      contact: "tel:+243857513492",
      option: "+243857513492",
      icon: "flaticon-telephone-call",
    },
    {
      id: 2,
      text: "Contact par e-mail",
      contact: "mailto:contact@africansm-rdc.com",
      option: "contact@africansm-rdc.com",
      icon: "flaticon-envelope",
    },
    {
      id: 3,
      text: "Immeuble Kiyo ya Sita 9ème Niveau Appartement 902 & 903",
      contact: "https://maps.app.goo.gl/c2uNwedvQtqYdd9H8",
      option: "Kinshasa, RDC",
      icon: "flaticon-pin",
    },
  ];
  return (
    <section
      className="contact__area contact__bg pt-120 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
      data-background="assets/img/contact/map-bg.png"
    >
      <div className="container">
        {/* <div className="contact__info-box mb-120">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="contact__content">
                <div className="section__title">
                  <span className="sub-title">contact us</span>
                  <h2 className="title">
                    nearest locations to <br /> learn your delivery <br />{" "}
                    process easy.
                  </h2>
                </div>
                <p className="mb-45">
                  From finance, retail, and travel, to social media,
                  cybersecurity, adtech, and more, market leaders are leveraging
                  web data to maintain their transt advantage.
                </p>
                <div className="contact__content-btn">
                  <Link href="/contact" className="fill-btn">
                    get direction
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="coverage__map p-relative wow slideInUp">
                <div className="dot-main">
                  {contact_data.map((item) => (
                    <div className="dot-main-item" key={item.id}>
                      <div className={item.style}>
                        <div className="dot-content p-relative">
                          <div className="dot-inner">
                            <Image src={item.image} alt="contact img"></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="contact__info">
          <div className="row">
            {contact__info.map((item) => (
              <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
                <div className="contact__shadow">
                  <div className="contact__info-item mb-30">
                    <div className="contact__info-text">
                      <span>{item.text}</span>
                      <h3>
                        <Link href={item.contact}>{item.option}</Link>
                      </h3>
                    </div>
                    <div className="contact__info-icon">
                      <i className={item.icon}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoArea;
