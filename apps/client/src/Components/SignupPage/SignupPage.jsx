import React, { useState } from "react";

function SignupPage() {
  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    usename: "",
    password: "",
    pwConfirm: ""
  });

  const [error, setError] = useState("");

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});

  };

  return (
    <div id="signup-page">
      <form id="signup-form" autoComplete="off">
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
          <p className="error-msg">*{error}</p>
        }
        {
          loginDetails.password === loginDetails.pwConfirm ?
          <></> :
          <p className="error-msg">*passwords do not match</p>
        }
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;