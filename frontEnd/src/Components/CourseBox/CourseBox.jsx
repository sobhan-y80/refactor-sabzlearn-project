import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./CourseBox.css";

const CourseBox = ({ smalMode, ...props }) => {
  console.log(props);
  return (
    <div className="course-box">
      <div className="course-box__img-wrapper">
        <NavLink className="course-box__img-wrapper__link">
          <img
            className="course-box__img inline-block"
            // src="images/courses/jango.png"
            src={`http://localhost:4000/v1/courses/covers/${props.cover}`}
            width="100%"
            alt="course img"
          />
        </NavLink>
      </div>
      <div className="course-box__content grid grid-cols-2 items-center gap-3">
        <div className="course-box__title-wrapper col-span-2">
          <span className={`course-box__category ${smalMode ? "text-xs" : ""}`}>
            {props.categoryID.title}
          </span>
          <p className="course-box__name">
            <Link
              to={`Course/${props.shortName}`}
              className="course-box__link hpc__short-text"
            >
              {props.name}
            </Link>
          </p>
        </div>
        <div
          className={`course-box__price-wrapper col-span-2 w-full sm:col-span-1 sm:w-auto ${
            smalMode ? "text-xs" : ""
          }`}
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
        <div className="course-box__student-wrapper col-span-2 w-full sm:col-span-1 sm:w-auto">
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
