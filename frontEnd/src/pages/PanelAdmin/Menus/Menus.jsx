import React, { useEffect, useState } from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import { requiredValidatior } from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { mainUrlApi } from "../../../Utils/Utils";
import { Toaster, toast } from "react-hot-toast";
import DeleteModal from "../../../Components/Modals/DeleteModal/DeleteModal";
import DetailModal from "../../../Components/Modals/DetailModal/DetailModal";

function Menus() {
  const [menus, setMenus] = useState([]);
  const [leaderMenus, setLeaderMenus] = useState([]);
  const [leaderMenuWithDefaultValue, setLeaderMenuWithDefaultValue] = useState(
    []
  );
  const [parentCategoryID, setParentCategoryID] = useState(-1);
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
    title: "یک منو جدید اضافه کن",
  });
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [mainCategoryId, setMainCategoryId] = useState(null);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [mainSubMenu, setMainSubMenu] = useState([]);

  const renderMenus = () => {
    fetch(`${mainUrlApi}/menus/all`)
      .then((res) => res.json())
      .then((menusData) => {
        setMenus(menusData);
        let mainLeaderMenus = menusData.filter((menu) => !Boolean(menu.parent));

        let mainLeaderMenusWithDefualtValue = [...mainLeaderMenus].push(
          mainItemCategoryCourse
        );

        setLeaderMenus(mainLeaderMenus);
        setLeaderMenuWithDefaultValue(mainLeaderMenusWithDefualtValue);
      });
  };

  const addMenuHandler = () => {
    if (formState.isFormValid) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));
      const newMainMenuObj = {
        title: formState.inputs.itemName.value,
        href: formState.inputs.hrefItemName.value,
        parent: parentCategoryID === -1 ? undefined : parentCategoryID,
      };

      fetch(`${mainUrlApi}/menus/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMainMenuObj),
      }).then((res) => {
        if (res.status === 400) {
          toast.error("خطا در سرور");
        } else if (res.status === 201) {
          toast.success("منو با موفقیت ساخته شد");
          renderMenus();
        }
      });
    } else {
      toast.error("فیلد هارو به درستی پر کنید");
    }
  };

  const isSubMenu = (MenuId) => {
    const isSub = menus.some(
      (menu) => menu.parent && menu.parent._id === MenuId
    );

    return isSub;
  };

  const actionDeleteHandler = (Menu) => {
    setMainCategoryId(Menu);
    setIsModalDelete(true);
  };

  const deleteAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/menus/${mainCategoryId._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success(`منو ${mainCategoryId.title} با موفقیت پاک شد`);
        renderMenus();
      } else {
        toast.error("خطا در ارتباط با سرور");
      }
    });
    setIsModalDelete(false);
  };

  const cancelDeleteAction = () => {
    setIsModalDelete(false);
  };

  const showSubMenuHandler = (MenuId) => {
    setIsModalDetail(true);
    setMainSubMenu(
      menus.filter((menu) => menu.parent && menu.parent._id === MenuId)
    );
  };

  const closeDetailModalHandler = () => {
    setIsModalDetail(false);
  };

  useEffect(() => {
    renderMenus();
  }, [mainSubMenu]);

  useEffect(() => {
    if (!mainSubMenu.length) {
      setIsModalDetail(false);
    }
  }, [mainSubMenu]);

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
                    placeHolder="لینک منو"
                    validations={[requiredValidatior()]}
                  ></InputBox>
                </div>
              </div>
              <div className="col-span-12 my-5">
                <div className="courses-header__left">
                  <div className="courses-header__select-wrapper">
                    <div className="courses-header__custom-fillter w-full md:w-6/12">
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
                        {leaderMenus.length && (
                          <CategoryBar
                            setCategoryId={setParentCategoryID}
                            mainItemCategoryCourse={mainItemCategoryCourse}
                            categorItemArray={leaderMenus}
                            setMainItemCategoryCourse={
                              setMainItemCategoryCourse
                            }
                          ></CategoryBar>
                        )}
                      </div>
                    </div>
                  </div>
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
          <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
            <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
              <h2 className="col-span-12 md:col-span-4 panel-home__last-users__title hpc__title flex justify-center md:justify-start">
                لیست منو ها
              </h2>
            </div>
            <div className="panel-home__users-table overflow-x-auto">
              <table className="tabel w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>عنوان منو</th>
                    <th>لینک منو</th>
                    <th>ساب منو ها</th>
                    <th>کنترل</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderMenus.map((menu, index) => (
                    <tr key={menu._id}>
                      <td>{index + 1}</td>
                      <td>{menu.title}</td>
                      <td>{menu.href}</td>
                      <td>
                        {isSubMenu(menu._id) ? (
                          <button
                            onClick={() => showSubMenuHandler(menu._id)}
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
                        ) : (
                          <button
                            onClick={() => toast.error("ساب منویی وجود ندارد")}
                            className="inline-block deleteBtn"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 14.25C11.5858 14.25 11.25 14.5858 11.25 15C11.25 15.4142 11.5858 15.75 12 15.75V14.25ZM15.75 12C15.75 11.5858 15.4142 11.25 15 11.25C14.5858 11.25 14.25 11.5858 14.25 12H15.75ZM3.22067 10.1254L2.61141 9.68801L3.22067 10.1254ZM3.22045 13.8743L3.82971 13.4369L3.82971 13.4369L3.22045 13.8743ZM5.78797 16.8928L6.35092 16.3972L6.33191 16.3756L6.3113 16.3556L5.78797 16.8928ZM18.101 7L17.5824 7.54174L17.6037 7.56213L17.6265 7.58079L18.101 7ZM2.33692 12L1.58692 12L2.33692 12ZM20.7793 13.8746L21.3886 14.312V14.312L20.7793 13.8746ZM20.7793 10.1253L20.17 10.5627L20.17 10.5627L20.7793 10.1253ZM20.3953 8.39076C20.1332 8.07003 19.6607 8.02252 19.34 8.28464C19.0193 8.54676 18.9718 9.01925 19.2339 9.33998L20.3953 8.39076ZM7.93753 17.7322C7.60111 17.4905 7.13249 17.5674 6.89085 17.9038C6.64921 18.2402 6.72604 18.7088 7.06247 18.9505L7.93753 17.7322ZM21.6631 12L20.9131 12L21.6631 12ZM1.53148 19.4143C1.20803 19.6731 1.15559 20.1451 1.41435 20.4685C1.67311 20.792 2.14507 20.8444 2.46852 20.5857L1.53148 19.4143ZM22.4685 4.58565C22.792 4.32689 22.8444 3.85493 22.5857 3.53148C22.3269 3.20803 21.8549 3.15559 21.5315 3.41435L22.4685 4.58565ZM18.1747 7.06021L18.6433 7.64586L18.1747 7.06021ZM5.82765 16.9379L6.29617 17.5235L5.82765 16.9379ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12H9.75C9.75 10.7574 10.7574 9.75 12 9.75V8.25ZM8.25 12C8.25 12.8808 8.5546 13.6925 9.06365 14.3326L10.2377 13.399C9.93209 13.0148 9.75 12.5297 9.75 12H8.25ZM14.9274 9.65611C14.2414 8.80021 13.1847 8.25 12 8.25V9.75C12.7103 9.75 13.3434 10.0782 13.7569 10.5942L14.9274 9.65611ZM12 15.75C14.0711 15.75 15.75 14.0711 15.75 12H14.25C14.25 13.2426 13.2426 14.25 12 14.25V15.75ZM12 3.25C9.85904 3.25 7.92324 4.30899 6.35173 5.59572C4.77163 6.88946 3.47961 8.47865 2.61141 9.68801L3.82992 10.5628C4.65919 9.40765 5.86348 7.93414 7.302 6.75631C8.7491 5.57146 10.3542 4.75 12 4.75V3.25ZM2.61118 14.3117C3.27304 15.2336 4.17749 16.371 5.26464 17.4301L6.3113 16.3556C5.30603 15.3763 4.45829 14.3125 3.82971 13.4369L2.61118 14.3117ZM18.6197 6.45826C16.8873 4.79958 14.5908 3.25 12 3.25V4.75C14.0028 4.75 15.9382 5.96762 17.5824 7.54174L18.6197 6.45826ZM2.61141 9.68801C2.05704 10.4602 1.58692 11.0714 1.58692 12L3.08692 12C3.08692 11.6415 3.20597 11.4319 3.82992 10.5628L2.61141 9.68801ZM3.82971 13.4369C3.20592 12.568 3.08691 12.3585 3.08692 12L1.58692 12C1.58691 12.9286 2.05693 13.5396 2.61119 14.3117L3.82971 13.4369ZM12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1105 20.5204 15.5214 21.3886 14.312L20.1701 13.4372C19.3408 14.5923 18.1365 16.0659 16.698 17.2437C15.2509 18.4285 13.6458 19.25 12 19.25V20.75ZM21.3885 9.68793C21.1009 9.28722 20.7682 8.84694 20.3953 8.39076L19.2339 9.33998C19.5844 9.76885 19.8981 10.1839 20.17 10.5627L21.3885 9.68793ZM7.06247 18.9505C8.487 19.9737 10.1676 20.75 12 20.75V19.25C10.5952 19.25 9.21818 18.652 7.93753 17.7322L7.06247 18.9505ZM21.3886 14.312C21.943 13.5398 22.4131 12.9286 22.4131 12L20.9131 12C20.9131 12.3585 20.794 12.5681 20.1701 13.4372L21.3886 14.312ZM20.17 10.5627C20.794 11.4319 20.9131 11.6415 20.9131 12L22.4131 12C22.4131 11.0714 21.9429 10.4602 21.3885 9.68793L20.17 10.5627ZM18.6433 7.64586L22.4685 4.58565L21.5315 3.41435L17.7062 6.47456L18.6433 7.64586ZM17.6265 7.58079L17.7002 7.64101L18.6493 6.47942L18.5756 6.41921L17.6265 7.58079ZM2.46852 20.5857L6.29617 17.5235L5.35913 16.3522L1.53148 19.4143L2.46852 20.5857ZM6.29617 17.5235L18.6433 7.64586L17.7062 6.47456L5.35913 16.3522L6.29617 17.5235ZM5.22503 17.3884L5.2647 17.4335L6.39059 16.4423L6.35092 16.3972L5.22503 17.3884Z"
                                fill="var(--dangerous)"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                      <td className="flex justify-center">
                        <button
                          onClick={() => toast.error("ساب منویی وجود ندارد")}
                          className="inline-block deleteBtn"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 14.25C11.5858 14.25 11.25 14.5858 11.25 15C11.25 15.4142 11.5858 15.75 12 15.75V14.25ZM15.75 12C15.75 11.5858 15.4142 11.25 15 11.25C14.5858 11.25 14.25 11.5858 14.25 12H15.75ZM3.22067 10.1254L2.61141 9.68801L3.22067 10.1254ZM3.22045 13.8743L3.82971 13.4369L3.82971 13.4369L3.22045 13.8743ZM5.78797 16.8928L6.35092 16.3972L6.33191 16.3756L6.3113 16.3556L5.78797 16.8928ZM18.101 7L17.5824 7.54174L17.6037 7.56213L17.6265 7.58079L18.101 7ZM2.33692 12L1.58692 12L2.33692 12ZM20.7793 13.8746L21.3886 14.312V14.312L20.7793 13.8746ZM20.7793 10.1253L20.17 10.5627L20.17 10.5627L20.7793 10.1253ZM20.3953 8.39076C20.1332 8.07003 19.6607 8.02252 19.34 8.28464C19.0193 8.54676 18.9718 9.01925 19.2339 9.33998L20.3953 8.39076ZM7.93753 17.7322C7.60111 17.4905 7.13249 17.5674 6.89085 17.9038C6.64921 18.2402 6.72604 18.7088 7.06247 18.9505L7.93753 17.7322ZM21.6631 12L20.9131 12L21.6631 12ZM1.53148 19.4143C1.20803 19.6731 1.15559 20.1451 1.41435 20.4685C1.67311 20.792 2.14507 20.8444 2.46852 20.5857L1.53148 19.4143ZM22.4685 4.58565C22.792 4.32689 22.8444 3.85493 22.5857 3.53148C22.3269 3.20803 21.8549 3.15559 21.5315 3.41435L22.4685 4.58565ZM18.1747 7.06021L18.6433 7.64586L18.1747 7.06021ZM5.82765 16.9379L6.29617 17.5235L5.82765 16.9379ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12H9.75C9.75 10.7574 10.7574 9.75 12 9.75V8.25ZM8.25 12C8.25 12.8808 8.5546 13.6925 9.06365 14.3326L10.2377 13.399C9.93209 13.0148 9.75 12.5297 9.75 12H8.25ZM14.9274 9.65611C14.2414 8.80021 13.1847 8.25 12 8.25V9.75C12.7103 9.75 13.3434 10.0782 13.7569 10.5942L14.9274 9.65611ZM12 15.75C14.0711 15.75 15.75 14.0711 15.75 12H14.25C14.25 13.2426 13.2426 14.25 12 14.25V15.75ZM12 3.25C9.85904 3.25 7.92324 4.30899 6.35173 5.59572C4.77163 6.88946 3.47961 8.47865 2.61141 9.68801L3.82992 10.5628C4.65919 9.40765 5.86348 7.93414 7.302 6.75631C8.7491 5.57146 10.3542 4.75 12 4.75V3.25ZM2.61118 14.3117C3.27304 15.2336 4.17749 16.371 5.26464 17.4301L6.3113 16.3556C5.30603 15.3763 4.45829 14.3125 3.82971 13.4369L2.61118 14.3117ZM18.6197 6.45826C16.8873 4.79958 14.5908 3.25 12 3.25V4.75C14.0028 4.75 15.9382 5.96762 17.5824 7.54174L18.6197 6.45826ZM2.61141 9.68801C2.05704 10.4602 1.58692 11.0714 1.58692 12L3.08692 12C3.08692 11.6415 3.20597 11.4319 3.82992 10.5628L2.61141 9.68801ZM3.82971 13.4369C3.20592 12.568 3.08691 12.3585 3.08692 12L1.58692 12C1.58691 12.9286 2.05693 13.5396 2.61119 14.3117L3.82971 13.4369ZM12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1105 20.5204 15.5214 21.3886 14.312L20.1701 13.4372C19.3408 14.5923 18.1365 16.0659 16.698 17.2437C15.2509 18.4285 13.6458 19.25 12 19.25V20.75ZM21.3885 9.68793C21.1009 9.28722 20.7682 8.84694 20.3953 8.39076L19.2339 9.33998C19.5844 9.76885 19.8981 10.1839 20.17 10.5627L21.3885 9.68793ZM7.06247 18.9505C8.487 19.9737 10.1676 20.75 12 20.75V19.25C10.5952 19.25 9.21818 18.652 7.93753 17.7322L7.06247 18.9505ZM21.3886 14.312C21.943 13.5398 22.4131 12.9286 22.4131 12L20.9131 12C20.9131 12.3585 20.794 12.5681 20.1701 13.4372L21.3886 14.312ZM20.17 10.5627C20.794 11.4319 20.9131 11.6415 20.9131 12L22.4131 12C22.4131 11.0714 21.9429 10.4602 21.3885 9.68793L20.17 10.5627ZM18.6433 7.64586L22.4685 4.58565L21.5315 3.41435L17.7062 6.47456L18.6433 7.64586ZM17.6265 7.58079L17.7002 7.64101L18.6493 6.47942L18.5756 6.41921L17.6265 7.58079ZM2.46852 20.5857L6.29617 17.5235L5.35913 16.3522L1.53148 19.4143L2.46852 20.5857ZM6.29617 17.5235L18.6433 7.64586L17.7062 6.47456L5.35913 16.3522L6.29617 17.5235ZM5.22503 17.3884L5.2647 17.4335L6.39059 16.4423L6.35092 16.3972L5.22503 17.3884Z"
                              fill="var(--dangerous)"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalDelete && (
        <DeleteModal
          role="DELETE_MENU"
          deleteAction={deleteAction}
          cancelAction={cancelDeleteAction}
          MainInfo={mainCategoryId}
        ></DeleteModal>
      )}
      {isModalDetail && (
        <DetailModal
          typeInfoShow={"row"}
          isDeleteHandler={true}
          mainInfo={mainSubMenu}
          cancelAction={closeDetailModalHandler}
          setMainSubMenu={setMainSubMenu}
        ></DetailModal>
      )}
      <Toaster></Toaster>
    </>
  );
}

export default Menus;
