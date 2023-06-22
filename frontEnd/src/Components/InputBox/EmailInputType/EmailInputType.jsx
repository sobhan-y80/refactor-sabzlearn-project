import React, { useState } from "react";

const EmailInputType = ({
  onChange,
  focusHandler,
  blurHandler,
  placeholder,
  children,
  value,
  className,
}) => {
  return (
    <>
      <div className="login-form__input-box">
        <input
          onChange={(e) => onChange(e)}
          onFocus={(e) => focusHandler(e)}
          onBlur={(e) => blurHandler(e)}
          value={value}
          id="login-form__email-input"
          type="email"
          className={`input-box__input ${className}`}
          autoComplete="off"
        />
        <span className="input-box__placeholder">
          {placeholder ? placeholder : children}
        </span>
        <i className="input-box__shape"></i>
      </div>
    </>
  );
};

export default EmailInputType;
