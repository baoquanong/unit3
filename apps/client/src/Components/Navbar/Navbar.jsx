import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  // setting up navigation
  const navigate = useNavigate();

  // function to show dropdown
  const handleDropdown = () => {
    document.getElementById("dropdown-content").classList.toggle("show");
  };

  return (
    <div id="layout">
      <div id="navbar">
        <h1 onClick={() => navigate("/")}><span>SIDE</span>HUSTLE</h1>
        <div id="tabs">
          <Link className="tab" to="/jobs">FIND JOBS</Link>
          <Link className="tab" to="/jobs/create">CREATE</Link>
          <div id="dropdown">
            <p
              className="tab"
              id="profile-tab"
              onClick={handleDropdown}
            >PROFILE</p>
            <div className="dropdown-content" id="dropdown-content">
              <Link to="/user">OVERVIEW</Link>
              <Link to="/user/jobs">JOBS</Link>
              <Link to="/user/reviews">REVIEWS</Link>
              <Link to="/">LOGOUT</Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;