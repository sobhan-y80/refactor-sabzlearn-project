import React, { useEffect, useState } from "react";

const PasswordInputType = ({
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
          <img
            id="password-login__icon"
            src={`${
              isPassShow
                ? "images/login/eye-open.svg"
                : "images/login/eye-close.svg"
            }`}
            className="password-box__svg"
            alt=""
          />
        </button>
        <span className="input-box__placeholder">
          {placeholder ? placeholder : children}
        </span>
        <i className="input-box__shape"></i>
      </div>
    </>
  );
};

export default PasswordInputType;
