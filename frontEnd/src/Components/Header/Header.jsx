import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const mobielMenuWrapper = useRef();

  const menuMobileHandler = () => {
    mobielMenuWrapper.current.classList.add("open");
  };

  const closeMenuMobileHandler = () => {
    mobielMenuWrapper.current.classList.remove("open");
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="conatiner-fluid">
          <div className="top-bar__content">
            <div className="top-bar__right animate__animated animate__fadeInRightBig">
              <ul id="top-bar__course-menu" className="top-bar__menu">
                <li className="top-bar__item">
                  <NavLink href="${item.href}" className="top-bar__link">
                    ;,s
                  </NavLink>
                </li>
                <li className="top-bar__item">
                  <NavLink href="${item.href}" className="top-bar__link">
                    ;,s
                  </NavLink>
                </li>
                <li className="top-bar__item">
                  <NavLink href="${item.href}" className="top-bar__link">
                    ;,s
                  </NavLink>
                </li>
                <li className="top-bar__item">
                  <NavLink href="${item.href}" className="top-bar__link">
                    ;,s
                  </NavLink>
                </li>
                <li className="top-bar__item">
                  <NavLink href="${item.href}" className="top-bar__link">
                    ;,s
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="top-bar__left animate__animated animate__fadeInLeftBig">
              <div className="top-bar__email">
                <NavLink
                  title="email"
                  href=""
                  className="top-bar__email-text top-bar__link"
                >
                  soobhanybi@gmail.com
                </NavLink>
              </div>
              <div className="top-bar__social-media">
                <ul className="top-bar__social-media-menu">
                  <li className="top-bar__item">
                    <NavLink
                      title="instagram"
                      href="#instagram"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-instagram top-bar__instagram-icon"></i>
                    </NavLink>
                  </li>
                  <li className="top-bar__item">
                    <NavLink
                      title="telegram"
                      href="#telegram"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-telegram top-bar__telegram-icon"></i>
                    </NavLink>
                  </li>
                  <li className="top-bar__item">
                    <NavLink
                      title="youtube"
                      href="#youtube"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-youtube top-bar__youtube-icon"></i>
                    </NavLink>
                  </li>
                  <li className="top-bar__item">
                    <NavLink
                      title="twitter"
                      href="#twitter"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-twitter top-bar__twitter-icon"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-header">
        <div className="container-fluid">
          <div className="main-header__content">
            <div className="main-header__mobile-menu">
              <li
                id="main-header__mobile-menu-btn"
                className="main-header__item"
              >
                <button
                  onClick={menuMobileHandler}
                  className="bg-[#43c67a] px-8 py-5 rounded-lg"
                >
                  <i>
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13L15 13M9 1L15 1M1 7H15"
                        stroke="var(--box-color)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </i>
                </button>
                <div
                  ref={mobielMenuWrapper}
                  className="mobile-menu__dropdown-wrapper"
                >
                  <button
                    onClick={closeMenuMobileHandler}
                    id="closeDropDownBtn"
                    title="close"
                    className="mobile-menu__close-dropdown flex items-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <ul className="mobile-menu__dropdown">
                    <li className="main-header__item">
                      <div className="mobile-menu__searchbar global__searchbar">
                        <input
                          type="text"
                          className="main-header___search-input global__search-input"
                          placeholder="جستجو..."
                        />
                        <button className="main-header__search-btn global__search-btn">
                          <i className="fa-solid fa-magnifying-glass main-header__serach-icon global__search-icon"></i>
                        </button>
                      </div>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">فرانت اند</NavLink>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">امنیت</NavLink>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">مقالات</NavLink>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">پایتون</NavLink>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">
                        مهارت های نرم
                      </NavLink>
                    </li>
                    <li className="main-header__item">
                      <NavLink className="main-header__link">فروشگاه</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </div>
            <div className="main-header__right">
              <div className="main-header__logo">
                <div className="header-main__logo-text-wrapper">
                  <span className="header-main__logo-text">L</span>
                  <span className="header-main__logo-text">E</span>
                  <span className="header-main__logo-text">G</span>
                  <span className="header-main__logo-text">O</span>
                </div>
              </div>
              <ul
                id="menu__wrapper"
                className="main-header__menu main-header__course-menu"
              >
                <li className="main-header__item">
                  <NavLink to="/Product" className="main-header__link">
                    فرانت اند
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                    </span>
                  </NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink className="main-header__link">
                    امنیت
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                    </span>
                  </NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink className="main-header__link">
                    مقالات
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                    </span>
                  </NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink className="main-header__link">
                    پایتون
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                    </span>
                  </NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink className="main-header__link">
                    مهارت های نرم
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                    </span>
                  </NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink className="main-header__link">فروشگاه</NavLink>
                </li>

                <ul className="main-header__dropdown">
                  <li className="main-header__item">
                    <NavLink className="main-header__link">1</NavLink>
                  </li>
                  <li className="main-header__item">
                    <NavLink className="main-header__link">3</NavLink>
                  </li>
                  <li className="main-header__item">
                    <NavLink className="main-header__link">4</NavLink>
                  </li>
                  <li className="main-header__item">
                    <NavLink className="main-header__link">5</NavLink>
                  </li>
                </ul>
              </ul>
              <div className="main-header__search-wrapper">
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
                <div
                  id="auto-search-box"
                  className="main-header___auto-search-box"
                ></div>
              </div>
            </div>
            <div className="main-header__left">
              <ul className="main-header__menu">
                <li className="main-header__item">
                  <div
                    id="header__profile"
                    className="main-header__link main-header__profile cursor-pointer"
                  >
                    <div className="main-header__account-btn">
                      <span className="main-header__profile-name">sobhan</span>
                      <span className="main-header__icon-wrapper">
                        <i className="fa-solid fa-user main-header__profile-icon"></i>
                      </span>
                    </div>
                    <ul
                      id="dropdown__profile"
                      className="main-header__dropdown"
                    >
                      <li className="main-header__item">
                        <NavLink className="main-header__link">پیشخوان</NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink className="main-header__link">
                          سفارش ها
                        </NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink className="main-header__link">
                          کیف پول من
                        </NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink className="main-header__link">
                          جزعیات حساب
                        </NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink className="main-header__link">
                          دوره های خریداری شده
                        </NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink className="main-header__link">
                          تیکت های پشتیبانی
                        </NavLink>
                      </li>
                      <li className="main-header__item">
                        <NavLink
                          id="logout"
                          className="main-header__link hpc__DANGER"
                        >
                          خروج از سیستم
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="main-header__item">
                  <div className="main-header__link main-header__cart-shopping">
                    <span className="main-header__icon-wrapper">
                      <i className="fa-solid fa-wallet main-header__cart-shop-icon"></i>
                    </span>
                    <ul className="main-header__dropdown">
                      <li className="main-header__item">
                        محصولی در سبد خرید موجود نیست
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
