import React, { useEffect, useState } from "react";
import "./Blog.css";
import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import { mainUrl, mainUrlApi } from "../../Utils/Utils";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const Blog = () => {
  const { ArticleID } = useParams();
  const [isdataLoad, setIsDataLoad] = useState(false);
  const [articleInfo, setArticleInfo] = useState([]);

  const articleInfoRender = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    console.log(ArticleID);
    fetch(`${mainUrlApi}/articles/${ArticleID}`, {
      headers: {
        Authorization: `Bearer ${
          localStorageData.token ? localStorageData.token : null
        }`,
      },
    })
      .then(async (res) => {
        const articleInfoData = await res.json();
        setArticleInfo(articleInfoData);
      })
      .finally(() => {
        setIsDataLoad(true);
      });
  };

  useEffect(() => {
    articleInfoRender();
  }, [ArticleID]);

  if (isdataLoad) {
    return (
      <>
        <Header></Header>
        <BreadCrumb></BreadCrumb>

        {/* <!-- Start Main --> */}
        <main className="main main-blog">
          <div className="w-full px-10">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-8 order-2 md:order-1">
                <div className="main__content">
                  <div className="article">
                    <div className="article__header">
                      <div className="article-header__img-wrapper">
                        <img
                          src={`${mainUrl}/courses/covers/${articleInfo.cover}`}
                          alt="html"
                          className="article-hader__img object-contain"
                        />
                      </div>
                      <div className="article-header__category">
                        <ul className="article-header__category-list">
                          <li className="article-header__category-item hpc__category-item">
                            <a href="#" className="article-header__link">
                              اچ تی ام ال
                            </a>
                          </li>
                          <li className="article-header__category-item hpc__category-item">
                            <a href="#" className="article-header__link">
                              طراحی سایت
                            </a>
                          </li>
                          <li className="article-header__category-item hpc__category-item">
                            <a href="#" className="article-header__link">
                              سی اس اس
                            </a>
                          </li>
                          <li className="article-header__category-item hpc__category-item">
                            <a href="#" className="article-header__link">
                              جاوا اسکریپت
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h1 className="article-header__title">
                        {articleInfo.title}
                      </h1>
                      <div className="hpc__entry-divider"></div>
                      <div className="article-header__article-info">
                        <div className="article-info__author">
                          <span className="article-info__author-name">
                            نویسنده :
                          </span>
                          <span className="article-info__author-text">
                            {articleInfo.creator.name}
                          </span>
                        </div>
                        <div className="article-info__published">
                          <span className="article-info__published-name">
                            تاریخ انتشار:
                          </span>
                          <span className="article-info__published-text">
                            {new Date(articleInfo.updatedAt).toLocaleDateString(
                              "fa-IR"
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="article-header__desc hpc__paragrapg">
                        {articleInfo.description}
                      </p>
                    </div>
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(articleInfo.body),
                        }}
                      ></div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 order-1 md:order-2">
                <div className="courses-info">
                  {/* <!-- Start Course Info --> */}
                  <div className="course-info">
                    <span className="course-info__courses-title hpc__title">
                      پر امتیازترین دوره ها
                    </span>
                    <ul className="course-info__courses-list">
                      <li className="course-info__courses-item">
                        <Link
                          to="/Course/reactqueary"
                          className="course-info__course-high-score-link course-info__courses-link"
                        >
                          <div className="course-info__courses-img-wrapper">
                            <img
                              src="http://localhost:4000/courses/covers/043e100d7ddb2b9788c75fd22e8dbd7009e36be68be70730daa3982f87d1b46a.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                          </div>

                          <span className="course-info__courses-text">
                            گیت و گیتهاب
                          </span>
                        </Link>
                      </li>
                      <li className="course-info__courses-item">
                        <Link
                          to="/Course/canvas"
                          className="course-info__course-high-score-link course-info__courses-link"
                        >
                          <div className="course-info__courses-img-wrapper">
                            <img
                              src="http://localhost:4000/courses/covers/4d560b5e56ac8dead08490df70a87016adef12fb99c42882f0c063680b5a4b6f.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                          </div>

                          <span className="course-info__courses-text">
                            آموزش next js
                          </span>
                        </Link>
                      </li>
                      <li className="course-info__courses-item">
                        <Link
                          to="/Course/regex-course"
                          className="course-info__course-high-score-link course-info__courses-link"
                        >
                          <div className="course-info__courses-img-wrapper">
                            <img
                              src="http://localhost:4000/courses/covers/9761a4f83d7bcdc466ed39fafdb6235a192ef9ea97f484393ce93175c656d22b.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                          </div>

                          <span className="course-info__courses-text">
                            آموزش node js
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Finish Course Info --> */}

                  {/* <!-- Start Course Info --> */}
                  <div className="course-info">
                    <span className="course-info__courses-title hpc__title">
                      جدیدترین مقالات
                    </span>
                    <ul className="last-articles__list course-info__courses-list">
                      <li className="last-articles__item course-info__courses-item">
                        <a
                          href="#"
                          className="last-articles__link course-info__courses-link"
                        >
                          جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب
                          سبزلرن
                        </a>
                      </li>
                      <li className="last-articles__item course-info__courses-item">
                        <a
                          href="#"
                          className="last-articles__link course-info__courses-link"
                        >
                          جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب
                          سبزلرن
                        </a>
                      </li>
                      <li className="last-articles__item course-info__courses-item">
                        <a
                          href="#"
                          className="last-articles__link course-info__courses-link"
                        >
                          جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب
                          سبزلرن
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Finish Course Info --> */}
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- Finish Main --> */}

        <Footer></Footer>
      </>
    );
  }
};

export default Blog;
