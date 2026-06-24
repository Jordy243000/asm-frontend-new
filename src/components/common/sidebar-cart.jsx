import Link from "next/link";
import React from "react";

import Image from "next/image";

const SidebarCart = ({ openCart, setOpenCart }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-30">
        <h4 className="sidebar-action-title mb-0">Shopping Cart</h4>
        <div className="sidebar__close2">
          <button
            onClick={() => {}}
            className="sidebar__close-btn"
            id="sidebar__close-btn"
          >
            <i className="fal fa-times"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarCart;
