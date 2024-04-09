// NavigationBar.js

import React from 'react';
import './navigation.css'; // Import CSS file for styling
import logo from '../images/logo.png';
const navigation = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
      </div>
    </div>
  );
};

export default navigation;
