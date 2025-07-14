import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';

const Control = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === 'yes');
  const location = useLocation();

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === 'yes';
    setIsLoggedIn(loginStatus);
  }, [location]); // This re-checks login status whenever the route changes

  return (
    <Routes>
      <Route
        path="/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Control;