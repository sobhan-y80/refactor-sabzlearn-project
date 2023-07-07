import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./PanelAdmin.css";
import { mainUrlApi } from "../../Utils/Utils";

const MenuSideBar = () => {
  return (
    <>
      <ul className="panel-sidebar__menu">
        <li className="panel-sidebar__list">
          <NavLink to="Main" className="panel-sidebar__link">
            <img
              src="../images/panel/home.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">خانه</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Products" className="panel-sidebar__link">
            <img
              src="../images/panel/course.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">دوره ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Menus" className="panel-sidebar__link">
            <img
              src="../images/panel/menu-board.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">منو ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Article" className="panel-sidebar__link">
            <img
              src="../images/panel/article.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">مقالات</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="PrevArticle" className="panel-sidebar__link">
            <img
              src="../images/panel/draft.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">پیش نویس ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Users" className="panel-sidebar__link">
            <img
              src="../images/panel/users.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">کاربران</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Orders" className="panel-sidebar__link">
            <img
              src="../images/panel/category.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">دسته بندی ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Notification" className="panel-sidebar__link">
            <img
              src="../images/panel/message-text.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">پیغام ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="DiscountCode" className="panel-sidebar__link">
            <img
              src="../images/panel/receipt-discount.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">کد های تخفیف</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="/" className="panel-sidebar__link">
            <img
              src="../images/panel/receipt-discount.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">برو صفحه اصلی</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

function PanelAdmin() {
  const [adminInfo, setAdminInfo] = useState({});
  const getMe = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    console.log(localStorageData);
    fetch(`${mainUrlApi}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((adminInfo) => setAdminInfo(adminInfo));
  };
  console.log(adminInfo);
  useEffect(() => {
    getMe();
  }, []);
  return (
    <>
      {/* <!-- Start Panel --> */}
      <div className="panel">
        <div className="panel-wrapper flex gap-5">
          <div className="w-full lg:w-2/12 my-2 lg:my-0 panel__sidebar">
            <div className="panel-sidebar__wrapper overflow-y-auto no-scrollbar">
              <div className="panel-sidebar__title-wrapper">
                <div className="panel-sidebar__logo hpc__noselect">
                  <div className="header-main__logo-text-wrapper">
                    <span className="header-main__logo-text">L</span>
                    <span className="header-main__logo-text">E</span>
                    <span className="header-main__logo-text">G</span>
                    <span className="header-main__logo-text">O</span>
                  </div>
                </div>
                <div
                  id="notif-wrapper"
                  className="panel-sidebar__menu-notif active"
                  title="اعلانات"
                >
                  <div
                    id="menu-notif"
                    className="panel-sidebar__menu-notif-img-wrapper hpc__center"
                  >
                    {/* Notif svg */}
                    <svg
                      className="h-full"
                      viewBox="0 0 800 800"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M400 214.665V325.665"
                        stroke="#F1F1F1"
                        strokeWidth="50"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M400.663 66.6667C277.997 66.6667 178.663 166 178.663 288.667V358.667C178.663 381.333 169.33 415.333 157.663 434.667L115.33 505.333C89.33 549 107.33 597.667 155.33 613.667C314.663 666.667 486.997 666.667 646.33 613.667C691.33 598.667 710.663 546 686.33 505.333L643.997 434.667C632.33 415.333 622.997 381 622.997 358.667V288.667C622.663 166.667 522.663 66.6667 400.663 66.6667Z"
                        stroke="#F1F1F1"
                        strokeWidth="50"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                      <path
                        opacity="0.4"
                        d="M510.997 627.327C510.997 688.327 460.997 738.327 399.997 738.327C369.663 738.327 341.663 725.66 321.664 705.66C301.664 685.66 288.997 657.66 288.997 627.327"
                        stroke="#F1F1F1"
                        strokeWidth="50"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <div className="notif-box">
                    <ul id="notif-box-list" className="notif-box__list">
                      <li className="notif-box__item">
                        <button
                          // onclick="seeNotifHandler('${notif._id}')"
                          className="notif-box-btn"
                        >
                          <span className="notif-box-btn__text">
                            {/* data loaded */}
                          </span>
                          <i className="fa fa-eye notif-box-btn__icon"></i>
                        </button>
                      </li>
                      {/*  */}
                      <li className="notif-box__item">
                        <p className="text-center py-4 text-white">
                          اعلانات خالی هستند
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel-sidebar__profile-wrapper">
                <a href="" className="panel-sidebar__profile hpc__center">
                  <svg
                    className="panel-sidebar__profile-img"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.15">
                      <path
                        d="M401.68 699.997C401.12 700 400.56 700 400 700C399.44 700 398.88 700 398.32 699.997C398.887 699.44 399.447 698.88 400 698.317C400.553 698.88 401.113 699.44 401.68 699.997Z"
                        fill="#43C67A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M599.787 623.803C599.927 621.443 600 619.063 600 616.667C600 552.233 547.767 500 483.333 500H316.667C252.233 500 200 552.233 200 616.667C200 619.063 200.072 621.443 200.215 623.803C138.715 568.863 100 488.953 100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400C700 488.953 661.283 568.863 599.787 623.803ZM400 400C455.23 400 500 355.23 500 300C500 244.772 455.23 200 400 200C344.77 200 300 244.772 300 300C300 355.23 344.77 400 400 400Z"
                        fill="#43C67A"
                      />
                    </g>
                    <path
                      d="M600 623.61C600 569.62 560.943 500 500 500H300C239.057 500 200 569.62 200 623.61M100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400C700 565.687 565.687 700 400 700C234.315 700 100 565.687 100 400ZM500 300C500 355.23 455.23 400 400 400C344.77 400 300 355.23 300 300C300 244.772 344.77 200 400 200C455.23 200 500 244.772 500 300Z"
                      stroke="#43C67A"
                      strokeWidth="50"
                    />
                  </svg>

                  <div className="panel-sidebar__profile-name-wrapper hpc__center">
                    <p
                      id="profile-name"
                      className="panel-sidebar__profile-name hpc__short-text"
                    >
                      {adminInfo.name}
                    </p>
                  </div>
                </a>
              </div>
              <div className="panel-sidebar__menu-wrapper">{MenuSideBar()}</div>
            </div>
            <div className="panel-slidebar__mobile-wrapper">
              <div className="content h-full">
                <nav className="flex w-full h-full">
                  <div id="menuToggle" className="hpc__center hpc__noselect">
                    <input id="toggleMenuInput" type="checkbox" />
                    <span className="mobile-menu-line"></span>
                    <span className="mobile-menu-line"></span>
                    <span className="mobile-menu-line"></span>
                  </div>
                  <div id="menu-wrapper">
                    <ul className="menu">
                      <div className="panel-sidebar__profile-wrapper">
                        <a
                          href=""
                          className="panel-sidebar__profile hpc__center"
                        >
                          <svg
                            className="panel-sidebar__profile-img"
                            viewBox="0 0 800 800"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.15">
                              <path
                                d="M401.68 699.997C401.12 700 400.56 700 400 700C399.44 700 398.88 700 398.32 699.997C398.887 699.44 399.447 698.88 400 698.317C400.553 698.88 401.113 699.44 401.68 699.997Z"
                                fill="#43C67A"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M599.787 623.803C599.927 621.443 600 619.063 600 616.667C600 552.233 547.767 500 483.333 500H316.667C252.233 500 200 552.233 200 616.667C200 619.063 200.072 621.443 200.215 623.803C138.715 568.863 100 488.953 100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400C700 488.953 661.283 568.863 599.787 623.803ZM400 400C455.23 400 500 355.23 500 300C500 244.772 455.23 200 400 200C344.77 200 300 244.772 300 300C300 355.23 344.77 400 400 400Z"
                                fill="#43C67A"
                              />
                            </g>
                            <path
                              d="M600 623.61C600 569.62 560.943 500 500 500H300C239.057 500 200 569.62 200 623.61M100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400C700 565.687 565.687 700 400 700C234.315 700 100 565.687 100 400ZM500 300C500 355.23 455.23 400 400 400C344.77 400 300 355.23 300 300C300 244.772 344.77 200 400 200C455.23 200 500 244.772 500 300Z"
                              stroke="#43C67A"
                              strokeWidth="50"
                            />
                          </svg>

                          <div className="panel-sidebar__profile-name-wrapper hpc__center">
                            <p
                              id="profile-name"
                              className="panel-sidebar__profile-name hpc__short-text"
                            >
                              {adminInfo.name}
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className="panel-sidebar__menu-wrapper">
                        {MenuSideBar()}
                      </div>
                    </ul>
                  </div>
                  <div className="panel-sidebar__title-wrapper panel-sidebar__mobile-title-wrapper">
                    <div className="panel-sidebar__logo hpc__noselect">
                      <div className="header-main__logo-text-wrapper">
                        <span className="header-main__logo-text">L</span>
                        <span className="header-main__logo-text">E</span>
                        <span className="header-main__logo-text">G</span>
                        <span className="header-main__logo-text">O</span>
                      </div>
                    </div>
                    <div
                      className="panel-sidebar__menu-notif panel-sidebar__mobile-menu-notif active"
                      title="اعلانات"
                    >
                      <div className="panel-sidebar__menu-notif-img-wrapper panel-sidebar__mobile-menu-notif-img-wrapper hpc__center">
                        {/* Notif svg */}
                        <svg
                          className="h-full"
                          viewBox="0 0 800 800"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M400 214.665V325.665"
                            stroke="#F1F1F1"
                            strokeWidth="50"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                          />
                          <path
                            d="M400.663 66.6667C277.997 66.6667 178.663 166 178.663 288.667V358.667C178.663 381.333 169.33 415.333 157.663 434.667L115.33 505.333C89.33 549 107.33 597.667 155.33 613.667C314.663 666.667 486.997 666.667 646.33 613.667C691.33 598.667 710.663 546 686.33 505.333L643.997 434.667C632.33 415.333 622.997 381 622.997 358.667V288.667C622.663 166.667 522.663 66.6667 400.663 66.6667Z"
                            stroke="#F1F1F1"
                            strokeWidth="50"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                          />
                          <path
                            opacity="0.4"
                            d="M510.997 627.327C510.997 688.327 460.997 738.327 399.997 738.327C369.663 738.327 341.663 725.66 321.664 705.66C301.664 685.66 288.997 657.66 288.997 627.327"
                            stroke="#F1F1F1"
                            strokeWidth="50"
                            strokeMiterlimit="10"
                          />
                        </svg>
                        <div className="panel-sidebar__menu-notif-count hpc__center hpc__noselect">
                          99+
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-10/12 my-2 lg:my-0 panel__home">
            <div className="panel-home__wrapper">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Finish Panel --> */}
    </>
  );
}

export default PanelAdmin;
