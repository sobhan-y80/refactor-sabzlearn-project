import React, { useRef } from "react";
import "./Product.css";
import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

import { NavLink } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const Product = () => {
  const elm = useRef();
  const toggleAccordionHandler = () => {
    if (elm.current.classList.contains("active")) {
      elm.current.classList.remove("active");
    } else {
      elm.current.classList.add("active");
    }
    console.log(elm.current);
  };

  const changeHandler = () => {
    console.log("cs");
  };

  const submitHandler = () => {
    console.log("submitHandler");
  };
  return (
    <>
      <Header></Header>
      <BreadCrumb></BreadCrumb>

      {/* <!-- Start Course Main Info --> */}
      <div className="course-info">
        <div className="w-full px-10">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 lg:col-span-1 my-4 lg:my-0">
              <div className="course-info__video-wrapper">
                <video
                  height="auto"
                  src=""
                  className="course-info__video"
                  poster="images/courses/sabz-redux.png"
                  controls
                ></video>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 my-4 lg:my-0">
              <div className="course-info__contnet">
                <div className="course-info__price-wrapper flex justify-start items-center gap-5">
                  <span className="course-info__price hpc__off">
                    <span className="course-info__price-number">5,000,000</span>
                    <span className="course-info__price-text">تومان</span>
                  </span>
                  <span className="course-info__price-amount">
                    <span className="course-info__price-amount-number">
                      1,000,000
                    </span>
                    <span className="course-info__price-amount-text">
                      تومان
                    </span>
                  </span>
                </div>
                <div className="course-info__category-wrapper flex">
                  <span className="course-info__category-name">دسته:</span>
                  <ul className="course-info__category-list">
                    <li className="course-info__category-item hpc__category-item">
                      <NavLink className="course-info__link">
                        آموزش برنامه نویسی فرانت اند
                      </NavLink>
                    </li>
                    <li className="course-info__category-item hpc__category-item">
                      <NavLink className="course-info__link">
                        فرانت - تخفیف
                      </NavLink>
                    </li>
                    <li className="course-info__category-item hpc__category-item">
                      <NavLink className="course-info__link">فریمورک</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="course-info__desc-wrapper">
                  {/* <!-- Start Warn Text --> */}
                  <p className="course-info__desc-warn">
                    پس از خرید، بلافاصله به محتوای دوره دسترسی خواهید داشت و
                    میتوانید دوره را مشاهده و یا دانلود کنید.
                  </p>
                  {/* <!-- Finish Warn Text --> */}
                </div>
                <div className="course-info__course-status-btn grid grid-cols-12 gap-5">
                  {/* <!-- Start button About teachs --> */}
                  <div className="course-info__seeing-product-contnet col-span-4">
                    <a
                      href="#topic"
                      id="prodcut-start-now-status"
                      className="course-info__seeing-product-btn course-info__link course-info__link--active"
                    >
                      {/* <!-- data Loaded from js --> */}
                      استارت بزن
                    </a>
                  </div>
                  {/* <!-- Finish button About teachs --> */}
                  {/* <!-- Start button About Membership Status --> */}
                  <div className="course-info__buying-product-contnet col-span-8">
                    <a
                      href="#"
                      id="prodcut-buying-status"
                      className="course-info__buying-product-btn course-info__link"
                    >
                      {/* <!-- data Loaded from js --> */}
                      داشنجوری دوره هستید
                    </a>
                  </div>
                  {/* <!-- Finish button About Membership Status --> */}
                </div>
                <div className="course-info__social grid grid-cols-2 gap-5">
                  {/* <!-- Start Social Right --> */}
                  <div className="course-info__social-right flex items-center col-span-2 md:col-span-1">
                    {/* <!-- Start Course Score --> */}
                    <ul className="course-info__score-list flex">
                      <li className="course-info__score-item">
                        <img
                          width="15rem"
                          src="images/social/star.svg"
                          alt="score"
                          className="course-info__score-svg"
                        />
                      </li>
                      <li className="course-info__score-item">
                        <img
                          width="15rem"
                          src="images/social/star.svg"
                          alt="score"
                          className="course-info__score-svg"
                        />
                      </li>
                      <li className="course-info__score-item">
                        <img
                          width="15rem"
                          src="images/social/star.svg"
                          alt="score"
                          className="course-info__score-svg"
                        />
                      </li>
                      <li className="course-info__score-item">
                        <img
                          width="15rem"
                          src="images/social/star.svg"
                          alt="score"
                          className="course-info__score-svg"
                        />
                      </li>
                      <li className="course-info__score-item">
                        <img
                          width="15rem"
                          src="images/social/star.svg"
                          alt="score"
                          className="course-info__score-svg"
                        />
                      </li>
                    </ul>
                    {/* <!-- Finish Course Score --> */}
                    {/* <!-- Start Course Comments  --> */}
                    <div className="course-info__comments">
                      <NavLink className="course-info__comment-link">
                        <span
                          id="product-comment-count"
                          className="course-info__number-of-comments hpc__highlight"
                        >
                          1,100
                        </span>
                        <span className="course-info__comment-name">کامنت</span>
                      </NavLink>
                    </div>
                    {/* <!-- Finish Course Comments  --> */}
                    <span className="hpc__slash">/</span>
                    {/* <!-- Start Course Visit --> */}
                    <div className="course-info__visit">
                      <span className="course-info__visit-number hpc__highlight">
                        11,200
                      </span>
                      <span className="course-info__visit-name">بازدید</span>
                    </div>
                    {/* <!-- Finish Course Visit --> */}
                  </div>
                  {/* <!-- Finsih Social Right --> */}
                  {/* <!-- Start Social Left --> */}
                  <div className="course-info__social-left flex md:justify-end col-span-2 md:col-span-1">
                    {/* <!-- Start Social Media Links --> */}
                    <ul className="course-info__social-media-list">
                      <li className="course-info__social-media-item">
                        <a
                          href=""
                          title="instagram"
                          className="course-info__social-media-link"
                        >
                          <img
                            width="25px"
                            src="images/social/instagram.svg"
                            alt="instagram"
                          />
                        </a>
                      </li>
                      <li className="course-info__social-media-item">
                        <a
                          href=""
                          title="telegram"
                          className="course-info__social-media-link"
                        >
                          <img
                            width="25px"
                            src="images/social/telegram.svg"
                            alt="telegram"
                          />
                        </a>
                      </li>
                      <li className="course-info__social-media-item">
                        <a
                          href=""
                          title="linkedin"
                          className="course-info__social-media-link"
                        >
                          <img
                            width="25px"
                            src="images/social/linkedin.svg"
                            alt="linkedin"
                          />
                        </a>
                      </li>
                      <li className="course-info__social-media-item">
                        <a
                          href=""
                          title="twitter"
                          className="course-info__social-media-link"
                        >
                          <img
                            width="25px"
                            src="images/social/twitter.svg"
                            alt="twitter"
                          />
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Finish Social Media Links --> */}
                  </div>
                  {/* <!-- Finsih Social Left --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Finish Course Main Info --> */}

      {/* <!-- Start Main Info --> */}
      <div className="main">
        <div className="w-full px-10">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="course">
                <div className="flex">
                  {/* <!-- Start Course Box --> */}
                  <div className="course__boxes">
                    <div className="grid grid-cols-1">
                      <div className="col-span-1">
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/chalkboard-teacher.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  مدرس :
                                </span>
                                <span
                                  id="product-creator"
                                  className="course-boxes__box-left-subtitle"
                                >
                                  محمد امین سعیدی راد
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/student.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  تعداد دانشجو:
                                </span>
                                <span
                                  id="product-register"
                                  className="course-boxes__box-left-subtitle"
                                >
                                  30,000
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/status-up.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  وضعیت دوره :
                                </span>
                                <span
                                  id="product-isComplete"
                                  className="course-boxes__box-left-subtitle"
                                >
                                  به اتمام رسیده
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/clock.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  زمان دوره :
                                </span>
                                <span className="course-boxes__box-left-subtitle">
                                  <span
                                    id="product-time"
                                    className="course-boxes__box-left-subtitle-number"
                                  >
                                    40
                                  </span>
                                  <span className="course-boxes__box-left-subtitle-text">
                                    ساعت
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/event-calender-date-note.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  آخرین بروزرسانی :
                                </span>
                                <span
                                  id="product-updateAt"
                                  className="course-boxes__box-left-subtitle"
                                >
                                  1401/02/03
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/support-music-listen-headphone.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  روش پشتیبانی
                                </span>
                                <span
                                  id="product-app-support"
                                  className="course-boxes__box-left-subtitle"
                                >
                                  آنلاین
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/light-bulb.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <div className="course-boxes__box-left-title hpc__title">
                                  پیش نیاز :
                                </div>
                                <div className="course-boxes__box-left-subtitle">
                                  <span>Html</span>
                                  <span>Css</span>
                                  <span>Js</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <div className="course-boxes__box">
                              <div className="course-boxes__box-right">
                                <img
                                  width="100%"
                                  src="images/product-svg/play-cricle.svg"
                                  alt="courses-box"
                                  className="course-boxes__box-right-svg"
                                />
                              </div>
                              <div className="course-boxes__box-left">
                                <span className="course-boxes__box-left-title hpc__title">
                                  روش آموزش:
                                </span>
                                <span className="course-boxes__box-left-subtitle">
                                  ظبط شده / آنلاین
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="course__desc-contnet">
                          <p id="product-desc" className="course__desc py-4">
                            امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش
                            تر کرده اند. به قدری که حتی امروزه هیچ شرکت برنامه
                            نویسی پروژه های خود را با Vanilla Js پیاده سازی نمی
                            کند و همیشه از کتابخانه ها و فریمورک های موجود
                            استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس
                            عالی فرانت اند باشید، باید کتابخانه های کاربردی که
                            در بازار کار استفاده می شوند را به خوبی بلد باشید
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      {/* <!-- Start Progress Bar --> */}
                      <div className="col-span-12 md:col-span-4 mb-4 md:mb-0">
                        <div className="course-progress">
                          <div className="course-progress__header">
                            <h3 className="course-progress__title-contnet d-flex align-items-center">
                              <img
                                src="images/product-svg/time-progress.svg"
                                alt=""
                                className="course-progress__title-svg"
                              />
                              <span className="course-progress__title-text">
                                درصد پیشرفت شما :
                              </span>
                            </h3>
                          </div>
                          <div className="course-progress__bar">
                            <div className="course-progress__perecnt">
                              <div className="course-progress__dot"></div>
                              <svg className="course-progress__svg">
                                <circle
                                  className="course-progress__circle"
                                  cx="70"
                                  cy="70"
                                  r="70"
                                ></circle>
                                <circle
                                  className="course-progress__circle"
                                  cx="70"
                                  cy="70"
                                  r="70"
                                ></circle>
                              </svg>
                              <div className="course-progress__number">
                                <h2>
                                  95<span>%</span>
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Finish Progress Bar --> */}
                      {/* <!-- Start More Product --> */}
                      <div className="col-span-12 md:col-span-8">
                        <div className="more-product">
                          <div className="flex">
                            <h3 className="more-product__title">
                              محصولات مرتبط
                            </h3>
                          </div>
                          <div
                            className="w-full grid grid-cols-12 gap-5"
                            id="more-product-wrapper"
                          >
                            {/* <!-- data loaded from js --> */}
                            <div className="col-span-12 md:col-span-4 my-3 md:my-0">
                              <a href="#pr" className="more-product__link">
                                <div className="more-product__img-wrapper">
                                  <img
                                    src="/images/courses/jango.png"
                                    alt="more-product"
                                    className="more-product__img"
                                  />
                                </div>
                                <div className="more-product__content">
                                  <span className="more-prodcut__product-title">
                                    آموزش جنگو
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="col-span-12 md:col-span-4 my-3 md:my-0">
                              <a href="#pr" className="more-product__link">
                                <div className="more-product__img-wrapper">
                                  <img
                                    src="/images/courses/jango.png"
                                    alt="more-product"
                                    className="more-product__img"
                                  />
                                </div>
                                <div className="more-product__content">
                                  <span className="more-prodcut__product-title">
                                    آموزش جنگو
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="col-span-12 md:col-span-4 my-3 md:my-0">
                              <a href="#pr" className="more-product__link">
                                <div className="more-product__img-wrapper">
                                  <img
                                    src="/images/courses/jango.png"
                                    alt="more-product"
                                    className="more-product__img"
                                  />
                                </div>
                                <div className="more-product__content">
                                  <span className="more-prodcut__product-title">
                                    آموزش جنگو
                                  </span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Finish More Product --> */}
                    </div>
                  </div>
                  {/* <!-- Finish Course Box --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Finish Main Info --> */}

      {/* <!-- Start Topic Info --> */}
      <div id="topic" className="topic">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="topic__header-btn"
              onClick={toggleAccordionHandler}
            >
              <span className="topic__header-btn-text">
                مقدمات + رفع ابهام های موجود
              </span>
              <i className="fa-solid fa-angle-down topic__header-btn-icon"></i>
            </button>
          </h2>
          <div ref={elm} id="collapse1" className="">
            <div className="topic__accordion-body">
              <div className="topic__accordion-body-right">
                <span className="topic__accordion-count">1</span>
                <a href="#" className="topic__accordion-link">
                  <span className="topic__accordion-svg-wrapper">
                    <img
                      src="images/product-svg/play-circle-video.svg"
                      alt=""
                      className="topic__accordion-svg"
                    />
                  </span>
                  <span className="topic__accordion-link-text">
                    ریداکس چیه !!؟
                  </span>
                </a>
              </div>
              <div className="topic__accordion-body-left">
                <span className="topic__accordion-time"> 00:10:57</span>
              </div>
            </div>
            <div className="topic__accordion-body">
              <div className="topic__accordion-body-right">
                <span className="topic__accordion-count">2</span>
                <a href="#" className="topic__accordion-link">
                  <span className="topic__accordion-svg-wrapper">
                    <img
                      src="images/product-svg/play-circle-video.svg"
                      alt=""
                      className="topic__accordion-svg"
                    />
                  </span>
                  <span className="topic__accordion-link-text">
                    چرا میگن ریداکس انقدر سخته !!؟
                  </span>
                </a>
              </div>
              <div className="topic__accordion-body-left">
                <span className="topic__accordion-time"> 00:15:31</span>
              </div>
            </div>
            <div className="topic__accordion-body">
              <div className="topic__accordion-body-right">
                <span className="topic__accordion-count">3</span>
                <a href="#" className="topic__accordion-link">
                  <span className="topic__accordion-svg-wrapper">
                    <img
                      src="images/product-svg/play-circle-video.svg"
                      alt=""
                      className="topic__accordion-svg"
                    />
                  </span>
                  <span className="topic__accordion-link-text">
                    تو چه پروژه ای از ریداکس استفاده نکنیم
                  </span>
                </a>
              </div>
              <div className="topic__accordion-body-left">
                <span className="topic__accordion-time"> 00:20:57</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="topic__content" id="topic-content"></div>
        </div>
      </div>
      {/* <!-- Finish Topic Info --> */}

      {/* <!-- Start Comment --> */}
      <div className="comment">
        <div className="w-full px-10 py-10">
          <div className="comment__content-wrapper">
            <div className="comment__form-review">
              <div className="comment__respond">
                <h3 className="comment__respond-title animate__animated animate__flash animate__infinite">
                  نظرتو در میون بزار
                </h3>
                <div className="comment__respond__select-score-wrapper">
                  <h4 className="comment__respond__select-score-title">
                    امتیاز شما
                  </h4>
                  <div className="comment__respond__custom-select-score">
                    <form
                      onSubmit={submitHandler}
                      id="comment__respond__score-form"
                    >
                      <select
                        name=""
                        value="1"
                        id="comment__respond__score-select"
                        onChange={changeHandler}
                      >
                        <option value="1">تایین کنید</option>
                        <option value="5">عالی</option>
                        <option value="4">خوب</option>
                        <option value="3">متوسط</option>
                        <option value="2">بد</option>
                      </select>
                    </form>
                  </div>
                </div>
                <div className="comment__respond-comment">
                  <h4 className="comment__respond-comment__title">نظر شما</h4>
                  <div className="comment__respond-comment__textarea-wrapper">
                    <textarea
                      name=""
                      id="comment-body"
                      className="comment__respond-comment__textarea input-box__input"
                      placeholder="نظرتو بنویس...."
                    ></textarea>
                  </div>
                </div>
                <div className="comment__respond__submit">
                  <button
                    id="comment-submit-btn"
                    className="comment__respond__submit-btn"
                  >
                    ارسال
                    <i className="fa-solid fa-angles-left comment__respond__submit-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              id="comment-wrapper"
              className="comment__container comment__comment-wrapper"
            >
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
                        SO
                      </span>
                    </div>
                    <div className="comment-card__user-stutus">
                      <span className="comment-card__user-stutus-text">
                        ADMIN
                      </span>
                    </div>
                  </div>
                  <div className="commnet-card__content">
                    <p className="commnet-card__content-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Adipisci tempore nihil officia libero a, consectetur
                      voluptates necessitatibus officiis ullam veritatis, aut
                      doloremque eligendi tenetur illum optio dignissimos!
                      Earum, alias deleniti?
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
                          SOBHAN
                        </span>
                      </div>
                      <div className="comment-card__user-stutus">
                        <span className="comment-card__user-stutus-text">
                          ADMIN
                        </span>
                      </div>
                    </div>
                    <div className="commnet-card__content">
                      <p className="commnet-card__content-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Adipisci tempore nihil officia libero a, consectetur
                        voluptates necessitatibus officiis ullam veritatis, aut
                        doloremque eligendi tenetur illum optio dignissimos!
                        Earum, alias deleniti?
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
              </div>
            </div>

            <div className="global-pagination d-flex justify-content-center">
              <ul
                id="comment-pagination-action-wrapper"
                className="global__pagination-list d-flex align-items-center"
              >
                {/* <li className="global__pagination-item">
                <a href="#" className="global__pagination-link">
                  <i className="fa-solid fa-long-arrow-right"></i>
                </a>
              </li>
              <li className="global__pagination-item">
                <a
                  href="#"
                  className="global__pagination-link global__pagination-link--active"
                >
                  1
                </a>
              </li>
              <li className="global__pagination-item">
                <a href="#" className="global__pagination-link"> 2 </a>
              </li>
              <li className="global__pagination-item">
                <a href="#" className="global__pagination-link"> 3 </a>
              </li>
              <li className="global__pagination-item">
                <a href="#" className="global__pagination-link">
                  <i className="fa-solid fa-long-arrow-left"></i>
                </a>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Finish Comment --> */}

      <Footer></Footer>
    </>
  );
};

export default Product;
