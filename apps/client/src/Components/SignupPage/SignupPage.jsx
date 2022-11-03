import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./SignupPage.css";

function SignupPage() {
  // setting up context
  const { state, setState } = useContext(DataContext);

  // setting up navigate
  const navigate = useNavigate();

  // setting up state
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    password: "",
    pwConfirm: ""
  });

  // function to handle onChange
  const handleChange = (event, field) => {
    // console.log(event.target.value);
    setUserDetails({...userDetails, [`${field}`]: event.target.value});

  };

  // function to handle onNext
  const onNext = () => {
    event.preventDefault();
  };

  return (
    <div id="signup-page">
      <form id="signup-form" autoComplete="off" onSubmit={onNext}>
        <h1>SIGN UP</h1>
        <div id="inputs">
          <label>
            Email:
            <input
              type="email"
              required="true"
              value={userDetails.email}
              onChange={() => handleChange(event, "email")}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              required="true"
              value={userDetails.username}
              onChange={() => handleChange(event, "username")}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              required="true"
              value={userDetails.password}
              onChange={() => handleChange(event, "password")}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              required="true"
              value={userDetails.pwConfirm}
              onChange={() => handleChange(event, "pwConfirm")}
            />
          </label>
        </div>        
        {
          userDetails.password === userDetails.pwConfirm ?
          <></> :
          <p id="error-msg">Passwords do not match</p>
        }
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account? <br />
        Click {" "}
        <span onClick={() => navigate("/login")}>here</span>
        {" "} to log in!
      </p>
    </div>
  );
};

export default SignupPage;