import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import InputBox from "../../Components/InputBox/InputBox";
import toast, { Toaster } from "react-hot-toast";

import {
  requiredValidatior,
  maxValidator,
  emailValidator,
  minValidator,
} from "../../Components/InputBox/Validation/Rules";

import { useForm } from "../../Hooks/useForm";
import { mainUrl } from "../../Utils/Utils";

const Register = () => {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phoneNumber: {
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

  const RegisterNewUser = () => {
    console.log(formState);
    if (formState.isFormValid) {
      const mainNewUserObj = {
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.password.value,
        name: formState.inputs.name.value,
        phone: formState.inputs.phoneNumber.value,
      };

      console.log(mainNewUserObj);
      console.log(`${mainUrl}/auth/register`);

      fetch(`${mainUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainNewUserObj),
      })
        .then((res) => {
          console.log(res);
          res.json();
        })
        .then((data) => {
          console.log(data);
        });
    } else {
      toast.error("اطلاعات درست نیست !!");
    }
  };

  // console.log(formState);
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
                <h2 className="login-form__title">ثبت نام</h2>
                <h4 className="login-form__subtitle">
                  خوش اومدی
                  <br />
                  از اینکه به جمعمون میپیوندی خوشحالیم :))
                </h4>
              </div>
              <div className="login-form__change-form-stutus">
                <span className="login-form__change-form-stutus-text">
                  قبلا اکانت ساختی !!؟
                </span>
                <a
                  href="login.html"
                  className="login-form__change-form-stutus-link hpc__popular"
                >
                  ورود
                </a>
              </div>
              <div className="login-form__box-inputs">
                {/* <!-- Start Name --> */}
                <InputBox
                  id={`name`}
                  type="text"
                  placeHolder={null}
                  validations={[
                    requiredValidatior(),
                    minValidator(10),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                >
                  نام کاربری
                  <span className="hpc__space-word">یا</span>
                  ایمیل
                </InputBox>
                {/* <!-- Finish Name --> */}

                {/* <!-- Start Username --> */}
                <InputBox
                  id={`username`}
                  placeHolder={`نام کاربری`}
                  validations={[
                    requiredValidatior(),
                    minValidator(5),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                ></InputBox>
                {/* <!-- Finish Username --> */}

                {/* <!-- Start Email --> */}
                <InputBox
                  id={`email`}
                  type="email"
                  placeHolder={`ایمیل`}
                  validations={[
                    requiredValidatior(),
                    emailValidator(),
                    minValidator(10),
                  ]}
                  onInputHandler={onInputHandler}
                ></InputBox>
                {/* <!-- Finish Email --> */}

                {/* <!-- Start Phone Number --> */}
                <InputBox
                  id={`phoneNumber`}
                  placeHolder={`شماره تلفن`}
                  validations={[
                    requiredValidatior(),
                    minValidator(10),
                    maxValidator(12),
                  ]}
                  onInputHandler={onInputHandler}
                ></InputBox>
                {/* <!-- Finish Phone Number --> */}

                {/* <!-- Start Password --> */}
                <InputBox
                  id={`password`}
                  type="password"
                  placeHolder={`رمزعبور`}
                  validations={[
                    requiredValidatior(),
                    minValidator(10),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                ></InputBox>

                {/* <!-- Finish Password --> */}
              </div>
              <div className="login-form__password-setting">
                <div className="login-form__password-remember-me">
                  <input
                    id="login-form__remember-me-password"
                    type="checkbox"
                    className="login-form__remember-me-input"
                  />
                  <label
                    htmlFor="login-form__remember-me-password"
                    className="login-form__remember-me-label animate__animated animate__flash animate__infinite"
                  >
                    من را به خاطر داشته باش
                  </label>
                </div>
              </div>
              <button
                onClick={RegisterNewUser}
                className="login-form__submit"
                id="register-btn"
              >
                ثبت نام
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

export default Register;
