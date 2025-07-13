import React, { use, useContext, useEffect, useRef, useState } from "react";
import "./styles/play.css";
import { useLocation } from "react-router-dom";
import { AllData } from "../store/post-list-data";
import Related from "./related";

const Play = () => {
  const location = useLocation();
  const { related, fetchRelatedVideos } = useContext(AllData);
  const [userLike, setUserLike] = useState(false);
  const [like , setLike] = useState();
  // console.log("Related videos in Play component:", related);
  const [video, setVideo] = useState(location.state?.video || null);
  const [view, setView] = useState(location.state?.view || 0);
  const quality = [
    {
      name: "tiny",
      quality: 270,
    },
    {
      name: "small",
      quality: 360,
    },
    {
      name: "medium",
      quality: 720,
    },
    {
      name: "large",
      quality: 1080,
    },
  ];
  let flag = 0;
  const visible = () => {
    if (flag === 0) {
      document.getElementById("quality").classList.add("visble");
      flag = 1;
    } else {
      document.getElementById("quality").classList.remove("visble");
      flag = 0;
    }
  };
  useEffect(() => {
    fetchRelatedVideos();
  }, [video]);

  const download = async (qualityKey) => {
    try {
      const videoUrl = video?.videos?.[qualityKey]?.url;
      if (!videoUrl) {
        alert("Video URL not available for this quality.");
        return;
      }

      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch video");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `Sunil_Vistora_Video_${qualityKey}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Try again.");
    }
  };

  useEffect(() => {
    setUserLike(false);
    const player = document.getElementById("player");
    if (player) {
      player.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [video]);
  const videoRef = useRef(null);

  // const { video , like , view} = location.state || {};
  // console.log("Video in Play component:", video);
  useEffect(() => {
    if (location.state) {
      setVideo(location.state.video);
      setLike(location.state.like);
      setView(location.state.view);
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);
  return (
    <div className="play">
      <div className="left">
        <video
          className="video-player"
          id="player"
          controls
          autoPlay
          ref={videoRef}
        >
          <source src={video?.videos?.tiny?.url || ""} type="video/mp4" />
        </video>
        <div className="video-info">
          <h2 className="title">{video.videos.tiny.url}</h2>
          <p className="view2">View : {view}M</p>
          <div className="likes2">
            <p
              className="tag2"
              style={{ marginLeft: 0 }}
              onClick={() => setUserLike(!userLike)}
            >
              {!userLike ? (
                <i class="fa-regular fa-heart" style={{ marginRight: 3 }}></i>
              ) : (
                <i class="fa-solid fa-heart" style={{ marginRight: 3 }}></i>
              )}{" "}
              {video.likes}k
            </p>{" "}
            <p className="tag2">
              <i class="fa-solid fa-share" style={{ marginRight: 3 }}></i> Share
            </p>
            <div className="tag2" id="load" onClick={visible}>
              <i class="fa-solid fa-download" style={{ marginRight: 3 }}></i>
              Download
              <div className="quality" id="quality">
                {quality.map((item) => {
                  return (
                    <div
                      className="down"
                      onClick={() => {
                        download(item.name);
                      }}
                    >
                      {item.quality} P
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="relat-head">Related Videos</div>
        {related.map((video, index) => {
          return <Related key={index} video={video} />;
        })}
      </div>
    </div>
  );
};
export default Play;
