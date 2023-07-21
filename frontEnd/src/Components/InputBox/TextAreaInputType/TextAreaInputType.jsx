import React from "react";

const TextAreaInputType = ({
  mode,
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
      <div className="login-form__input-box login-form__textarea-box">
        <textarea
          onChange={(e) => onChange(e)}
          onFocus={(e) => focusHandler(e)}
          onBlur={(e) => blurHandler(e)}
          id="login-form__textarea-input"
          value={value}
          className={`input-box__input login-form__textarea ${className}`}
        ></textarea>
        <label
          htmlFor="login-form__textarea-input"
          className="input-box__placeholder"
        >
          {placeholder ? placeholder : children}
        </label>
        <i
          className={`input-box__shape  ${
            mode === "dark-input" ? "bg-[#242532]" : ""
          }`}
        ></i>
      </div>
    </>
  );
};

export default TextAreaInputType;
