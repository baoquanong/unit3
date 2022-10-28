import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./LoginPage.css";

function LoginPage() {
  // setting up navigation
  const navigate = useNavigate();

  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
  };

  return (
    <div id="login-page">
      <form id="login-form" autoComplete="off">
        <h1>LOGIN</h1>
        <div id="inputs">
          <label>
            Username:
            <input
              type="text"
              value={loginDetails.username}
              onChange={() => handleChange(event, "username")}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
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