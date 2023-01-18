import React from "react";
import { Link } from "react-router-dom";

export default function Submenu(props) {
  return (
    <div className="nav__submenu">
    <Link to="/categories/sports"  className="nav__submenu-item ">Sports</Link>
    <Link to="/categories/clothes"  className="nav__submenu-item ">Clothes</Link>
    <Link to="/categories/food"  className="nav__submenu-item ">Food</Link>
</div>
  )
}
