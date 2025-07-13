import React, { useContext } from "react";
import "./styles/header.css";
import { AllData } from "../store/post-list-data";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { setSidebar, fetchSearch, } = useContext(AllData);
  const searchRef = useRef();

  const search = () => {
    const searchData = searchRef.current.value;
    fetchSearch(searchData);
  };
  return (
    <header className="header">
      <p className="name">VISTORA</p>
      <div className="box">
        <input
          type="search"
          className="search"
          onClick={() => navigate("/search")}
          ref={searchRef}
        ></input>
        <div className="tab">
          <i class="fa-brands fa-searchengin" onClick={search}></i>
        </div>
      </div>

      <div className="right-bar">
        <div className="s" onClick={() => navigate("/search")}>
          <i class="fa-brands fa-searchengin"></i>
        </div>
        <div className="mount" onClick={() => setSidebar(true)}>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};
export default Header;
