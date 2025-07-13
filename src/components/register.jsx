import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles/login.css";
import { useRef, useState } from "react";

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const arr = ['avatar1.jpg', 'avater2.webp', 'avatar3.jpeg', 'avatar4.jpeg'];

  const submit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    if (name && email && pass) {
      localStorage.setItem("login", "yes");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPass", pass);
      // document.querySelector(".avetar").innerHTML ='';
      document.querySelector(".avatar").classList.add('aaa');
    } else {
      alert("Please fill all the field");
    }
  };
  const [logoIndex, setIndex] = useState(null);
  const [link , setLink] = useState(null);
  const Avater = (index , avatar) => {
    setIndex(index);
    setLink(avatar)
  };
  const FinalSubmit = () => {
    localStorage.setItem('logo' , link);
    window.location.href = "/home";
  };
  return (
    <div className="login">
      <div className="avatar">
        <p className="chose">Choose your Avatar</p>
        <div className="logos">
          {arr.map((avatar , index) => (
            <div
              key={index}
              className={`pre-logo ${index === logoIndex ? "active3" : null}`}
              onClick={() => Avater(index , avatar)}
              style={{backgroundImage : `url(${avatar})`}}
            ></div>
          ))}
        </div>
        <div className="but" onClick={FinalSubmit}>OK</div>
      </div>
      <div className="login-box">
        <h2>Create Account</h2>
        <p>Fill in the details to sign up.</p>

        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passRef} />

        <button className="submit-button" onClick={submit}>
          Register
        </button>

        <p className="toggle-text">
          Already have an account?{" "}
          <Link to="/login" replace>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
