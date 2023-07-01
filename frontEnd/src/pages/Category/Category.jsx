import React, { useEffect, useRef, useState } from "react";
import "./Category.css";

import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import { mainUrlApi } from "../../Utils/Utils";
import PaginationCustom from "../../Components/Pagination/Pagination";

const itemCategoryCourseData = [
  { id: 1, name: "مرتب سازی پیشفرض", key: "default" },
  { id: 2, name: "بالاترین امتیاز", key: "score" },
  { id: 3, name: "اولین دوره ها", key: "last" },
  { id: 4, name: "ارزانترین", key: "free" },
  { id: 5, name: "گرانترین", key: "money" },
];

const Category = () => {
  const customDefaultNameElm = useRef();
  const [courseCategory, setCourseCategory] = useState([]);

  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState({
    id: 1,
    name: "مرتب سازی پیشفرض",
    key: "default",
  });

  const [itemCategoryCourse, setItemCategoryCourse] = useState([]);

  const [customCategorySort, setCustomCategorySort] = useState([]);

  const courseCategoryRender = () => {
    fetch(`${mainUrlApi}/courses/category/frontend`)
      .then((res) => res.json())
      .then((courseCategoryData) => setCourseCategory(courseCategoryData));
  };

  const changeCategorySortHandler = (e) => {
    const categoryMain = e.target.dataset.key;

    if (categoryMain) {
      const categoryMainObj = itemCategoryCourseData
        .filter((item) => item.key === categoryMain)
        .pop();
      setMainItemCategoryCourse(categoryMainObj);

      const mainCourse = [...courseCategory];
      let outputArray = [];
      switch (categoryMain) {
        case "score":
          {
            customDefaultNameElm.current.innerHTML = "بالاترین امتیاز";
            outputArray = mainCourse.sort(
              (a, b) => b.courseAverageScore - a.courseAverageScore
            );
          }
          break;
        case "last":
          {
            outputArray = mainCourse.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          }
          break;
        case "free":
          {
            outputArray = mainCourse.filter((course) => course.price === 0);
          }
          break;
        case "money":
          {
            outputArray = mainCourse.filter((course) => course.price !== 0);
          }
          break;

        default:
          {
            outputArray = mainCourse;
          }
          break;
      }
      setCustomCategorySort(outputArray);
    }
  };

  useEffect(() => {
    const itemCategoryCourseMain = itemCategoryCourseData.filter(
      (item) => item.key !== mainItemCategoryCourse.key
    );

    setItemCategoryCourse(itemCategoryCourseMain);
  }, [mainItemCategoryCourse]);

  useEffect(() => {
    courseCategoryRender();
  }, []);

  return (
    <>
      <Header></Header>
      <BreadCrumb></BreadCrumb>

      {/* <!-- Start Main --> */}
      <div
        className={`main category ${
          courseCategory.length ? "" : "!items-center"
        }`}
      >
        {courseCategory.length ? (
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
                            ref={customDefaultNameElm}
                          >
                            {mainItemCategoryCourse.name}
                          </span>
                          <i className="fa-solid fa-angle-down custom-fillter-icon"></i>
                        </span>
                        <div className="custom-fillter__dropdown">
                          <ul
                            className="custom-fillter__dropdown-list"
                            onClick={(e) => changeCategorySortHandler(e)}
                          >
                            {itemCategoryCourse.map((item) => (
                              <li
                                key={item.id}
                                className={`custom-fillter__dropdown-item`}
                                data-key={item.key}
                              >
                                {item.name}
                              </li>
                            ))}
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
                      <PaginationCustom
                        CurentPage={1}
                        arrays={
                          customCategorySort.length === 0
                            ? courseCategory
                            : customCategorySort
                        }
                        pageItemCount={4}
                        parentClassNameHolder={`col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2 `}
                      ></PaginationCustom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Finish Category  --> */}
          </div>
        ) : (
          <div className="col-span-12 text-3xl text-center hpc__title">
            دوره ای با کتگوری مورد نظر شما یافت نشد
          </div>
        )}
      </div>
      {/* <!-- Finish Main --> */}

      <Footer></Footer>
    </>
  );
};

export default Category;
