import React, { useEffect, useState } from "react";
import { mainUrlApi } from "../../Utils/Utils";
import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import PaginationCustom from "../../Components/Pagination/Pagination";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

function Search() {
  const [courseReasult, setCourseReasult] = useState([]);
  const [articleReasult, setArticleReasult] = useState([]);

  console.log(courseReasult, articleReasult);

  const resualtRender = () => {
    fetch(`${mainUrlApi}/search/js`)
      .then((res) => res.json())
      .then((resualtData) => {
        setCourseReasult(resualtData.allResultCourses);
        setArticleReasult(resualtData.allResultArticles);
      });
  };

  useEffect(() => {
    resualtRender();
  }, []);

  return (
    <>
      <Header></Header>
      <BreadCrumb></BreadCrumb>

      {courseReasult.length || articleReasult.length ? (
        <>
          {courseReasult.length ? (
            <div className="course w-full px-10 py-20">
              <div className="courses-header__right my-10">
                <h2 className="courses-header__title hpc__title">
                  {/* <!-- hpc => (Helper Classes) --> */}
                  دوره ها
                </h2>
                <p className="courses-header__text hpc__subtitle">
                  سکوی پرتاب شما به سوی موفقیت
                </p>
              </div>
              <div className="container">
                <div className="courses-contnet">
                  <div className="container-fluid">
                    <div
                      id="course__category-wrapper"
                      className="grid grid-cols-12 gap-5"
                    >
                      <PaginationCustom
                        CurentPage={1}
                        arrays={courseReasult}
                        pageItemCount={4}
                        parentClassNameHolder={`col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2 `}
                      ></PaginationCustom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-3xl text-center hpc__title py-40">
              دوره مناسب با سرچ شما یافت نشد :(
            </div>
          )}
          {articleReasult.length ? (
            <div className="w-full px-10 py-20">
              <div className="articles__header my-10">
                <h2 className="articles__title hpc__title">مقالات</h2>
                <p className="articles__subtitle hpc__subtitle">
                  پیش به سوی ارتقای دانش
                </p>
              </div>
              <div id="articles__content" className="articles__content">
                <PaginationCustom
                  typeFor={"article"}
                  CurentPage={1}
                  arrays={articleReasult}
                  pageItemCount={4}
                  parentClassNameHolder={`w-3/12`}
                ></PaginationCustom>
              </div>
            </div>
          ) : (
            <div className="text-3xl text-center hpc__title py-40">
              مقاله ی مناسب با سرچ شما یافت نشد :(
            </div>
          )}
        </>
      ) : (
        <div className="text-3xl text-center hpc__title py-40">
          دوره یا مقاله ی مناسب با سرچ شما یافت نشد :(
        </div>
      )}

      <Footer></Footer>
    </>
  );
}

export default Search;
