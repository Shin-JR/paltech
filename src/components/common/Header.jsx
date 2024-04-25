// import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <h1>Paltech</h1>
          </div>
          <nav className="nav">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/howto" className="nav-link">
              How To
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
