import React from "react";
import InputHoc from "../../HOCs/InputHoc";

const InputBox = () => {
  const checkInputActive = () => {
    const formInputs = document.querySelectorAll(".input-box__input");
    formInputs.forEach((input) => {
      if (!input.value) {
        input.classList.remove("active");
      }
    });
  };

  //   if (type === "password") {
  //     return (
  //       <div className="login-form__input-box">
  //         <input
  //           id="login-form__password-input"
  //           type="password"
  //           className="input-box__input"
  //           autoComplete="off"
  //         />
  //         <button id="showPassInput" className="password-box__btn">
  //           <img
  //             id="password-login__icon"
  //             src="images/login/eye-close.svg"
  //             className="password-box__svg"
  //             alt=""
  //           />
  //         </button>
  //         <span className="input-box__placeholder">رمز عبور</span>
  //         <i className="input-box__shape"></i>
  //       </div>
  //     );
  //   } else if (type === "textarea") {
  //     return (
  //       <div className="login-form__input-box login-form__textarea-box">
  //         <textarea
  //           id="login-form__textarea-input"
  //           className="input-box__input login-form__textarea"
  //         ></textarea>
  //         <span className="input-box__placeholder"> حرف دلت :) </span>
  //         <i className="input-box__shape"></i>
  //       </div>
  //     );
  //   } else if (type === "file") {
  //     return (
  //       <div className="login-form__input-box">
  //         <label
  //           htmlFor="login-form__file-input"
  //           className="login-form__drop-wrapper"
  //         >
  //           <span className="drop-title">فایل رو دراپ کن</span>
  //           یا
  //           <input
  //             title="فایل خود را انتخاب کنید"
  //             type="file"
  //             className="input-box__input login-form__file-input"
  //             id="login-form__file-input"
  //             accept="image/*"
  //             required
  //           />
  //         </label>
  //       </div>
  //     );
  //   } else {
  return (
    <div className="login-form__input-box">
      <input
        onClick={clickHandler}
        id="login-form__username-input"
        type="text"
        className="input-box__input"
        autoComplete="off"
      />
      <span className="input-box__placeholder">
        نام کاربری
        <span className="hpc__space-word">یا</span>
        ایمیل
      </span>
      <i className="input-box__shape"></i>
    </div>
  );
  //   }
};

export default InputHoc(InputBox);
