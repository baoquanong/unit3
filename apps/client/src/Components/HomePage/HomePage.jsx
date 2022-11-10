import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./HomePage.css";
import welcome from "../../images/Welcome.png";

export default function HomePage() {
  // setting up navigation
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <img src={welcome} />
      <div id="home-content">
        <p id="welcome">welcome to your</p>
        <h1 id="logo">
          <span>SIDE</span>
          HUSTLE
        </h1>
        <p id="blurb">where people and jobs connect</p>
        <div id="buttons">
          <button onClick={() => navigate("/login")}>LOGIN</button>
          <button onClick={() => navigate("/signup")}>SIGN UP</button>
          <button onClick={() => navigate("/jobs")}>VIEW SOME JOBS</button>
        </div>
      </div>
    </div>
  );
};