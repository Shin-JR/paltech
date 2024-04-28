// import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <img src="/Paltech_white_small.png" alt="paltech-logo" />
          </div>
          <nav className="nav">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/howtouse" className="nav-link">
              How To Use
            </a>
            <a href="/answers" className="nav-link">
              Answers
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
