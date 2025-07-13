import "./styles/shortFeed.css";
import React, { useEffect, useRef } from "react";

const ShortFeed = ({ video, isLast, onLastVisible, preloadType = "metadata", innerRef, index }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          if (isLast && typeof onLastVisible === "function") {
            onLastVisible();
          }
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      className="short-video"
      ref={innerRef}
      data-index={index}
    >
      <div className="side">
        <div className="video-resonse">
          <i className="fa-regular fa-thumbs-up"></i>
          <p className="des">like</p>
        </div>
        <div className="video-resonse">
          <i className="fa-regular fa-thumbs-up dislike"></i>
          <p className="des">Dislike</p>
        </div>
        <div className="video-resonse">
          <i className="fa-regular fa-comment"></i>
          <p className="des">Comment</p>
        </div>
        <div className="video-resonse">
          <i className="fa-solid fa-share"></i>
          <p className="des">Share</p>
        </div>
      </div>
      <div className="description">
        {video.videos.tiny.url}
      </div>
      <video
        ref={videoRef}
        controls
        playsInline
        loop
        className="aa"
        preload={preloadType}
      >
        <source src={video.videos.tiny.url} type="video/mp4" />
      </video>
    </div>
  );
};

export default ShortFeed;