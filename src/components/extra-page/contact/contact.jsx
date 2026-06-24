import Link from "next/link";
import React from "react";

const contact__info = [
  {
    id: 1,
    text: "Appellez-nous",
    contact: "tel:+243810042100",
    option: "+243 810 042 100",
    icon: "flaticon-telephone-call",
  },
  {
    id: 2,
    text: "Contact par e-mail",
    contact: "mailto:info@asm.com",
    option: "info@asm.com",
    icon: "flaticon-envelope",
  },
  {
    id: 3,
    text: "Nos bureaux",
    contact:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5629568827953!2d15.3111634!3d-4.304700899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33f5a4ee5555%3A0xf60143a51d88a5ca!2sALMER%20TRADING!5e0!3m2!1sen!2scd!4v1743235253198!5m2!1sen!2scd",
    option: "Kinshasa, RDC",
    icon: "flaticon-pin",
  },
];

const Contact = () => {
  const contactData = [
    {
      id: 1,
      icon: "flaticon-telephone-call",
      contact: "tel:+243991450541",
      infoText: "Appellez-nous",
      other: "+243991450541",
    },
    {
      id: 2,
      icon: "flaticon-envelope",
      contact: "mailto:support@africansm-rdc.com",
      infoText: "Contact par e-mail",
      other: "support@africansm-rdc.com",
    },
    {
      id: 3,
      icon: "flaticon-pin",
      contact: "https://maps.app.goo.gl/c2uNwedvQtqYdd9H8",
      infoText:
        " Blvd du 30 juin, Immeuble Kiyo ya Sita 9ème Niveau Appartement 902 & 903",
      other: "Kinshasa-Gombe, RDC",
    },
  ];
  return (
    <div className="contact--wrapper mb-60">
      <div className="section__title mb-45">
        <span className="sub-title">Nous contacter</span>
        <h2 className="title">Exprimez-nous vos besoins</h2>
      </div>
      <div className="contact-info mr-20">
        {contactData.map((item) => (
          <div
            className="single-contact-info d-flex align-items-center"
            key={item.id}
          >
            <div className="contact-info-icon">
              <Link href="#">
                <i className={item.icon}></i>
              </Link>
            </div>
            <div className="contact-info-text">
              <span>{item.infoText}</span>
              <h5>
                <Link href={item.contact}>{item.other}</Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
