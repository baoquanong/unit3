import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./HomePage.css";

export default function HomePage() {
  // setting up navigation
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <button onClick={() => navigate("/login")}>LOGIN</button>
      <button onClick={() => navigate("/signup")}>SIGN UP</button>
    </div>
  );
};