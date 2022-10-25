import React from 'react'
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div id="navbar">
      <div id="tabs">
        <Link to="/jobs">Find Jobs</Link>
        <Link to="/jobs/create">Create Job</Link>
        <Link to="/user">My Profile</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar