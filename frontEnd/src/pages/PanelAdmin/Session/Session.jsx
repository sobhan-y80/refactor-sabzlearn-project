import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import InputBox from "../../../Components/InputBox/InputBox";
import {
  fileValidator,
  maxValidator,
  minValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { mainUrl, mainUrlApi } from "../../../Utils/Utils";
import { Link, json } from "react-router-dom";
import DeleteModal from "../../../Components/Modals/DeleteModal/DeleteModal";
import DetailModal from "../../../Components/Modals/DetailModal/DetailModal";

const mainObj = {
  _id: "0",
  name: "یک دوره جدید انتخاب کن",
};

function Session() {
  const [formState, onInputHandler] = useForm(
    {
      sessionName: {
        value: "",
        isValid: false,
      },
      sessionTime: {
        value: "",
        isValid: false,
      },
      sessionFile: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [sessionFile, setSessionFile] = useState();
  const [allCourses, setAllCourses] = useState([]);
  const [parentCategoryID, setParentCategoryID] = useState(null);
  const [allCourseWithDefaultValue, setAllCourseWithDefaultValue] = useState(
    []
  );
  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState(mainObj);
  const [isNewSessionFree, setIsNewSessionFree] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const [mainSessionsOfCourse, setMainSessionsOfCourse] = useState();
  const [mainSession, setMainSession] = useState(null);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);

  const getAllcourses = () => {
    fetch(`${mainUrlApi}/courses`)
      .then((res) => res.json())
      .then((allcoursesData) => {
        setAllCourses(allcoursesData);

        let mainCourses = allcoursesData.filter(
          (menu) => !Boolean(menu.parent)
        );

        let mainCoursesWithDefualtValue;
        if (mainItemCategoryCourse._id === mainObj._id) {
          mainCoursesWithDefualtValue = [
            ...mainCourses,
            mainItemCategoryCourse,
          ];
        } else {
          mainCoursesWithDefualtValue = [...mainCourses, mainObj];
          setMainItemCategoryCourse(mainObj);
        }

        setAllCourses(mainCourses);
        setAllCourseWithDefaultValue(mainCoursesWithDefualtValue);
      });
  };

  const addMenuHandler = () => {
    if (formState.isFormValid && mainItemCategoryCourse._id != 0) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));

      var a = formState.inputs.sessionTime.value.split(":");
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

      let formData = new FormData();
      formData.append("video", sessionFile);
      formData.append("title", formState.inputs.sessionName.value);
      formData.append("time", seconds);
      formData.append("free", isNewSessionFree ? 1 : 0);

      fetch(`${mainUrlApi}/courses/${mainItemCategoryCourse._id}/sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.status === 201) {
          toast.success("سرفصل با موفقیت اضافه شد");
          sessionRender();
        }
      });
    } else {
      toast.error("اطلاعات را کامل کنید");
    }
  };

  const sessionRender = () => {
    fetch(`${mainUrlApi}/courses/sessions`)
      .then((res) => res.json())
      .then((allSessionsData) => {
        setAllSessions(allSessionsData);
      });
  };

  const showSessionDetailHandler = (Course) => {
    setParentCategoryID(Course._id);
    const filtredSession = allSessions.filter(
      (session) => session.course._id === Course._id
    );

    if (filtredSession.length) {
      setMainSessionsOfCourse(filtredSession);
      setIsModalDetail(true);
    } else {
      toast.error("سرفصلی برای این دوره ساخته نشده");
    }
  };

  const setMainSubMenu = () => {};
  const closeDetailModalHandler = () => {
    setIsModalDetail(false);
  };

  const deleteInfoHandler = (Session) => {
    setIsModalDelete(true);
    setMainSession(Session);
  };

  const cancelDeleteAction = () => {
    setIsModalDelete(false);
  };

  const deleteInfoAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`${mainUrlApi}/courses/sessions/${mainSession._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("سرفصل با موفقیت پاک شد");
        setIsModalDelete(false);

        const mainSessions = mainSessionsOfCourse.filter(
          (session) => session._id !== mainSession._id
        );

        setMainSessionsOfCourse(mainSessions);

        if (!mainSessions.length) {
          setIsModalDetail(false);
        }
        sessionRender();
      } else {
        toast.error("خطا در سرور");
      }
    });
  };

  useEffect(() => {
    getAllcourses();
    sessionRender();
  }, []);

  return (
    <>
      <div className="hpc__part-section">
        <h2 className="panel-home__title">افزودن ویدیو</h2>
        <div className="login-form__box-inputs my-5">
          <div className="login-form__box-inputs my-5">
            <div className="grid grid-cols-12 hpc__center">
              <div className="col-span-12 grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    mode="dark-input"
                    id="sessionName"
                    onInputHandler={onInputHandler}
                    placeHolder="عنوان ویدیو"
                    validations={[requiredValidatior()]}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    mode="dark-input"
                    id="sessionTime"
                    onInputHandler={onInputHandler}
                    placeHolder="زمان ویدیو"
                    validations={[
                      requiredValidatior(),
                      minValidator(8),
                      maxValidator(8),
                    ]}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    mode="dark-input"
                    id="sessionFile"
                    validations={[fileValidator()]}
                    onInputHandler={onInputHandler}
                    onChange={(e) => setSessionFile(e.target.files[0])}
                    type="file"
                    typeFile="VIDEO"
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <div className="courses-header__custom-fillter w-full md:w-full">
                    <span className="custom-fillter__default">
                      <span
                        id="custom-filter__selection-name"
                        className="custom-fillter__default-name"
                      >
                        {mainItemCategoryCourse.name}
                      </span>
                      <svg
                        className="svg-inline--fa fa-angle-down custom-fillter-icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-down"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                        ></path>
                      </svg>
                    </span>
                    <div className="custom-fillter__dropdown">
                      {allCourses.length && (
                        <CategoryBar
                          propertyValue="name"
                          setCategoryId={setParentCategoryID}
                          mainItemCategoryCourse={mainItemCategoryCourse}
                          categorItemArray={allCourseWithDefaultValue}
                          setMainItemCategoryCourse={setMainItemCategoryCourse}
                        ></CategoryBar>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="col-span-12 grid gap-10 grid-cols-12 flex-row-reverse"
                >
                  <div className="col-span-12 hpc__part-section bg-[#242532] flex flex-col gap-5 items-center justify-between lg:flex-row-reverse">
                    <h2 className="panel-home__title">وضعیت ویدیو</h2>
                    <div className="w-10/12 lg:w-3/12 h-full grid grid-cols-2 text-center radion-group">
                      <div
                        className={`col-span-1 radio-item-wrapper ${
                          isNewSessionFree ? "active" : ""
                        }`}
                      >
                        <input
                          onChange={(e) => setIsNewSessionFree(true)}
                          type="radio"
                          className="hidden"
                          id="courseStatusPreSell"
                          checked={isNewSessionFree && true}
                        />
                        <label htmlFor="courseStatusPreSell">رایگان</label>
                      </div>
                      <div
                        className={`col-span-1 radio-item-wrapper ${
                          !isNewSessionFree ? "active" : ""
                        }`}
                      >
                        <input
                          onChange={(e) => setIsNewSessionFree(false)}
                          type="radio"
                          className="hidden"
                          id="courseStatusRun"
                          checked={!isNewSessionFree && true}
                        />
                        <label htmlFor="courseStatusRun">پولی</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 my-5">
                <div className="courses-header__left">
                  <div className="courses-header__select-wrapper"></div>
                </div>
              </div>
              <div className="col-span-12 my-5 hpc__center">
                <button
                  id="submit-new-menu-btn"
                  className="login-form__submit w-100 w-lg-50"
                  onClick={addMenuHandler}
                >
                  اضافه شو
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hpc__part-section">
        <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
          <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
            <h2 className="col-span-12 md:col-span-4 panel-home__last-users__title hpc__title flex justify-center md:justify-start">
              لیست دوره ها
            </h2>
          </div>
          <div className="panel-home__users-table overflow-x-auto">
            <table className="tabel w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="hidden lg:block">عکس</th>
                  <th>عنوان دوره</th>
                  <th>لینک منو</th>
                  <th>سرفصل های دوره</th>
                </tr>
              </thead>
              <tbody id="course-tbody-table">
                {allCourses.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td className="hidden lg:block w-44">
                      <Link to={`/Course/${course.shortName}`}>
                        <img
                          className="w-full rounded-lg"
                          src={`${mainUrl}/courses/covers/${course.cover}`}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/Course/${course.shortName}`}>
                        {course.name}
                      </Link>
                    </td>
                    <td>{course.shortName}</td>
                    <td>
                      <button
                        onClick={() => showSessionDetailHandler(course)}
                        className="inline-block seeDetailBtn"
                      >
                        <svg
                          width="22"
                          height="18"
                          viewBox="0 0 22 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.7793 10.8746L20.3886 11.312L19.7793 10.8746ZM19.7793 7.1254L19.1701 7.56278L19.7793 7.1254ZM20.6631 9H19.9131H20.6631ZM2.22067 10.8746L2.82993 10.4372L2.22067 10.8746ZM2.22067 7.1254L1.61142 6.68801L2.22067 7.1254ZM1.33691 9H0.586914H1.33691ZM1.61142 11.312C2.47962 12.5214 3.77164 14.1105 5.35173 15.4043C6.92325 16.691 8.85905 17.75 11 17.75V16.25C9.35423 16.25 7.7491 15.4285 6.302 14.2437C4.86349 13.0659 3.6592 11.5923 2.82993 10.4372L1.61142 11.312ZM11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1105 19.5204 12.5214 20.3886 11.312L19.1701 10.4372C18.3408 11.5923 17.1365 13.0659 15.698 14.2437C14.2509 15.4285 12.6458 16.25 11 16.25V17.75ZM20.3886 6.68801C19.5204 5.47865 18.2284 3.88946 16.6483 2.59571C15.0768 1.30899 13.141 0.25 11 0.25V1.75C12.6458 1.75 14.2509 2.57146 15.698 3.75631C17.1365 4.93414 18.3408 6.40765 19.1701 7.56278L20.3886 6.68801ZM11 0.25C8.85905 0.25 6.92325 1.30899 5.35173 2.59572C3.77164 3.88946 2.47962 5.47865 1.61142 6.68801L2.82993 7.56278C3.6592 6.40765 4.86348 4.93414 6.302 3.75631C7.7491 2.57146 9.35423 1.75 11 1.75V0.25ZM20.3886 11.312C20.943 10.5398 21.4131 9.92861 21.4131 9H19.9131C19.9131 9.35852 19.794 9.56806 19.1701 10.4372L20.3886 11.312ZM19.1701 7.56278C19.794 8.43194 19.9131 8.64148 19.9131 9H21.4131C21.4131 8.07139 20.943 7.46024 20.3886 6.68801L19.1701 7.56278ZM2.82993 10.4372C2.20597 9.56806 2.08691 9.35852 2.08691 9H0.586914C0.586914 9.92861 1.05703 10.5398 1.61142 11.312L2.82993 10.4372ZM1.61142 6.68801C1.05703 7.46024 0.586914 8.07139 0.586914 9H2.08691C2.08691 8.64148 2.20597 8.43194 2.82993 7.56278L1.61142 6.68801ZM7.25001 9C7.25001 11.0711 8.92894 12.75 11 12.75V11.25C9.75737 11.25 8.75001 10.2426 8.75001 9H7.25001ZM11 12.75C13.0711 12.75 14.75 11.0711 14.75 9H13.25C13.25 10.2426 12.2426 11.25 11 11.25V12.75ZM14.75 9C14.75 6.92893 13.0711 5.25 11 5.25V6.75C12.2426 6.75 13.25 7.75736 13.25 9H14.75ZM11 5.25C8.92894 5.25 7.25001 6.92893 7.25001 9H8.75001C8.75001 7.75736 9.75737 6.75 11 6.75V5.25Z"
                            fill="var(--white-color)"
                          />
                        </svg>
                      </button>
                    </td>
                    {/* <td>
                      <button
                        onClick={(e) => actionDeleteHandler(course)}
                        className="deleteBtn disabled:cursor-not-allowed"
                        disabled={false}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.5172 12.7795L19.26 12.8829L18.5172 12.7795ZM18.2549 14.6645L18.9977 14.7679L18.2549 14.6645ZM5.74514 14.6645L6.48798 14.5611L5.74514 14.6645ZM5.4828 12.7795L4.73996 12.8829L5.4828 12.7795ZM9.18365 21.7368L8.89206 22.4278L9.18365 21.7368ZM6.47508 18.5603L7.17907 18.3017L6.47508 18.5603ZM17.5249 18.5603L18.2289 18.819V18.819L17.5249 18.5603ZM14.8164 21.7368L14.5248 21.0458H14.5248L14.8164 21.7368ZM5.74664 8.92906C5.70746 8.5167 5.34142 8.21418 4.92906 8.25336C4.5167 8.29254 4.21418 8.65858 4.25336 9.07094L5.74664 8.92906ZM19.7466 9.07094C19.7858 8.65858 19.4833 8.29254 19.0709 8.25336C18.6586 8.21418 18.2925 8.5167 18.2534 8.92906L19.7466 9.07094ZM20 7.75C20.4142 7.75 20.75 7.41421 20.75 7C20.75 6.58579 20.4142 6.25 20 6.25V7.75ZM4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75V6.25ZM9.25 18C9.25 18.4142 9.58579 18.75 10 18.75C10.4142 18.75 10.75 18.4142 10.75 18H9.25ZM10.75 10C10.75 9.58579 10.4142 9.25 10 9.25C9.58579 9.25 9.25 9.58579 9.25 10H10.75ZM13.25 18C13.25 18.4142 13.5858 18.75 14 18.75C14.4142 18.75 14.75 18.4142 14.75 18H13.25ZM14.75 10C14.75 9.58579 14.4142 9.25 14 9.25C13.5858 9.25 13.25 9.58579 13.25 10H14.75ZM16 7V7.75H16.75V7H16ZM8 7H7.25V7.75H8V7ZM17.7744 12.6761L17.512 14.5611L18.9977 14.7679L19.26 12.8829L17.7744 12.6761ZM6.48798 14.5611L6.22564 12.6761L4.73996 12.8829L5.0023 14.7679L6.48798 14.5611ZM12 21.25C10.4708 21.25 9.92544 21.2358 9.47524 21.0458L8.89206 22.4278C9.68914 22.7642 10.6056 22.75 12 22.75V21.25ZM5.0023 14.7679C5.282 16.7777 5.43406 17.9017 5.77109 18.819L7.17907 18.3017C6.91156 17.5736 6.77851 16.6488 6.48798 14.5611L5.0023 14.7679ZM9.47524 21.0458C8.55279 20.6566 7.69496 19.7058 7.17907 18.3017L5.77109 18.819C6.3857 20.4918 7.48205 21.8328 8.89206 22.4278L9.47524 21.0458ZM17.512 14.5611C17.2215 16.6488 17.0884 17.5736 16.8209 18.3017L18.2289 18.819C18.5659 17.9017 18.718 16.7777 18.9977 14.7679L17.512 14.5611ZM12 22.75C13.3944 22.75 14.3109 22.7642 15.1079 22.4278L14.5248 21.0458C14.0746 21.2358 13.5292 21.25 12 21.25V22.75ZM16.8209 18.3017C16.305 19.7058 15.4472 20.6566 14.5248 21.0458L15.1079 22.4278C16.5179 21.8328 17.6143 20.4918 18.2289 18.819L16.8209 18.3017ZM6.22564 12.6761C6.00352 11.08 5.83766 9.88703 5.74664 8.92906L4.25336 9.07094C4.34819 10.069 4.51961 11.2995 4.73996 12.8829L6.22564 12.6761ZM19.26 12.8829C19.4804 11.2995 19.6518 10.069 19.7466 9.07094L18.2534 8.92906C18.1623 9.88702 17.9965 11.08 17.7744 12.6761L19.26 12.8829ZM20 6.25H4V7.75H20V6.25ZM10.75 18V10H9.25V18H10.75ZM14.75 18V10H13.25V18H14.75ZM15.25 6V7H16.75V6H15.25ZM16 6.25H8V7.75H16V6.25ZM8.75 7V6H7.25V7H8.75ZM12 2.75C13.7949 2.75 15.25 4.20507 15.25 6H16.75C16.75 3.37665 14.6234 1.25 12 1.25V2.75ZM12 1.25C9.37665 1.25 7.25 3.37665 7.25 6H8.75C8.75 4.20507 10.2051 2.75 12 2.75V1.25Z"
                            fill="var(--dangerous)"
                          />
                        </svg>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalDelete && (
        <DeleteModal
          role="DELETE_SESSION"
          deleteAction={deleteInfoAction}
          cancelAction={cancelDeleteAction}
          MainInfo={mainSession}
        ></DeleteModal>
      )}
      {isModalDetail && (
        <DetailModal
          typeInfoShow={"READ_DELETE"}
          isDeleteHandler={true}
          deleteHandler={deleteInfoHandler}
          deleteAction={deleteInfoAction}
          mainInfo={mainSessionsOfCourse}
          cancelAction={closeDetailModalHandler}
          setMainSubMenu={setMainSubMenu}
        ></DetailModal>
      )}
      <Toaster></Toaster>
    </>
  );
}

export default Session;
