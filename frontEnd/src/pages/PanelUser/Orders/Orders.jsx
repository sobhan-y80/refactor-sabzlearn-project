import React, { useEffect, useState } from "react";
import { mainUrlApi } from "../../../Utils/Utils";
import DetailModal from "../../../Components/Modals/DetailModal/DetailModal";
import { Toaster } from "react-hot-toast";

function OrdersUser() {
  const [userOrder, setUserOrder] = useState({});
  const [mainUserOrder, setMainUserOrder] = useState({});
  const [isModalDetail, setIsModalDetail] = useState(false);

  const OrderRender = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((userOrderData) => setUserOrder(userOrderData));
  };

  const showOrderDetailHandler = (OrderID) => {
    setIsModalDetail(true);
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/orders/${OrderID}`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((mainUserOrderData) => setMainUserOrder(mainUserOrderData.pop()));
  };

  const closeDetailModalHandler = () => {
    setIsModalDetail(false);
  };

  console.log(mainUserOrder);

  useEffect(() => {
    OrderRender();
  }, []);

  if (userOrder.length) {
    return (
      <>
        <div className="hpc__part-section">
          <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
            <div className="panel-home__last-users__header row flex-nowrap flex-column flex-md-row align-items-center justify-content-md-between justify-content-center">
              <h2 className="col-12 col-md-4 panel-home__last-users__title hpc__title d-flex justify-content-center justify-content-md-start">
                لیست سفارشات
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="tabel w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>سفارش</th>
                    <th>تاریخ</th>
                    <th>وضعیت</th>
                    <th>دوره</th>
                    <th>مبلغ نهایی</th>
                    <th>مشاهده</th>
                  </tr>
                </thead>
                <tbody>
                  {[...userOrder].reverse().map((order, index) => {
                    return (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.course.name}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                        </td>
                        <td>تکمیل شده</td>
                        <td>{order.course.name}</td>
                        <td>{order.price.toLocaleString()}</td>
                        <td className="flex justify-center">
                          <button
                            onClick={() => showOrderDetailHandler(order._id)}
                            className="inline-block seeDetailBtn"
                          >
                            <svg
                              width="22"
                              height="18"
                              viewBox="0 0 22 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.7793 10.8746L20.3886 11.312L19.7793 10.8746ZM19.7793 7.1254L19.1701 7.56278L19.7793 7.1254ZM20.6631 9H19.9131H20.6631ZM2.22067 10.8746L2.82993 10.4372L2.22067 10.8746ZM2.22067 7.1254L1.61142 6.68801L2.22067 7.1254ZM1.33691 9H0.586914H1.33691ZM1.61142 11.312C2.47962 12.5214 3.77164 14.1105 5.35173 15.4043C6.92325 16.691 8.85905 17.75 11 17.75V16.25C9.35423 16.25 7.7491 15.4285 6.302 14.2437C4.86349 13.0659 3.6592 11.5923 2.82993 10.4372L1.61142 11.312ZM11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1105 19.5204 12.5214 20.3886 11.312L19.1701 10.4372C18.3408 11.5923 17.1365 13.0659 15.698 14.2437C14.2509 15.4285 12.6458 16.25 11 16.25V17.75ZM20.3886 6.68801C19.5204 5.47865 18.2284 3.88946 16.6483 2.59571C15.0768 1.30899 13.141 0.25 11 0.25V1.75C12.6458 1.75 14.2509 2.57146 15.698 3.75631C17.1365 4.93414 18.3408 6.40765 19.1701 7.56278L20.3886 6.68801ZM11 0.25C8.85905 0.25 6.92325 1.30899 5.35173 2.59572C3.77164 3.88946 2.47962 5.47865 1.61142 6.68801L2.82993 7.56278C3.6592 6.40765 4.86348 4.93414 6.302 3.75631C7.7491 2.57146 9.35423 1.75 11 1.75V0.25ZM20.3886 11.312C20.943 10.5398 21.4131 9.92861 21.4131 9H19.9131C19.9131 9.35852 19.794 9.56806 19.1701 10.4372L20.3886 11.312ZM19.1701 7.56278C19.794 8.43194 19.9131 8.64148 19.9131 9H21.4131C21.4131 8.07139 20.943 7.46024 20.3886 6.68801L19.1701 7.56278ZM2.82993 10.4372C2.20597 9.56806 2.08691 9.35852 2.08691 9H0.586914C0.586914 9.92861 1.05703 10.5398 1.61142 11.312L2.82993 10.4372ZM1.61142 6.68801C1.05703 7.46024 0.586914 8.07139 0.586914 9H2.08691C2.08691 8.64148 2.20597 8.43194 2.82993 7.56278L1.61142 6.68801ZM7.25001 9C7.25001 11.0711 8.92894 12.75 11 12.75V11.25C9.75737 11.25 8.75001 10.2426 8.75001 9H7.25001ZM11 12.75C13.0711 12.75 14.75 11.0711 14.75 9H13.25C13.25 10.2426 12.2426 11.25 11 11.25V12.75ZM14.75 9C14.75 6.92893 13.0711 5.25 11 5.25V6.75C12.2426 6.75 13.25 7.75736 13.25 9H14.75ZM11 5.25C8.92894 5.25 7.25001 6.92893 7.25001 9H8.75001C8.75001 7.75736 9.75737 6.75 11 6.75V5.25Z"
                                fill="var(--white-color)"
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
        {isModalDetail && mainUserOrder && (
          <DetailModal
            typeInfoShow={"READ_ORDER_DETAIL"}
            mainInfo={mainUserOrder}
            cancelAction={closeDetailModalHandler}
          ></DetailModal>
        )}
        <Toaster></Toaster>
      </>
    );
  }
}

export default OrdersUser;
