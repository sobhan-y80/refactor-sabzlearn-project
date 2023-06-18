import React from "react";
import "./Category.css";

import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";

const Category = () => {
  return (
    <>
      <Header></Header>
      <BreadCrumb></BreadCrumb>

      {/* <!-- Start Main --> */}
      <div className="main">
        <div className="w-full px-10">
          {/* <!-- Start Breadcrumb --> */}
          <div className="breadcrumb hpc__section">
            <div className="breadcrumb__title">
              <div className="">
                <div className="courses-header__left">
                  <div className="courses-header__select-wrapper">
                    <div className="courses-header__custom-fillter">
                      <span className="custom-fillter__default">
                        <span
                          id="custom-filter__selection-name"
                          className="custom-fillter__default-name"
                        >
                          مرتب سازی پیشفرض
                        </span>
                        <i className="fa-solid fa-angle-down custom-fillter-icon"></i>
                      </span>
                      <div className="custom-fillter__dropdown">
                        <ul className="custom-fillter__dropdown-list">
                          {/* <!-- <li
                          className="custom-fillter__dropdown-item"
                          data-key="popular"
                        >
                          محبوب ترین
                        </li> --> */}
                          <li
                            className="custom-fillter__dropdown-item"
                            data-key="score"
                          >
                            بالاترین امتیاز
                          </li>
                          <li
                            className="custom-fillter__dropdown-item"
                            data-key="last"
                          >
                            اولین دوره ها
                          </li>
                          <li
                            className="custom-fillter__dropdown-item"
                            data-key="free"
                          >
                            ارزانترین
                          </li>
                          <li
                            className="custom-fillter__dropdown-item"
                            data-key="money"
                          >
                            گرانترین
                          </li>
                          <li
                            className="custom-fillter__dropdown-item custom-fillter__active"
                            data-key="defualt"
                          >
                            مرتب سازی پیشفرض
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Finish Breadcrumb --> */}

          {/* <!-- Start Category  --> */}
          <div className="course">
            <div className="container">
              <div className="courses-contnet">
                <div className="container-fluid">
                  <div
                    id="course__category-wrapper"
                    className="grid grid-cols-12 gap-5"
                  >
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2">
                      <CourseBox></CourseBox>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Finish Category  --> */}
        </div>
      </div>
      {/* <!-- Finish Main --> */}

      <Footer></Footer>
    </>
  );
};

export default Category;
