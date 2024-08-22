import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Include Bootstrap JS
import { Outlet, Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing Font Awesome icons
import '../css/navbar.css';
import { decodeToken } from './decodetoken';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const user = decodeToken();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      alert("User logged out successfully");
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-3 m-0 border-0 bd-example">
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white ms-2 me-5" to="/">SysCart</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white ms-5 me-3" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white me-3" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white me-3" to="/about">About</Link>
              </li>
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link text-white me-3" to="/signup">SignUp</Link>
                </li>
              )}
              {user && user.type === 'Admin' && (
                <li className="nav-item">
                  <Link className="nav-link text-white me-3" to="/order">Order</Link>
                </li>
              )}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white me-3"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/menfashion">Men's Fashion</Link></li>
                  <li><Link className="dropdown-item" to="/womenfashion">Women's Fashion</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/footware">Shoes Collection</Link></li>
                  <li><Link className="dropdown-item" to="/electronics">Electronics</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <span className="input-group-text search-icon" id="basic-addon2" onClick={handleSearchSubmit}>
                  <FaSearch />
                </span>
              </div>
              <Link to="/cart" className="cart-iconp">
                <FaShoppingCart size={20} />
              </Link>
              <Link to="/profile" className="profile-iconp">
                <FaUser size={20} />
              </Link>
            </form>
            {user && (
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <div className="nav-link active text-white ms-5 me-3" aria-current="page" onClick={handleLogout}>Logout</div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
