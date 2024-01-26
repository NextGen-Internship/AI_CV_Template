import React from "react";
import "./Logout.css";

const LogOut = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
};

export default LogOut;
