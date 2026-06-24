import React from "react";
import Link from "next/link";

const menu_data = [
  {
    id: 1,
    hasDropdown: false,
    title: "Accueil",
    link: "/",
    submenus: [
      { title: "Home Style 01", link: "/" },
      { title: "Home Style 02", link: "/home-2" },
      { title: "Home Style 03", link: "/home-3" },
    ],
  },
  // {
  //   id: 2,
  //   hasDropdown: true,
  //   title: "shop",
  //   link: "/shop",
  //   submenus: [
  //     { title: "shop", link: "/shop" },
  //     { title: "shop details", link: "/shop-details" },
  //     { title: "wishlist", link: "/wishlist" },
  //     { title: "cart", link: "/cart" },
  //     { title: "checkout", link: "/checkout" },
  //   ],
  // },
  {
    id: 3,
    hasDropdown: false,
    title: "Carrière",
    link: "/carriere",
  },
  {
    id: 5,
    hasDropdown: false,
    title: "produits",
    link: "/products",
    submenus: [
      { title: "services", link: "/services" },
      { title: "services-details", link: "/services-details" },
    ],
  },
  {
    id: 7,
    hasDropdown: false,
    title: "Blog",
    link: "/blog",
    submenus: [
      { title: "Blog", link: "/blog" },
      { title: "blog-grid-3-col", link: "/blog-grid-3-col" },
      { title: "blog-details", link: "/blog-details" },
    ],
  },
  {
    id: 8,
    hasDropdown: false,
    title: "Équipe",
    link: "/equipe",
  },
  {
    id: 6,
    hasDropdown: false,
    title: "à propos de nous",
    link: "/about",
    submenus: [
      { title: "Blog", link: "/blog" },
      { title: "blog-grid-3-col", link: "/blog-grid-3-col" },
      { title: "blog-details", link: "/blog-details" },
    ],
  },
  {
    id: 9,
    hasDropdown: false,
    title: "Nous contacter",
    link: "/contact",
  },
];

const MobileMenus = () => {
  const [subMenu, setSubMenu] = React.useState("");
  const [navTitle, setNavTitle] = React.useState("");
  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  // openSubMobileMenu
  const openSubMobileMenu = (s_menu) => {
    if (subMenu === s_menu) {
      setSubMenu("");
    } else {
      setSubMenu(s_menu);
    }
  };
  return (
    <nav className="mean-nav">
      <ul>
        {menu_data.map((menu, i) => (
          <React.Fragment key={i}>
            <li className="menu-item-has-children">
              <Link href={menu.link}>{menu.title}</Link>
              {/* <ul
                className="sub-menu"
                style={{
                  display: navTitle === menu.title ? "block" : "none",
                }}
              >
                {menu.submenus.map((sub, i) => (
                  <li key={i}>
                    <Link href={sub.link}>{sub.title}</Link>
                  </li>
                ))}
              </ul> */}
              {/* <Link
                href="#"
                className={`mean-expand ${
                  navTitle === menu.title ? "mean-clicked" : ""
                }`}
                onClick={() => openMobileMenu(menu.title)}
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <i className="fal fa-plus"></i>
              </Link> */}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenus;
