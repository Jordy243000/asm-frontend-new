export const cargonMenu = [
  { title: "Accueil", link: "/" },
  {
    title: "Carrière",
    link: "/carriere/offres",
    children: [
      { title: "Offre d'emploi", link: "/carriere/offres" },
      { title: "Appel d'offres", link: "/carriere/appels-doffres" },
      { title: "Candidature", link: "/carriere/candidature" },
    ],
  },
  { title: "Produits", link: "/products" },
  { title: "Blog", link: "/blog" },
  { title: "Équipe", link: "/equipe" },
  { title: "À propos", link: "/about" },
];

export const isMenuActive = (pathname, menu) => {
  if (menu.children?.length) {
    return menu.children.some((child) => isChildActive(pathname, child.link));
  }
  return pathname === menu.link;
};

export const isChildActive = (pathname, link) => {
  if (link === "/carriere/offres") {
    return (
      pathname === link ||
      (/^\/carriere\/\d+/.test(pathname) && !pathname.includes("appels") && !pathname.includes("candidature"))
    );
  }
  return pathname === link || pathname.startsWith(`${link}/`);
};
