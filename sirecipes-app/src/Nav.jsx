import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          Sirecipes
        </Link>
        <div className="tabs">
          <Link to="/" className="active">
            Find
          </Link>
          <Link to="/add">Add</Link>
        </div>
      </div>
      <div className="nav-right">
        <img src="https://icongr.am/material/account.svg?size=128&color=currentColor"/>
      </div>
    </nav>
  );
}

export default Nav;
