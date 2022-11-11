import React from "react";
import { Outlet, Link, useNavigate, json } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  // setting up navigation
  const navigate = useNavigate();

  // setting up variable
  const currUser = JSON.parse(localStorage.getItem("currUser"));

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
        {
          currUser === null ?
          <>
            <h1><span>SIDE</span>HUSTLE</h1>
            <div id="job-tabs">
              <Link className="tab" to="/jobs">JOBS</Link>
              <Link className="tab" to="/login">LOGIN</Link>
              <Link className="tab" to="/signup">SIGN UP</Link>
            </div>
          </>
          :
          <>
            <div id="job-tabs">
              <Link className="tab" to="/jobs">FIND JOBS</Link>
              <Link className="tab" to="/jobs/create">CREATE A JOB</Link>
            </div>
            <h1><span>SIDE</span>HUSTLE</h1>
            <div id="profile-tabs">
              <Link className="tab" to="/user">PROFILE</Link>
              <Link className="tab" to="/user/postedjobs">JOBS</Link>
              <p className="tab" onClick={handleLogout}>LOGOUT</p>
            </div>
          </>
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;

// {
//   !JSON.parse(localStorage.getItem("currUser")) ?
//   <div id="tabs">
//     <Link to="/login" className="tab">LOGIN</Link>
//     <Link to="/signup" className="tab">SIGN UP</Link>
//   </div>
//   :
// }