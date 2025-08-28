import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3030"; // Change to your backend URL

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/user/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      setUser(null);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out.");
    }
  };

  const linkStyle = { color: "white", textDecoration: "none" };
  const logoStyle = { color: "orange", fontWeight: "bold", fontSize: "24px" };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "#343a40" }}>
      <div className="container">
        <Link to="/" style={logoStyle} className="navbar-brand">
          Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link to="/" style={linkStyle} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createpost" style={linkStyle} className="nav-link">
                Create Blog
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item text-white d-flex align-items-center">
                  <span className="me-2" style={{ color: "white" }}>
                    Welcome <strong>{user.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm ml-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" style={linkStyle} className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
