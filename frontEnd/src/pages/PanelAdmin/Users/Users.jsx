import React, { useEffect, useState } from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import { useForm } from "../../../Hooks/useForm";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";
import { mainUrlApi } from "../../../Utils/Utils";
import { Toaster, toast } from "react-hot-toast";
import EditModal from "../../../Components/Modals/EditModal/EditModal";
import DeleteModal from "../../../Components/Modals/DeleteModal/DeleteModal";

function Users() {
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
  const [allUsers, setAllUsers] = useState([]);
  const [mainUserDataInfo, setMainUserDataInfo] = useState({});
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalBan, setIsModalBan] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const RegisterNewUser = async () => {
    if (formState.isFormValid) {
      const mainNewUserObj = {
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.password.value,
        name: formState.inputs.name.value,
        phone: formState.inputs.phoneNumber.value,
      };

      await fetch(`${mainUrlApi}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainNewUserObj),
      })
        .then(async (res) => {
          if (res.status === 409) {
            toast.error("نام کاربری یا ایمیل قبلا استفاده شده");
          } else if (res.status === 403) {
            toast.error("این شماره در سایت مسدود شده!!!");
          } else if (res.status === 201) {
            toast.success("کاربر با موفقیت ثبت نام شد :)");
          }
        })
        .catch((err) => {
          toast.error("خطا در سرور :((");
        });
    } else {
      toast.error("اطلاعات درست نیست !!");
    }
  };

  const allUsersRender = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then(async (res) => {
      const allUserData = await res.json();
      setAllUsers(allUserData);
    });
  };

  const actionEditHandler = (userData) => {
    setMainUserDataInfo(userData);
    setIsModalEdit(true);
  };

  const cancelUpdateMemberAction = () => {
    setIsModalEdit(false);
  };

  const updateMemberAction = () => {
    console.log("update successfully");
    const isValueSame = () => {
      const mainUserInfoObj = {
        name: mainUserDataInfo.name,
        username: mainUserDataInfo.username,
        email: mainUserDataInfo.email,
        phone: mainUserDataInfo.phone,
      };

      const newUserInfoObj = {
        name: formState.inputs.name.value,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        phone: formState.inputs.phoneNumber.value,
      };

      return Object.keys(mainUserInfoObj).every(
        (key) =>
          newUserInfoObj.hasOwnProperty(key) &&
          newUserInfoObj[key] === mainUserInfoObj[key]
      );
    };

    if (!isValueSame()) {
      fetch(`${mainUrlApi}/users`, {
        method: "PUT",
      });
      toast.success("اطلاعات با موفقیت آپدیت شد");
      setIsModalEdit(false);
      allUsersRender();
    } else {
      toast.error("اطلاعات جدید را وارد کنید");
    }
  };

  const actionDeleteHandler = (userData) => {
    setMainUserDataInfo(userData);
    setIsModalDelete(true);
  };

  const cancelDeleteMemberAction = () => {
    setIsModalDelete(false);
  };

  const deleteMemberAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/users/${mainUserDataInfo._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        allUsersRender();
        toast.success("کاربر پاک شد");
      } else if (res.status === 404) {
        toast.error("کاربر پیدا نشد");
      }
    });
    setIsModalDelete(false);
  };

  const actionBanHandler = (userData) => {
    setMainUserDataInfo(userData);
    setIsModalBan(true);
  };

  const cancelBanMemberAction = () => {
    setIsModalBan(false);
  };

  const banMemberAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/users/ban/${mainUserDataInfo._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 404) {
        toast.error("کاربری پیدا نشد");
      } else if (res.status === 200) {
        toast.success("کاربر بن شد");
        allUsersRender();
      }
    });
    setIsModalBan(false);
  };

  useEffect(() => {
    allUsersRender();
  }, []);

  if (allUsers.length) {
    return (
      <>
        <div className="hpc__part-section">
          <h2 className="panel-home__title">افزودن کاربر</h2>
          <div className="login-form__box-inputs my-14">
            <div className="grid gap-5 grid-cols-12">
              <div className="col-span-12 grid gap-5 grid-cols-12">
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
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
                    mode="dark-input"
                    id={`username`}
                    placeHolder={`نام کاربری`}
                    validations={[requiredValidatior()]}
                    onInputHandler={onInputHandler}
                  ></InputBox>
                </div>
                <div className="col-span-12 lg:col-span-6 my-5">
                  <InputBox
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
                  onClick={RegisterNewUser}
                >
                  اضافه شو
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hpc__part-section">
          <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
            <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
              <h2 className="col-12 col-md-4 panel-home__last-users__title hpc__title d-flex justify-content-center justify-content-md-start">
                لیست کاربران
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="tabel w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام کاربری</th>
                    <th>ایمیل</th>
                    <th>شماره تلفن</th>
                    <th>کنترل</th>
                  </tr>
                </thead>
                <tbody>
                  {[...allUsers].reverse().map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="flex justify-center">
                          <button
                            onClick={(e) => actionEditHandler(user)}
                            className="actionEdit"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.53118 19.0199L9.25825 18.3213L9.53118 19.0199ZM5.47478 19.7988L5.09978 20.4483L5.09978 20.4483L5.47478 19.7988ZM4.12116 15.8964L3.37971 16.0093L4.12116 15.8964ZM4.61146 13.2941L5.26098 13.6691L4.61146 13.2941ZM4.02731 14.5314L3.29028 14.3925H3.29028L4.02731 14.5314ZM11.5397 17.2941L12.1892 17.6691L11.5397 17.2941ZM10.7602 18.4186L11.249 18.9875H11.249L10.7602 18.4186ZM8.4099 6.71503L7.76038 6.34003L8.4099 6.71503ZM19.4099 21.0009C19.8241 21.0009 20.1599 20.6651 20.1599 20.2509C20.1599 19.8367 19.8241 19.5009 19.4099 19.5009V21.0009ZM13.4099 19.5009C12.9957 19.5009 12.6599 19.8367 12.6599 20.2509C12.6599 20.6651 12.9957 21.0009 13.4099 21.0009V19.5009ZM14.6886 10.34L10.8901 16.9191L12.1892 17.6691L15.9876 11.09L14.6886 10.34ZM5.26098 13.6691L9.05942 7.09003L7.76038 6.34003L3.96194 12.9191L5.26098 13.6691ZM9.25825 18.3213C8.16178 18.7497 7.41502 19.0394 6.83854 19.1741C6.28167 19.3042 6.02898 19.2527 5.84978 19.1493L5.09978 20.4483C5.75305 20.8255 6.45392 20.8044 7.17981 20.6348C7.88609 20.4698 8.75129 20.1298 9.80411 19.7184L9.25825 18.3213ZM3.37971 16.0093C3.5499 17.1267 3.68805 18.046 3.89829 18.7402C4.11436 19.4536 4.44651 20.0712 5.09978 20.4483L5.84978 19.1493C5.67059 19.0458 5.49965 18.8527 5.33389 18.3054C5.16229 17.7388 5.03986 16.9472 4.86261 15.7835L3.37971 16.0093ZM3.96194 12.9191C3.64012 13.4765 3.38246 13.9033 3.29028 14.3925L4.76434 14.6702C4.7983 14.49 4.88802 14.3151 5.26098 13.6691L3.96194 12.9191ZM4.86261 15.7835C4.7503 15.046 4.73039 14.8505 4.76434 14.6702L3.29028 14.3925C3.1981 14.8817 3.2828 15.373 3.37971 16.0093L4.86261 15.7835ZM10.8901 16.9191C10.5172 17.5651 10.4105 17.7303 10.2715 17.8498L11.249 18.9875C11.6266 18.6631 11.8674 18.2265 12.1892 17.6691L10.8901 16.9191ZM9.80411 19.7184C10.4036 19.4842 10.8714 19.3119 11.249 18.9875L10.2715 17.8498C10.1324 17.9693 9.95303 18.0498 9.25825 18.3213L9.80411 19.7184ZM13.499 5.90045C14.3339 6.38245 14.8939 6.70761 15.2797 7.00537C15.6483 7.28983 15.7658 7.48144 15.8135 7.65945L17.2623 7.27123C17.0956 6.64904 16.6976 6.20485 16.1961 5.81785C15.7119 5.44416 15.0471 5.06221 14.249 4.60141L13.499 5.90045ZM15.9876 11.09C16.4484 10.2919 16.8331 9.62875 17.0657 9.06299C17.3065 8.47711 17.4291 7.89341 17.2623 7.27123L15.8135 7.65945C15.8612 7.83747 15.8553 8.06212 15.6783 8.49278C15.493 8.94357 15.1706 9.50517 14.6886 10.34L15.9876 11.09ZM14.249 4.60141C13.4509 4.1406 12.7877 3.7559 12.222 3.52337C11.6361 3.28257 11.0524 3.15997 10.4302 3.32668L10.8184 4.77557C10.9964 4.72787 11.2211 4.73376 11.6518 4.91076C12.1025 5.09604 12.6641 5.41844 13.499 5.90045L14.249 4.60141ZM9.05942 7.09003C9.54142 6.25517 9.86658 5.69516 10.1643 5.30931C10.4488 4.9407 10.6404 4.82327 10.8184 4.77557L10.4302 3.32668C9.80801 3.49339 9.36382 3.89142 8.97683 4.39291C8.60313 4.87716 8.22118 5.54189 7.76038 6.34003L9.05942 7.09003ZM15.7131 10.0655L8.7849 6.06551L8.0349 7.36455L14.9631 11.3645L15.7131 10.0655ZM19.4099 19.5009H13.4099V21.0009H19.4099V19.5009Z"
                                fill="var(--primary-color)"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => actionDeleteHandler(user)}
                            className="deleteBtn"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.5172 12.7795L19.26 12.8829L18.5172 12.7795ZM18.2549 14.6645L18.9977 14.7679L18.2549 14.6645ZM5.74514 14.6645L6.48798 14.5611L5.74514 14.6645ZM5.4828 12.7795L4.73996 12.8829L5.4828 12.7795ZM9.18365 21.7368L8.89206 22.4278L9.18365 21.7368ZM6.47508 18.5603L7.17907 18.3017L6.47508 18.5603ZM17.5249 18.5603L18.2289 18.819V18.819L17.5249 18.5603ZM14.8164 21.7368L14.5248 21.0458H14.5248L14.8164 21.7368ZM5.74664 8.92906C5.70746 8.5167 5.34142 8.21418 4.92906 8.25336C4.5167 8.29254 4.21418 8.65858 4.25336 9.07094L5.74664 8.92906ZM19.7466 9.07094C19.7858 8.65858 19.4833 8.29254 19.0709 8.25336C18.6586 8.21418 18.2925 8.5167 18.2534 8.92906L19.7466 9.07094ZM20 7.75C20.4142 7.75 20.75 7.41421 20.75 7C20.75 6.58579 20.4142 6.25 20 6.25V7.75ZM4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75V6.25ZM9.25 18C9.25 18.4142 9.58579 18.75 10 18.75C10.4142 18.75 10.75 18.4142 10.75 18H9.25ZM10.75 10C10.75 9.58579 10.4142 9.25 10 9.25C9.58579 9.25 9.25 9.58579 9.25 10H10.75ZM13.25 18C13.25 18.4142 13.5858 18.75 14 18.75C14.4142 18.75 14.75 18.4142 14.75 18H13.25ZM14.75 10C14.75 9.58579 14.4142 9.25 14 9.25C13.5858 9.25 13.25 9.58579 13.25 10H14.75ZM16 7V7.75H16.75V7H16ZM8 7H7.25V7.75H8V7ZM17.7744 12.6761L17.512 14.5611L18.9977 14.7679L19.26 12.8829L17.7744 12.6761ZM6.48798 14.5611L6.22564 12.6761L4.73996 12.8829L5.0023 14.7679L6.48798 14.5611ZM12 21.25C10.4708 21.25 9.92544 21.2358 9.47524 21.0458L8.89206 22.4278C9.68914 22.7642 10.6056 22.75 12 22.75V21.25ZM5.0023 14.7679C5.282 16.7777 5.43406 17.9017 5.77109 18.819L7.17907 18.3017C6.91156 17.5736 6.77851 16.6488 6.48798 14.5611L5.0023 14.7679ZM9.47524 21.0458C8.55279 20.6566 7.69496 19.7058 7.17907 18.3017L5.77109 18.819C6.3857 20.4918 7.48205 21.8328 8.89206 22.4278L9.47524 21.0458ZM17.512 14.5611C17.2215 16.6488 17.0884 17.5736 16.8209 18.3017L18.2289 18.819C18.5659 17.9017 18.718 16.7777 18.9977 14.7679L17.512 14.5611ZM12 22.75C13.3944 22.75 14.3109 22.7642 15.1079 22.4278L14.5248 21.0458C14.0746 21.2358 13.5292 21.25 12 21.25V22.75ZM16.8209 18.3017C16.305 19.7058 15.4472 20.6566 14.5248 21.0458L15.1079 22.4278C16.5179 21.8328 17.6143 20.4918 18.2289 18.819L16.8209 18.3017ZM6.22564 12.6761C6.00352 11.08 5.83766 9.88703 5.74664 8.92906L4.25336 9.07094C4.34819 10.069 4.51961 11.2995 4.73996 12.8829L6.22564 12.6761ZM19.26 12.8829C19.4804 11.2995 19.6518 10.069 19.7466 9.07094L18.2534 8.92906C18.1623 9.88702 17.9965 11.08 17.7744 12.6761L19.26 12.8829ZM20 6.25H4V7.75H20V6.25ZM10.75 18V10H9.25V18H10.75ZM14.75 18V10H13.25V18H14.75ZM15.25 6V7H16.75V6H15.25ZM16 6.25H8V7.75H16V6.25ZM8.75 7V6H7.25V7H8.75ZM12 2.75C13.7949 2.75 15.25 4.20507 15.25 6H16.75C16.75 3.37665 14.6234 1.25 12 1.25V2.75ZM12 1.25C9.37665 1.25 7.25 3.37665 7.25 6H8.75C8.75 4.20507 10.2051 2.75 12 2.75V1.25Z"
                                fill="var(--dangerous)"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => actionBanHandler(user)}
                            className="banUserBtn"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6517 14.591C16.3588 14.2981 15.8839 14.2981 15.591 14.591C15.2981 14.8839 15.2981 15.3588 15.591 15.6517L16.6517 14.591ZM19.8337 19.8943C20.1266 20.1872 20.6014 20.1872 20.8943 19.8943C21.1872 19.6014 21.1872 19.1265 20.8943 18.8336L19.8337 19.8943ZM15.591 18.8336C15.2981 19.1265 15.2981 19.6014 15.591 19.8943C15.8839 20.1872 16.3588 20.1872 16.6517 19.8943L15.591 18.8336ZM20.8943 15.6516C21.1872 15.3588 21.1872 14.8839 20.8943 14.591C20.6014 14.2981 20.1266 14.2981 19.8337 14.591L20.8943 15.6516ZM14 13.75C14.4142 13.75 14.75 13.4142 14.75 13C14.75 12.5858 14.4142 12.25 14 12.25V13.75ZM14 21.75C14.4142 21.75 14.75 21.4142 14.75 21C14.75 20.5858 14.4142 20.25 14 20.25V21.75ZM14.25 6C14.25 7.79493 12.7949 9.25 11 9.25V10.75C13.6234 10.75 15.75 8.62335 15.75 6H14.25ZM11 9.25C9.20507 9.25 7.75 7.79493 7.75 6H6.25C6.25 8.62335 8.37665 10.75 11 10.75V9.25ZM7.75 6C7.75 4.20507 9.20507 2.75 11 2.75V1.25C8.37665 1.25 6.25 3.37665 6.25 6H7.75ZM11 2.75C12.7949 2.75 14.25 4.20507 14.25 6H15.75C15.75 3.37665 13.6234 1.25 11 1.25V2.75ZM15.591 15.6517L19.8337 19.8943L20.8943 18.8336L16.6517 14.591L15.591 15.6517ZM16.6517 19.8943L20.8943 15.6516L19.8337 14.591L15.591 18.8336L16.6517 19.8943ZM8 13.75H14V12.25H8V13.75ZM14 20.25H8V21.75H14V20.25ZM8 20.25C6.20507 20.25 4.75 18.7949 4.75 17H3.25C3.25 19.6234 5.37665 21.75 8 21.75V20.25ZM8 12.25C5.37665 12.25 3.25 14.3766 3.25 17H4.75C4.75 15.2051 6.20507 13.75 8 13.75V12.25Z"
                                fill="var(--warning)"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalDelete && (
          <DeleteModal
            role="Delete"
            deleteAction={deleteMemberAction}
            cancelAction={cancelDeleteMemberAction}
            MainInfo={mainUserDataInfo}
          ></DeleteModal>
        )}
        {isModalBan && (
          <DeleteModal
            role="Ban"
            deleteAction={banMemberAction}
            cancelAction={cancelBanMemberAction}
            MainInfo={mainUserDataInfo}
          ></DeleteModal>
        )}
        {isModalEdit && (
          <EditModal
            updateAction={updateMemberAction}
            cancelAction={cancelUpdateMemberAction}
            userMainInfo={mainUserDataInfo}
          >
            <InputBox
              inputDefaultValue={mainUserDataInfo.name}
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
            <InputBox
              inputDefaultValue={mainUserDataInfo.username}
              id={`username`}
              placeHolder={`نام کاربری`}
              validations={[requiredValidatior()]}
              onInputHandler={onInputHandler}
            ></InputBox>
            <InputBox
              inputDefaultValue={mainUserDataInfo.email}
              id={`email`}
              type="email"
              placeHolder={`ایمیل`}
              validations={[requiredValidatior(), emailValidator()]}
              onInputHandler={onInputHandler}
            ></InputBox>
            <InputBox
              inputDefaultValue={mainUserDataInfo.phone}
              id={`phoneNumber`}
              placeHolder={`شماره تلفن`}
              validations={[requiredValidatior()]}
              onInputHandler={onInputHandler}
            ></InputBox>
          </EditModal>
        )}
        <Toaster></Toaster>
      </>
    );
  }
}

export default Users;
