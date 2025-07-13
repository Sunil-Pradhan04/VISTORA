import React from "react";
import "./styles/view.css";
import { useNavigate } from "react-router-dom";

const View = ({ video }) => {
  const navigate = useNavigate();
  // console.log("Video in View component:", video);
  const like  = Math.floor(Math.random() * 1000) + 1;
  const view = Math.floor(Math.random() * 10) + 1;

  const handleClick = () => {
    navigate("/play",{
      state: {
        video: video,
        like : like,
        view : view,
      }
    });
  };
  
  const time = video.duration;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="view"  onClick={handleClick}>
      <div className="video-image"  style={{ backgroundImage: `url(${video.videos.tiny.thumbnail})` }}>
        <div className="time">{`${minutes} : ${seconds}`}</div>
      </div>
      <p className="title">{video.videos.tiny.url}</p>
      <div className="tags">
        <p className="tag">Like : {video.likes}k </p>
        <p className="tag">View : {view}M </p>
      </div>
    </div>
  );
}
export default View;