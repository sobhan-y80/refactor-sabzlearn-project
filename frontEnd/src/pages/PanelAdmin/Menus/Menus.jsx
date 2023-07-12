import React, { useEffect, useState } from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import { requiredValidatior } from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";

const itemCategoryCourseData = [
  { id: 1, name: "فریلنسری", key: "freelancer" },
  { id: 2, name: "پایتون", key: "pyton" },
  { id: 3, name: "بک اند", key: "backend" },
  { id: 4, name: "فرانت اند", key: "frontend" },
  { id: 5, name: "یک منو جدید اضافه کن", key: "newMenu" },
];

function Menus() {
  const [isNewCategory, setIsNewCategory] = useState(false);
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
      ...(isNewCategory && {
        menuItem: { ...(isNewCategory && { value: "", isValid: false }) },
      }),
    },
    false
  );

  console.log(formState);

  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState({
    id: 4,
    name: "فرانت اند",
    key: "frontend",
  });

  useEffect(() => {
    console.log("change Main Item Category");
    if (mainItemCategoryCourse.key === "newMenu") {
      setIsNewCategory(true);
    } else {
      setIsNewCategory(false);
    }
  }, [mainItemCategoryCourse]);

  return (
    <>
      <div className="hpc__part-section">
        <h2 className="panel-home__title">افزودن منو</h2>
        <div className="login-form__box-inputs my-5">
          <div className="login-form__box-inputs my-5">
            <div className="grid grid-cols-12 hpc__center">
              <div className="col-span-12 grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    type="dark-input"
                    id="itemName"
                    onInputHandler={onInputHandler}
                    placeHolder={null}
                    validations={[requiredValidatior()]}
                  >
                    نام
                    <p className="hpc__space-word">یا</p>
                    عنوان منو
                  </InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    type="dark-input"
                    id="hrefItemName"
                    onInputHandler={onInputHandler}
                    placeHolder="عنوان منو"
                    validations={[requiredValidatior()]}
                  ></InputBox>
                </div>
                {isNewCategory && (
                  <div className="col-span-12 lg:col-span-6 my-5">
                    <InputBox
                      type="dark-input"
                      id="menuItem"
                      onInputHandler={onInputHandler}
                      placeHolder="تایتل منو"
                      validations={[requiredValidatior()]}
                    ></InputBox>
                  </div>
                )}
              </div>
              <div className="col-span-12 my-5">
                <div className="courses-header__left">
                  <div className="courses-header__select-wrapper">
                    <div className="courses-header__custom-fillter">
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
                        <CategoryBar
                          mainItemCategoryCourse={mainItemCategoryCourse}
                          categorItemArray={itemCategoryCourseData}
                          setMainItemCategoryCourse={setMainItemCategoryCourse}
                        ></CategoryBar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 my-5 hpc__center">
                <button
                  id="submit-new-menu-btn"
                  className="login-form__submit w-100 w-lg-50"
                >
                  اضافه شو
                </button>
              </div>
            </div>
          </div>
          <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
            <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
              <h2 className="col-12 col-md-4 panel-home__last-users__title hpc__title d-flex justify-content-center justify-content-md-start">
                لیست منو ها
              </h2>

              <div className="col-8 col-md-3 col-lg-2 my-5 main-header__search-wrapper">
                <div
                  id="main-header__searchbar"
                  className="main-header__searchbar global__searchbar"
                >
                  <input
                    type="text"
                    id="main-header__search-input"
                    className="main-header___search-input global__search-input"
                    placeholder="جستجو..."
                  />
                  <button className="main-header__search-btn global__search-btn">
                    <i className="fa-solid fa-magnifying-glass main-header__serach-icon global__search-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="panel-home__users-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                    <th>عنوان</th>
                    <th>لینک منو</th>
                    <th>دسته منو</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="no-copy">
                      <button className="btn btn-primary">ویرایش</button>
                    </td>
                    <td className="no-copy">
                      <button className="btn btn-danger">حذف</button>
                    </td>
                    <td>فرانت اند</td>
                    <td>front-end</td>
                    <td>فرانت اند</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="no-copy">
                      <button className="btn btn-primary">ویرایش</button>
                    </td>
                    <td className="no-copy">
                      <button className="btn btn-danger">حذف</button>
                    </td>
                    <td>بک اند</td>
                    <td>back-end</td>
                    <td>بک اند</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menus;
