import React from 'react';
import { useState } from 'react';

function LoginPage() {
  // setting up state
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  // function to handle onChange
  const handleChange = (event, field) => {
    console.log(event.target.value);
    setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
  };

  return (
    <div id="login-page">
      <h1>LOGIN</h1>
      <form autoComplete="off">
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
    </div>
  );
};

export default LoginPage;