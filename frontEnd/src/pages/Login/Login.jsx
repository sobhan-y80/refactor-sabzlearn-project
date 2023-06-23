import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import InputBox from "../../Components/InputBox/InputBox";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import {
  requiredValidatior,
  maxValidator,
  emailValidator,
  minValidator,
} from "../../Components/InputBox/Validation/Rules";

import { useForm } from "../../Hooks/useForm";
import { mainUrl } from "../../Utils/Utils";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const [formState, onInputHandler] = useForm(
    {
      identifier: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authContext = useContext(AuthContext);

  console.log(formState);

  const loginMeHandler = () => {
    //   console.log(formState);
    if (formState.isFormValid) {
      const mainNewUserObj = {
        identifier: formState.inputs.identifier.value,
        password: formState.inputs.password.value,
      };

      fetch(`${mainUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainNewUserObj),
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("مشخصاتی که دادی جدید هستن");
          } else {
            toast.success("خوش برگشتییی ;-))");
            return res.json();
          }
        })
        .then((data) => {
          console.log("lets gooooo", data.accessToken);
          authContext.login({}, data.accessToken);
        })
        .catch((err) => {
          // console.log(err);
          toast.error("خطا در ورود به سایت :((");
        });
    } else {
      toast.error("لطفا اطلاعات رو به درستی پر کن");
    }
  };

  return (
    <>
      <Header></Header>
      {/* <!-- Start Main --> */}
      <div className="main">
        {/* <!-- Start Animation Shape --> */}
        <div className="animation-shape">
          <div className="animation-shape__circle"></div>
          <div className="animation-shape__circle"></div>
        </div>
        {/* <!-- Finsih Animation Shape --> */}

        {/* <!-- Start Login User  --> */}
        <div className="login-form hpc__section w-full">
          <div className="w-full px-10 flex items-center justify-center">
            <div className="login-form__box w-full max-w-3xl">
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
                <NavLink
                  to="/Register"
                  className="login-form__change-form-stutus-link hpc__popular"
                >
                  ثبت نام
                </NavLink>
              </div>
              <div className="login-form__box-inputs">
                <InputBox
                  id={`identifier`}
                  placeHolder={`نام کاربری`}
                  onInputHandler={onInputHandler}
                  validations={[requiredValidatior()]}
                ></InputBox>

                <InputBox
                  id={`password`}
                  type="password"
                  placeHolder={`رمزعبور`}
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidatior(),
                    minValidator(10),
                    maxValidator(20),
                  ]}
                ></InputBox>
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
              <button
                id="login-btn"
                className="login-form__submit"
                onClick={loginMeHandler}
              >
                وارد شوید
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Finish Login User  --> */}
      </div>
      {/* <!-- Finish Main --> */}
      <Footer></Footer>
      <Toaster></Toaster>
    </>
  );
};

export default Login;
