import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import { useEffect, useState } from 'react';

const Control = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === 'true');
  const location = useLocation();

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === 'true';
    setIsLoggedIn(loginStatus);
  }, [location]); // This re-checks login status whenever the route changes

  return (
    <Routes>
      <Route
        path="/*"
        element={isLoggedIn ? <App /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Control;