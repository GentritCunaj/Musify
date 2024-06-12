import React from 'react';
import './Navbar.css'; // import the CSS file for styling

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=a76ea47fed02462c81306ccebe692c19&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href={AUTH_URL} className="navbar-link">Home</a>
        </li>
        <li className="navbar-item">
          <a href="/AboutUs" className="navbar-link">About Us</a>
        </li>
        <li className="navbar-item">
          <a href="/Game" className="navbar-link">Game</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
