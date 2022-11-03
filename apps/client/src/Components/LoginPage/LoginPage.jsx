import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../App';
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
        setState({...state, loggedIn: data.userInfo});
        navigate("/jobs");
      }
    }
    catch (error) {
      console.log(error);
    }
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