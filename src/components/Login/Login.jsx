import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // React States
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    //Prevent page reload
    setErrorMessage("");
    event.preventDefault();

    var { username, password } = document.forms[0];

    axios
      .post("http://localhost:5000/api/v1/bank-app/auth/login", {
        username: username.value,
        password: password.value,
      })
      .then((result) => {
        if (result.data.roleName === "admin") {
          navigate("/admin", {
            state: {
              userName: result.data.username,
            },
          });
        } else if (result.data.roleName === "Customer") {
          navigate("/user", {
            state: {
              userName: result.data.username,
            },
          });
        } else {
          alert("Invalid User");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="username" required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" required />
            </div>
            <div className="error">{errorMessage}</div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
