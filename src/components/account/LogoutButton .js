import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem('username');

    onLogout();

    navigate("/login"); 
  };

  return (
    <button onClick={logout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
