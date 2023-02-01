import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../App';
import login from "../../images/LogIn.png";
import "./LoginPage.css";

function LoginPage() {
  // setting up context
  const {state, setState} = useContext(DataContext);
  
  // setting up navigation
  const navigate = useNavigate();

  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
  };

  // function to handle login and check for empty fields
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails),
      });
      
      const data = await response.json();

      if (response.ok) {
        console.log("successfully logged in!");
        // setState({...state, loggedIn: data.userInfo});
        localStorage.setItem("currUser", JSON.stringify(data));
        navigate("/jobs");
      } else {
        console.log("server error:", data.error);
        setError(data.error);
      }
    }
    catch (error) {
      console.log("client error:", error);
    }
  };
  

  return (
    <div id="login-page">
      <img src={login} />
      <div id="login">
        <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <h1>WELCOME</h1>
          <div id="login-inputs">
            <label>
              EMAIL:
              <input
                type="email"
                required={true}
                value={loginDetails.email}
                onChange={() => handleChange(event, "email")}
              />
            </label>
            <label>
              PASSWORD:
              <input
                type="password"
                required={true}
                value={loginDetails.password}
                onChange={() => handleChange(event, "password")}
              />
            </label>
          </div>
          {
            !error ?
            <></> :
            <p id="error-msg">{error}</p>
          }
          <button>LOGIN</button>
        </form>
        <p id="account-msg">
          Don't have an account yet?
          Click {" "}
          <span onClick={() => navigate("/signup")}>here</span>
          {" "} to sign up!
        </p>
      </div>
    </div>
  );
};

export default LoginPage;