import LocationSearch from "../../Components/Driver/LocationSearch";
import "./search.css";
import { useEffect } from "react";
function Search() {
  return (
    <div className="search-page d-flex justify-content-center align-center">
      <div className="background"></div>
      <div className="search-component">
        <div className="search-bar">
          <LocationSearch />
        </div>
      </div>
    </div>
  );
}

export default Search;
