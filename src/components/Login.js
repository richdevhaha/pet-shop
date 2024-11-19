import React, { useState } from "react";
import "./Form.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error message on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
  
      // Assuming the backend returns user data or a token
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data)); // Store user info in localStorage
      alert('Log in success!');

      // Redirect to /Adopt after successful login
      navigate("/Adopt");
      window.location.reload();
  
      setFormData({ email: "", password: "" });
  
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred during login.");
    }
  };

  const routeChange = () => { 
    navigate("/Register"); 
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit">Submit</button>
      <br />
      <p onClick={routeChange}>New User?</p>
    </form>
  );
};

export default Login;
