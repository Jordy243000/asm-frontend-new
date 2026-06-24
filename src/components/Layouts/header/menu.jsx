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

  {
    id: 2,
    hasDropdown: false,
    title: "carrière",
    link: "/carriere",
  },
  {
    id: 3,
    hasDropdown: false,
    title: "produits",
    link: "/products",
    submenus: [
      { title: "services", link: "/services" },
      { title: "services-details", link: "/services-details" },
    ],
  },
  {
    id: 5,
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
    id: 6,
    hasDropdown: false,
    title: "équipe",
    link: "/equipe",
  },
  {
    id: 4,
    hasDropdown: false,
    title: "à propos de nous",
    link: "/about",
    submenus: [
      { title: "Blog", link: "/blog" },
      { title: "blog-grid-3-col", link: "/blog-grid-3-col" },
      { title: "blog-details", link: "/blog-details" },
    ],
  },
  // {
  //   id: 7,
  //   hasDropdown: false,
  //   title: "Contact",
  //   link: "/contact",
  // },
];

const Menus = () => {
  let [current, setCurrent] = React.useState("");

  React.useEffect(() => {
    current = window.location.pathname;
    setCurrent(current);

    //console.log(current, "restyyyyyy");
  }, []);
  return (
    <ul>
      {menu_data.map((menu, i) => (
        <li
          key={i}
          className={` ${
            menu.megaMenu ? "menu-item-has-children has-mega-menu" : ""
          } ${menu.hasDropdown ? "menu-item-has-children" : ""}`}
        >
          <Link
            href={menu.link}
            style={{
              fontWeight: `${current === menu?.link ? "black" : ""}`,
              textDecoration: `${current === menu?.link ? "underline" : ""}`,
              cursor: "pointer",
              //fontFamily: "Oswald",
            }}
          >
            {menu.title}
          </Link>
          {/* {menu.hasDropdown && (
            <ul className="sub-menu">
              {menu.submenus.map((sub, i) => (
                <li key={i}>
                  <Link href={sub.link}>{sub.title}</Link>
                </li>
              ))}
            </ul>
          )} */}

          {/* {menu.mega_menus && (
            <ul className="sub-menu">
              {menu.mega_menus &&
                menu?.mega_menus?.map((mega, i) => (
                  <li key={i}>
                    <Link href={mega.link} className="mega-menu-title">
                      {mega.title}
                    </Link>
                    {mega.submenus && (
                      <ul className="sub-menu">
                        {mega?.submenus?.map((sub_mega, i) => (
                          <li key={i}>
                            <Link href={sub_mega.link}>{sub_mega.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          )} */}
        </li>
      ))}
    </ul>
  );
};

export default Menus;
