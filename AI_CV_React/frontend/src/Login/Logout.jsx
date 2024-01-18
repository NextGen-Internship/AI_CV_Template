import React from 'react';
import './Logout.css'

const LogOut = ({ onLogout }) => {
  const handleLogoutSuccess = () => {
    console.log('Logout successful');
  };

  const handleLogout = () => {
    onLogout();
    console.log('Logout successful');
  };

  return (
    <div>
      <button className='logout-btn' onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default LogOut;
