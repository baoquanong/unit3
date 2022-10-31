import React, { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./SignupPage.css";

function SignupPage() {
  // setting up context
  const { state, setState } = useContext(DataContext);

  // setting up navigate
  const navigate = useNavigate();

  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    username: "",
    password: "",
    pwConfirm: ""
  });

  const [error, setError] = useState("");

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});

  };

  // function to handle onNext
  const onNext = () => {
    event.preventDefault();

    // checking for missing inputs
    if (!loginDetails.email) {
      setError("please fill in email");
    } else if (!loginDetails.username) {
      setError("please fill in username");
    } else if (!loginDetails.password || !loginDetails.pwConfirm) {
      setError("please fill in password");
    } else if (loginDetails.password !== loginDetails.pwConfirm) {
      setError("passwords do not match")
    } else {
      delete loginDetails.pwConfirm;
      setState({...state, currSignupInfo: loginDetails}); // setting info to a state before moving on to get preferences
      navigate("/signup/preferences");
    }
  };

  return (
    <div id="signup-page">
      <form id="signup-form" autoComplete="off" onSubmit={onNext}>
        <h1>SIGN UP</h1>
        <div id="inputs">
          <label>
            Email:
            <input
              type="text"
              value={loginDetails.email}
              onChange={() => handleChange(event, "email")}
            />
          </label>
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={loginDetails.pwConfirm}
              onChange={() => handleChange(event, "pwConfirm")}
            />
          </label>
        </div>        
        {
          !error ?
          <></> :
          <p id="error-msg">*{error}</p>
        }
        <button>Next</button>
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