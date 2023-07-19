import React from "react";
import InputBox from "../../../Components/InputBox/InputBox";
import { useForm } from "../../../Hooks/useForm";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";

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

  console.log(formState);
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
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                  <th>نام کاربری</th>
                  <th>شناسه</th>
                  <th>شماره</th>
                  <th>ایمیل</th>
                  <th>رمز عبور</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="no-copy">
                    <button className="btn btn-primary">ویرایش</button>
                  </td>
                  <td className="no-copy">
                    <button className="btn btn-danger">حذف</button>
                  </td>
                  <td>haghobatel</td>
                  <td>6440fb868a30abe3a2972543</td>
                  <td>09396007232</td>
                  <td>sobhan@gmail.com</td>
                  <td>
                    $2b$12$D15N28ga2IcNN1FI/x5PWOLnSxkuAYvK1tYTMEmcLov3.S7W/Cs76
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="no-copy">
                    <button className="btn btn-primary">ویرایش</button>
                  </td>
                  <td className="no-copy">
                    <button className="btn btn-danger">حذف</button>
                  </td>
                  <td>haghobatel</td>
                  <td>6440fb868a30abe3a2972543</td>
                  <td>09396007232</td>
                  <td>sobhan@gmail.com</td>
                  <td>
                    $2b$12$D15N28ga2IcNN1FI/x5PWOLnSxkuAYvK1tYTMEmcLov3.S7W/Cs76
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
