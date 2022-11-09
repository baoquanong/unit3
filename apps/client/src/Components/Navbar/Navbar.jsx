import React from "react";
import { Outlet, Link, useNavigate, json } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  // setting up navigation
  const navigate = useNavigate();

  // function to show dropdown
  const handleDropdown = () => {
    document.getElementById("dropdown-content").classList.toggle("show");
  };

  // function to logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.clear();
        navigate("/");
      } else {
        console.log("error:", error);
      }
    }
    catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div id="layout">
      <div id="navbar">
        <h1 onClick={() => navigate("/")}><span>SIDE</span>HUSTLE</h1>
        {
          !JSON.parse(localStorage.getItem("currUser")) ?
          <div id="tabs">
            <Link to="/login" className="tab">LOGIN</Link>
            <Link to="/signup" className="tab">SIGN UP</Link>
          </div>
          :
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
                <Link to="/user/postedjobs">JOBS</Link>
                <p onClick={handleLogout}>LOGOUT</p>
              </div>
            </div>
          </div>
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;