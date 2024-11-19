import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import "./NavBar.css";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import About from "./components/About";
import Home from "./components/Home";
import Form from "./components/Form";
import Login from "./components/Login";
import Adopt from "./components/Adopt";
import Release from "./components/Release";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/funcat" element={<Cats />} />
        <Route path="/fundog" element={<Dogs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Form />} />
        <Route path="/Adopt" element={<Adopt />} />
        <Route path="/Release" element={<Release />} />
      </Routes>
    </Router>
  );
};



export default App;