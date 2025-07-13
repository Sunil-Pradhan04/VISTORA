import React, { useContext } from "react";
import View from "./view";
import "./styles/home.css";
import { AllData } from "../store/post-list-data";
import Loder from "./loder";

const Home = () => {
  const { videos, homeLoder, fetchVideos } = useContext(AllData);
  return (
    <div className="home">
      <div className="text">
        {" "}
        Download high-quality videos and images — 100% Free!
      </div>
      {homeLoder ? <Loder /> : null}
      {videos.length === 0 ? (
        <h3 style={{ color: "red" }}>Network issues</h3>
      ) : (
        videos.map((video, index) => <View key={index} video={video} />)
      )}

      {videos.length !== 0 ? (
        <div className="more" onClick={fetchVideos}>
          <p className="more2">🔎 See More 🔎</p>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
