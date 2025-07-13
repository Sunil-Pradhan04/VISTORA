import { useContext, useEffect, useRef, useState } from "react";
import "./styles/photos.css";
import { AllData } from "../store/post-list-data";
import ImagesComponent from "./images";
import Loder from "./loder";

const Photos = () => {
  const { images1, fetchPhotos, loder } = useContext(AllData);
  const [message, setMessage] = useState("Search for Photos...");
  const [isSearch , setIsSearch] = useState(false)
  const searchRef = useRef(null);
  const search = () => {
    const searchData = searchRef.current.value;
    fetchPhotos(searchData);
    setMessage('Searching...')
    setIsSearch(true);
  };

  useEffect(() => {
    if(!isSearch) return;
      if (images1.length === 0) {
        setMessage("No result found");
      } else {
        setMessage("See result below");
      }
    },[images1]);
  return (
    <div className="Photos">
      {loder ? <Loder /> : null}
      <div className="photoSearch">
        <input
          type="search"
          placeholder="Search..."
          className="photoBar"
          ref={searchRef}
        ></input>
        <div className="photoBut" onClick={search}>
          {" "}
          <i class="fa-brands fa-searchengin"></i>
        </div>
        <div className="message">{message}</div>
      </div>
      {
      images1.map((images, index) => (
        <ImagesComponent key={index} image={images} />
      ))}
      {images1.length !== 0 ? (
        <div className="moreBut" onClick={search}>
          <div className="moreBut2">See More</div>
        </div>
      ) : null}
    </div>
  );
};
export default Photos;
