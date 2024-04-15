import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"

const apiEndpoint= "http://localhost:8080";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${apiEndpoint}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem('user', JSON.stringify(json.user));
      navigate("/");
    } else {
      console.error("Invalid Details");
      // Handle error by setting error state or showing alert
    }
  };

  const onChange = (e) => {
    if (e.target.name === "name") {
      const firstName = e.target.value.split(" ")[0]; // Take only the first word
      setCredentials({ ...credentials, name: firstName });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className ="register">
      <span className="registerTitle">Register</span>
      <form className ="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" className="registerInput" placeholder="Enter Your name..." onChange={onChange}/>
        <label>Email</label>
        <input type="text" name="email" className="registerInput" placeholder="Enter Your email..." onChange={onChange}/>
        <label>Password</label>
        <input type="password" name="password" className="registerInput" placeholder="Enter Your password" onChange={onChange}/>
        <div id="emailHelp" className="form-text">We'll never share your Data with anyone else.</div>
        <button className="registerButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
