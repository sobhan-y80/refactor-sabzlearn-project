import React, { useEffect, useState } from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import {
  fileValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { mainUrlApi } from "../../../Utils/Utils";
import { Toaster, toast } from "react-hot-toast";

function Products() {
  const [statusNewCourse, setStatusNewCourse] = useState(false);
  // false === preSell , true === running
  const [formState, onInputHandler] = useForm(
    {
      CourseName: {
        value: "",
        isValid: false,
      },
      CourseShortName: {
        value: "",
        isValid: false,
      },
      CourseHref: {
        value: "",
        isValid: false,
      },
      CoursePrice: {
        value: "",
        isValid: false,
      },
      courseImage: {
        value: "",
        isValid: false,
      },
      CourseDesc: {
        value: "",
        isValid: false,
      },
      CourseSupport: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState({
    _id: "-1",
    title: "یک دسته بندی انتخاب کن",
  });
  const [categoyCourse, setCategoyCourse] = useState([]);
  const [parentCategoryID, setParentCategoryID] = useState(-1);
  const [categoyCourseWithDefaultValue, setCategoyCourseWithDefaultValue] =
    useState([]);
  const [categoryCover, setCategoryCover] = useState(null);

  const getCategoryCourse = async () => {
    fetch(`${mainUrlApi}/category`).then(async (res) => {
      if (res.status === 404) {
        toast.error("دسته بندی یافت نشد");
      } else if (res.status === 200) {
        const categoryData = await res.json();

        let mainLeaderMenusWithDefualtValue = [
          ...categoryData,
          mainItemCategoryCourse,
        ];
        setCategoyCourseWithDefaultValue(mainLeaderMenusWithDefualtValue);
        setCategoyCourse(categoryData);
      }
    });
  };

  console.log(categoryCover);

  const addNewProductHandler = () => {
    if (formState.isFormValid && parentCategoryID != -1) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));

      const mainStatus = statusNewCourse ? "start" : "presell";
      console.log(mainStatus);

      let formData = new FormData();

      formData.append("name", formState.inputs.CourseName.value);
      formData.append("description", formState.inputs.CourseDesc.value);
      formData.append("shortName", formState.inputs.CourseShortName.value);
      formData.append("categoryID", parentCategoryID);
      formData.append("price", formState.inputs.CoursePrice.value);
      formData.append("support", formState.inputs.CourseSupport.value);
      formData.append("status", mainStatus);
      formData.append("cover", categoryCover.name);

      console.log(formData);

      // const mainNewProductObj = {
      //   name: formState.inputs.CourseName.value,
      //   description: formState.inputs.CourseDesc.value,
      //   cover: formState.inputs.courseImage.value,
      //   shortName: formState.inputs.CourseShortName.value,
      //   price: formState.inputs.CoursePrice.value,
      //   status: mainStatus,
      //   categoryID: parentCategoryID,
      // };

      fetch(`${mainUrlApi}/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
      });
    } else {
      toast.error("مشخصات رو کامل پر کنید");
    }
  };

  console.log(categoryCover);
  console.log(formState);
  useEffect(() => {
    getCategoryCourse();
  }, []);

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
                  id="CourseShortName"
                  onInputHandler={onInputHandler}
                  placeHolder="نام کوتاه"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseHref"
                  onInputHandler={onInputHandler}
                  placeHolder="لینک منو"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CoursePrice"
                  type="number"
                  onInputHandler={onInputHandler}
                  placeHolder="قیمت دوره"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseSupport"
                  onInputHandler={onInputHandler}
                  placeHolder="پشتیبانی"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="courseImage"
                  validations={[fileValidator()]}
                  onInputHandler={onInputHandler}
                  onChange={(e) => setCategoryCover(e.target.files[0])}
                  type="file"
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <div className="courses-header__custom-fillter w-full">
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
                    {categoyCourse.length && (
                      <CategoryBar
                        setCategoryId={setParentCategoryID}
                        mainItemCategoryCourse={mainItemCategoryCourse}
                        categorItemArray={categoyCourseWithDefaultValue}
                        setMainItemCategoryCourse={setMainItemCategoryCourse}
                      ></CategoryBar>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-12 my-5">
                <InputBox
                  mode="dark-input"
                  id="CourseDesc"
                  type="textarea"
                  placeHolder="توضیحات دوره"
                  validations={[requiredValidatior()]}
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
                onClick={addNewProductHandler}
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
      <Toaster></Toaster>
    </>
  );
}

export default Products;
