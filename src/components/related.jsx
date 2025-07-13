import { useNavigate } from 'react-router-dom';
import './styles/related.css';
import React from 'react';

const Related = ({ video }) => {
  const navigate = useNavigate();
  const time = video.duration;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const like = Math.floor(Math.random() * 1000) + 1;
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
  return (
    <div className="related" onClick={handleClick}>
      <div className="video-image" style={{ backgroundImage: `url(${video.videos.tiny.thumbnail})` }} onClick={handleClick}>
        <div className="time">{`${minutes} : ${seconds}`}</div>
      </div>
      <p className="title">{video?.videos?.medium?.url}</p>
    </div>
  );
}
export default Related;