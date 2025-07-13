import "./styles/shorts.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AllData } from "../store/post-list-data";
import ShortFeed from "./shortFeed";

const Shorts = () => {
  const { shorts, useShorts } = useContext(AllData);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setCurrentVisibleIndex(index);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [shorts]);

  return (
    <div className="shorts">
      {shorts.length === 0 ? (
        <h3 style={{ color: "red" }}>Network issues</h3>
      ) : (
        <div className="short-feed">
          {shorts.map((video, index) => {
            const isLast = index === shorts.length - 1;
            const isBuffered =
              index === currentVisibleIndex ||
              index === currentVisibleIndex + 1 ||
              index === currentVisibleIndex + 2;

            return (
              <ShortFeed
                key={index}
                video={video}
                isLast={isLast}
                onLastVisible={useShorts}
                preloadType={isBuffered ? "auto" : "metadata"}
                innerRef={(el) => (videoRefs.current[index] = el)}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shorts;
