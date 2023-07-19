import React from "react";

function Users() {
  return (
    <>
      <div className="col-12 col-lg-10 my-2 my-0-lg panel__home">
        <div className="panel-home__wrapper">
          <h2 className="panel-home__title">افزودن کاربر</h2>
          <div className="login-form__box-inputs my-5">
            <div className="row hpc__center">
              <div className="row">
                <div className="col-12 col-lg-6 my-5"></div>
                <div className="col-12 col-lg-6 my-5"></div>
                <div className="col-12 col-lg-6 my-5"></div>
                <div className="col-12 col-lg-6 my-5"></div>
                <div className="col-12 col-lg-6 my-5"></div>
              </div>
              <div dir="ltr" className="row flex-row-reverse">
                <div className="col-12 hpc__part-section d-flex align-items-center justify-content-between">
                  {/* <div
                    className="btn-group btn-group-lg"
                    role="group"
                    aria-label="Basic radio toggle button First group"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="male-gender"
                    />
                    <label className="btn" for="male-gender">
                      مرد
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="female-gender"
                      checked
                    />
                    <label className="btn" for="female-gender">
                      زن
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="not-set-gender"
                      checked
                    />
                    <label className="btn" for="not-set-gender">
                      اعلام نمیکنم
                    </label>
                  </div> */}
                  <h2 className="panel-home__title">جنسیت</h2>
                </div>
              </div>
              <div className="col-12 my-5 hpc__center">
                <button
                  id="submit-new-user-btn"
                  className="login-form__submit w-100 w-lg-50"
                >
                  اضافه شو
                </button>
              </div>
            </div>
          </div>
          <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
            <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
              <h2 className="col-12 col-md-4 panel-home__last-users__title hpc__title d-flex justify-content-center justify-content-md-start">
                لیست کاربران
              </h2>

              <div className="col-8 col-md-3 col-lg-2 my-5 main-header__search-wrapper">
                <div
                  id="main-header__searchbar"
                  className="main-header__searchbar global__searchbar"
                >
                  <input
                    type="text"
                    id="main-header__search-input"
                    className="main-header___search-input global__search-input"
                    placeholder="جستجو..."
                  />
                  <button className="main-header__search-btn global__search-btn">
                    <i className="fa-solid fa-magnifying-glass main-header__serach-icon global__search-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="panel-home__users-table table-responsive">
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
      </div>
    </>
  );
}

export default Users;
