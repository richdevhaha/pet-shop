import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check login status
  const checkLoginStatus = () => {
    const loggedInUser = localStorage.getItem("user");
    setIsLoggedIn(!!loggedInUser); // Set true if user info exists
  };

  useEffect(() => {
    checkLoginStatus(); // Initial check on mount

    // Listen for storage changes
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user info
    setIsLoggedIn(false); // Update login status
    navigate('/', { replace: true });
  };

  return (
    <nav>
      <div className="menuitem">
        {!isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/funcat">Cats</Link>
            <Link to="/fundog">Dogs</Link>
            <Link to="/Login" id="login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/Adopt">Adopt</Link>
            <Link to="/Release">Release</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
