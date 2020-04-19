import React from "react";
import "./Header.css";
import logo from '../../images/shield-alt-solid.svg';

const Header = ({ title, subtitle }) => {
  return (
    <header className="Header">
      <div className="Header-logo-container">
        <img src={logo} alt="logo" className="Header-logo"></img>
      </div>
      <div className="Header-description">
        <span className="Header-title">{title}</span>
        <span className="Header-subtitle">{subtitle}</span>
      </div>
    </header>
  );
};

export default Header;
