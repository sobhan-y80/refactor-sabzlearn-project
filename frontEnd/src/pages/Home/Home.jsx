import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import AuthContext from "../../Context/AuthContext";
import { mainUrlApi } from "../../Utils/Utils";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import PaginationCustom from "../../Components/Pagination/Pagination";
// Start Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
// Finish Import Swiper

const Home = () => {
  const authContext = useContext(AuthContext);
  const [allCourses, setAllCourses] = useState([]);
  const [presellsCourses, setPresellsCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [allArticle, setAllArticle] = useState([]);

  const allCoursesRender = () => {
    fetch(`${mainUrlApi}/courses`)
      .then((res) => res.json())
      .then((allCoursesData) => setAllCourses(allCoursesData));
  };

  const presellsRender = () => {
    fetch(`${mainUrlApi}/courses/presell`)
      .then((res) => res.json())
      .then((presellsData) => setPresellsCourses(presellsData));
  };

  const popularsRender = () => {
    fetch(`${mainUrlApi}/courses/popular`)
      .then((res) => res.json())
      .then((popularData) => setPopularCourses(popularData));
  };

  const allArticleRender = () => {
    fetch(`${mainUrlApi}/articles`)
      .then((res) => res.json())
      .then((articleData) => setAllArticle(articleData));
  };

  console.log(allArticle);

  useEffect(() => {
    allCoursesRender();
    presellsRender();
    popularsRender();
    allArticleRender();
  }, []);

  return (
    <>
      <Header></Header>

      {/* <!-- Start Landing --> */}
      <section className="landing">
        <div className="landing__container">
          <div className="landing__contnet">
            <h1 className="landing__title px-5">
              با آکادمی سبز لرن برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت
              کن
            </h1>
            <div className="landing-header__searchbar global__searchbar">
              <input
                type="text"
                className="landing-header___search-input global__search-input"
                placeholder="جستجو..."
                id="search-input"
              />
              <button
                id="search-btn"
                className="landing-hader__search-btn global__search-btn"
              >
                <i className="fa-solid fa-magnifying-glass landing-header__serach-icon global__search-icon"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- finish Landing --> */}

      {/* <!-- Start Lasted Courses --> */}
      <section className="hpc__section courses">
        <div className="w-full px-10 flex flex-col gap-16">
          <div className="courses-header">
            <div className="courses-header__right">
              <h2 className="courses-header__title hpc__title">
                {/* <!-- hpc => (Helper Classes) --> */}
                جدیدترین دوره ها
              </h2>
              <p className="courses-header__text hpc__subtitle">
                سکوی پرتاب شما به سوی موفقیت
              </p>
            </div>
            <div className="courses-header__left hidden sm:flex">
              <a href="#" className="courses-header__link">
                تمامی دوره ها
                <i className="fa-solid fa-angles-left courses-header__link-icon"></i>
              </a>
            </div>
          </div>
          <div className="courses-contnet">
            <div className="container-fluid">
              <div
                id="courses__container"
                className="grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 "
              >
                <PaginationCustom
                  arrays={allCourses}
                  CurentPage={1}
                  pageItemCount={4}
                ></PaginationCustom>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- finish Lasted Courses --> */}

      {/* <!-- Start Popular and prev Courses Slider --> */}
      <div className="slider-courses">
        <div className="w-full px-10 md:px-0">
          <div className="slider-courses__content flex flex-col md:flex-row text-center">
            <div className="slider-courses__popular w-full md:w-6/12">
              <div className="slider-courses__header">
                <h2 className="slider-courses__title-right hpc__title">
                  {/* <!-- hpc => (Helper Classes) --> */}
                  محبوب ترین دوره ها
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full py-10 px-0 md:px-10 max-w-[768px]">
                  <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    spaceBetween={30}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={true}
                    modules={[Autoplay, EffectCoverflow, Pagination]}
                    className="mySwiper"
                  >
                    {popularCourses.map((course) => (
                      <SwiperSlide key={course._id}>
                        <CourseBox smalMode={true} {...course} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="slider-courses__prevsoll w-full md:w-6/12">
              <div className="slider-courses__header">
                <h2 className="slider-courses__title-left hpc__title">
                  {/* <!-- hpc => (Helper Classes) --> */}
                  دوره های در حال پیشفروش
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full py-10 px-0 md:px-10 max-w-[768px]">
                  <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    spaceBetween={30}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={true}
                    modules={[Autoplay, EffectCoverflow, Pagination]}
                    className="mySwiper"
                  >
                    {presellsCourses.map((course) => (
                      <SwiperSlide key={course._id}>
                        <CourseBox smalMode={true} {...course} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Start Popular Courses Slider--> */}

      {/* <!-- Start About Us --> */}
      <section className="about-us flex justify-center my-32">
        <div className="container w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="about-us__box--wrapper  hpc__noselect">
              <div className="about-us__box about-us__box-right">
                <div className="about-us__content">
                  <span className="about-us__title hpc__highlight">
                    دوره های اختصاصی
                  </span>
                  <span className="about-us__subtitle">
                    با پشتیبانی و کیفیت بالا اراعه میده
                  </span>
                </div>
                <div className="about-us__img-wrapper">
                  <img
                    src="images/about-us/access-general-house-key-svgrepo-com.svg"
                    width="100%"
                    className="about-us__img"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="about-us__box--wrapper  hpc__noselect">
              <div className="about-us__box">
                <div className="about-us__content">
                  <span className="about-us__title hpc__highlight">
                    دوره های پولی و رایگان
                  </span>
                  <span className="about-us__subtitle">
                    براش اهمیتی نداره و فقط دنبال کیفیت و پشتیبانی عالی دوره
                    هاست
                  </span>
                </div>
                <div className="about-us__img-wrapper">
                  <img
                    src="images/about-us/award-champion-cup-svgrepo-com.svg"
                    width="100%"
                    className="about-us__img"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="about-us__box--wrapper  hpc__noselect">
              <div className="about-us__box about-us__box-right">
                <div className="about-us__content">
                  <span className="about-us__title hpc__highlight">
                    کاربراش بسیار مهمن
                  </span>
                  <span className="about-us__subtitle">
                    و برای رسوندشون به
                    <span className="hpc__highlight">بازار کار</span> هر کاری
                    میکنه
                  </span>
                </div>
                <div className="about-us__img-wrapper">
                  <img
                    src="images/about-us/crest-crown-general-svgrepo-com.svg"
                    width="100%"
                    className="about-us__img"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="about-us__box--wrapper  hpc__noselect">
              <div className="about-us__box">
                <div className="about-us__content">
                  <span className="about-us__title hpc__highlight">
                    تلاش برای همکاری
                  </span>
                  <span className="about-us__subtitle">
                    با بهترین مدرسان رو داره
                  </span>
                </div>
                <div className="about-us__img-wrapper">
                  <img
                    src="images/about-us/general-graph-increase-svgrepo-com.svg"
                    width="100%"
                    className="about-us__img"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Finish About Us --> */}

      {/* <!-- Start Article --> */}
      <div id="articles-slider" className="hpc__section articles">
        <div className="w-full px-10">
          <div className="articles__header my-10">
            <h2 className="articles__title hpc__title">جدیدترین مقالات</h2>
            <p className="articles__subtitle hpc__subtitle">
              پیش به سوی ارتقای دانش
            </p>
          </div>
          <div
            id="articles__content"
            className="articles__content xl:flex items-center justify-center"
          >
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              spaceBetween={10}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={true}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {allArticle.map((article) => (
                <SwiperSlide key={article._id}>
                  <ArticleBox smalMode={true} {...article}></ArticleBox>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* <!-- Finish Article --> */}

      <Footer></Footer>
    </>
  );
};

export default Home;
