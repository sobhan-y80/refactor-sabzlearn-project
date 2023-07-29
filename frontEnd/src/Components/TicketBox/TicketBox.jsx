import React, { useEffect, useState } from "react";
import { mainUrlApi } from "../../Utils/Utils";
import DetailModal from "../Modals/DetailModal/DetailModal";
import { Toaster, toast } from "react-hot-toast";
answer: 0;
body: "محتوا لود نمیشه";
course: "634e6b0e1d5142b91afa9bb3";
createdAt: "2023-07-28T17:24:16.592Z";
departmentID: "پشتیبانی";
departmentSubID: "پشتیبانی سایت";
isAnswer: 0;
priority: 23;
title: "لود نشدن";
updatedAt: "2023-07-28T17:24:16.592Z";
user: "sobhan yaghobi";
__v: 0;
_id: "64c3f9c0c03d69cc3b70ed67";
function TicketBox({ ...props }) {
  const [mainAnswer, setMainAnswer] = useState();
  const [isModalDetail, setIsModalDetail] = useState(false);

  const seeAnswerHandler = () => {
    setIsModalDetail(true);

    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/tickets/answer/${props._id}`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((answerData) => setMainAnswer(answerData));
  };

  const cancelShowMessageAction = () => {
    setIsModalDetail(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="w-full bg-[#242532] p-5 rounded-lg flex justify-between items-center cursor-default">
        <div className="truncate w-2/12 text-slate-400 font-semibold">
          {props.title}
        </div>
        <span>{props.user}</span>
        <div className="truncate w-2/12">ری اکت در دنیای واقعی</div>
        <div className="flex items-center gap-5">
          {props.answer === 0 ? (
            <div
              onClick={() => toast.error("پیغامی ثبت نشده")}
              className="flex w-[13rem] justify-between items-center"
            >
              <div className="w-5 h-5 rounded-full bg-[#dc3545]"></div>
              پاسخ داده نشده
            </div>
          ) : (
            <button
              title="مشاهده پاسخ"
              onClick={seeAnswerHandler}
              className="flex w-[13rem] justify-between items-center"
            >
              <div className="w-5 h-5 rounded-full bg-[#43c67a]"></div>
              پاسخ داده شده
            </button>
          )}
        </div>
        <div>
          <span>{new Date(props.createdAt).toLocaleDateString("fa-IR")}</span>
          <span></span>
        </div>
      </div>
      {isModalDetail && mainAnswer && (
        <DetailModal
          typeInfoShow={"READ"}
          mainInfo={mainAnswer}
          propertyName="answer"
          cancelAction={cancelShowMessageAction}
        ></DetailModal>
      )}
      <Toaster></Toaster>
    </>
  );
}

export default TicketBox;
