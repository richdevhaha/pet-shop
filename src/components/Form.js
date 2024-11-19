import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./Form.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";

const Form = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password:"",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        ...formData,
      });

      console.log('Success:', response.data);
      
      navigate('/login');
      
      // Reset form
      setFormData({ name: "", address: "", phone: "", email: "", password: "" });
      
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('User already exist');
      setFormData({ name: "", address: "", phone: "", email: "", password: "" });
    }
    
  };

  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = "/Login"; 
    navigate(path);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Sign Up Now</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your number"
          required
        />
      </div>
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
        <label  htmlFor="password">Password:</label>
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
      <p onClick={routeChange}>Existing User?</p>
    </form>
  );
};

export default Form;
