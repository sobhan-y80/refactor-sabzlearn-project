import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./CourseBox.css";
import { mainUrl } from "../../Utils/Utils";

const CourseBox = ({ smalMode, smalDetailMode = null, ...props }) => {
  return (
    <div className="course-box">
      <div className="course-box__img-wrapper">
        <Link
          to={`/Course/${
            props.shortName ? props.shortName : props.course.name
          }`}
          className="course-box__img-wrapper__link"
        >
          <img
            className="course-box__img inline-block"
            // src="images/courses/jango.png"

            src={`${mainUrl}/courses/covers/${
              props.cover ? props.cover : props.course.cover
            }`}
            width="100%"
            alt="course img"
          />
        </Link>
      </div>
      <div className="course-box__content grid grid-cols-2 items-center gap-3">
        <div className="course-box__title-wrapper col-span-2">
          {props.categoryID &&
            (props.categoryID.title ? (
              <span
                className={`course-box__category ${smalMode ? "text-xs" : ""}`}
              >
                {props.categoryID.title}
              </span>
            ) : (
              ""
            ))}

          <p className="course-box__name">
            <Link
              to={`/Course/${
                props.shortName ? props.shortName : props.course.name
              }`}
              className="course-box__link hpc__short-text"
            >
              {props.name ? props.name : props.course.name}
            </Link>
          </p>
        </div>
        <div
          className={`course-box__price-wrapper col-span-2 w-full ${
            !smalDetailMode ? "sm:col-span-1 sm:w-auto" : ""
          }  ${smalMode ? "text-xs" : ""}`}
        >
          <span className="course-box__price hpc__off">
            <span className="course-box__price-number">
              {(props.price + 1_000_000).toLocaleString()}
            </span>
            <span className="course-box__price-text">تومان</span>
          </span>
          <span
            className={`course-box__price-amount ${smalMode ? "text-xl" : ""}`}
          >
            <span className="course-box__price-amount-number">
              {props.price && props.price !== 0
                ? props.price.toLocaleString()
                : "رایگان"}
            </span>
            <span className="course-box__price-amount-text">
              {props.price && props.price !== 0 ? "تومان" : ""}
            </span>
          </span>
        </div>
        {!smalDetailMode && (
          <div className="course-box__student-wrapper col-span-2 w-full sm:col-span-1 sm:w-auto">
            <span className={`course-box__studnet-count hpc__gold text-lg`}>
              {props.registers ? props.registers : "دانشجو ندارد"}
            </span>
            <span className="course-box__studnet-name text-lg">
              {props.registers ? "دانشجو" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBox;
