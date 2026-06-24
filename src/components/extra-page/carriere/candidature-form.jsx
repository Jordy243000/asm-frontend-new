"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  CANDIDATURE_CONTRACTS,
  CANDIDATURE_EDUCATION,
  CANDIDATURE_EXPERIENCE,
  CANDIDATURE_LOCATIONS,
  CANDIDATURE_PROFILES,
  CV_ACCEPT,
  CV_MAX_SIZE_MB,
} from "@/constants/candidature-options";

function fireSwal(options) {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return withReactContent(Swal).fire(options);
}

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profile: "",
  desiredContract: "",
  motivation: "",
  availability: "",
  experience: "",
  educationLevel: "",
  location: "",
  locationOther: "",
  acceptTerms: false,
  cv: null,
  motivationFile: null,
};

const CandidatureForm = () => {
  const [form, setForm] = React.useState(INITIAL_FORM);
  const [loading, setLoading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [motivationDragOver, setMotivationDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const motivationFileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.jQuery?.fn?.niceSelect) {
      return;
    }

    const $ = window.jQuery;
    const $selects = $(".ca-candidature-form select");

    $selects.each(function destroyNiceSelect() {
      const $el = $(this);
      if ($el.next().hasClass("nice-select")) {
        $el.niceSelect("destroy");
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "location" && value !== "Autre" ? { locationOther: "" } : {}),
    }));
  };

  const setCvFile = (file) => {
    if (!file) return;

    if (file.size > CV_MAX_SIZE_MB * 1024 * 1024) {
      fireSwal({
        title: "Fichier trop volumineux",
        text: `La taille maximale est de ${CV_MAX_SIZE_MB} Mo.`,
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    setForm((prev) => ({ ...prev, cv: file }));
  };

  const setMotivationFile = (file) => {
    if (!file) return;

    if (file.size > CV_MAX_SIZE_MB * 1024 * 1024) {
      fireSwal({
        title: "Fichier trop volumineux",
        text: `La taille maximale est de ${CV_MAX_SIZE_MB} Mo.`,
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    setForm((prev) => ({ ...prev, motivationFile: file }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files?.[0] || null);
  };

  const handleMotivationFileChange = (e) => {
    setMotivationFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setCvFile(e.dataTransfer.files?.[0] || null);
  };

  const handleMotivationDrop = (e) => {
    e.preventDefault();
    setMotivationDragOver(false);
    setMotivationFile(e.dataTransfer.files?.[0] || null);
  };

  const alertSuccess = () => {
    fireSwal({
      title: "Candidature envoyée",
      text: "Merci ! Votre dossier a bien été transmis à notre équipe RH.",
      icon: "success",
      timer: 5500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const alertFailure = (message) => {
    fireSwal({
      title: "Erreur",
      text:
        message ||
        "Une erreur s'est produite. Veuillez réessayer plus tard.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cv) {
      alertFailure("Veuillez joindre votre CV.");
      return;
    }

    if (!form.motivation.trim() && !form.motivationFile) {
      alertFailure(
        "Saisissez un texte de motivation ou joignez un fichier de motivation."
      );
      return;
    }

    if (!form.acceptTerms) {
      alertFailure("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    if (form.location === "Autre" && !form.locationOther.trim()) {
      alertFailure("Veuillez préciser votre localisation.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        profile: form.profile,
        desiredContract: form.desiredContract,
        motivation: form.motivation,
        availability: form.availability,
        experience: form.experience,
        educationLevel: form.educationLevel,
        location: form.location,
        locationOther:
          form.location === "Autre" ? form.locationOther.trim() : "",
        acceptTerms: form.acceptTerms,
      })
    );
    formData.append("cv", form.cv);
    if (form.motivationFile) {
      formData.append("motivationFile", form.motivationFile);
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/spontaneous-applications/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setForm(INITIAL_FORM);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (motivationFileInputRef.current) {
        motivationFileInputRef.current.value = "";
      }
      alertSuccess();
    } catch (error) {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message;
      alertFailure(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="ca-candidature-form" onSubmit={handleSubmit} noValidate>
      <div className="ca-candidature-form__head">
        <Link href="/carriere/offres" className="ca-candidature-form__back">
          <i className="fa-solid fa-arrow-left" /> Voir les offres d&apos;emploi
        </Link>
        <span className="ca-candidature-form__required-note">
          <span className="text-danger">*</span> Champs requis
        </span>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <label className="ca-candidature-label" htmlFor="firstName">
            Prénom <span className="text-danger">*</span>
          </label>
          <input
            id="firstName"
            className="ca-candidature-input"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="col-md-6">
          <label className="ca-candidature-label" htmlFor="lastName">
            Nom <span className="text-danger">*</span>
          </label>
          <input
            id="lastName"
            className="ca-candidature-input"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>

        <div className="col-12">
          <label className="ca-candidature-label" htmlFor="email">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            className="ca-candidature-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="col-12">
          <label className="ca-candidature-label" htmlFor="phone">
            Téléphone <span className="text-danger">*</span>
          </label>
          <div className="ca-candidature-phone">
            <span className="ca-candidature-phone__prefix">+243</span>
            <input
              id="phone"
              className="ca-candidature-input"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="99 000 00 00"
              required
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="col-12">
          <label className="ca-candidature-label" htmlFor="profile">
            Votre profil <span className="text-danger">*</span>
          </label>
          <select
            id="profile"
            className="ca-candidature-input ca-candidature-select"
            name="profile"
            value={form.profile}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            {CANDIDATURE_PROFILES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label className="ca-candidature-label" htmlFor="desiredContract">
            Contrat souhaité <span className="text-danger">*</span>
          </label>
          <select
            id="desiredContract"
            className="ca-candidature-input ca-candidature-select"
            name="desiredContract"
            value={form.desiredContract}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            {CANDIDATURE_CONTRACTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <div className="ca-candidature-motivation">
            <label className="ca-candidature-label" htmlFor="motivation">
              Texte de motivation <span className="text-danger">*</span>
            </label>
            <textarea
              id="motivation"
              className="ca-candidature-input ca-candidature-textarea"
              name="motivation"
              rows={6}
              value={form.motivation}
              onChange={handleChange}
              placeholder="Présentez votre parcours et vos motivations..."
            />
            <div
              className={`ca-candidature-dropzone ca-candidature-motivation__dropzone${
                motivationDragOver ? " is-dragover" : ""
              }${form.motivationFile ? " has-file" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setMotivationDragOver(true);
              }}
              onDragLeave={() => setMotivationDragOver(false)}
              onDrop={handleMotivationDrop}
              onClick={() => motivationFileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  motivationFileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <input
                ref={motivationFileInputRef}
                type="file"
                accept={CV_ACCEPT}
                className="d-none"
                onChange={handleMotivationFileChange}
              />
              <div className="ca-candidature-dropzone__icon">
                <i className="fa-regular fa-file-lines" />
              </div>
              {form.motivationFile ? (
                <p className="ca-candidature-dropzone__title mb-8">
                  <strong>{form.motivationFile.name}</strong>
                </p>
              ) : (
                <p className="ca-candidature-dropzone__title mb-8">
                  Déposer ou{" "}
                  <span className="theme-color-2">choisir un fichier</span>
                </p>
              )}
              <p className="ca-candidature-dropzone__hint mb-0">
                Taille fichier {CV_MAX_SIZE_MB} Mo max — Formats acceptés .docx,
                .doc, .pdf, .png, .jpg, .jpeg, .odt
              </p>
            </div>
            <p className="ca-candidature-motivation__note">
              Saisissez votre motivation ci-dessus ou joignez un fichier.
            </p>
          </div>
        </div>

        <div className="col-12">
          <label className="ca-candidature-label">
            CV <span className="text-danger">*</span>
          </label>
          <div
            className={`ca-candidature-dropzone${dragOver ? " is-dragover" : ""}${
              form.cv ? " has-file" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={CV_ACCEPT}
              className="d-none"
              onChange={handleFileChange}
            />
            <div className="ca-candidature-dropzone__icon">
              <i className="fa-regular fa-file-lines" />
            </div>
            {form.cv ? (
              <p className="ca-candidature-dropzone__title mb-8">
                <strong>{form.cv.name}</strong>
              </p>
            ) : (
              <p className="ca-candidature-dropzone__title mb-8">
                Déposer ou{" "}
                <span className="theme-color-2">choisir un fichier</span>
              </p>
            )}
            <p className="ca-candidature-dropzone__hint mb-0">
              Taille fichier {CV_MAX_SIZE_MB} Mo max — Formats acceptés .docx,
              .doc, .pdf, .png, .jpg, .jpeg, .odt
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <label className="ca-candidature-label" htmlFor="availability">
            Votre disponibilité <span className="text-danger">*</span>
          </label>
          <div className="ca-candidature-date">
            <input
              id="availability"
              className="ca-candidature-input"
              type="date"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              required
            />
            <i className="fa-regular fa-calendar" />
          </div>
        </div>

        <div className="col-md-6">
          <label className="ca-candidature-label" htmlFor="experience">
            Votre expérience <span className="text-danger">*</span>
          </label>
          <select
            id="experience"
            className="ca-candidature-input ca-candidature-select"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            {CANDIDATURE_EXPERIENCE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label className="ca-candidature-label" htmlFor="educationLevel">
            Votre niveau d&apos;étude <span className="text-danger">*</span>
          </label>
          <select
            id="educationLevel"
            className="ca-candidature-input ca-candidature-select"
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            {CANDIDATURE_EDUCATION.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <fieldset className="ca-candidature-fieldset">
            <legend className="ca-candidature-label mb-16">
              Localisation <span className="text-danger">*</span>
            </legend>
            <div className="ca-candidature-locations">
              {CANDIDATURE_LOCATIONS.map((city) => (
                <label key={city} className="ca-candidature-radio">
                  <input
                    type="radio"
                    name="location"
                    value={city}
                    checked={form.location === city}
                    onChange={handleChange}
                    required
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
            {form.location === "Autre" ? (
              <div className="ca-candidature-location-other">
                <label className="ca-candidature-label" htmlFor="locationOther">
                  Précisez votre localisation{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="locationOther"
                  className="ca-candidature-input"
                  type="text"
                  name="locationOther"
                  value={form.locationOther}
                  onChange={handleChange}
                  placeholder="Ville ou région"
                  required
                  autoComplete="address-level2"
                />
              </div>
            ) : null}
          </fieldset>
        </div>

        <div className="col-12">
          <label className="ca-candidature-checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              required
            />
            <span>
              J&apos;ai lu et déclare accepter les{" "}
              <Link href="/about" className="theme-color-2">
                conditions d&apos;utilisation
              </Link>{" "}
              <span className="text-danger">*</span>
            </span>
          </label>
        </div>

        <div className="col-12 text-center pt-8">
          <button
            type="submit"
            className="ca-candidature-submit"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CandidatureForm;
