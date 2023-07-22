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
          <NavLink to="Session" className="panel-sidebar__link">
            <img
              src="../images/panel/Session.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">سرفصل ها</span>
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
          <NavLink to="Comments" className="panel-sidebar__link">
            <img
              src="../images/panel/comment.svg"
              alt="icon"
              className="panel-sidebar__link-icon"
            />
            <span className="panel-sidebar__link-text">کامنت ها</span>
          </NavLink>
        </li>
        <li className="panel-sidebar__list">
          <NavLink to="Categories" className="panel-sidebar__link">
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_18_12" fill="white">
                <path d="M13.4504 20.6C13.7816 20.3513 13.8484 19.8811 13.5997 19.5499C13.3509 19.2187 12.8808 19.1519 12.5496 19.4007L13.4504 20.6ZM12.5496 4.59931C12.8808 4.84808 13.3509 4.78126 13.5997 4.45007C13.8484 4.11888 13.7816 3.64873 13.4504 3.39996L12.5496 4.59931ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75V11.25ZM17.466 7.41232C17.1414 7.15497 16.6697 7.20946 16.4123 7.53403C16.155 7.8586 16.2095 8.33034 16.534 8.58768L17.466 7.41232ZM16.534 15.4123C16.2095 15.6697 16.155 16.1414 16.4123 16.466C16.6697 16.7905 17.1414 16.845 17.466 16.5877L16.534 15.4123ZM10 20.25H9V21.75H10V20.25ZM3.75 15V9H2.25V15H3.75ZM9 3.75H10V2.25H9V3.75ZM3.75 9C3.75 8.04233 3.75233 7.65082 3.80232 7.33515L2.32079 7.1005C2.24767 7.56216 2.25 8.09965 2.25 9H3.75ZM9 2.25C8.09966 2.25 7.56216 2.24767 7.1005 2.32079L7.33515 3.80232C7.65082 3.75233 8.04233 3.75 9 3.75V2.25ZM3.80232 7.33515C4.09035 5.51661 5.51661 4.09035 7.33515 3.80232L7.1005 2.32079C4.64012 2.71048 2.71048 4.64012 2.32079 7.1005L3.80232 7.33515ZM9 20.25C8.04233 20.25 7.65082 20.2477 7.33515 20.1977L7.1005 21.6792C7.56216 21.7523 8.09965 21.75 9 21.75V20.25ZM2.25 15C2.25 15.9003 2.24767 16.4378 2.32079 16.8995L3.80232 16.6648C3.75233 16.3492 3.75 15.9577 3.75 15H2.25ZM7.33515 20.1977C5.51661 19.9096 4.09035 18.4834 3.80232 16.6648L2.32079 16.8995C2.71048 19.3599 4.64012 21.2895 7.1005 21.6792L7.33515 20.1977ZM10 21.75C11.2936 21.75 12.4894 21.3219 13.4504 20.6L12.5496 19.4007C11.8393 19.9342 10.9576 20.25 10 20.25V21.75ZM10 3.75C10.9576 3.75 11.8393 4.06583 12.5496 4.59931L13.4504 3.39996C12.4894 2.67806 11.2936 2.25 10 2.25V3.75ZM7 12.75H20V11.25H7V12.75ZM16.534 8.58768L18.297 9.98553L19.2289 8.81016L17.466 7.41232L16.534 8.58768ZM18.297 14.0145L16.534 15.4123L17.466 16.5877L19.2289 15.1898L18.297 14.0145ZM18.297 9.98553C19.0143 10.5543 19.5012 10.9418 19.8289 11.2682C20.1532 11.5913 20.2225 11.7612 20.2395 11.8673L21.7208 11.6313C21.6294 11.0582 21.2932 10.6096 20.8875 10.2055C20.4852 9.80475 19.9176 9.35616 19.2289 8.81016L18.297 9.98553ZM19.2289 15.1898C19.9175 14.6438 20.4852 14.1953 20.8875 13.7945C21.2932 13.3904 21.6294 12.9418 21.7208 12.3687L20.2395 12.1327C20.2225 12.2388 20.1532 12.4087 19.8289 12.7318C19.5012 13.0582 19.0143 13.4457 18.297 14.0145L19.2289 15.1898ZM20.2395 11.8673C20.2465 11.9117 20.25 11.9559 20.25 12H21.75C21.75 11.8766 21.7402 11.7534 21.7208 11.6313L20.2395 11.8673ZM20.25 12C20.25 12.0441 20.2465 12.0883 20.2395 12.1327L21.7208 12.3687C21.7402 12.2466 21.75 12.1234 21.75 12H20.25ZM20 12.75H21V11.25H20V12.75Z" />
              </mask>
              <path
                d="M13.4504 20.6C13.7816 20.3513 13.8484 19.8811 13.5997 19.5499C13.3509 19.2187 12.8808 19.1519 12.5496 19.4007L13.4504 20.6ZM12.5496 4.59931C12.8808 4.84808 13.3509 4.78126 13.5997 4.45007C13.8484 4.11888 13.7816 3.64873 13.4504 3.39996L12.5496 4.59931ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75V11.25ZM17.466 7.41232C17.1414 7.15497 16.6697 7.20946 16.4123 7.53403C16.155 7.8586 16.2095 8.33034 16.534 8.58768L17.466 7.41232ZM16.534 15.4123C16.2095 15.6697 16.155 16.1414 16.4123 16.466C16.6697 16.7905 17.1414 16.845 17.466 16.5877L16.534 15.4123ZM10 20.25H9V21.75H10V20.25ZM3.75 15V9H2.25V15H3.75ZM9 3.75H10V2.25H9V3.75ZM3.75 9C3.75 8.04233 3.75233 7.65082 3.80232 7.33515L2.32079 7.1005C2.24767 7.56216 2.25 8.09965 2.25 9H3.75ZM9 2.25C8.09966 2.25 7.56216 2.24767 7.1005 2.32079L7.33515 3.80232C7.65082 3.75233 8.04233 3.75 9 3.75V2.25ZM3.80232 7.33515C4.09035 5.51661 5.51661 4.09035 7.33515 3.80232L7.1005 2.32079C4.64012 2.71048 2.71048 4.64012 2.32079 7.1005L3.80232 7.33515ZM9 20.25C8.04233 20.25 7.65082 20.2477 7.33515 20.1977L7.1005 21.6792C7.56216 21.7523 8.09965 21.75 9 21.75V20.25ZM2.25 15C2.25 15.9003 2.24767 16.4378 2.32079 16.8995L3.80232 16.6648C3.75233 16.3492 3.75 15.9577 3.75 15H2.25ZM7.33515 20.1977C5.51661 19.9096 4.09035 18.4834 3.80232 16.6648L2.32079 16.8995C2.71048 19.3599 4.64012 21.2895 7.1005 21.6792L7.33515 20.1977ZM10 21.75C11.2936 21.75 12.4894 21.3219 13.4504 20.6L12.5496 19.4007C11.8393 19.9342 10.9576 20.25 10 20.25V21.75ZM10 3.75C10.9576 3.75 11.8393 4.06583 12.5496 4.59931L13.4504 3.39996C12.4894 2.67806 11.2936 2.25 10 2.25V3.75ZM7 12.75H20V11.25H7V12.75ZM16.534 8.58768L18.297 9.98553L19.2289 8.81016L17.466 7.41232L16.534 8.58768ZM18.297 14.0145L16.534 15.4123L17.466 16.5877L19.2289 15.1898L18.297 14.0145ZM18.297 9.98553C19.0143 10.5543 19.5012 10.9418 19.8289 11.2682C20.1532 11.5913 20.2225 11.7612 20.2395 11.8673L21.7208 11.6313C21.6294 11.0582 21.2932 10.6096 20.8875 10.2055C20.4852 9.80475 19.9176 9.35616 19.2289 8.81016L18.297 9.98553ZM19.2289 15.1898C19.9175 14.6438 20.4852 14.1953 20.8875 13.7945C21.2932 13.3904 21.6294 12.9418 21.7208 12.3687L20.2395 12.1327C20.2225 12.2388 20.1532 12.4087 19.8289 12.7318C19.5012 13.0582 19.0143 13.4457 18.297 14.0145L19.2289 15.1898ZM20.2395 11.8673C20.2465 11.9117 20.25 11.9559 20.25 12H21.75C21.75 11.8766 21.7402 11.7534 21.7208 11.6313L20.2395 11.8673ZM20.25 12C20.25 12.0441 20.2465 12.0883 20.2395 12.1327L21.7208 12.3687C21.7402 12.2466 21.75 12.1234 21.75 12H20.25ZM20 12.75H21V11.25H20V12.75Z"
                fill="#2D264B"
              />
              <path
                d="M2.32079 16.8995L2.24256 16.4057L2.39899 17.3933L2.32079 16.8995ZM19.2289 8.81016L19.6207 9.12078L18.8371 8.49952L19.2289 8.81016ZM19.2289 15.1898L18.8371 15.5005L19.6207 14.8792L19.2289 15.1898ZM21.7208 11.6313L21.7995 12.1251L21.6421 11.1375L21.7208 11.6313ZM21.7208 12.3687L21.6421 12.8625L21.7995 11.8749L21.7208 12.3687ZM10.5 21V20.25H9.5V21H10.5ZM8.5 21V21.75H9.5V21H8.5ZM3 15.5H3.75V14.5H3V15.5ZM3 8.5H2.25V9.5H3V8.5ZM9.5 3V2.25H8.5V3H9.5ZM9.5 3V3.75H10.5V3H9.5ZM3.13978 6.72399L2.39901 6.60666L2.24257 7.59434L2.98334 7.71167L3.13978 6.72399ZM6.72399 3.13977L6.84131 3.88053L7.829 3.72411L7.71168 2.98335L6.72399 3.13977ZM6.72399 20.8602L6.60666 21.601L7.59435 21.7574L7.71168 21.0166L6.72399 20.8602ZM2.98336 16.2884L2.24259 16.4057L2.39899 17.3933L3.13976 17.276L2.98336 16.2884ZM12.1498 19.701L13.0506 20.9003L13.8502 20.2997L12.9494 19.1004L12.1498 19.701ZM13.0506 3.09969L12.1498 4.29904L12.9494 4.89959L13.8502 3.70024L13.0506 3.09969ZM7.5 12.75V11.25H6.5V12.75H7.5ZM19.5 12V12.75H20.5V12H19.5ZM16.9258 8.89834L17.8578 7.72298L17.0742 7.10166L16.1422 8.27702L16.9258 8.89834ZM19.1548 9.70847L19.6207 9.12078L18.8371 8.49954L18.3712 9.08724L19.1548 9.70847ZM18.3712 14.9128L18.8371 15.5004L19.6207 14.8792L19.1548 14.2916L18.3712 14.9128ZM17.8578 16.277L16.9258 15.1016L16.1422 15.723L17.0742 16.8984L17.8578 16.277ZM21.0588 12.2431L21.7995 12.1251L21.6421 11.1375L20.9014 11.2555L21.0588 12.2431ZM20.9014 12.7445L21.6421 12.8625L21.7995 11.8749L21.0588 11.7569L20.9014 12.7445ZM21 12.5H21.75V11.5H21V12.5ZM8.5 20.25V21.75H9.5V20.25H8.5ZM10.5 21.75V20.25H9.5V21.75H10.5ZM3.75 8.5H2.25V9.5H3.75V8.5ZM2.25 15.5H3.75V14.5H2.25V15.5ZM10.5 3.75V2.25H9.5V3.75H10.5ZM8.5 2.25V3.75H9.5V2.25H8.5ZM3.88054 6.84131L2.39901 6.60666L2.24257 7.59435L3.7241 7.82899L3.88054 6.84131ZM6.60666 2.39901L6.84131 3.88054L7.82899 3.7241L7.59435 2.24257L6.60666 2.39901ZM6.84131 20.1195L6.60666 21.601L7.59435 21.7574L7.82899 20.2759L6.84131 20.1195ZM2.39902 17.3933L3.88055 17.1586L3.72409 16.171L2.24256 16.4057L2.39902 17.3933ZM20.5 12.75V11.25H19.5V12.75H20.5ZM18.6888 10.2962L19.6207 9.1208L18.8371 8.49952L17.9052 9.67489L18.6888 10.2962ZM19.6207 14.8792L18.6888 13.7039L17.9052 14.3251L18.8371 15.5005L19.6207 14.8792ZM20.3182 12.3611L21.7995 12.1251L21.6421 11.1375L20.1608 11.3735L20.3182 12.3611ZM21.7995 11.8749L20.3182 11.6389L20.1608 12.6265L21.6421 12.8625L21.7995 11.8749ZM20.25 12.5H21.75V11.5H20.25V12.5ZM2.32079 7.1005L1.3331 6.94406L1.3331 6.94407L2.32079 7.1005ZM7.33515 3.80232L7.17874 2.81463L7.17872 2.81463L7.33515 3.80232ZM7.1005 21.6792L6.94406 22.6669L6.94411 22.6669L7.1005 21.6792ZM2.32079 16.8995L1.3331 17.0559L1.3331 17.0559L2.32079 16.8995ZM13.4504 20.6L12.8499 19.8003L12.8498 19.8005L13.4504 20.6ZM13.5997 19.5499L14.3994 18.9494L14.3992 18.9493L13.5997 19.5499ZM12.5496 19.4007L13.1502 20.2003L13.1502 20.2002L12.5496 19.4007ZM12.5496 4.59931L13.1502 3.79974L13.1501 3.79972L12.5496 4.59931ZM13.5997 4.45007L14.3992 5.0507L14.3993 5.05055L13.5997 4.45007ZM13.4504 3.39996L12.8498 4.1995L12.8498 4.19953L13.4504 3.39996ZM17.466 7.41232L18.0873 6.62875L18.0873 6.62872L17.466 7.41232ZM16.4123 7.53403L15.6288 6.91266L15.6287 6.91281L16.4123 7.53403ZM16.534 8.58768L15.9126 9.3712L15.9127 9.37126L16.534 8.58768ZM19.2289 8.81016L18.6076 9.59373L18.6077 9.59377L19.2289 8.81016ZM19.2289 15.1898L18.6076 14.4062L18.6076 14.4062L19.2289 15.1898ZM16.534 15.4123L15.9127 14.6287L15.9126 14.6288L16.534 15.4123ZM16.4123 16.466L15.6286 17.0872L15.6288 17.0875L16.4123 16.466ZM17.466 16.5877L18.0872 17.3714L18.0873 17.3713L17.466 16.5877ZM21.7208 11.6313L22.7084 11.4744L22.7083 11.4738L21.7208 11.6313ZM21.7208 12.3687L22.7083 12.5262L22.7084 12.5256L21.7208 12.3687ZM3.80232 7.33515L2.81463 7.17872L2.81463 7.17874L3.80232 7.33515ZM7.1005 2.32079L6.94407 1.3331L6.94406 1.3331L7.1005 2.32079ZM7.33515 20.1977L7.17868 21.1854L7.17871 21.1854L7.33515 20.1977ZM3.80232 16.6648L4.79001 16.5084L4.79001 16.5084L3.80232 16.6648ZM18.297 9.98553L18.9183 9.20197L18.9183 9.20195L18.297 9.98553ZM18.297 14.0145L18.9183 14.7981L18.9183 14.798L18.297 14.0145ZM19.8289 11.2682L20.5347 10.5598L20.5346 10.5597L19.8289 11.2682ZM20.2395 11.8673L21.2273 11.7116L21.2269 11.7091L20.2395 11.8673ZM20.8875 10.2055L20.1818 10.914L20.1818 10.914L20.8875 10.2055ZM20.8875 13.7945L20.1818 13.086L20.1817 13.0861L20.8875 13.7945ZM20.2395 12.1327L21.2269 12.2909L21.2273 12.2884L20.2395 12.1327ZM19.8289 12.7318L20.5346 13.4403L20.5347 13.4402L19.8289 12.7318ZM21 12.75V13.75H22V12.75H21ZM21 11.25H22V10.25H21V11.25ZM14.0509 21.3997C14.8239 20.8192 14.9795 19.7221 14.3994 18.9494L12.8 20.1504C12.7173 20.0401 12.7393 19.8834 12.8499 19.8003L14.0509 21.3997ZM14.3992 18.9493C13.8187 18.1765 12.7218 18.0206 11.949 18.6012L13.1502 20.2002C13.0398 20.2832 12.8831 20.2609 12.8002 20.1505L14.3992 18.9493ZM11.949 5.39888C12.7218 5.97936 13.8188 5.82338 14.3992 5.0507L12.8002 3.84944C12.883 3.73914 13.0398 3.7168 13.1502 3.79974L11.949 5.39888ZM14.3993 5.05055C14.9796 4.27783 14.8238 3.18087 14.051 2.60039L12.8498 4.19953C12.7394 4.1166 12.7172 3.95993 12.8001 3.8496L14.3993 5.05055ZM7 10.25C6.0335 10.25 5.25 11.0335 5.25 12H7.25C7.25 12.1381 7.13808 12.25 7 12.25V10.25ZM5.25 12C5.25 12.9665 6.0335 13.75 7 13.75V11.75C7.13808 11.75 7.25 11.8619 7.25 12H5.25ZM18.0873 6.62872C17.3299 6.02826 16.2293 6.15544 15.6288 6.91266L17.1958 8.1554C17.1101 8.26348 16.9529 8.28168 16.8447 8.19593L18.0873 6.62872ZM15.6287 6.91281C15.0283 7.67011 15.1555 8.77073 15.9126 9.3712L17.1554 7.80416C17.2635 7.88995 17.2817 8.0471 17.1959 8.15525L15.6287 6.91281ZM15.9126 14.6288C15.1555 15.2294 15.0283 16.3298 15.6286 17.0872L17.196 15.8448C17.2817 15.953 17.2635 16.1101 17.1555 16.1958L15.9126 14.6288ZM15.6288 17.0875C16.2294 17.8445 17.3298 17.9717 18.0872 17.3714L16.8448 15.804C16.953 15.7183 17.1101 15.7365 17.1958 15.8445L15.6288 17.0875ZM10 19.25H9V21.25H10V19.25ZM9 22.75H10V20.75H9V22.75ZM4.75 15V9H2.75V15H4.75ZM1.25 9V15H3.25V9H1.25ZM9 4.75H10V2.75H9V4.75ZM10 1.25H9V3.25H10V1.25ZM4.75 9C4.75 8.00231 4.75549 7.70955 4.79001 7.49156L2.81463 7.17874C2.74917 7.59209 2.75 8.08235 2.75 9H4.75ZM1.3331 6.94407C1.24462 7.50273 1.25 8.13634 1.25 9H3.25C3.25 8.06296 3.25072 7.62159 3.30848 7.25694L1.3331 6.94407ZM9 1.25C8.13635 1.25 7.50273 1.24462 6.94407 1.3331L7.25694 3.30848C7.62159 3.25072 8.06297 3.25 9 3.25V1.25ZM7.49156 4.79001C7.70955 4.75549 8.00231 4.75 9 4.75V2.75C8.08235 2.75 7.59209 2.74917 7.17874 2.81463L7.49156 4.79001ZM4.79001 7.49159C5.01027 6.10094 6.10094 5.01027 7.49159 4.79001L7.17872 2.81463C4.93228 3.17043 3.17043 4.93228 2.81463 7.17872L4.79001 7.49159ZM6.94406 1.3331C4.05579 1.79056 1.79056 4.05579 1.3331 6.94406L3.30848 7.25694C3.6304 5.22445 5.22445 3.6304 7.25694 3.30848L6.94406 1.3331ZM9 19.25C8.00224 19.25 7.70955 19.2445 7.49159 19.21L7.17871 21.1854C7.5921 21.2509 8.08243 21.25 9 21.25V19.25ZM6.94411 22.6669C7.50274 22.7553 8.13628 22.75 9 22.75V20.75C8.06302 20.75 7.62159 20.7493 7.25689 20.6915L6.94411 22.6669ZM1.25 15C1.25 15.8636 1.24462 16.4972 1.3331 17.0559L3.30848 16.7431C3.25072 16.3784 3.25 15.937 3.25 15H1.25ZM4.79001 16.5084C4.75549 16.2905 4.75 15.9977 4.75 15H2.75C2.75 15.9177 2.74917 16.4079 2.81463 16.8212L4.79001 16.5084ZM7.49162 19.21C6.10093 18.9897 5.01027 17.8991 4.79001 16.5084L2.81463 16.8212C3.17043 19.0677 4.93229 20.8295 7.17868 21.1854L7.49162 19.21ZM1.3331 17.0559C1.79057 19.9442 4.0558 22.2094 6.94406 22.6669L7.25694 20.6915C5.22444 20.3696 3.6304 18.7756 3.30848 16.7431L1.3331 17.0559ZM10 22.75C11.5176 22.75 12.9228 22.247 14.051 21.3995L12.8498 19.8005C12.056 20.3968 11.0696 20.75 10 20.75V22.75ZM11.949 18.6011C11.406 19.009 10.7337 19.25 10 19.25V21.25C11.1815 21.25 12.2726 20.8594 13.1502 20.2003L11.949 18.6011ZM10 4.75C10.7337 4.75 11.406 4.99103 11.9491 5.3989L13.1501 3.79972C12.2726 3.14063 11.1815 2.75 10 2.75V4.75ZM14.051 2.60042C12.9228 1.7529 11.5176 1.25 10 1.25V3.25C11.0696 3.25 12.056 3.60322 12.8498 4.1995L14.051 2.60042ZM7 13.75H20V11.75H7V13.75ZM20 10.25H7V12.25H20V10.25ZM15.9127 9.37126L17.6757 10.7691L18.9183 9.20195L17.1553 7.8041L15.9127 9.37126ZM19.8502 8.02659L18.0873 6.62875L16.8447 8.19589L18.6076 9.59373L19.8502 8.02659ZM17.6757 13.2309L15.9127 14.6287L17.1553 16.1959L18.9183 14.7981L17.6757 13.2309ZM18.0873 17.3713L19.8502 15.9734L18.6076 14.4062L16.8447 15.8041L18.0873 17.3713ZM17.6757 10.7691C18.4127 11.3535 18.8453 11.6999 19.1232 11.9767L20.5346 10.5597C20.1571 10.1837 19.6159 9.75513 18.9183 9.20197L17.6757 10.7691ZM19.1231 11.9766C19.1862 12.0395 19.2295 12.0875 19.2584 12.1223C19.2873 12.1572 19.2991 12.1754 19.3011 12.1786C19.3027 12.1811 19.2934 12.1666 19.2817 12.1367C19.2692 12.1045 19.2586 12.0664 19.2521 12.0255L21.2269 11.7091C21.1601 11.2925 20.9134 10.9371 20.5347 10.5598L19.1231 11.9766ZM22.7083 11.4738C22.5673 10.5896 22.0533 9.95528 21.5932 9.497L20.1818 10.914C20.5331 11.2639 20.6915 11.5268 20.7333 11.7888L22.7083 11.4738ZM21.5932 9.49703C21.1413 9.04682 20.5202 8.55778 19.8501 8.02655L18.6077 9.59377C19.315 10.1545 19.8291 10.5627 20.1818 10.914L21.5932 9.49703ZM19.8502 15.9734C20.52 15.4423 21.1413 14.9532 21.5933 14.5029L20.1817 13.0861C19.8291 13.4374 19.315 13.8453 18.6076 14.4062L19.8502 15.9734ZM21.5932 14.503C22.0533 14.0447 22.5673 13.4104 22.7083 12.5262L20.7333 12.2112C20.6915 12.4732 20.5331 12.7361 20.1818 13.086L21.5932 14.503ZM19.2521 11.9745C19.2586 11.9336 19.2692 11.8955 19.2817 11.8633C19.2934 11.8334 19.3027 11.8189 19.3011 11.8215C19.2991 11.8246 19.2873 11.8428 19.2584 11.8777C19.2295 11.9125 19.1862 11.9605 19.1231 12.0234L20.5347 13.4402C20.9134 13.0629 21.1601 12.7075 21.2269 12.2909L19.2521 11.9745ZM19.1232 12.0233C18.8453 12.3001 18.4127 12.6465 17.6757 13.231L18.9183 14.798C19.6159 14.2449 20.1571 13.8163 20.5346 13.4403L19.1232 12.0233ZM19.2517 12.023C19.2507 12.017 19.25 12.0091 19.25 12H21.25C21.25 11.9027 21.2423 11.8064 21.2273 11.7116L19.2517 12.023ZM22.75 12C22.75 11.8236 22.736 11.6479 22.7084 11.4744L20.7332 11.7882C20.7444 11.8589 20.75 11.9296 20.75 12H22.75ZM19.25 12C19.25 11.9909 19.2507 11.983 19.2517 11.977L21.2273 12.2884C21.2423 12.1936 21.25 12.0973 21.25 12H19.25ZM22.7084 12.5256C22.736 12.3521 22.75 12.1764 22.75 12H20.75C20.75 12.0704 20.7444 12.1411 20.7332 12.2118L22.7084 12.5256ZM20 13.75H21V11.75H20V13.75ZM22 12.75V11.25H20V12.75H22ZM21 10.25H20V12.25H21V10.25Z"
                fill="#DC3545"
                mask="url(#path-1-inside-1_18_12)"
              />
            </svg>

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
    fetch(`${mainUrlApi}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((adminInfo) => setAdminInfo(adminInfo));
  };
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
