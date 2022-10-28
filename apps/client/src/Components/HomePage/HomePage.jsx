import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  // setting up navigation
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};