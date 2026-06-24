"use client";
import React from "react";
import { useFormik } from "formik";
import { contact_schema } from "@/utils/validation-schema";
import ErrorMsg from "./error-msg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import axios from "axios";
import { ADMIN_TEMPLATE, VISITOR_TEMPLATE } from "@/constants/emails";
import { submitContactMessage } from "@/utils/submit-contact-message";

const ContactForm = () => {

   const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: "",
  };

    const [contact, setContact] = React.useState(INITIAL_STATE);
  const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
    // console.log(contact)
  };
  //sweet Alert
  const alertContent = () => {
    MySwal.fire({
      title: "Votre message a été envoyé avec succes",
      text: "Votre message a été envoyé avec success, nous vous reviendrons sous peu",
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const alertFailure = () => {
    MySwal.fire({
      title: "Desolé",
      text: "Une erreur s'est produite. S'il vous plait réessayer plus tard",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };


  //console.log("Form values:", values);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
  

    try {
      const submitObj = {
        name: contact.name,
        email: contact.email,
        number: contact.number,
        subject: contact.subject,
        message: contact.text,
      };

      await submitContactMessage({
        name: submitObj.name,
        email: submitObj.email,
        phone: submitObj.number,
        subject: submitObj.subject,
        message: submitObj.message,
      });

      try {
        await axios.post("/api", {
          htmlContent: VISITOR_TEMPLATE.replaceAll(
            "{{customer_name}}",
            submitObj.name
          )
            .replaceAll("{{year}}", new Date().getFullYear())
            .replaceAll("{{website_link}}", window.location.origin),
          recipientEmail: submitObj.email,
          subject: "Accusé de réception - African Shipping Management",
        });

        await axios.post("/api", {
          htmlContent: ADMIN_TEMPLATE.replaceAll(
            "{{customer_name}}",
            submitObj.name
          )
            .replaceAll("{{customer_email}}", submitObj.email)
            .replaceAll("{{customer_phone}}", submitObj.number)
            .replaceAll("{{customer_field}}", submitObj.subject)
            .replaceAll("{{customer_message}}", submitObj.message)
            .replaceAll("{{year}}", new Date().getFullYear())
            .replaceAll("{{website_link}}", window.location.origin),
          recipientEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          subject: "Nouveau message reçu - African Shipping Management",
        });
      } catch (emailError) {
        console.warn("Message enregistré, mais l’e-mail n’a pas pu être envoyé.", emailError);
      }

      // Reset form state
      setContact(INITIAL_STATE);
     
      e.target.reset();

      // Success Snackbar
     alertContent();
     
    } catch (error) {
      console.error("Erreur envoi message :", error);

     alertFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="single-input-field">
            <input
              name="name"
              type="text"
              placeholder="Votre nom"
              id="name"
              value={contact.name}
              onChange={handleChange}
              required
            />
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="single-input-field">
            <input
              name="email"
           
              type="email"
              placeholder="Email"
              id="email"
              value={contact.email}
              onChange={handleChange}
              required
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                                   
            />
            <i className="fas fa-envelope"></i>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="single-input-field">
            <input
              type="number"
              min="0"
              name="number"
              id="number"
              value={contact.number}
              onChange={handleChange}
              placeholder="Téléphone"
            />
            <i className="fas fa-phone-alt"></i>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="single-input-field select">
            <input
              name="subject"
             value={contact.subject}
              onChange={handleChange}
              type="text"
              placeholder="Sujet"
              id="subject"
            />
            <i className="fas fa-microphone"></i>
          </div>
        </div>
        <div className="col-xxl-12 col-xl-12 col-lg-12">
          <div className="single-input-field textarea">
            <textarea
              name="text"
              rows="10"
              cols="10"
              value={contact.text}
              onChange={handleChange}
              id="text"
             placeholder="Message"
            ></textarea>
            <i className="fas fa-edit"></i>
          </div>
        </div>
        <div className="col-xxl-12 col-xl-12">
          <button type="submit" className="fill-btn clip-btn">
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
