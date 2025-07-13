import { Alert } from "bootstrap";
import { createContext, useEffect, useState } from "react";

export const AllData = createContext();

const PostListProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [related, setRelated] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [shorts, setShorts] = useState([]);
  const [search, setSearch] = useState([]);
  const [loder, setLoder] = useState(false);
  const [homeLoder, setHomeLoder] = useState(false);
  const [page, setPage] = useState(1);
  const [shortPage, setShortPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [imagePage, setImagePage] = useState(2);
  const [images1, setImages] = useState([]);
  const Qlist = [
    "nature",
    "love",
    "technology",
    "animals",
    "people",
    "sports",
    "food",
    "travel",
    "music",
    "fashion",
    "girls",
  ];
  const random = Math.floor(Math.random() * Qlist.length);
  const query = Qlist[random];

  const random2 = Math.floor(Math.random() * Qlist.length);
  const shortsQuery = Qlist[random2];
  const PIXABAY_API_KEY = "51199613-222578ec70e71d6a29660a027";

  const [customVideos, setCustom] = useState([
    {
      id: "custom1",
      tags: "custom, example",
      duration: 29,
      likes: 10,
      videos: {
        tiny: {
          url: "vlipsy-avengers-endgame-the-avengers-assemble-D6nhiN41.mp4",
          width: 640,
          height: 360,
          size: 123456,
          thumbnail:
            "medium-the-marvel-avengers-wall-poster-for-room-with-gloss-original-imafsckr6vt3wjjv.webp",
        },
        medium: {
          url: "vlipsy-avengers-endgame-the-avengers-assemble-D6nhiN41.mp4",
          width: 640,
          height: 360,
          size: 123456,
        },
      },
    },
    {
      id: "custom2",
      tags: "custom, demo",
      duration: 21,
      likes: 110,
      videos: {
        tiny: {
          url: "vlipsy-the-avengers-thor-charges-up-iron-man-Xq6O1NNk.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "71Xg-xZlFDL._UF1000,1000_QL80_.jpg",
        },
        medium: {
          url: "vlipsy-the-avengers-thor-charges-up-iron-man-Xq6O1NNk.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
    {
      id: "custom3",
      tags: "custom, demo",
      duration: 21,
      likes: 998,
      videos: {
        tiny: {
          url: "SSYouTube.online_Pooja Hegde_480p.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "poojahegde.webp",
        },
        medium: {
          url: "SSYouTube.online_Pooja Hegde_480p.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
    {
      id: "custom4",
      tags: "custom, demo",
      duration: 21,
      likes: 34,
      videos: {
        tiny: {
          url: "sreelela.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "20250301145338_Sreeleela-looks-forward-to-2025.avif",
        },
        medium: {
          url: "sreelela.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
    {
      id: "custom5",
      tags: "custom, demo",
      duration: 21,
      likes: 223,
      videos: {
        tiny: {
          url: "kirthy.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "Krithi-Shetty.jpeg",
        },
        medium: {
          url: "kirthy.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
  ]);

  const [shortsCustom, setShortsCustom] = useState([
    {
      id: "custom3",
      tags: "custom, demo",
      duration: 21,
      likes: 998,
      videos: {
        tiny: {
          url: "SSYouTube.online_Pooja Hegde_480p.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "poojahegde.webp",
        },
        medium: {
          url: "SSYouTube.online_Pooja Hegde_480p.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
    {
      id: "custom4",
      tags: "custom, demo",
      duration: 21,
      likes: 34,
      videos: {
        tiny: {
          url: "sreelela.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "20250301145338_Sreeleela-looks-forward-to-2025.avif",
        },
        medium: {
          url: "sreelela.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
    {
      id: "custom5",
      tags: "custom, demo",
      duration: 21,
      likes: 223,
      videos: {
        tiny: {
          url: "kirthy.mp4",
          width: 1280,
          height: 720,
          size: 123456,
          thumbnail: "Krithi-Shetty.jpeg",
        },
        medium: {
          url: "kirthy.mp4",
          width: 1280,
          height: 720,
          size: 123456,
        },
      },
    },
  ]);

  const fetchPixabayVideos = async () => {
    setHomeLoder(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${query}&per_page=10&page=${page}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          alert("Resource not found, Try to search different");
          return [];
        } else {
          throw new Error(response.statusText);
        }
      }
      const data = await response.json();
      return data.hits;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        alert("Network Connection Failed");
        return [];
      } else {
        alert(`Somthing wants Wrong : ${error.message}`);
        return [];
      }
      return [];
    } finally {
      setHomeLoder(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const pixabayVideos = await fetchPixabayVideos();
      if (pixabayVideos.length !== 0) {
        const combain = [...customVideos, ...pixabayVideos];
        setVideos(combain);
        setCustom(combain);
        setPage(page + 1);
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error("Error combining video sources:", error);
    }
  };

  const fetchShorts = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${shortsQuery}&per_page=10&page=${shortPage}`
      );
      if (!response.ok) {
        throw new Error("Pixabay API request failed", response.statusText);
      }
      const data = await response.json();
      return data.hits;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        console.log ("Network Connection Error");
        return [];
      } else {
        alert("Error fetching shorts:", error);
      }
    }
  };

  const useShorts = async () => {
    const data = await fetchShorts();
    if(data.length !== 0){
    const newData = [...shortsCustom, ...data];
    setShorts(newData);
    setShortsCustom(newData);
    setShortPage(shortPage + 1);
    }
    else{
      alert("Check Network");
    }
  };

  const [preQ , setPreQ] = useState(null);
  const Search = async (query) => {
    setLoder(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
          query
        )}&per_page=20&page=${searchPage}`
      );
      if (!response.ok) throw new Error("Pixabay API request failed");
      const data = await response.json();
      return data.hits;
    } catch (error) {
      if(error.message === 'Failed to fetch'){
        alert("You're offline")
        return [];
      }
      else{
      alert("Error during search:", error);
      }
    } finally {
      setLoder(false);
    }
  };

  const fetchSearch = async (query) => {
    const response = await Search(query);
    console.log(query)
      if(preQ === query){
    setSearch((pre) => [...pre, ...response]);
    setSearchPage(searchPage + 1);
      }
      else{
        setSearch(response);
      }
      setPreQ(query);
    
  };

  const [searchQ, setSearchQ] = useState(null);
  const fetchPhotos = async (searchData) => {
    setLoder(true);
    try {
      const photoResponse = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
          searchData
        )}&image_type=photo&per_page=30&page=${imagePage}`
      );

      const photoData = await photoResponse.json();
      if (searchData === searchQ) {
        setImages((pre) => [...pre, ...photoData.hits]);
        setImagePage(imagePage + 1);
      } else {
        setImages(photoData.hits);
        setImagePage(1);
      }
      setSearchQ(searchData);
    } catch (error) {
      if(error.message === 'Failed to fetch'){
        alert("You're offline")
      }
      console.log("Error", error);
    }
    setLoder(false);
  };

  useEffect(() => {
    fetchVideos();
    useShorts();
  }, []);

  const fetchRelatedVideos = () => {
    const relateIndex = Math.floor(Math.random() * (videos.length - 10));
    const arr = videos.slice(relateIndex, relateIndex + 10);
    setRelated(arr);
  };

  return (
    <AllData.Provider
      value={{
        videos,
        related,
        fetchRelatedVideos,
        sidebar,
        setSidebar,
        shorts,
        search,
        fetchSearch,
        loder,
        homeLoder,
        fetchVideos,
        useShorts,
        images1,
        fetchPhotos,
      }}
    >
      {children}
    </AllData.Provider>
  );
};

export default PostListProvider;
