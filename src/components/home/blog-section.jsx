import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";

import blog_img from "@/assets/img/blog/blog1.png";
import blog_img_2 from "@/assets/img/blog/blog2.png";
import blog_img_3 from "@/assets/img/blog/blog3.png";
import blog_img_4 from "@/assets/img/blog/blog4.png";
import blog_img_5 from "@/assets/img/blog/blog5.png";

const blog_data = [
  {
    id: 1,
    author: "Jean Dupont",
    image: blog_img,
    date: "2025-06-20T05:22:00.000Z",
    type: "article",
    title: "L'importance du Transport Multimodal dans la Logistique Moderne",
    description:
      "Découvrez comment le transport multimodal optimise la chaîne logistique et réduit les coûts pour les entreprises.",
    content: [
      {
        title: "Pourquoi choisir le transport multimodal ?",
        paragraphs: [
          {
            text: "Le transport multimodal permet de combiner plusieurs modes de transport (maritime, routier, ferroviaire, aérien) pour optimiser les coûts et réduire les délais de livraison.",
            img: blog_img_2,
            checklist: [
              "Réduction des délais de transit",
              "Optimisation des coûts logistiques",
              "Meilleure gestion des flux de marchandises",
            ],
          },
          {
            text: "Grâce à une coordination efficace entre les différents modes de transport, il est possible de minimiser les risques de rupture dans la chaîne d'approvisionnement et d'améliorer la traçabilité des marchandises.",
            img: "",
            checklist: [
              "Suivi en temps réel des expéditions",
              "Diminution de l'empreinte carbone",
              "Amélioration de la sécurité des marchandises",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: "Marie Lemoine",
    image: blog_img_3,
    date: "2025-06-18T14:10:00.000Z",
    type: "news",
    title:
      "ASM lance une nouvelle plateforme digitale pour la gestion portuaire",
    description:
      "African Shipping Management révolutionne la gestion portuaire avec une nouvelle plateforme numérique.",
    content: [
      {
        title: "Une digitalisation au service des ports",
        paragraphs: [
          {
            text: "ASM a récemment lancé une plateforme innovante pour moderniser la gestion des infrastructures portuaires. Cette solution permet un suivi en temps réel des activités portuaires et une meilleure allocation des ressources.",
            img: blog_img_4,
            checklist: [
              "Optimisation des flux de marchandises",
              "Gestion simplifiée des redevances portuaires",
              "Réduction des délais d'attente",
            ],
          },
          {
            text: "Grâce à cette solution, les opérateurs portuaires peuvent accéder à des tableaux de bord interactifs, améliorant ainsi la prise de décision et la performance globale du port.",
            img: "",
            checklist: [
              "Analyse en temps réel des données",
              "Automatisation des processus",
              "Sécurité et transparence accrues",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    author: "Paul Nzinga",
    image: blog_img_5,
    date: "2025-06-15T09:45:00.000Z",
    type: "communication",
    title: "Mise à jour des procédures de gestion des ports secs",
    description:
      "ASM informe ses partenaires sur les nouvelles réglementations concernant la gestion des ports secs.",
    content: [
      {
        title: "Nouvelles réglementations et impact sur les opérations",
        paragraphs: [
          {
            text: "Suite aux récentes mises à jour réglementaires, la gestion des ports secs devra s'adapter pour améliorer la transparence et l'efficacité des processus douaniers.",
            img: "",
            checklist: [
              "Nouvelle réglementation en vigueur dès juillet 2025",
              "Obligation de traçabilité des marchandises",
              "Optimisation des flux logistiques",
            ],
          },
          {
            text: "ASM accompagne ses partenaires dans cette transition en proposant des formations et des outils numériques facilitant l'adaptation aux nouvelles normes.",
            img: "",
            checklist: [
              "Mise en place de formations spécifiques",
              "Intégration de nouvelles technologies",
              "Accompagnement personnalisé des opérateurs",
            ],
          },
        ],
      },
    ],
  },
];

const BlogSection = ({ blogData }) => {
  return (
    <section className="blog pt-120 pb-55 white-bg">
      <div className="container">
        <div
          className="blog-section-title mb-55 wow fadeInUp"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="section__title">
              <span className="sub-title">Dernières</span>
              <h2 className="title">Actualités et communications</h2>
            </div>
            <div className="blog__more-btn d-none d-sm-block t-right">
              <Link href="/blog">
                Voir plus<i className="fas fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="blog__box">
          <div className="row">
            {blogData?.map((item, idx) => (
              <div className="col-xl-4 col-lg-4 col-md-6" key={idx}>
                <article>
                  <div
                    className="blog__item mb-60 w-img wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".6s"
                  >
                    <div className="blog__item-img mb-35">
                      <Link href={`/blog/${item?.id}`}>
                        <img
                          // src={item.image}
                          src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`}
                          style={{ width: "100%", height: "auto" }}
                          className="img-fluid"
                          alt={`Blog-${item?.attributes?.title}-African Shipping Management(ASM) RDC`}
                        />
                      </Link>
                    </div>
                    <div className="blog__item-date">
                      <span>
                        {moment(item?.attributes?.publishedAt).format("DD MMM")}
                      </span>
                    </div>
                    <div className="blog__item-content">
                      <h2>
                        <Link href={`/blog/${item?.id}`}>
                          {item?.attributes?.title}
                        </Link>
                      </h2>
                      <div className="blog__meta">
                        <span>
                          <Link href={`/blog/${item?.id}`}>
                            <i className={"fas fa-list"}></i>
                            {item?.attributes?.type === "article"
                              ? `Article`
                              : item?.attributes?.type === "news"
                              ? `Actualité`
                              : "Communication"}
                          </Link>
                        </span>
                        <span>
                          <Link href={`/blog-details/${item?.id}`}>
                            <i className={"far fa-user"}></i>{" "}
                            {item.attributes?.author}
                          </Link>
                        </span>
                      </div>
                      <div className="blog__item-text">
                        <p>
                          {item?.attributes?.description?.length > 100
                            ? `${item?.attributes?.description?.substring(
                                0,
                                100
                              )}...`
                            : item?.attributes?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
