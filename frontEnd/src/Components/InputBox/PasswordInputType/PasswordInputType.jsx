import React, { useEffect, useState } from "react";

const PasswordInputType = ({
  mode,
  focusHandler,
  blurHandler,
  placeholder,
  children,
  onChange,
  value,
  className,
}) => {
  const [isPassShow, setIsPassShow] = useState(false);
  const showPassHandler = () => {
    setIsPassShow((prev) => !prev);
  };

  return (
    <>
      <div className="login-form__input-box">
        <input
          onFocus={(e) => focusHandler(e)}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => onChange(e)}
          id="login-form__password-input"
          value={value}
          type={isPassShow ? "password" : "text"}
          className={`input-box__input ${className}`}
          autoComplete="off"
        />
        <button
          id="showPassInput"
          className="password-box__btn"
          onClick={showPassHandler}
        >
          {isPassShow ? (
            <svg
              className="password-box__svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.15"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                  fill="#43c67a"
                />
                <path
                  d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                  stroke="#43c67a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="#43c67a"
                  stroke-width="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          ) : (
            <svg
              className="password-box__svg"
              fill="#43c67a"
              width="800px"
              height="800px"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#43c67a"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g opacity="0.2">
                  <path d="M128,56C48,56,16,128.00781,16,128.00781S48,200,128,200s112-71.99219,112-71.99219S208,56,128,56Zm0,112.0083a40,40,0,1,1,40-40A40.0001,40.0001,0,0,1,128,168.0083Z" />
                </g>
                <g>
                  <path d="M53.91992,34.6178A8.0006,8.0006,0,1,0,42.08008,45.38147L61.31689,66.54211C24.99927,88.83313,9.385,123.18664,8.68945,124.75061a8.00282,8.00282,0,0,0,0,6.49805c.35157.791,8.82032,19.57226,27.6543,38.40429C61.42773,194.734,93.12207,207.99182,128,207.99182a126.97057,126.97057,0,0,0,52.061-10.831l22.019,24.2207a8.0006,8.0006,0,0,0,11.83984-10.76367ZM101.24609,110.464l41.67359,45.84131A31.98764,31.98764,0,0,1,101.24609,110.464ZM128,191.99182c-30.78027,0-57.67383-11.18555-79.93457-33.24609A133.45825,133.45825,0,0,1,24.94824,127.9928c4.69385-8.78858,19.66309-33.38575,47.34424-49.37793L90.25366,98.37219a47.98664,47.98664,0,0,0,63.65845,70.02442L168.6333,184.59A111.979,111.979,0,0,1,128,191.99182Z" />
                  <path d="M247.31055,124.75061c-.35157-.79-8.81934-19.57617-27.65332-38.41113C194.57324,61.25256,162.87793,47.99182,128,47.99182a133.88152,133.88152,0,0,0-22.001,1.794A8,8,0,0,0,108.63574,65.567,117.88187,117.88187,0,0,1,128,63.99182c30.7793,0,57.67383,11.18848,79.93457,33.25391a133.43711,133.43711,0,0,1,23.11231,30.752,133.619,133.619,0,0,1-27.7754,35.14258,8.00016,8.00016,0,0,0,10.67579,11.918c22.81543-20.43555,32.94336-42.86426,33.36328-43.80957A8.00282,8.00282,0,0,0,247.31055,124.75061Z" />
                  <path d="M159.85938,124.9801a8.00191,8.00191,0,0,0,7.95605,7.25781c.249,0,.501-.01171.75293-.03515a8.00157,8.00157,0,0,0,7.22266-8.709,48.17365,48.17365,0,0,0-38.76661-42.64453,7.99973,7.99973,0,0,0-2.99414,15.7168A32.09805,32.09805,0,0,1,159.85938,124.9801Z" />
                </g>
              </g>
            </svg>
          )}
        </button>
        <span className="input-box__placeholder">
          {placeholder ? placeholder : children}
        </span>
        <i
          className={`input-box__shape  ${
            mode === "dark-input" ? "bg-[#242532]" : ""
          }`}
        ></i>
      </div>
    </>
  );
};

export default PasswordInputType;
