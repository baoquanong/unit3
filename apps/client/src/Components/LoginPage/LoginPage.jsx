import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./LoginPage.css";

function LoginPage() {
  // setting up navigation
  const navigate = useNavigate();

  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
  };

  // function to handle login and check for empty fields
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("current login details:", loginDetails);

  };
  

  return (
    <div id="login-page">
      <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <div id="inputs">
          <label>
            Email:
            <input
              type="email"
              required="true"
              value={loginDetails.email}
              onChange={() => handleChange(event, "email")}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              required="true"
              value={loginDetails.password}
              onChange={() => handleChange(event, "password")}
            />
          </label>
        </div>
        <button>Let's Go!</button>
      </form>
      <p>
        Don't have an account yet? <br />
        Click {" "}
        <span onClick={() => navigate("/signup")}>here</span>
        {" "} to sign up!
      </p>
    </div>
  );
};

export default LoginPage;