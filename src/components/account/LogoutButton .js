import React from 'react';
import { navigate } from 'gatsby'; 

const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem('username');
    navigate("/login"); 
  };

  return (
    <button onClick={logout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
