import { Navigate, useNavigate } from "react-router-dom";
import "./styles/login.css";
import { useRef, useState } from "react";

const Login = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Check if they are already logged in to prevent showing form
  const loginFlag = localStorage.getItem('login') === 'true';

  if (loginFlag) {
    return <Navigate to="/home" replace />;
  }

  const submit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (!name || !email) {
      alert("Please fill out both Name and Email.");
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://event-management-backend-self.vercel.app/api/EVENT/visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("login", "true");
        // Redirect logic using the exact hash path for HashRouter
        window.location.href = "/VISTORA/#/home";
      } else {
        alert(data.message || "An error occurred during entry.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>Welcome to Vistora</h2>
        <p>Please enter your Name and Email to proceed.</p>
        <input type="text" placeholder="Name" ref={nameRef} />
        <input type="email" placeholder="Email Address" ref={emailRef} />
        <button className="submit-button" onClick={submit} disabled={loading}>
          {loading ? "Verifying..." : "Enter"}
        </button>
      </div>
    </div>
  );
};

export default Login;
