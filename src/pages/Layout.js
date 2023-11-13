import React, { useState } from 'react';
import Header from '../components/common/Header';
import LogoutButton from '../components/account/LogoutButton ';

function Layout() {
  const [username, setUsername] = useState();

  const handleLogin = (user) => {
    setUsername(user.username);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <div>
      <Header onLogin={handleLogin} username={username} onLogout={handleLogout} />
      
      {username && <LogoutButton onLogout={handleLogout} />}
   
  
    </div>
  );
}

export default Layout;
