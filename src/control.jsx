import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';

const Control = () => {
  const login = localStorage.getItem('login');

  return (
    <Routes>
      <Route
        path="/*"
        element={login === 'yes' ? <App /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Control;