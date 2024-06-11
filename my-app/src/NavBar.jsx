import React from 'react';
import './Navbar.css'; // import the CSS file for styling

const Navbar = () => {
 

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="/Home" className="navbar-link" >Home</a>
        </li>
        <li className="navbar-item">
          <a href="/AboutUs" className="navbar-link" >About Us</a>
        </li>
        <li className="navbar-item">
          <a href="/Game" className="navbar-link" >Game</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
