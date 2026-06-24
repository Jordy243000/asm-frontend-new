"use client";
import React from "react";
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import {
  getStrapiImageUrl,
  useTeamPageContent,
} from "@/hooks/use-team-page-content";

const CargonTeamMosaic = () => {
  const pageContent = useTeamPageContent();
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/team-gallery-photos?populate=*&sort=sortOrder:asc&pagination[pageSize]=100`
        );
        setPhotos(response?.data?.data ?? []);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message
            ? error.response.data.error.message
            : error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const imageUrls = React.useMemo(
    () =>
      photos
        .map((item) => getStrapiImageUrl(item?.attributes?.photo))
        .filter(Boolean),
    [photos]
  );

  const openViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  React.useEffect(() => {
    if (!isGalleryOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isGalleryOpen]);

  return (
    <section className="ca-team-mosaic-section pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="ca-sec-content-2 text-center mb-55">
              <h5 className="ca-section-subtitle subtitle-bg-6 p-relative theme-black-4 br-50">
                Équipe
              </h5>
              <h2 className="ca-section-title theme-black-4 fnw-600 pt-16 ca-text-cap">
                {pageContent.galleryTitle}
              </h2>
              {pageContent.galleryIntro ? (
                <p className="pt-16">{pageContent.galleryIntro}</p>
              ) : null}
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="text-center">Chargement des photos...</p>
        ) : null}

        {!isLoading && errorMsg ? (
          <p className="text-center text-danger">{errorMsg}</p>
        ) : null}

        {!isLoading && !errorMsg && imageUrls.length === 0 ? (
          <p className="text-center">Aucune photo disponible pour le moment.</p>
        ) : null}

        {!isLoading && imageUrls.length > 0 ? (
          <button
            type="button"
            className="ca-team-mosaic-frame br-7"
            onClick={() => setIsGalleryOpen(true)}
            aria-label="Ouvrir la galerie de la grande équipe"
          >
            <div className="ca-team-mosaic-grid">
              {imageUrls.map((url, index) => (
                <div className="ca-team-mosaic-cell" key={`${url}-${index}`}>
                  <img src={url} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <span className="ca-team-mosaic-overlay">
              <span className="ca-team-mosaic-count">
                {imageUrls.length} photos
              </span>
              <span className="ca-team-mosaic-cta">Voir toute l&apos;équipe</span>
            </span>
          </button>
        ) : null}
      </div>

      {isGalleryOpen ? (
        <div
          className="ca-team-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie La grande équipe"
        >
          <div className="ca-team-gallery-modal__header">
            <h3>{pageContent.galleryTitle}</h3>
            <button
              type="button"
              className="ca-team-gallery-modal__close"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Fermer la galerie"
            >
              ×
            </button>
          </div>
          <div className="ca-team-gallery-modal__body">
            <div className="ca-team-gallery-grid">
              {imageUrls.map((url, index) => (
                <button
                  type="button"
                  className="ca-team-gallery-item"
                  key={`${url}-${index}`}
                  onClick={() => openViewer(index)}
                >
                  <img
                    src={url}
                    alt={`Membre de l'équipe ASM RDC ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isViewerOpen ? (
        <ImageViewer
          src={imageUrls}
          currentIndex={currentImage}
          onClose={closeViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 1100,
          }}
          closeOnClickOutside
        />
      ) : null}
    </section>
  );
};

export default CargonTeamMosaic;
