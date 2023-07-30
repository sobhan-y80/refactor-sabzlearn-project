import React, { useEffect, useState } from "react";
import { mainUrlApi } from "../../../Utils/Utils";
import PaginationCustom from "../../../Components/Pagination/Pagination";
import CourseBox from "../../../Components/CourseBox/CourseBox";

function RegisterCourse() {
  const [userCourses, setUserCourses] = useState([]);

  const RegisterCoursesRender = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/users/courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((courseData) => setUserCourses(courseData));
  };

  useEffect(() => {
    RegisterCoursesRender();
  }, []);

  return (
    <>
      <div className="hpc__part-section">
        <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
          <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
            <h2 className="col-12 col-md-4 panel-home__last-users__title hpc__title d-flex justify-content-center justify-content-md-start">
              لیست دوره هایی که خریدی
            </h2>
          </div>
          <div className="courses-contnet">
            <div className="container-fluid">
              <div
                id="course__category-wrapper"
                className={`grid grid-cols-12 gap-5 ${
                  userCourses.length ? "" : "text-center"
                }`}
              >
                {userCourses.length ? (
                  userCourses.map((course) => (
                    <div
                      key={course._id}
                      className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 my-2 `}"
                    >
                      <CourseBox smalDetailMode={true} {...course}></CourseBox>
                    </div>
                  ))
                ) : (
                  <div className="text-red-400 col-span-12 my-20">
                    دوره ای خریداری نکرده اید
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterCourse;
