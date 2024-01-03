import React from "react";
import "./header.scss";
//import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt=""></img>
      </div>
      <div className="line"> </div>
    </>
  );
};

export default Header;
