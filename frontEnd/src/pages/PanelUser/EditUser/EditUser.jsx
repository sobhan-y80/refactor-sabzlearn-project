import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import InputBox from "../../../Components/InputBox/InputBox";
import {
  emailValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import { Toaster, toast } from "react-hot-toast";
import { mainUrlApi } from "../../../Utils/Utils";
createdAt: "2023-07-10T17:59:56.458Z";
email: "mahtab@gmail.com";
name: "mahtab moradi";
notifications: [];
phone: "09491313123";
role: "USER";
updatedAt: "2023-07-10T17:59:56.458Z";
username: "mahtab";
function EditUser() {
  const [mainUserInfo, setMainUserInfo] = useState();
  const authContext = useContext(AuthContext);
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: authContext.userInfo.name,
        isValid: false,
      },
      username: {
        value: authContext.userInfo.username,
        isValid: false,
      },
      email: {
        value: authContext.userInfo.email,
        isValid: false,
      },
      phoneNumber: {
        value: authContext.userInfo.phone,
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const updateAction = () => {
    let newUserInfoObj;
    const isValueSame = () => {
      const mainUserInfoObj = {
        name: authContext.userInfo.name,
        username: authContext.userInfo.username,
        email: authContext.userInfo.email,
        phone: authContext.userInfo.phone,
      };

      newUserInfoObj = {
        name: formState.inputs.name.value.trim(),
        username: formState.inputs.username.value.trim(),
        email: formState.inputs.email.value.trim(),
        phone: formState.inputs.phoneNumber.value.trim(),
      };

      return Object.keys(mainUserInfoObj).every(
        (key) =>
          newUserInfoObj.hasOwnProperty(key) &&
          newUserInfoObj[key] === mainUserInfoObj[key]
      );
    };

    if (!isValueSame()) {
      if (formState.inputs.password.isValid) {
        // go Action
        newUserInfoObj.password = formState.inputs.password.value.trim();

        const localStorageData = JSON.parse(localStorage.getItem("token"));

        fetch(`${mainUrlApi}/users`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserInfoObj),
        }).then((res) => {
          if (res.status === 200) {
            toast.success("اطلاعات با موفقیت آپدیت شدند");
            window.location.reload();
          }
        });
      } else {
        toast.error("پسوردت جدیدت رو وارد نکردی");
      }
    } else {
      toast.error("اطلاعات که تغییری نکردن :/");
    }
  };

  if (Object.keys(authContext.userInfo).length) {
    return (
      <>
        <div className="hpc__part-section">
          <h2 className="panel-home__title">ویرایش اطلاعات</h2>
          <div className="login-form__box-inputs my-14">
            <div className="grid gap-5 grid-cols-12">
              <div className="col-span-12 grid gap-5 grid-cols-12">
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    inputDefaultValue={authContext.userInfo.name}
                    mode="dark-input"
                    id={`name`}
                    type="text"
                    placeHolder={null}
                    validations={[requiredValidatior()]}
                    onInputHandler={onInputHandler}
                  >
                    نام
                    <p className="hpc__space-word">و</p>
                    نام خانوادگی
                  </InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    inputDefaultValue={authContext.userInfo.username}
                    mode="dark-input"
                    id={`username`}
                    placeHolder={`نام کاربری`}
                    validations={[requiredValidatior()]}
                    onInputHandler={onInputHandler}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    inputDefaultValue={authContext.userInfo.email}
                    mode="dark-input"
                    id={`email`}
                    type="email"
                    placeHolder={`ایمیل`}
                    validations={[requiredValidatior(), emailValidator()]}
                    onInputHandler={onInputHandler}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    inputDefaultValue={authContext.userInfo.phone}
                    mode="dark-input"
                    id={`phoneNumber`}
                    placeHolder={`شماره تلفن`}
                    validations={[requiredValidatior()]}
                    onInputHandler={onInputHandler}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
                    mode="dark-input"
                    id={`password`}
                    type="password"
                    placeHolder={`رمزعبور`}
                    validations={[requiredValidatior()]}
                    onInputHandler={onInputHandler}
                  ></InputBox>
                </div>
              </div>
              <div className="col-span-12 my-5 hpc__center">
                <button
                  id="submit-new-user-btn"
                  className="login-form__submit w-100 w-lg-50"
                  onClick={updateAction}
                >
                  اضافه شو
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster></Toaster>
      </>
    );
  } else {
    <div className="hpc__title text-[#dc3545] text-center">
      اطلاعاتی یافت نشد
    </div>;
  }
}

export default EditUser;
