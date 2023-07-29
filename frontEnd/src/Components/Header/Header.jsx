import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { mainUrlApi } from "../../Utils/Utils";

import "./Header.css";
import AuthContext from "../../Context/AuthContext";
import useShuffled from "../../Hooks/useShuffled";
import SearchBox from "../SearchBox/SearchBox";

const Header = memo(({ customClassForParet }) => {
  const mobielMenuWrapper = useRef();
  const [topBarMenu, setTopBarMenu] = useState([]);
  const [menus, setMenus] = useState([]);

  const menuMobileHandler = () => {
    mobielMenuWrapper.current.classList.add("open");
  };

  const closeMenuMobileHandler = () => {
    mobielMenuWrapper.current.classList.remove("open");
  };

  const topBarRender = () => {
    fetch(`${mainUrlApi}/menus/topbar`)
      .then((res) => res.json())
      .then((topbarData) => setTopBarMenu(topbarData));
  };
  let shuffledTopBarItems = useShuffled(topBarMenu);

  const menuRender = () => {
    fetch(`${mainUrlApi}/menus`)
      .then((res) => res.json())
      .then((menuData) => setMenus(menuData));
  };

  useEffect(() => {
    topBarRender();
    menuRender();
  }, []);

  const authContext = useContext(AuthContext);

  return (
    <header
      className={`header ${customClassForParet ? customClassForParet : ""}`}
    >
      <div className="top-bar">
        <div className="conatiner-fluid">
          <div className="top-bar__content">
            <div className="top-bar__right animate__animated animate__fadeInRightBig">
              <ul id="top-bar__course-menu" className="top-bar__menu">
                {[...shuffledTopBarItems].slice(0, 4).map((item) => (
                  <li key={item._id} className="top-bar__item">
                    <Link to={item.href} className="top-bar__link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="top-bar__left animate__animated animate__fadeInLeftBig">
              <div className="top-bar__email">
                <Link
                  title="email"
                  to=""
                  className="top-bar__email-text top-bar__link"
                >
                  sobhan13831383yaghobi@gmail.com
                </Link>
              </div>
              <div className="top-bar__social-media">
                <ul className="top-bar__social-media-menu">
                  <li className="top-bar__item">
                    <Link
                      title="instagram"
                      to="#instagram"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-instagram top-bar__instagram-icon"></i>
                    </Link>
                  </li>
                  <li className="top-bar__item">
                    <Link
                      title="telegram"
                      to="#telegram"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-telegram top-bar__telegram-icon"></i>
                    </Link>
                  </li>
                  <li className="top-bar__item">
                    <Link
                      title="youtube"
                      to="#youtube"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-youtube top-bar__youtube-icon"></i>
                    </Link>
                  </li>
                  <li className="top-bar__item">
                    <Link
                      title="twitter"
                      to="#twitter"
                      className="top-bar__social-link-icon top-bar__link"
                    >
                      <i className="fa-brands fa-twitter top-bar__twitter-icon"></i>
                    </Link>
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
                    {menus.map((menu) => (
                      <li key={menu._id} className="main-header__item">
                        <Link to={menu.href} className="main-header__link">
                          {menu.title}
                        </Link>
                      </li>
                    ))}
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
                {menus.slice(menus.length - 7, menus.length).map((menu) => (
                  <li key={menu._id} className="main-header__item">
                    <Link
                      to={`/Category/${menu.href}`}
                      className="main-header__link"
                    >
                      <span className="truncate max-w-[8rem]">
                        {menu.title}
                      </span>
                      {menu.submenus.length ? (
                        <span className="main-header__icon-wrapper">
                          <i className="fa-solid fa-angle-down main-header__link-icon"></i>
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                    {menu.submenus.length ? (
                      <ul className="main-header__dropdown">
                        {menu.submenus.map((submenu) => (
                          <li key={submenu._id} className="main-header__item">
                            <Link
                              to={submenu.href}
                              className="main-header__link "
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
              <div className="main-header__search-wrapper">
                <SearchBox></SearchBox>
              </div>
            </div>
            <div className="main-header__left">
              <ul className="main-header__menu">
                <li className="main-header__item">
                  <div
                    id="header__profile"
                    className="main-header__link main-header__profile cursor-pointer"
                  >
                    {authContext.isLoggedIn ? (
                      <div
                        className="main-header__account-btn flex
                      "
                      >
                        <span className="main-header__profile-name truncate max-w-[10rem]">
                          {authContext.userInfo.username}
                        </span>
                        <span className="main-header__icon-wrapper">
                          <i className="fa-solid fa-user main-header__profile-icon"></i>
                        </span>
                      </div>
                    ) : (
                      <Link to="/Login" className="main-header__account-btn">
                        ورود / ثبت نام
                      </Link>
                    )}
                    {authContext.isLoggedIn && (
                      <ul
                        id="dropdown__profile"
                        className="main-header__dropdown"
                      >
                        {authContext.userInfo.role === "ADMIN" ? (
                          <li className="main-header__item">
                            <NavLink
                              to="/p-admin/main"
                              className="main-header__link"
                            >
                              پنل مدیریت
                            </NavLink>
                          </li>
                        ) : (
                          <div></div>
                        )}
                        <li className="main-header__item">
                          <NavLink className="main-header__link">
                            پیشخوان
                          </NavLink>
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
                            onClick={(e) => authContext.logout()}
                            id="logout"
                            className="main-header__link hpc__DANGER"
                          >
                            خروج از سیستم
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
                {authContext.isLoggedIn && (
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
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
