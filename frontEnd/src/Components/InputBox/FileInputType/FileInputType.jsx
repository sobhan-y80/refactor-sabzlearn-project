import React from "react";

const FileInputType = ({ mode, onChange, onInputHandel }) => {
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
            onChange={(e) => {
              onChange(e);
              onInputHandel(e);
            }}
            accept="image/*"
            title="فایل خود را انتخاب کنید"
            type="file"
            className="input-box__input login-form__file-input"
            id="login-form__file-input"
            required
          />
        </label>
      </div>
    </>
  );
};

export default FileInputType;
