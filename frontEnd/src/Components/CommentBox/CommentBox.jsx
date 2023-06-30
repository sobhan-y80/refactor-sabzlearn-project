import React from "react";

function CommentBox({ ...props }) {
  return (
    <>
      <div className="comment__contnet">
        <div className="comment__card">
          <div className="comment-card__header">
            <div className="commnet-card__header__profile">
              <div className="commnet-card__header__profile-icon comment-card__svg-wrapper">
                <img
                  src="./images/product-svg/user-comment.svg"
                  alt="user Cm"
                  className="comment-card__svg"
                />
              </div>
              <span className="commnet-card__header__profile-name">
                {props.creator.name}
              </span>
            </div>
            <div className="comment-card__user-stutus">
              <span className="comment-card__user-stutus-text">
                {props.creator.role === "ADMIN"
                  ? "ادمین"
                  : props.creator.role === "USER"
                  ? "کاربر"
                  : ""}
              </span>
            </div>
          </div>
          <div className="commnet-card__content">
            <p className="commnet-card__content-text">{props.body}</p>
          </div>
          <div className="comment-card__control">
            <ul className="comment-card__control-list">
              <li className="comment-card__control-item">
                <a
                  href="#"
                  className="comment-card__control-reply comment-card__control-link"
                  title="پاسخ"
                >
                  <img
                    src="./images/comment/reply.svg"
                    alt="commnet icon"
                    className="comment-card__control-svg"
                  />
                </a>
              </li>
              <li className="comment-card__control-item">
                <a
                  href="#"
                  className="comment-card__control-like comment-card__control-link"
                  title="پسندیدن"
                >
                  <span className="comment-card__control-like-count">13</span>
                  <img
                    src="./images/comment/like-outline.svg"
                    alt="commnet icon"
                    className="comment-card__control-svg"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {props.answerContent && props.answerContent.length !== 0 ? (
          <div className="comment__container">
            <div className="comment__card">
              <div className="comment-card__header">
                <div className="commnet-card__header__profile">
                  <div className="commnet-card__header__profile-icon comment-card__svg-wrapper">
                    <img
                      src="./images/product-svg/user-comment.svg"
                      alt="user Cm"
                      className="comment-card__svg"
                    />
                  </div>
                  <span className="commnet-card__header__profile-name">
                    {props.answerContent.creator.name}
                  </span>
                </div>
                <div className="comment-card__user-stutus">
                  <span className="comment-card__user-stutus-text">
                    {props.answerContent.creator.role === "ADMIN"
                      ? "ادمین"
                      : props.answerContent.creator.role === "USER"
                      ? "کاربر"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="commnet-card__content">
                <p className="commnet-card__content-text">
                  {props.answerContent.body}
                </p>
              </div>
              <div className="comment-card__control">
                <ul className="comment-card__control-list">
                  <li className="comment-card__control-item">
                    <a
                      href="#"
                      className="comment-card__control-reply comment-card__control-link"
                      title="پاسخ"
                    >
                      <img
                        src="./images/comment/reply.svg"
                        alt="commnet icon"
                        className="comment-card__control-svg"
                      />
                    </a>
                  </li>
                  <li className="comment-card__control-item">
                    <a
                      href="#"
                      className="comment-card__control-like comment-card__control-link"
                      title="پسندیدن"
                    >
                      <span className="comment-card__control-like-count">
                        13
                      </span>
                      <img
                        src="./images/comment/like-outline.svg"
                        alt="commnet icon"
                        className="comment-card__control-svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CommentBox;
