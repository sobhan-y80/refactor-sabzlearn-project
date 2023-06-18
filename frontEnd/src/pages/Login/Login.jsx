import React from "react";
import "./Login.css";
import InputBox from "../../Components/InputBox/InputBox";

const Login = () => {
  return (
    <>
      {/* <!-- Start Main --> */}
      <div className="main">
        {/* <!-- Start Animation Shape --> */}
        <div className="animation-shape">
          <div className="animation-shape__circle"></div>
          <div className="animation-shape__circle"></div>
        </div>
        {/* <!-- Finsih Animation Shape --> */}

        {/* <!-- Start Login User  --> */}
        <div className="login-form hpc__section w-100">
          <div className="container d-flex justify-content-center">
            <div className="login-form__box">
              <div className="login-form__title-wrapper">
                <h2 className="login-form__title">ورود</h2>
                <h4 className="login-form__subtitle">
                  خوشحالم از اینکه دوباره میبنمت دوست عزیز :))
                </h4>
              </div>
              <div className="login-form__change-form-stutus">
                <span className="login-form__change-form-stutus-text">
                  قبلا ثبت نام نکرده اید !؟
                </span>
                <a
                  href="register.html"
                  className="login-form__change-form-stutus-link hpc__popular"
                >
                  ثبت نام
                </a>
              </div>
              <div className="login-form__box-inputs">
                <InputBox></InputBox>
                {/* <InputBox type="password"></InputBox>
                <InputBox type="textarea"></InputBox>
                <InputBox type="file"></InputBox> */}
              </div>
              <div className="login-form__password-setting">
                <div className="login-form__password-remember-me">
                  <input
                    id="login-form__remember-me-input"
                    type="checkbox"
                    className="login-form__remember-me-input"
                  />
                  <label
                    htmlFor="login-form__remember-me-input"
                    className="login-form__remember-me-label"
                  >
                    من را به خاطر داشته باش
                  </label>
                </div>
                <div className="login-form__password-forgot">
                  <a
                    href="#"
                    className="login-form__password-forgot__link animate__animated animate__flash animate__infinite"
                  >
                    رمز خود را فراموش کرده اید !!؟
                  </a>
                </div>
              </div>
              <button id="login-btn" className="login-form__submit">
                وارد شوید
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Finish Login User  --> */}
      </div>
      {/* <!-- Finish Main --> */}
    </>
  );
};

export default Login;
