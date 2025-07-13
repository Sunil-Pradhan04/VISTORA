import React, { useContext } from "react";
import "./styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { AllData } from "../store/post-list-data";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const {sidebar, setSidebar} = useContext(AllData)
  return (
<div className={`sidebar ${sidebar ? "active" : ""}`}> 
  <div className="cross" onClick={() => setSidebar(false)}><i class="fa-solid fa-xmark"></i></div>     
  <Link className="navigate" to="/home" onClick={() => setSidebar(false)}>
        <div
          className="link1"
          style={{
            color: path === "/home" ? "red" : "white",
            backgroundColor: path === "/xhome" ? "rgba(255,255,255,0.1)" : "#0f0f0f",
          }}
        >
          <i className="fa-solid fa-house" style={{ marginRight: 10 }}></i>Home
        </div>
      </Link>
      <Link className="navigate" to="/shorts" onClick={() => setSidebar(false)}>
        <div className="link1" style={{
            color: path === "/shorts" ? "red" : "white",
            backgroundColor: path === "/shorts" ? "rgba(255,255,255,0.1)" : "#0f0f0f",
          }}>
          <i className="fa-solid fa-film" style={{ marginRight: 10 }}></i>Shorts
        </div>
      </Link>

      <Link className="navigate" to="/photos" onClick={() => setSidebar(false)}>
        <div className="link1" style={{
            color: path === "/photos" ? "red" : "white",
            backgroundColor: path === "/photos" ? "rgba(255,255,255,0.1)" : "#0f0f0f",
          }}>
          <i className="fa-solid fa-images" style={{ marginRight: 10 }}></i>Photos
        </div>
      </Link>

      <Link className="navigate" to="/profile" onClick={() => setSidebar(false)}>
        <div className="link1" style={{
            color: path === "/profile" ? "red" : "white",
            backgroundColor: path === "/profile" ? "rgba(255,255,255,0.1)" : "#0f0f0f",
          }}>
          <i className="fa-solid fa-user" style={{ marginRight: 10 }}></i>Profile
        </div>
      </Link>
      <a href="https://sunil-pradhan04.github.io/My-Portfolio/" style={{textDecoration : 'none'}}><div className="self">
        <p>Developed by Sunil</p>
        <p>© 2025 Sunil </p>
        <p style={{marginTop : 10}}>Explore More</p>
      </div>
      </a>
    </div>
  );
};
export default Sidebar;
