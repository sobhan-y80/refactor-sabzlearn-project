import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SearchBox({ type }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const goSearchClickHandler = (e) => {
    if (e.keyCode === 13) {
      clickForSearchHandler();
    }
  };

  const clickForSearchHandler = () => {
    if (inputValue) {
      navigate(`/Search/${inputValue}`);
      setInputValue("");
    } else {
      toast.error("چیزی برای سرچ کردن ننوشتی خب من دنبال چی بگردم :/");
    }
  };
  return (
    <>
      {type === "large" ? (
        <>
          <div className="landing-header__searchbar global__searchbar">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => goSearchClickHandler(e)}
              type="text"
              className="landing-header___search-input global__search-input"
              placeholder="جستجو..."
              id="search-input"
            />
            <button
              onClick={clickForSearchHandler}
              id="search-btn"
              className="landing-hader__search-btn global__search-btn"
            >
              <i className="fa-solid fa-magnifying-glass landing-header__serach-icon global__search-icon"></i>
            </button>
          </div>
          <Toaster></Toaster>
        </>
      ) : (
        <>
          <div
            id="main-header__searchbar"
            className="main-header__searchbar global__searchbar"
          >
            <input
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => goSearchClickHandler(e)}
              value={inputValue}
              type="text"
              id="main-header__search-input"
              className="main-header___search-input global__search-input"
              placeholder="جستجو..."
            />
            <button
              onClick={clickForSearchHandler}
              className="main-header__search-btn global__search-btn"
            >
              <i className="fa-solid fa-magnifying-glass main-header__serach-icon global__search-icon"></i>
            </button>
          </div>
          <Toaster></Toaster>
        </>
      )}
    </>
  );
}

export default SearchBox;
