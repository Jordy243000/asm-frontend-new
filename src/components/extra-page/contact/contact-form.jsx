import Link from "next/link";
import React from "react";
import Contact from "./contact";
import ContactForm from "./form";

const ContactFrom = () => {
  return (
    <section
      className="contact-area contact--area pt-70 pb-80 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 col-xl-6 col-lg-5">
            <Contact />
          </div>
          <div className="col-xxl-7 col-xl-6 col-lg-7">
            <div className="contact-form mb-60">
              <ContactForm />
              <p className="ajax-response"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFrom;
