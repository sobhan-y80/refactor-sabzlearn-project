import React from "react";

import "./ContactUs.css";

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

const ContactUs = () => {
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  console.log(formState);
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

        <div className="grid grid-cols-12 w-full px-5">
          <div className="col-span-12 md:col-span-6 my-5 md:my-0">
            {/* <!-- Start Title Contact Us --> */}
            <div className="main__contact-us h-full text-center md:text-right">
              <div className="w-full px-10">
                <div className="main-header__logo">
                  <div className="header-main__logo-text-wrapper">
                    <span className="header-main__logo-text main__contact-us__logo-text">
                      L
                    </span>
                    <span className="header-main__logo-text main__contact-us__logo-text">
                      E
                    </span>
                    <span className="header-main__logo-text main__contact-us__logo-text">
                      G
                    </span>
                    <span className="header-main__logo-text main__contact-us__logo-text">
                      O
                    </span>
                  </div>
                </div>
                <div className="main__contact-us__title-wrapper">
                  <h1 className="main__contact-us__title">
                    درباره ی پروژت سوال داری !! <br />
                    خوشحال میشیم کمکت کنیم
                  </h1>
                </div>
                <div className="main__contact-us__footer">
                  <div className="main__contact-us__email-wrapper">
                    <a href="#" className="main__contact-us__email-link">
                      soobhanybi@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Finish Title Contact Us --> */}
          </div>
          <div className="col-span-12 md:col-span-6 my-5 md:my-0">
            {/* <!-- Start Login User  --> */}
            <div className="login-form w-full">
              <div className="w-full flex items-center justify-center">
                <div className="login-form__box w-full md:w-[80%]">
                  <div className="login-form__title-wrapper mb-5">
                    <h2 className="login-form__title">ارتباط با ما</h2>
                    <h4 className="login-form__subtitle">
                      سوالی و نظری چیزی داری اینجا با ما درمیون بزار ;)
                    </h4>
                  </div>
                  <div className="login-form__box-inputs">
                    <InputBox
                      id={`username`}
                      placeHolder={null}
                      onInputHandler={onInputHandler}
                      validations={[requiredValidatior()]}
                    >
                      ایمیل
                      <span className="hpc__space-word">یا</span>
                      شماره تلفن
                    </InputBox>

                    <InputBox
                      id={`message`}
                      type="textarea"
                      placeHolder={`حرف دلت :) `}
                      validations={[requiredValidatior]}
                      onInputHandler={onInputHandler}
                    ></InputBox>
                  </div>
                  <button id="send-message-btn" className="login-form__submit">
                    ارسال شو
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Finish Login User  --> */}
          </div>
        </div>
      </div>
      {/* <!-- Finish Main --> */}
      <Footer></Footer>
    </>
  );
};

export default ContactUs;
