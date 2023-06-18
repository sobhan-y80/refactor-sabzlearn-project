import React from "react";
import { NavLink } from "react-router-dom";

import "./CourseBox.css";

const CourseBox = ({ smalMode }) => {
  return (
    <div className="course-box">
      <div className="course-box__img-wrapper">
        <NavLink className="course-box__img-wrapper__link">
          <img
            className="course-box__img inline-block"
            src="public/images/courses/jango.png"
            width="100%"
            alt="course img"
          />
        </NavLink>
      </div>
      <div className="course-box__content">
        <div className="course-box__title-wrapper">
          <span className={`course-box__category ${smalMode ? "text-xs" : ""}`}>
            برنامه نویسی فرانت اند
          </span>
          <p className="course-box__name">
            <NavLink className="course-box__link hpc__short-text">
              آموزش جنگو
            </NavLink>
          </p>
        </div>
        <div
          className={`course-box__price-wrapper ${smalMode ? "text-xs" : ""}`}
        >
          <span className="course-box__price hpc__off">
            <span className="course-box__price-number">1,000,000</span>
            <span className="course-box__price-text">تومان</span>
          </span>
          <span
            className={`course-box__price-amount ${smalMode ? "text-xl" : ""}`}
          >
            <span className="course-box__price-amount-number">500,000</span>
            <span className="course-box__price-amount-text">تومان</span>
          </span>
        </div>
        <div className="course-box__student-wrapper">
          <span
            className={`course-box__studnet-count hpc__gold ${
              smalMode ? "text-lg" : ""
            }`}
          >
            1,100
          </span>
          <span className="course-box__studnet-name">دانشجو</span>
        </div>
      </div>
    </div>
  );
};

export default CourseBox;
