import { useContext } from "react";
import "./styles/search.css";
import { AllData } from "../store/post-list-data";
import View from "./view";
import Loder from "./loder";
import { useRef } from "react";

const Search = () => {
  const { search, loder, fetchSearch } = useContext(AllData);
  const searchRef = useRef(null);

  const search3 = () => {
    const searchData = searchRef.current.value;
    fetchSearch(searchData);
  };
  return (
    <div className="search-component">
      <div className="box2">
        <input type="search" className="search2" ref={searchRef}></input>
        <div className="tab2">
          <i class="fa-brands fa-searchengin" onClick={search3}></i>
        </div>
      </div>
      {loder ? <Loder /> : null}
      {search
        ? search.map((video, index) => <View key={index} video={video} />)
        : null}
      {search.length !== 0 ? (
        <div className="next" onClick={search3}>
          <div className="next2">See More</div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
