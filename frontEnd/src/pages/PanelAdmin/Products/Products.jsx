import React, { useEffect, useState } from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import { requiredValidatior } from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { mainUrlApi } from "../../../Utils/Utils";
import { toast } from "react-hot-toast";

function Products() {
  const [statusNewCourse, setStatusNewCourse] = useState(false);
  // false === preSell , true === running
  const [formState, onInputHandler] = useForm(
    {
      itemName: {
        value: "",
        isValid: false,
      },
      hrefItemName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState({
    _id: "5",
    title: "یک دسته بندی انتخاب کن",
  });

  const [categoyCourse, setCategoyCourse] = useState([]);
  const [parentCategoryID, setParentCategoryID] = useState(-1);

  const [categoyCourseWithDefaultValue, setCategoyCourseWithDefaultValue] =
    useState([]);
  const getCategoryCourse = async () => {
    fetch(`${mainUrlApi}/category`).then(async (res) => {
      if (res.status === 404) {
        toast.error("دسته بندی یافت نشد");
      } else if (res.status === 200) {
        const categoryData = await res.json();

        console.log("categoryData : ", categoryData);
        console.log("categoryData Type OF : ", typeof categoryData);
        let mainLeaderMenusWithDefualtValue = [...categoryData].push(
          mainItemCategoryCourse
        );
        setCategoyCourseWithDefaultValue(mainLeaderMenusWithDefualtValue);
        setCategoyCourse(categoryData);
      }
    });
  };

  useEffect(() => {
    getCategoryCourse();
  }, []);

  // useEffect(() => {
  //   // let mainLeaderMenusWithDefualtValue = [...categoyCourse].push(
  //   //   mainItemCategoryCourse
  //   // );
  //   // console.log(
  //   //   "mainLeaderMenusWithDefualtValue",
  //   //   mainLeaderMenusWithDefualtValue
  //   // );

  // }, [categoyCourse]);

  return (
    <>
      <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
        <div className="login-form__box-inputs my-5">
          <div className="grid gap-10 grid-cols-12 hpc__center">
            <div className="col-span-12 grid gap-10 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseName"
                  onInputHandler={onInputHandler}
                  placeHolder="نام دوره"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseCover"
                  onInputHandler={onInputHandler}
                  placeHolder="لینک منو"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseShortName"
                  type="number"
                  onInputHandler={onInputHandler}
                  placeHolder="قیمت دوره"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CoursePrice"
                  onInputHandler={onInputHandler}
                  placeHolder="نحوه پشتیبانی"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  validations={[requiredValidatior()]}
                  onInputHandler={onInputHandler}
                  type="file"
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <span className="custom-fillter__default">
                  <span
                    id="custom-filter__selection-name"
                    className="custom-fillter__default-name"
                  >
                    {mainItemCategoryCourse.title}
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
                  {/* {categoyCourse.length && (
                    <CategoryBar
                      setCategoryId={setParentCategoryID}
                      mainItemCategoryCourse={mainItemCategoryCourse}
                      categorItemArray={categoyCourseWithDefaultValue}
                      setMainItemCategoryCourse={setMainItemCategoryCourse}
                    ></CategoryBar>
                  )} */}
                </div>
              </div>
              <div className="col-span-12 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseDesc"
                  type="textarea"
                  placeHolder="توضیحات دوره"
                  validations={[requiredValidatior]}
                  onInputHandler={onInputHandler}
                ></InputBox>
              </div>
            </div>
            <div
              dir="ltr"
              className="col-span-12 grid gap-10 grid-cols-12 flex-row-reverse"
            >
              <div className="col-span-12 hpc__part-section flex items-center justify-between">
                <div className="w-3/12 h-full grid grid-cols-2 text-center radion-group">
                  <div
                    className={`col-span-1 radio-item-wrapper ${
                      !statusNewCourse ? "active" : ""
                    }`}
                  >
                    <input
                      onChange={(e) => setStatusNewCourse(false)}
                      type="radio"
                      className="hidden"
                      id="courseStatusPreSell"
                      checked={!statusNewCourse && true}
                    />
                    <label htmlFor="courseStatusPreSell">پیش فروش</label>
                  </div>
                  <div
                    className={`col-span-1 radio-item-wrapper ${
                      statusNewCourse ? "active" : ""
                    }`}
                  >
                    <input
                      onChange={(e) => setStatusNewCourse(true)}
                      type="radio"
                      className="hidden"
                      id="courseStatusRun"
                      checked={statusNewCourse && true}
                    />
                    <label htmlFor="courseStatusRun">در حال برگذاری</label>
                  </div>
                </div>
                <h2 className="panel-home__title">وضعیت دوره</h2>
              </div>
            </div>
            <div className="col-span-12 my-5">
              <button
                id="submit-new-user-btn"
                className="login-form__submit w-full"
              >
                اضافه شو
              </button>
            </div>
          </div>
        </div>
        <div className="panel-home__last-users__title">
          <span>
            <span className="hpc__title">تمامی دوره ها</span>
          </span>
        </div>
        <div className="panel-home__users-table table-responsive">
          <table className="table text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>نام دوره</th>
                <th>مبلغ</th>
                <th>تعداد شرکت کننده</th>
                <th>امتیاز</th>
                <th>وضعیت دوره</th>
                <th>اعمالات</th>
              </tr>
            </thead>
            <tbody id="course-tbody-table"></tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
