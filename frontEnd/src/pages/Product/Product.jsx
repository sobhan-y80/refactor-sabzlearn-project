import React, { useContext, useEffect, useRef, useState } from "react";
import "./Product.css";
import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";

import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { mainUrl, mainUrlApi } from "../../Utils/Utils";
import useShuffled from "../../Hooks/useShuffled";
import InputBox from "../../Components/InputBox/InputBox";
import {
  minValidator,
  requiredValidatior,
} from "../../Components/InputBox/Validation/Rules";
import { useForm } from "../../Hooks/useForm";
import AuthContext from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import PaginationCustom from "../../Components/Pagination/Pagination";

const Product = () => {
  const { courseID } = useParams();
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [isCourseExsist, setIsCourseExsist] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState([]);
  const [scoreOfCourseInComment, setScoreOfCourseInComment] = useState(1);
  const [commentCourse, setCommentCourse] = useState([]);
  const [sessionCourse, setSessionCourse] = useState([]);
  const [relatedCourse, setRelatedCourse] = useState([]);
  let shuffledRelatedCourse =
    relatedCourse.length && useShuffled(relatedCourse);
  const courseProgressBarRef = useRef();
  console.log(sessionCourse);
  const [formState, onInputHandler] = useForm(
    {
      commentTextArea: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const courseInfoRender = async () => {
    await fetch(`${mainUrlApi}/courses/${courseID}`)
      .then(async (res) => {
        if (res.status === 404) {
          navigate("/NotFound ");
        } else if (res.status === 200) {
          const courseInfoData = await res.json();
          setCourseInfo(courseInfoData);
          setCommentCourse(courseInfoData.comments);
          setSessionCourse(courseInfoData.sessions);
          setIsCourseExsist(true);
          setIsDataLoad(true);
        }
      })
      .catch((er) => console.log(err));

    await fetch(`${mainUrlApi}/courses/related/${courseID}`)
      .then((res) => res.json())
      .then((relatedCourseData) => setRelatedCourse(relatedCourseData));
  };

  const courseProgressScrollHandler = () => {
    const scrollPosition = window.scrollY;
    courseProgressBarRef.current &&
      scrollPosition >= 500 &&
      courseProgressBarRef.current.classList.add("active");
  };

  const toggleAccordionHandler = (e) => {
    if (e.target.parentElement.parentElement.classList.contains("active")) {
      e.target.parentElement.parentElement.classList.remove("active");
    } else {
      e.target.parentElement.parentElement.classList.add("active");
    }
  };

  const changeHandler = (e) => {
    setScoreOfCourseInComment(parseInt(e.target.value));
  };

  const submitHandler = () => {
    if (authContext.isLoggedIn) {
      if (formState.isFormValid) {
        const localStorageData = JSON.parse(localStorage.getItem("token"));
        const commentObj = {
          courseShortName: "js-20-lib",
          body: formState.inputs.commentTextArea.value,
          score: scoreOfCourseInComment,
        };
        fetch(`${mainUrlApi}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Berear ${localStorageData.token}`,
          },
          body: JSON.stringify(commentObj),
        }).then((res) => {
          if (res.ok) {
            toast.success("کامنتت با موفقیت ثبت شد");
          }
        });
      } else {
        toast.error("مثل اینکه فراموش کردی نظرتو بنویسی :(");
      }
    } else {
      toast.error("قبل ثبت کامنت باید وارد بشی");
      setTimeout(() => {
        navigate("/Login");
      }, 5000);
    }
  };

  useEffect(() => {
    courseInfoRender();
  }, [courseID]);

  useEffect(() => {
    window.addEventListener("scroll", courseProgressScrollHandler);
    return () => {
      window.removeEventListener("scroll", courseProgressScrollHandler);
    };
  }, []);

  if (isDataLoad) {
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
                    poster={`${mainUrl}/courses/covers/${courseInfo.cover}`}
                    controls
                  ></video>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 my-4 lg:my-0">
                <div className="course-info__contnet">
                  <div className="course-info__price-wrapper flex justify-start items-center gap-5">
                    {courseInfo.discount ? (
                      <span className="course-info__price hpc__off">
                        <span className="course-info__price-number">
                          {courseInfo.price === 0
                            ? 1_000_000
                            : courseInfo.price.toLocaleString()}
                        </span>
                        <span className="course-info__price-text">تومان</span>
                      </span>
                    ) : (
                      ""
                    )}

                    <span className="course-info__price-amount">
                      <span className="course-info__price-amount-number">
                        {courseInfo.price !== 0
                          ? (courseInfo.discount
                              ? (courseInfo.price * courseInfo.discount) / 100
                              : courseInfo.price
                            ).toLocaleString()
                          : "رایگان"}
                      </span>
                      <span className="course-info__price-amount-text">
                        {courseInfo.price !== 0 ? "تومان" : ""}
                      </span>
                    </span>
                  </div>
                  <div className="course-info__category-wrapper flex">
                    <span className="course-info__category-name">دسته:</span>
                    <ul className="course-info__category-list">
                      <li className="course-info__category-item hpc__category-item">
                        <Link
                          to={`/Category/${courseInfo.categoryID.name}`}
                          className="course-info__link"
                        >
                          {courseInfo.categoryID.title}
                        </Link>
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
                        className={`course-info__seeing-product-btn course-info__link ${
                          courseInfo.isUserRegisteredToThisCourse
                            ? ""
                            : "course-info__link--active"
                        }`}
                      >
                        {courseInfo.isUserRegisteredToThisCourse
                          ? "ادامه بدههه"
                          : "شروع کن"}
                      </a>
                    </div>
                    {/* <!-- Finish button About teachs --> */}
                    {/* <!-- Start button About Membership Status --> */}
                    <div className="course-info__buying-product-contnet col-span-8">
                      <a
                        href="#"
                        id="prodcut-buying-status"
                        className={`course-info__buying-product-btn course-info__link ${
                          courseInfo.isUserRegisteredToThisCourse
                            ? "course-info__link--active"
                            : ""
                        }`}
                      >
                        {courseInfo.isUserRegisteredToThisCourse
                          ? "داشنجوری دوره هستید"
                          : "خرید دوره"}
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
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2_3)">
                              <path
                                d="M22.5004 1.10104L29.4525 15.1891L45 17.4488L33.7498 28.4141L36.4055 43.899L22.5004 36.5884L8.5945 43.899L11.2502 28.4141L0 17.4488L15.5475 15.1891L22.5004 1.10104Z"
                                fill="#EFCE4A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2_3">
                                <rect width="45" height="45" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </li>
                        <li className="course-info__score-item">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2_3)">
                              <path
                                d="M22.5004 1.10104L29.4525 15.1891L45 17.4488L33.7498 28.4141L36.4055 43.899L22.5004 36.5884L8.5945 43.899L11.2502 28.4141L0 17.4488L15.5475 15.1891L22.5004 1.10104Z"
                                fill="#EFCE4A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2_3">
                                <rect width="45" height="45" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </li>
                        <li className="course-info__score-item">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2_3)">
                              <path
                                d="M22.5004 1.10104L29.4525 15.1891L45 17.4488L33.7498 28.4141L36.4055 43.899L22.5004 36.5884L8.5945 43.899L11.2502 28.4141L0 17.4488L15.5475 15.1891L22.5004 1.10104Z"
                                fill="#EFCE4A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2_3">
                                <rect width="45" height="45" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </li>
                        <li className="course-info__score-item">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2_3)">
                              <path
                                d="M22.5004 1.10104L29.4525 15.1891L45 17.4488L33.7498 28.4141L36.4055 43.899L22.5004 36.5884L8.5945 43.899L11.2502 28.4141L0 17.4488L15.5475 15.1891L22.5004 1.10104Z"
                                fill="#EFCE4A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2_3">
                                <rect width="45" height="45" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </li>
                        <li className="course-info__score-item">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2_3)">
                              <path
                                d="M22.5004 1.10104L29.4525 15.1891L45 17.4488L33.7498 28.4141L36.4055 43.899L22.5004 36.5884L8.5945 43.899L11.2502 28.4141L0 17.4488L15.5475 15.1891L22.5004 1.10104Z"
                                fill="#EFCE4A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2_3">
                                <rect width="45" height="45" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
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
                            {commentCourse.length}
                          </span>
                          <span className="course-info__comment-name">
                            کامنت
                          </span>
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
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.75 1.5625H6.25C3.66117 1.5625 1.5625 3.66117 1.5625 6.25V18.75C1.5625 21.3388 3.66117 23.4375 6.25 23.4375H18.75C21.3388 23.4375 23.4375 21.3388 23.4375 18.75V6.25C23.4375 3.66117 21.3388 1.5625 18.75 1.5625Z"
                                fill="url(#paint0_radial_2_6)"
                              />
                              <path
                                d="M18.75 1.5625H6.25C3.66117 1.5625 1.5625 3.66117 1.5625 6.25V18.75C1.5625 21.3388 3.66117 23.4375 6.25 23.4375H18.75C21.3388 23.4375 23.4375 21.3388 23.4375 18.75V6.25C23.4375 3.66117 21.3388 1.5625 18.75 1.5625Z"
                                fill="url(#paint1_radial_2_6)"
                              />
                              <path
                                d="M18.75 1.5625H6.25C3.66117 1.5625 1.5625 3.66117 1.5625 6.25V18.75C1.5625 21.3388 3.66117 23.4375 6.25 23.4375H18.75C21.3388 23.4375 23.4375 21.3388 23.4375 18.75V6.25C23.4375 3.66117 21.3388 1.5625 18.75 1.5625Z"
                                fill="url(#paint2_radial_2_6)"
                              />
                              <path
                                d="M17.9688 8.20312C17.9688 8.85031 17.4441 9.375 16.7969 9.375C16.1497 9.375 15.625 8.85031 15.625 8.20312C15.625 7.55591 16.1497 7.03125 16.7969 7.03125C17.4441 7.03125 17.9688 7.55591 17.9688 8.20312Z"
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.5 16.4062C14.6573 16.4062 16.4062 14.6573 16.4062 12.5C16.4062 10.3427 14.6573 8.59375 12.5 8.59375C10.3427 8.59375 8.59375 10.3427 8.59375 12.5C8.59375 14.6573 10.3427 16.4062 12.5 16.4062ZM12.5 14.8438C13.7945 14.8438 14.8438 13.7945 14.8438 12.5C14.8438 11.2055 13.7945 10.1562 12.5 10.1562C11.2055 10.1562 10.1562 11.2055 10.1562 12.5C10.1562 13.7945 11.2055 14.8438 12.5 14.8438Z"
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.6875 12.1875C4.6875 9.56227 4.6875 8.24961 5.19841 7.24692C5.64781 6.36491 6.36491 5.64781 7.24692 5.19841C8.24961 4.6875 9.56227 4.6875 12.1875 4.6875H12.8125C15.4377 4.6875 16.7504 4.6875 17.753 5.19841C18.6351 5.64781 19.3522 6.36491 19.8016 7.24692C20.3125 8.24961 20.3125 9.56227 20.3125 12.1875V12.8125C20.3125 15.4377 20.3125 16.7504 19.8016 17.753C19.3522 18.6351 18.6351 19.3522 17.753 19.8016C16.7504 20.3125 15.4377 20.3125 12.8125 20.3125H12.1875C9.56227 20.3125 8.24961 20.3125 7.24692 19.8016C6.36491 19.3522 5.64781 18.6351 5.19841 17.753C4.6875 16.7504 4.6875 15.4377 4.6875 12.8125V12.1875ZM12.1875 6.25H12.8125C14.1509 6.25 15.0607 6.25122 15.764 6.30867C16.4491 6.36464 16.7994 6.46609 17.0437 6.5906C17.6317 6.89021 18.1098 7.36827 18.4094 7.95625C18.5339 8.20063 18.6354 8.55094 18.6913 9.23602C18.7488 9.9393 18.75 10.8491 18.75 12.1875V12.8125C18.75 14.1509 18.7488 15.0607 18.6913 15.764C18.6354 16.4491 18.5339 16.7994 18.4094 17.0437C18.1098 17.6317 17.6317 18.1098 17.0437 18.4094C16.7994 18.5339 16.4491 18.6354 15.764 18.6913C15.0607 18.7488 14.1509 18.75 12.8125 18.75H12.1875C10.8491 18.75 9.9393 18.7488 9.23602 18.6913C8.55094 18.6354 8.20063 18.5339 7.95625 18.4094C7.36827 18.1098 6.89021 17.6317 6.5906 17.0437C6.46609 16.7994 6.36464 16.4491 6.30867 15.764C6.25122 15.0607 6.25 14.1509 6.25 12.8125V12.1875C6.25 10.8491 6.25122 9.9393 6.30867 9.23602C6.36464 8.55094 6.46609 8.20063 6.5906 7.95625C6.89021 7.36827 7.36827 6.89021 7.95625 6.5906C8.20063 6.46609 8.55094 6.36464 9.23602 6.30867C9.9393 6.25122 10.8491 6.25 12.1875 6.25Z"
                                fill="white"
                              />
                              <defs>
                                <radialGradient
                                  id="paint0_radial_2_6"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(9.375 17.9688) rotate(-55.3758) scale(19.9372)"
                                >
                                  <stop stopColor="#B13589" />
                                  <stop offset="0.79309" stopColor="#C62F94" />
                                  <stop offset="1" stopColor="#8A3AC8" />
                                </radialGradient>
                                <radialGradient
                                  id="paint1_radial_2_6"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(8.59375 24.2188) rotate(-65.1363) scale(17.6517)"
                                >
                                  <stop stopColor="#E0E8B7" />
                                  <stop offset="0.444662" stopColor="#FB8A2E" />
                                  <stop offset="0.71474" stopColor="#E2425C" />
                                  <stop
                                    offset="1"
                                    stopColor="#E2425C"
                                    stopOpacity="0"
                                  />
                                </radialGradient>
                                <radialGradient
                                  id="paint2_radial_2_6"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(0.390625 2.34375) rotate(-8.1301) scale(30.3835 6.49872)"
                                >
                                  <stop offset="0.156701" stopColor="#406ADC" />
                                  <stop offset="0.467799" stopColor="#6A45BE" />
                                  <stop
                                    offset="1"
                                    stopColor="#6A45BE"
                                    stopOpacity="0"
                                  />
                                </radialGradient>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li className="course-info__social-media-item">
                          <a
                            href=""
                            title="telegram"
                            className="course-info__social-media-link"
                          >
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.5 2.08333C9.73733 2.08333 7.08781 3.1808 5.13431 5.1343C3.1808 7.08781 2.08333 9.73733 2.08333 12.5C2.08333 15.2627 3.1808 17.9122 5.13431 19.8657C7.08781 21.8192 9.73733 22.9167 12.5 22.9167C15.2627 22.9167 17.9122 21.8192 19.8657 19.8657C21.8192 17.9122 22.9167 15.2627 22.9167 12.5C22.9167 9.73733 21.8192 7.08781 19.8657 5.1343C17.9122 3.1808 15.2627 2.08333 12.5 2.08333Z"
                                fill="#29B6F6"
                              />
                              <path
                                d="M17.6823 7.8125L15.7312 17.774C15.7312 17.774 15.6474 18.2292 15.0828 18.2292C14.7828 18.2292 14.6281 18.0865 14.6281 18.0865L10.4021 14.5797L8.33437 13.5375L5.68073 12.8318C5.68073 12.8318 5.20833 12.6953 5.20833 12.3047C5.20833 11.9792 5.69427 11.824 5.69427 11.824L16.7964 7.41354C16.7964 7.41354 17.1354 7.29114 17.3828 7.29167C17.5349 7.29167 17.7083 7.35677 17.7083 7.55208C17.7083 7.68229 17.6823 7.8125 17.6823 7.8125Z"
                                fill="white"
                              />
                              <path
                                d="M11.9792 15.888L10.1948 17.6453C10.1948 17.6453 10.1172 17.7052 10.0135 17.7078C9.9776 17.7089 9.93906 17.7031 9.89948 17.6854L10.4016 14.5786L11.9792 15.888Z"
                                fill="#B0BEC5"
                              />
                              <path
                                d="M15.5714 9.47708C15.4833 9.3625 15.3208 9.34166 15.2062 9.42864L8.33333 13.5417C8.33333 13.5417 9.43021 16.6104 9.59739 17.1417C9.7651 17.6734 9.89948 17.6859 9.89948 17.6859L10.4016 14.5792L15.5224 9.84166C15.637 9.75469 15.6583 9.59166 15.5714 9.47708Z"
                                fill="#CFD8DC"
                              />
                            </svg>
                          </a>
                        </li>
                        <li className="course-info__social-media-item">
                          <a
                            href=""
                            title="linkedin"
                            className="course-info__social-media-link"
                          >
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.875 19.2708C21.875 20.7094 20.7094 21.875 19.2708 21.875H5.72917C4.29115 21.875 3.125 20.7094 3.125 19.2708V5.72917C3.125 4.29062 4.29115 3.125 5.72917 3.125H19.2708C20.7094 3.125 21.875 4.29062 21.875 5.72917V19.2708Z"
                                fill="#0288D1"
                              />
                              <path
                                d="M6.25 9.89583H8.85417V18.75H6.25V9.89583ZM7.54427 8.85417H7.52969C6.7526 8.85417 6.25 8.275 6.25 7.55156C6.25 6.8125 6.76823 6.25 7.55937 6.25C8.35156 6.25 8.83958 6.8125 8.85417 7.55156C8.85417 8.27448 8.35156 8.85417 7.54427 8.85417ZM18.75 18.75H16.1458V14.0109C16.1458 12.8661 15.5078 12.0849 14.4833 12.0849C13.7016 12.0849 13.2786 12.612 13.0734 13.1214C12.9984 13.3036 13.0208 13.8078 13.0208 14.0625V18.75H10.4167V9.89583H13.0208V11.2583C13.3964 10.6771 13.9844 9.89583 15.4885 9.89583C17.3521 9.89583 18.7495 11.0677 18.7495 13.6844L18.75 18.75Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </li>
                        <li className="course-info__social-media-item">
                          <a
                            href=""
                            title="twitter"
                            className="course-info__social-media-link"
                          >
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.875 6.47344C21.1859 6.77865 20.4448 6.98229 19.663 7.07865C20.4578 6.60677 21.0693 5.85417 21.3563 4.9651C20.6125 5.40104 19.7885 5.72135 18.912 5.8901C18.212 5.14792 17.2135 4.6875 16.1073 4.6875C13.9823 4.6875 12.2599 6.39479 12.2599 8.5C12.2599 8.79792 12.2948 9.08802 12.3604 9.36979C9.16354 9.20938 6.32813 7.68958 4.43125 5.38333C4.09792 5.94688 3.91042 6.60677 3.91042 7.30313C3.91042 8.62656 4.58802 9.79167 5.62135 10.4781C4.99063 10.4589 4.39688 10.2833 3.87708 10.0021C3.87708 10.0135 3.87708 10.0307 3.87708 10.0469C3.87708 11.8964 5.20365 13.4365 6.96198 13.787C6.64063 13.875 6.30104 13.924 5.95104 13.924C5.7026 13.924 5.46042 13.8958 5.22604 13.8536C5.71563 15.3651 7.13594 16.4698 8.81875 16.5026C7.50208 17.5234 5.84375 18.1349 4.04063 18.1349C3.72917 18.1349 3.42448 18.1172 3.12344 18.0807C4.82708 19.1594 6.85 19.7917 9.02135 19.7917C16.0969 19.7917 19.9677 13.9813 19.9677 8.94063C19.9677 8.77552 19.9625 8.61094 19.9547 8.44844C20.7099 7.9151 21.3609 7.24219 21.875 6.47344Z"
                                fill="#03A9F4"
                              />
                            </svg>
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
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.2"
                                      d="M600 250V550H325C344.778 550 364.112 544.135 380.557 533.147C397.002 522.159 409.819 506.541 417.388 488.268C424.957 469.996 426.937 449.889 423.079 430.491C419.22 411.093 409.696 393.275 395.711 379.289C381.725 365.304 363.907 355.78 344.509 351.921C325.111 348.063 305.004 350.043 286.732 357.612C268.459 365.181 252.841 377.998 241.853 394.443C230.865 410.888 225 430.222 225 450H200V250H600Z"
                                      fill="#43C67A"
                                      stroke="#43C67A"
                                      strokeWidth="3.125"
                                    />
                                    <path
                                      d="M675 125H125C111.744 125.015 99.0349 130.288 89.6614 139.661C80.2879 149.035 75.0152 161.744 75 175V625.003C75 631.569 76.2935 638.071 78.8065 644.137C81.3195 650.204 85.0028 655.716 89.6461 660.358C94.2894 665.001 99.8017 668.684 105.868 671.196C111.935 673.708 118.437 675.001 125.003 675L166.846 674.995C171.573 674.995 176.204 673.654 180.2 671.128C184.196 668.601 187.394 664.994 189.423 660.724C201.597 635.073 220.799 613.403 244.797 598.229C268.796 583.055 296.607 575 325 575C353.393 575 381.204 583.055 405.203 598.229C429.201 613.403 448.403 635.073 460.577 660.724C462.606 664.995 465.805 668.602 469.801 671.128C473.798 673.655 478.429 674.995 483.157 674.995L675 675C688.256 674.985 700.965 669.712 710.339 660.339C719.712 650.965 724.985 638.256 725 625V175C724.985 161.744 719.712 149.035 710.339 139.661C700.965 130.288 688.256 125.015 675 125ZM250 450C250 435.166 254.399 420.666 262.64 408.332C270.881 395.999 282.594 386.386 296.299 380.709C310.003 375.032 325.083 373.547 339.632 376.441C354.18 379.335 367.544 386.478 378.033 396.967C388.522 407.456 395.665 420.82 398.559 435.368C401.453 449.917 399.968 464.997 394.291 478.701C388.614 492.406 379.001 504.119 366.668 512.36C354.334 520.601 339.834 525 325 525C305.116 524.977 286.052 517.068 271.992 503.008C257.932 488.948 250.023 469.884 250 450ZM675 625L498.23 624.995C477.347 589.102 445.871 560.55 408.118 543.255C427.044 526.405 440.402 504.201 446.422 479.586C452.441 454.971 450.837 429.108 441.822 405.426C432.808 381.743 416.808 361.36 395.945 346.978C375.081 332.595 350.339 324.894 324.999 324.894C299.659 324.894 274.917 332.596 254.054 346.978C233.191 361.36 217.191 381.744 208.177 405.426C199.162 429.109 197.558 454.972 203.578 479.587C209.597 504.202 222.956 526.406 241.882 543.256C204.13 560.552 172.653 589.105 151.77 624.998L125 625.003V175H675V625ZM175 300V250C175 243.37 177.634 237.011 182.322 232.322C187.011 227.634 193.37 225 200 225H600C606.63 225 612.989 227.634 617.678 232.322C622.366 237.011 625 243.37 625 250V550C625 556.63 622.366 562.989 617.678 567.678C612.989 572.366 606.63 575 600 575H550C543.37 575 537.011 572.366 532.322 567.678C527.634 562.989 525 556.63 525 550C525 543.37 527.634 537.011 532.322 532.322C537.011 527.634 543.37 525 550 525H575V275H225V300C225 306.63 222.366 312.989 217.678 317.678C212.989 322.366 206.63 325 200 325C193.37 325 187.011 322.366 182.322 317.678C177.634 312.989 175 306.63 175 300Z"
                                      fill="#43C67A"
                                      stroke="#43C67A"
                                      strokeWidth="3.125"
                                    />
                                  </svg>
                                </div>
                                <div className="course-boxes__box-left">
                                  <span className="course-boxes__box-left-title hpc__title">
                                    مدرس :
                                  </span>
                                  <span
                                    id="product-creator"
                                    className="course-boxes__box-left-subtitle"
                                  >
                                    {courseInfo.creator.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <div className="course-boxes__box">
                                <div className="course-boxes__box-right">
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.2"
                                      d="M700 200L400 300L100 200L400 100L700 200Z"
                                      fill="#43C67A"
                                      stroke="#43C67A"
                                      strokeWidth="3.125"
                                    />
                                    <path
                                      d="M707.906 176.282L407.906 76.2817C402.774 74.5728 397.226 74.5728 392.094 76.2817L92.5747 176.122L92.5442 176.132L92.0944 176.282C92.0063 176.311 91.9288 176.359 91.8411 176.389C90.7585 176.762 89.7031 177.21 88.6826 177.729C88.5654 177.788 88.4438 177.839 88.3278 177.9C87.3168 178.44 86.3443 179.049 85.4172 179.723C85.2127 179.869 85.0141 180.02 84.8144 180.173C83.9129 180.855 83.0581 181.598 82.2559 182.395C82.1817 182.471 82.1171 182.553 82.0438 182.628C81.3038 183.399 80.6138 184.217 79.978 185.075C79.8481 185.249 79.7136 185.419 79.5881 185.596C78.9321 186.524 78.3399 187.495 77.8158 188.502C77.7351 188.658 77.6655 188.818 77.5881 188.975C77.0987 189.962 76.6757 190.981 76.3218 192.025C76.2886 192.123 76.2474 192.216 76.2155 192.316C75.8625 193.426 75.588 194.559 75.394 195.708C75.3522 195.947 75.319 196.186 75.2843 196.426C75.1045 197.609 75.0095 198.804 75 200V450C75 456.63 77.6339 462.989 82.3223 467.678C87.0107 472.366 93.3696 475 100 475C106.63 475 112.989 472.366 117.678 467.678C122.366 462.989 125 456.63 125 450V234.687L229.954 269.672C202.13 314.598 193.227 368.714 205.19 420.186C217.154 471.659 249.011 516.3 293.796 544.351C234.161 566.901 183.274 607.885 148.534 661.343C146.737 664.093 145.499 667.171 144.892 670.399C144.285 673.628 144.32 676.944 144.996 680.159C145.671 683.374 146.974 686.424 148.829 689.135C150.684 691.847 153.055 694.166 155.807 695.96C158.559 697.754 161.637 698.988 164.867 699.592C168.096 700.196 171.412 700.157 174.626 699.478C177.841 698.799 180.89 697.494 183.599 695.636C186.308 693.778 188.625 691.404 190.416 688.65C213.128 653.758 244.193 625.088 280.792 605.241C317.391 585.395 358.366 575 399.999 575C441.633 575 482.608 585.395 519.207 605.241C555.806 625.088 586.87 653.758 609.583 688.65C611.376 691.4 613.693 693.77 616.402 695.625C619.11 697.48 622.158 698.782 625.371 699.459C628.583 700.136 631.897 700.173 635.124 699.569C638.351 698.965 641.427 697.731 644.177 695.938C646.927 694.145 649.297 691.828 651.152 689.119C653.006 686.41 654.309 683.362 654.986 680.15C655.663 676.938 655.7 673.623 655.096 670.396C654.492 667.17 653.258 664.093 651.465 661.343C616.725 607.885 565.838 566.901 506.204 544.352C550.989 516.301 582.846 471.659 594.81 420.187C606.773 368.714 597.87 314.598 570.046 269.672L707.906 223.718C712.883 222.059 717.213 218.875 720.281 214.618C723.349 210.361 725 205.247 725 200C725 194.753 723.349 189.639 720.281 185.382C717.213 181.125 712.883 177.941 707.906 176.282ZM550 375C550.006 398.714 544.389 422.091 533.61 443.213C522.832 464.336 507.199 482.602 487.995 496.513C468.79 510.424 446.561 519.584 423.131 523.241C399.701 526.898 375.738 524.947 353.207 517.55C330.677 510.152 310.222 497.518 293.519 480.685C276.817 463.851 264.344 443.298 257.123 420.71C249.902 398.122 248.14 374.145 251.98 350.744C255.82 327.343 265.154 305.187 279.215 286.092L392.094 323.718C397.226 325.427 402.774 325.427 407.906 323.718L520.785 286.092C539.785 311.839 550.025 343.002 550 375ZM520.944 233.333C520.882 233.355 520.819 233.373 520.757 233.395L400 273.648L279.243 233.395C279.18 233.372 279.116 233.354 279.052 233.331L179.057 200L400 126.352L620.943 200L520.944 233.333Z"
                                      fill="#43C67A"
                                      stroke="#43C67A"
                                      strokeWidth="3.125"
                                    />
                                  </svg>
                                </div>
                                <div className="course-boxes__box-left">
                                  <span className="course-boxes__box-left-title hpc__title">
                                    تعداد دانشجو:
                                  </span>
                                  <span
                                    id="product-register"
                                    className="course-boxes__box-left-subtitle"
                                  >
                                    {courseInfo.courseStudentsCount}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <div className="course-boxes__box">
                                <div className="course-boxes__box-right">
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.4"
                                      d="M229.329 605.003V536.003"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      opacity="0.4"
                                      d="M400 604.993V466.993"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      opacity="0.4"
                                      d="M570.67 605.007V397.673"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                    />
                                    <g opacity="0.4">
                                      <path
                                        d="M570.663 194.987L555.33 212.987C470.33 312.32 356.33 382.653 229.329 414.32"
                                        stroke="#43C67A"
                                        strokeWidth="50"
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M473.013 194.987H570.68V292.32"
                                        stroke="#43C67A"
                                        strokeWidth="50"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <path
                                      d="M300 733.333H500C666.667 733.333 733.333 666.667 733.333 500V300C733.333 133.333 666.667 66.6667 500 66.6667H300C133.333 66.6667 66.6667 133.333 66.6667 300V500C66.6667 666.667 133.333 733.333 300 733.333Z"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div className="course-boxes__box-left">
                                  <span className="course-boxes__box-left-title hpc__title">
                                    وضعیت دوره :
                                  </span>
                                  <span
                                    id="product-isComplete"
                                    className="course-boxes__box-left-subtitle"
                                  >
                                    {courseInfo.isComplete
                                      ? "به اتمام رسیده"
                                      : "در حال تدریس"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <div className="course-boxes__box">
                                <div className="course-boxes__box-right">
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      opacity="0.4"
                                      d="M400 733.333C584.093 733.333 733.333 584.093 733.333 400C733.333 215.905 584.093 66.6667 400 66.6667C215.905 66.6667 66.6667 215.905 66.6667 400C66.6667 584.093 215.905 733.333 400 733.333Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      d="M523.687 531C519.353 531 515.02 530 511.02 527.333L407.687 465.667C382.02 450.333 363.02 416.667 363.02 387V250.334C363.02 236.667 374.353 225.334 388.02 225.334C401.687 225.334 413.02 236.667 413.02 250.334V387C413.02 399 423.02 416.667 433.353 422.667L536.687 484.333C548.687 491.333 552.353 506.667 545.353 518.667C540.353 526.667 532.02 531 523.687 531Z"
                                      fill="#43C67A"
                                    />
                                  </svg>
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
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M233.333 66.6667C251.743 66.6667 266.667 81.5907 266.667 100V166.667C266.667 185.076 251.743 200 233.333 200C214.924 200 200 185.076 200 166.667V100C200 81.5907 214.924 66.6667 233.333 66.6667Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M566.667 66.6667C585.077 66.6667 600 81.5907 600 100V166.667C600 185.076 585.077 200 566.667 200C548.257 200 533.333 185.076 533.333 166.667V100C533.333 81.5907 548.257 66.6667 566.667 66.6667Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M233.333 433.333C233.333 414.923 248.257 400 266.667 400H533.333C551.743 400 566.667 414.923 566.667 433.333C566.667 451.743 551.743 466.667 533.333 466.667H266.667C248.257 466.667 233.333 451.743 233.333 433.333Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M233.333 566.667C233.333 548.257 248.257 533.333 266.667 533.333H400C418.41 533.333 433.333 548.257 433.333 566.667C433.333 585.077 418.41 600 400 600H266.667C248.257 600 233.333 585.077 233.333 566.667Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M233.333 133.333C141.286 133.333 66.6667 207.953 66.6667 300V566.667C66.6667 658.713 141.286 733.333 233.333 733.333H566.667C658.713 733.333 733.333 658.713 733.333 566.667V300C733.333 207.953 658.713 133.333 566.667 133.333H233.333ZM660.977 266.667C647.25 227.827 610.207 200 566.667 200H233.333C189.793 200 152.751 227.827 139.024 266.667H660.977ZM133.333 333.333H666.667V566.667C666.667 621.897 621.897 666.667 566.667 666.667H233.333C178.105 666.667 133.333 621.897 133.333 566.667V333.333Z"
                                      fill="#2D624B"
                                    />
                                  </svg>
                                </div>
                                <div className="course-boxes__box-left">
                                  <span className="course-boxes__box-left-title hpc__title">
                                    آخرین بروزرسانی :
                                  </span>
                                  <span
                                    id="product-updateAt"
                                    className="course-boxes__box-left-subtitle"
                                  >
                                    {new Date(
                                      courseInfo.updatedAt
                                    ).toLocaleDateString("fa-IR")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <div className="course-boxes__box">
                                <div className="course-boxes__box-right">
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M799.312 1.18915H1.05594V799.445H799.312V1.18915Z"
                                      stroke="#43C67A"
                                      strokeWidth="0.008"
                                      strokeMiterlimit="2"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M646.409 480.204C646.409 461.084 638.814 442.747 625.294 429.227C611.774 415.707 593.437 408.112 574.317 408.112H574.236C555.116 408.112 536.779 415.707 523.259 429.227C509.739 442.747 502.144 461.084 502.144 480.204C502.144 512.437 502.144 554.542 502.144 586.774C502.144 605.894 509.739 624.231 523.259 637.751C536.779 651.271 555.116 658.867 574.236 658.867H574.317C593.437 658.867 611.774 651.271 625.294 637.751C638.814 624.231 646.409 605.894 646.409 586.774V480.204ZM298.222 480.204C298.223 461.084 290.627 442.747 277.107 429.227C263.587 415.707 245.25 408.112 226.13 408.112H226.049C206.929 408.112 188.592 415.707 175.072 429.227C161.552 442.747 153.957 461.084 153.957 480.204C153.957 512.437 153.957 554.542 153.957 586.774C153.957 605.894 161.552 624.231 175.072 637.751C188.592 651.271 206.929 658.867 226.049 658.867H226.13C245.25 658.867 263.587 651.271 277.107 637.751C290.627 624.231 298.223 605.894 298.222 586.774V480.204ZM599.636 480.204V586.774C599.636 593.489 596.968 599.93 592.22 604.678C587.472 609.426 581.033 612.094 574.318 612.094C574.315 612.094 574.236 612.094 574.236 612.094C567.52 612.094 561.081 609.426 556.332 604.678C551.584 599.93 548.917 593.489 548.917 586.774V480.204C548.917 473.489 551.584 467.049 556.332 462.3C561.081 457.552 567.52 454.885 574.235 454.884C574.238 454.884 574.316 454.884 574.316 454.884C581.033 454.885 587.472 457.552 592.22 462.3C596.968 467.049 599.636 473.489 599.636 480.204ZM251.449 480.204V586.774C251.449 593.489 248.782 599.93 244.034 604.678C239.285 609.426 232.846 612.094 226.131 612.094C226.128 612.094 226.05 612.094 226.05 612.094C219.333 612.094 212.894 609.426 208.146 604.678C203.398 599.93 200.73 593.489 200.73 586.774V480.204C200.73 473.489 203.398 467.049 208.146 462.3C212.894 457.552 219.333 454.885 226.048 454.884C226.051 454.884 226.13 454.884 226.13 454.884C232.846 454.885 239.285 457.552 244.034 462.3C248.782 467.049 251.449 473.489 251.449 480.204Z"
                                      fill="#43C67A"
                                      fillOpacity="0.5"
                                      stroke="#43C67A"
                                      strokeWidth="0.008"
                                      strokeMiterlimit="2"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M708.403 534.875V369.134C708.402 218.449 586.247 96.2941 435.561 96.2941C412.085 96.2941 388.281 96.2941 364.804 96.2941C214.119 96.2941 91.9641 218.449 91.9641 369.134C91.9641 457.254 91.9641 534.875 91.9641 534.875C91.9641 547.783 102.443 558.262 115.35 558.262C128.257 558.262 138.737 547.783 138.737 534.875V369.135C138.738 244.28 239.951 143.067 364.804 143.067C388.281 143.067 412.085 143.067 435.561 143.067C560.415 143.067 661.628 244.28 661.63 369.133C661.63 369.135 661.63 534.875 661.63 534.875C661.63 547.783 672.109 558.262 685.016 558.262C697.923 558.262 708.403 547.783 708.403 534.875ZM330.546 212.704H455.893C468.8 212.704 479.279 202.225 479.279 189.318C479.279 176.41 468.8 165.932 455.893 165.932H330.546C317.638 165.932 307.16 176.41 307.16 189.318C307.16 202.225 317.638 212.704 330.546 212.704Z"
                                      fill="#43C67A"
                                      stroke="#43C67A"
                                      strokeWidth="0.008"
                                      strokeMiterlimit="2"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div className="course-boxes__box-left">
                                  <span className="course-boxes__box-left-title hpc__title">
                                    روش پشتیبانی
                                  </span>
                                  <span
                                    id="product-app-support"
                                    className="course-boxes__box-left-subtitle"
                                  >
                                    {courseInfo.support}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <div className="course-boxes__box">
                                <div className="course-boxes__box-right">
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M403.099 181.645C325.946 181.679 263.291 244.334 263.255 321.489C263.255 331.141 271.081 338.97 280.736 338.97C290.391 338.97 298.216 331.141 298.216 321.489C298.223 292.547 309.948 266.426 328.98 247.369C348.037 228.337 374.159 216.612 403.099 216.605C412.754 216.605 420.58 208.779 420.58 199.126C420.58 189.472 412.754 181.645 403.099 181.645ZM350.684 636.137H455.567C465.219 636.137 473.048 628.309 473.048 618.657C473.048 609.002 465.219 601.177 455.567 601.177H350.684C341.03 601.177 333.204 609.002 333.204 618.657C333.204 628.31 341.03 636.137 350.684 636.137ZM333.177 566.216H473.021C482.676 566.216 490.502 558.387 490.502 548.735C490.502 539.08 482.676 531.255 473.021 531.255H333.177C323.523 531.255 315.697 539.08 315.697 548.735C315.697 558.388 323.523 566.216 333.177 566.216Z"
                                      fill="#43C67A"
                                    />
                                    <path
                                      d="M403.126 111.722C287.489 111.766 193.404 205.852 193.36 321.487C193.348 386.662 223.161 444.769 269.613 483.187L269.704 483.26C287.398 497.762 298.267 517.494 298.242 538.594V601.175C298.22 610.68 302.069 619.626 308.43 625.948C314.752 632.308 323.697 636.159 333.203 636.136H342.605C354.813 656.941 377.269 671.034 403.125 671.097C428.891 671.039 451.378 657.012 463.415 636.136H473.047C482.551 636.159 491.496 632.308 497.819 625.948C504.18 619.626 508.029 610.681 508.006 601.175V538.594C508.003 517.319 518.599 497.697 536.195 483.26C583.07 444.816 612.906 386.659 612.889 321.487C612.846 205.852 518.761 111.766 403.126 111.722ZM514.045 456.212C489.726 476.009 473.051 505.327 473.048 538.595V601.176H439.952L435.891 612.959C431.355 626.23 418.188 636.205 403.125 636.137C388.09 636.212 374.795 626.239 369.919 612.706L365.745 601.176H333.202V538.595C333.177 505.153 316.076 475.942 291.818 456.184L291.909 456.257C253.059 424.053 228.33 375.877 228.318 321.487C228.325 273.322 247.909 229.715 279.618 197.981C311.35 166.273 354.959 146.688 403.124 146.683C451.29 146.688 494.897 166.273 526.63 197.981C558.338 229.716 577.922 273.322 577.929 321.487C577.913 375.88 553.209 424.005 514.045 456.212Z"
                                      fill="#2D624B"
                                    />
                                  </svg>
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
                                  <svg
                                    width="100%"
                                    viewBox="0 0 800 800"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M635.677 635.673C766.01 505.34 766.01 294.339 635.677 164.339"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M164.352 164.339C34.0184 294.673 34.0184 505.673 164.352 635.673"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M289.974 713.673C325.641 726.007 362.64 732.007 399.973 732.007C437.307 731.673 474.307 726.007 509.973 713.673"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M289.974 86.3363C325.641 74.003 362.64 68.0013 399.973 68.0013C437.307 68.0013 474.307 74.003 509.973 86.3363"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      opacity="0.4"
                                      d="M291.341 400.003V344.34C291.341 275.005 340.343 246.671 400.343 281.338L448.673 309.339L497.007 337.337C557.007 372.003 557.007 428.673 497.007 463.34L448.673 491.337L400.343 519.34C340.343 554.007 291.341 525.67 291.341 456.337V400.003Z"
                                      stroke="#43C67A"
                                      strokeWidth="50"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
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
                              {courseInfo.description}
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
                                <svg
                                  viewBox="0 0 800 800"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="course-progress__title-svg"
                                >
                                  <path
                                    d="M400 110C400 105.255 400 102.883 401.523 101.409C403.047 99.935 405.363 100.012 410 100.167C472.467 102.249 532.82 123.801 582.55 161.934C634.93 202.1 672.6 258.419 689.727 322.165C706.853 385.91 702.477 453.527 677.277 514.533C652.077 575.54 607.46 626.533 550.34 659.61C493.22 692.69 426.783 706.007 361.327 697.497C295.871 688.987 235.049 659.13 188.284 612.547C141.519 565.963 111.422 505.26 102.657 439.837C94.335 377.723 105.683 314.651 134.969 259.434C137.142 255.338 138.228 253.29 140.265 252.702C142.302 252.114 144.36 253.294 148.475 255.656L333.38 361.767C337.31 364.023 339.273 365.15 339.89 366.9C340.51 368.65 339.587 371.02 337.74 375.757C333.663 386.233 332.272 397.623 333.78 408.873C335.73 423.443 342.433 436.96 352.85 447.337C363.263 457.71 376.81 464.36 391.387 466.253C405.963 468.15 420.76 465.183 433.48 457.817C446.203 450.45 456.14 439.093 461.75 425.507C467.363 411.92 468.337 396.863 464.523 382.667C460.71 368.47 452.32 355.927 440.657 346.98C431.65 340.077 421.08 335.61 409.963 333.933C404.933 333.176 402.42 332.797 401.21 331.391C400 329.985 400 327.719 400 323.188V110Z"
                                    fill="#43C67A"
                                    fillOpacity="0.24"
                                  />
                                  <path
                                    d="M288.333 593.413C285.957 597.53 284.769 599.587 285.365 601.637C285.961 603.683 288.007 604.753 292.098 606.887C320.808 621.86 352.357 630.71 384.74 632.833C420.453 635.173 456.227 629.267 489.293 615.573C522.36 601.877 551.83 580.757 575.43 553.847C599.027 526.94 616.12 494.963 625.383 460.39C634.647 425.82 635.833 389.58 628.85 354.48C621.867 319.376 606.903 286.35 585.117 257.956C563.327 229.561 535.3 206.559 503.2 190.73C474.093 176.376 442.347 168.268 409.997 166.881C405.387 166.683 403.083 166.584 401.54 168.061C400 169.537 400 171.914 400 176.667V323.411C400 327.942 400 330.207 401.21 331.613C402.42 333.019 404.933 333.4 409.963 334.16C416.717 335.183 423.29 337.24 429.45 340.277C438.613 344.797 446.61 351.36 452.83 359.463C459.047 367.567 463.317 376.99 465.31 387.01C467.303 397.027 466.963 407.37 464.32 417.233C461.677 427.1 456.8 436.227 450.063 443.907C443.33 451.583 434.92 457.61 425.483 461.52C416.047 465.43 405.837 467.113 395.643 466.447C388.79 465.997 382.067 464.49 375.707 462C370.973 460.143 368.603 459.217 366.853 459.83C365.103 460.443 363.97 462.403 361.707 466.327L288.333 593.413Z"
                                    fill="#43C67A"
                                  />
                                </svg>
                                <span className="course-progress__title-text">
                                  درصد پیشرفت شما :
                                </span>
                              </h3>
                            </div>
                            <div
                              className="course-progress__bar"
                              ref={courseProgressBarRef}
                            >
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
                              {shuffledRelatedCourse.length &&
                                shuffledRelatedCourse
                                  .slice(0, 3)
                                  .map((course) => (
                                    <div
                                      key={course._id}
                                      className="col-span-12 md:col-span-4 my-3 md:my-0"
                                    >
                                      <Link
                                        to={`${course.shortName}`}
                                        className="more-product__link"
                                      >
                                        <div className="more-product__img-wrapper">
                                          <img
                                            src={`${mainUrl}/courses/covers/${course.cover}`}
                                            alt="more-product"
                                            className="more-product__img"
                                          />
                                        </div>
                                        <div className="more-product__content">
                                          <span className="more-prodcut__product-title truncate">
                                            {course.name}
                                          </span>
                                        </div>
                                      </Link>
                                    </div>
                                  ))}
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
          {sessionCourse.length ? (
            sessionCourse.map((session, index) => (
              <Link
                to={session.free === 0 ? "" : session.video}
                key={session._id}
                className={`topic__accordion-body topic__accordion-link ${
                  session.free === 0 ? "cursor-not-allowed" : ""
                }`}
              >
                <span className="topic__accordion-body-right">
                  <span className="topic__accordion-count">{index + 1}</span>
                  <span className="topic__accordion-link">
                    <span className="topic__accordion-svg-wrapper">
                      <svg
                        className="topic__accordion-svg"
                        viewBox="0 0 800 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M399.023 733.333C583.12 733.333 732.357 584.093 732.357 400C732.357 215.905 583.12 66.6667 399.023 66.6667C214.929 66.6667 65.69 215.905 65.69 400C65.69 584.093 214.929 733.333 399.023 733.333Z"
                          fill="#43C67A"
                        />
                        <path
                          d="M498.98 341.003L402.313 285.337C378.313 271.337 349.313 271.337 325.313 285.337C301.313 299.337 286.979 324.004 286.979 352.003V463.67C286.979 491.337 301.313 516.337 325.313 530.337C337.313 537.337 350.647 540.67 363.647 540.67C376.98 540.67 389.98 537.337 401.98 530.337L498.647 474.67C522.647 460.67 536.98 436.003 536.98 408.003C537.647 380.003 523.313 355.003 498.98 341.003Z"
                          fill="#43C67A"
                        />
                      </svg>
                    </span>
                    <span className="topic__accordion-link-text">
                      {session.title}
                    </span>
                  </span>
                </span>
                <span className="topic__accordion-body-left">
                  <span className="topic__accordion-time">{session.time}</span>
                </span>
              </Link>
            ))
          ) : (
            <div className="text-3xl text-center hpc__title">
              دوره ای قرار داده نشده 😕
            </div>
          )}
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
                      <form id="comment__respond__score-form">
                        <select
                          id="comment__respond__score-select"
                          onChange={(e) => changeHandler(e)}
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
                    <div className="login-form__box-inputs">
                      <InputBox
                        type={"textarea"}
                        id={`commentTextArea`}
                        placeHolder="نظرتو بنویس..."
                        validations={[requiredValidatior()]}
                        onInputHandler={onInputHandler}
                      ></InputBox>
                    </div>
                  </div>
                  <div className="comment__respond__submit">
                    <button
                      onClick={submitHandler}
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
                {commentCourse.length ? (
                  <PaginationCustom
                    typeFor="comment"
                    CurentPage={1}
                    arrays={commentCourse}
                    pageItemCount={2}
                  ></PaginationCustom>
                ) : (
                  <div className="text-3xl text-center hpc__title comment__contnet">
                    هنوز کامنتی برای این دوره وجود ندارد 🙄
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Finish Comment --> */}

        <Footer></Footer>
        <Toaster></Toaster>
      </>
    );
  }
};

export default Product;
