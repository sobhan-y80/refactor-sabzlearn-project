import React, { useEffect, useReducer, useRef, useState } from "react";
import validator from "./Validation/Validation";

import "./InputBox.css";

import PasswordInputType from "./PasswordInputType/PasswordInputType";
import TextAreaInputType from "./TextAreaInputType/TextAreaInputType";
import FileInputType from "./FileInputType/FileInputType";
import EmailInputType from "./EmailInputType/EmailInputType";

const inputReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "CHANGE":
      {
        // console.log(action.validation);
        return {
          ...state,
          value: action.value,
          isValid:
            action.validation && validator(action.value, action.validation),
        };
      }
      break;

    default:
      break;
  }
};

const InputBox = ({
  id,
  type,
  placeHolder,
  children,
  validations,
  onInputHandler,
}) => {
  // console.log(validations);

  const inputFocusHandler = (e) => {
    e.target.classList.add("active");
  };
  const inputBlurHandler = (e) => {
    !mainInput.value && e.target.classList.remove("active");
  };

  const [mainInput, dipatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;

  useEffect(() => {
    console.log(id);
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (e) => {
    dipatch({
      type: "CHANGE",
      value: e.target.value,
      isValid: true,
      validation: validations,
    });
  };

  // ------------------- Fix File Left Behind -------------------

  if (type === "password") {
    return (
      <PasswordInputType
        placeholder={placeHolder}
        children={children}
        focusHandler={inputFocusHandler}
        blurHandler={inputBlurHandler}
        onChange={(e) => onChangeHandler(e)}
        value={mainInput.value}
        className={`${mainInput.value ? "active" : ""} ${
          mainInput.isValid ? "success" : "err"
        }`}
      ></PasswordInputType>
    );
  } else if (type === "textarea") {
    return (
      <TextAreaInputType
        placeholder={placeHolder}
        children={children}
        onChange={(e) => onChangeHandler(e)}
        focusHandler={inputFocusHandler}
        blurHandler={inputBlurHandler}
        value={mainInput.value}
        className={`${mainInput.value ? "active" : ""} ${
          mainInput.isValid ? "success" : "err"
        }`}
      ></TextAreaInputType>
    );
  } else if (type === "file") {
    return (
      <FileInputType
        placeholder={placeHolder}
        focusHandler={inputFocusHandler}
        blurHandler={inputBlurHandler}
      ></FileInputType>
    );
  } else if (type === "email") {
    return (
      <EmailInputType
        placeholder={`ایمیل`}
        onChange={(e) => onChangeHandler(e)}
        blurHandler={inputBlurHandler}
        focusHandler={inputFocusHandler}
        children={children}
        value={mainInput.value}
        className={`input-box__input ${mainInput.value ? "active" : ""} ${
          mainInput.isValid ? "success" : "err"
        }`}
      ></EmailInputType>
    );
  } else {
    return (
      <div className="login-form__input-box">
        <input
          onFocus={(e) => inputFocusHandler(e)}
          onBlur={(e) => inputBlurHandler(e)}
          onChange={(e) => onChangeHandler(e)}
          id={id}
          type="text"
          value={mainInput.value}
          className={`input-box__input ${mainInput.value ? "active" : ""} ${
            mainInput.isValid ? "success" : "err"
          }`}
          autoComplete="off"
        />
        <span className="input-box__placeholder">
          {placeHolder ? placeHolder : children}
        </span>
        <i className="input-box__shape"></i>
      </div>
    );
  }
};

export default InputBox;
