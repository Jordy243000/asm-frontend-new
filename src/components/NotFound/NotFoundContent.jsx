import Link from "next/link";
import React from "react";

const NotFoundContent = () => {
  return (
    <>
      <div className="error-section default-padding text-center bg-cover">
        <div className="container">
          <div className="error-content">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1>Erreur</h1>
                <h2>Une erreur s'est produite</h2>
                <p>
                  Désolé, un problème est survenu lors du chargement de la page.
                  Veuillez réessayer plus tard ou revenir à la page d’accueil.
                </p>
                <Link className="btn mt-20 btn-md btn-theme" href="/">
                  Retour à l’accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundContent;
