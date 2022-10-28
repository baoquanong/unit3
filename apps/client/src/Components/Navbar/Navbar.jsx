import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <div id="layout">
      <div id="navbar">
        <h1><span>SIDE</span> HUSTLE</h1>
        <div id="tabs">
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/jobs/create">Create Job</Link>
          <Link to="/user">My Profile</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;