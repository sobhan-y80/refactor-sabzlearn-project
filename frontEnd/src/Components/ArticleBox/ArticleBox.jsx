import React from "react";

import "./ArticleBox.css";
import { mainUrl } from "../../Utils/Utils";
import { Link } from "react-router-dom";

function ArticleBox({ ...props }) {
  console.log(props);
  return (
    <div
      className={`article-wrapper-box flex items-center justify-center ${
        props.size === "smal" ? "smal" : ""
      }`}
    >
      <div className="article-box">
        <div className="article-box__img-wrapper">
          <div className="article-box__background-img"></div>
          <img
            className="article-box__img"
            src={`${mainUrl}/courses/covers/${props.cover}`}
            alt=""
          />
        </div>
        <div className="article-box__content">
          <span className="article-box__title hpc__short-text">
            {props.title}
          </span>
          <span className="article-box__subtitle hpc__short-text">
            {props.description}
          </span>
          <Link
            to={`/Blog/${props.shortName}`}
            className="article-box__link text-sm"
          >
            بیشتر بخون...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleBox;
