"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ADMIN_TEMPLATE, VISITOR_TEMPLATE } from "@/constants/emails";
import { submitContactMessage } from "@/utils/submit-contact-message";

const MySwal = withReactContent(Swal);

const SERVICE_OPTIONS = [
  { value: "", label: "Type de demande" },
  { value: "services", label: "Services" },
  { value: "produits", label: "Produits" },
  { value: "partenariat", label: "Partenariat" },
  { value: "autre", label: "Autre" },
];

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
  subject: "",
  message: "",
};

const CargonHomeContactForm = () => {
  const [contact, setContact] = React.useState(INITIAL_STATE);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.jQuery?.fn?.niceSelect) {
      return;
    }

    const $ = window.jQuery;
    const $select = $(".ca-contact-from-2 select.nice-select");

    if ($select.length && !$select.next().hasClass("nice-select")) {
      $select.niceSelect();
    }

    return () => {
      if ($select.next().hasClass("nice-select")) {
        $select.niceSelect("destroy");
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const fullName = `${contact.firstName} ${contact.lastName}`.trim();
    const subjectLabel =
      SERVICE_OPTIONS.find((item) => item.value === contact.subject)?.label ||
      contact.subject;

    try {
      await submitContactMessage({
        name: fullName,
        email: contact.email,
        phone: contact.number,
        subject: subjectLabel,
        message: contact.message,
      });

      try {
        await axios.post("/api", {
          htmlContent: VISITOR_TEMPLATE.replaceAll("{{customer_name}}", fullName)
            .replaceAll("{{year}}", new Date().getFullYear())
            .replaceAll("{{website_link}}", window.location.origin),
          recipientEmail: contact.email,
          subject: "Accusé de réception - African Shipping Management",
        });

        await axios.post("/api", {
          htmlContent: ADMIN_TEMPLATE.replaceAll("{{customer_name}}", fullName)
            .replaceAll("{{customer_email}}", contact.email)
            .replaceAll("{{customer_phone}}", contact.number)
            .replaceAll("{{customer_field}}", subjectLabel)
            .replaceAll("{{customer_message}}", contact.message)
            .replaceAll("{{year}}", new Date().getFullYear())
            .replaceAll("{{website_link}}", window.location.origin),
          recipientEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          subject: "Nouveau message reçu - African Shipping Management",
        });
      } catch (emailError) {
        console.warn("Message enregistré, mais l’e-mail n’a pas pu être envoyé.", emailError);
      }

      setContact(INITIAL_STATE);
      event.target.reset();

      MySwal.fire({
        title: "Message envoyé",
        text: "Votre message a été envoyé avec succès. Nous vous répondrons sous peu.",
        icon: "success",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur envoi message :", error);
      MySwal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        icon: "error",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-20">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-20">
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={contact.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-20">
          <input
            type="tel"
            name="number"
            placeholder="Téléphone"
            value={contact.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-20">
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12 mb-20">
          <select
            className="nice-select wide ca-select"
            name="subject"
            value={contact.subject}
            onChange={handleChange}
            required
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value || "default"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12 mb-20">
          <textarea
            name="message"
            placeholder="Votre message"
            value={contact.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-btn">
          <button className="ca-btn-primary-22" type="submit" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer"}{" "}
            <span>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CargonHomeContactForm;
