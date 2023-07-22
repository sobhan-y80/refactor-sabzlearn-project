import React, { useEffect, useRef, useState } from "react";

const FileInputType = ({ mode, onChange, onInputHandel, typeFile = null }) => {
  const [typeMode, setTypeMode] = useState();

  useEffect(() => {
    switch (typeFile) {
      case "VIDEO":
        {
          setTypeMode("video/*");
        }
        break;

      default:
        {
          setTypeMode("image/*");
        }
        break;
    }
  }, []);
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
            accept={typeMode}
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
