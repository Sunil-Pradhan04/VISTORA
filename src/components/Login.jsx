import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles/login.css";
import { useRef } from "react";

const Login = () => {
  const nameRef = useRef(null);
  const passRef = useRef(null);

  const userName = localStorage.getItem("userName");
  const userPass = localStorage.getItem("userPass");

  const login = localStorage.getItem('login');

  const submit = () => {
    const name = nameRef.current.value;
    const pass = passRef.current.value;
    if (name && pass) {
      if (name === userName && pass=== userPass) {
        localStorage.setItem("login", "yes");
        window.location.href = "/home";
      }
      else{
        alert("Invalide Username or Password");
      }
    } else {
      alert("Please fill all the field");
    }
  };
  return (
    <div className="login">
      <div className="login-box">
        <h2>{login ? "Welcome Back" : "Get Started"}</h2>
        <p>Please enter your credentials to log in.</p>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <button className="submit-button" onClick={submit}>
          Login
        </button>
        <p className="toggle-text">
          Don’t have an account?{" "}
          <Link to="/register" replace>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
