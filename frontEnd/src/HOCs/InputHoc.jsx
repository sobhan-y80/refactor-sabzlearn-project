import React from "react";

const InputHoc = ({ OrginalComponents }) => {
  function NewComponentss() {
    // const checkInputActive = () => {
    //   const formInputs = document.querySelectorAll(".input-box__input");
    //   formInputs.forEach((input) => {
    //     if (!input.value) {
    //       input.classList.remove("active");
    //     }
    //   });
    // };
    console.log("InputHoc");

    return <OrginalComponents></OrginalComponents>;
  }

  return NewComponentss;
};

export default InputHoc;
