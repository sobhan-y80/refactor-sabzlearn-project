import React from "react";

import "./ArticleBox.css";
import { mainUrl } from "../../Utils/Utils";

function ArticleBox({ ...props }) {
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
          <a href="#" className="article-box__link text-sm">
            بیشتر بخون...
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleBox;
