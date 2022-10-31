import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  // setting up navigation
  const navigate = useNavigate();

  return (
    <div id="layout">
      <div id="navbar">
        <h1 onClick={() => navigate("/")}><span>SIDE</span> HUSTLE</h1>
        <div id="tabs">
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/jobs/create">Create Job</Link>
          <Link to="/profile">My Profile</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;