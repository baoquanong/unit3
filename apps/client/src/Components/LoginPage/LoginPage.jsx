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

  // function to handle login and check for empty fields
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("current login details:", loginDetails);

    // if-else to check for missing details before making fetch call
    if (!loginDetails.username && !loginDetails.password) {
      setError("please enter valid username and password");
    } else if (!loginDetails.username) {
      setError("please enter valid username");
    } else if (!loginDetails.password) {
      setError("please enter valid password");
    }
  };
  

  return (
    <div id="login-page">
      <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
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
        {
          !error ?
          <></> :
          <p>{error}</p>
        }
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