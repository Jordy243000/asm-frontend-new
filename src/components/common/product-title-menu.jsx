"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

const sortMenuLinks = (menuLinks = []) =>
  [...menuLinks]
    .filter((item) => item?.label && item?.url)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

const ProductTitleMenu = ({ title, productId, menuLinks = [] }) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);
  const links = sortMenuLinks(menuLinks);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLink = (link, index) => {
    const isExternal = /^https?:\/\//i.test(link.url);

    if (isExternal) {
      return (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="product-title-menu__btn fill-btn clip-md-btn"
          onClick={() => setOpen(false)}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={index}
        href={link.url}
        className="product-title-menu__btn fill-btn clip-md-btn"
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <div className="product-title-menu" ref={containerRef}>
      <div className="product-title-menu__header">
        <Link href={`/products/${productId}`}>
          <h3 className="title-sm">{title}</h3>
        </Link>
        {links.length > 0 ? (
          <button
            type="button"
            className={`product-title-menu__toggle${open ? " is-open" : ""}`}
            aria-label="Menu déroulant"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Icon icon="mdi:menu-down" width={28} height={28} />
          </button>
        ) : null}
      </div>
      {open && links.length > 0 ? (
        <div className="product-title-menu__dropdown">
          {links.map((link, index) => renderLink(link, index))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductTitleMenu;
