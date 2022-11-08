import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./HomePage.css";

export default function HomePage() {
  // setting up navigation
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <img id="background" src="https://thumbs.dreamstime.com/b/business-people-work-office-run-black-line-seamless-pattern-big-group-monochrome-vector-illustration-eps-64114000.jpg" />
      <div id="buttons">
        <button onClick={() => navigate("/login")}>LOGIN</button>
        <button onClick={() => navigate("/signup")}>SIGN UP</button>
        <p>OR</p>
        <button onClick={() => navigate("/jobs")}>VIEW SOME JOBS</button>
      </div>
    </div>
  );
};