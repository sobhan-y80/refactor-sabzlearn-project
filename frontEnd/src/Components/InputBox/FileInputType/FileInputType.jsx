import React from "react";

const FileInputType = ({ mode }) => {
  return (
    <>
      <div className="login-form__input-box">
        <label
          htmlFor="login-form__file-input"
          className={`login-form__drop-wrapper ${
            mode === "dark-input" ? "bg-[#242532]" : ""
          }`}
        >
          <input
            onFocus={(e) => focusHandler(e)}
            onBlur={(e) => blurHandler(e)}
            title="فایل خود را انتخاب کنید"
            type="file"
            className="input-box__input login-form__file-input"
            id="login-form__file-input"
            accept="image/*"
            required
          />
        </label>
      </div>
    </>
  );
};

export default FileInputType;
