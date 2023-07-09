import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SearchBox from "../../Components/SearchBox/SearchBox";

function NotFound() {
  return (
    <>
      <Header customClassForParet="notFound"></Header>
      <div className="hpc__section flex justify-center items-center">
        {/* <img src="images/NotFound/bubble-gum-error-404.gif" alt="" /> */}
        <div className="notfound-image-wrapper w-3/12 ">
          <img src="images/NotFound/output-onlinegiftools.gif" alt="" />
        </div>
        <div className="notfound-title__wrapper flex flex-col gap-10 font-medium">
          <h3 className="text-6xl">صفحه مورد نظر شما پیدا نشد</h3>
          <h2 className="text-4xl">
            دوره مورد نظرتو جستجو کن یا برو{" "}
            <Link to="/" className="text-[#43c67a]">
              صفحه اصلی
            </Link>
          </h2>
          <SearchBox type="large"></SearchBox>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default NotFound;
