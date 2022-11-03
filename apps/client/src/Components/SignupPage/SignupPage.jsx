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

  const [error, setError] = useState("");

  // function to handle onChange
  const handleChange = (event, field) => {
    // console.log(event.target.value);
    setUserDetails({...userDetails, [`${field}`]: event.target.value});

  };

  // function to handle onSignUp
  const onSignUp = async (event) => {
    event.preventDefault();
    const user = Object.fromEntries(new FormData(event.target));

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();

      if (response.ok) {
        console.log("new account successfully created!");
        navigate("/signup/preferences");
      } else {
       setError(data.error);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="signup-page">
      <form
        method="post"
        id="signup-form"
        autoComplete="off"
        onSubmit={onSignUp}
      >
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
        {
          !error ?
          <></> :
          <p id="error-msg">{error}</p>
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