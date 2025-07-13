import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostListProvider from "./store/post-list-data";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./components/home";
import Play from "./components/play";
import Shorts from "./components/shorts";
import Search from "./components/search";
import Photos from "./components/photos";
import Profile from "./components/profile";
import './components/styles/body.css'

const App = () => {
  return (
    <PostListProvider>
     <div className="whole">
      <Header />
      <div className="body1">
      <Sidebar />
      {/* <Body /> */}
      <div className="body">
      <Routes>
        <Route path="/" element={<Navigate to='/home' replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes> 
    </div>
      </div>
     </div>
    </PostListProvider>
  );
};
export default App;
