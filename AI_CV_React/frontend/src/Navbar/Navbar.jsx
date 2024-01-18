// Navbar.js

import React from 'react';
// import { FaUser } from 'react-icons/fa'; 
import LogOut from '../Login/Logout';
import './Navbar.css'

const Navbar = ({ user, onLogout}) => {
    // console.log(user)
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/public/images.jpeg" alt="Logo" className="logo" />
      </div>
      <div className="navbar-right">
        <div className="user-info">
        {/* <img src={user?.profilePicture} alt="Profile" /> */}
          <span>{user?.email}</span>
        </div> 
        <LogOut onLogout={onLogout}/>
      </div>
    </nav>
  );
};

export default Navbar;
