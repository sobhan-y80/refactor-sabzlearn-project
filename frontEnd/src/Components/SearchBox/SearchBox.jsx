import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SearchBox({ type }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const changeHandler = (e) => {
    if (e.keyCode === 13) {
      clickForSearchHandler();
    } else {
      setInputValue(e.target.value);
    }
  };

  const clickForSearchHandler = () => {
    console.log(inputValue);

    if (inputValue) {
      navigate("/Search");
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
              onKeyDown={(e) => changeHandler(e)}
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
              onKeyDown={(e) => changeHandler(e)}
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
