// import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <img src="/logos/Paltech_white_small.png" alt="paltech-logo" />
          </div>
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/howtouse" className="nav-link">
              How To Use
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
