import React, { useEffect, useState } from "react";
import { mainUrlApi } from "../../../Utils/Utils";
import DeleteModal from "../../../Components/Modals/DeleteModal/DeleteModal";
import DetailModal from "../../../Components/Modals/DetailModal/DetailModal";
import EditModal from "../../../Components/Modals/EditModal/EditModal";
import InputBox from "../../../Components/InputBox/InputBox";
import { Toaster, toast } from "react-hot-toast";
import { requiredValidatior } from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";

function Comments() {
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [allComment, setAllComment] = useState([]);
  const [mainComment, setMainComment] = useState();
  const [formState, onInputHandler] = useForm(
    {
      answer: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isAnswerModal, setIsAnswerModal] = useState(false);
  const [isModalBan, setIsModalBan] = useState(false);
  const [isAcceptModal, setIsAcceptModal] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState(false);

  const allcommentRender = () => {
    fetch(`${mainUrlApi}/comments`)
      .then((res) => res.json())
      .then((allCommentData) => {
        setAllComment(allCommentData);
        setIsDataLoad(true);
      });
  };
  const actionShowMessageHandler = (Comment) => {
    setMainComment(Comment);
    setIsModalDetail(true);
  };
  const cancelShowMessageAction = () => {
    setIsModalDetail(false);
  };

  const actionAnswerHandler = (Comment) => {
    setMainComment(Comment);
    setIsAnswerModal(true);
  };
  const answerAction = () => {
    if (formState.isFormValid) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));
      const answerObj = {
        body: formState.inputs.answer.value,
      };
      fetch(`${mainUrlApi}/comments/answer/${mainComment._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerObj),
      }).then((res) => {
        if (res.status === 200) {
          allcommentRender();
          setIsAnswerModal(false);
          toast.success("پاسخ با موفقیت ثبت شد");
        } else {
          toast.error("خطا در سرور");
        }
      });
    }
  };
  const cancelAnswerAction = () => {
    setIsModalDelete(false);
  };

  const actionDeleteHandler = (Comment) => {
    setMainComment(Comment);
    setIsModalDelete(true);
  };
  const deleteAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`${mainUrlApi}/comments/${mainComment._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        allcommentRender();
        setIsModalDelete(false);
        toast.success(`پیام ${mainComment.creator.name} با موفقیت حذف شد`);
      } else if (res.status == 404) {
        toast.error("کامنت مورد نظر یافت نشد");
      } else {
        toast.error("خطا در سرور");
      }
    });
  };
  const cancelDeleteAction = () => {
    setIsModalDetail(false);
  };

  const actionBanHandler = (Comment) => {
    setMainComment(Comment);
    setIsModalBan(true);
  };
  const cancelBanMemberAction = () => {
    setIsModalBan(false);
  };
  const banMemberAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/users/ban/${mainComment.creator._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 404) {
        toast.error("کاربری پیدا نشد");
      } else if (res.status === 200) {
        toast.success("کاربر بن شد");
      }
    });
    setIsModalBan(false);
  };

  const actionAcceptHandler = (Comment) => {
    setMainComment(Comment);
    setIsAcceptModal(true);
  };
  const cancelAcceptAction = () => {
    setIsAcceptModal(false);
  };
  const acceptAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`${mainUrlApi}/comments/accept/${mainComment._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setIsAcceptModal(false);
        toast.success("کامنت با موفقیت قبول شد");
      } else {
        toast.error("خطا در سرور");
      }
    });
  };

  const actionRejectHandler = (Comment) => {
    setMainComment(Comment);
    setIsRejectModal(true);
  };
  const cancelRejectAction = () => {
    setIsRejectModal(false);
  };
  const rejectAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`${mainUrlApi}/comments/reject/${mainComment._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setIsRejectModal(false);
        toast.success("کامنت با موفقیت رد شد");
      } else {
        toast.error("خطا در سرور");
      }
    });
  };

  useEffect(() => {
    allcommentRender();
  }, []);
  if (isDataLoad) {
    return (
      <>
        <div className="hpc__part-section flex flex-col gap-5">
          <div className="panel-home__last-users__title hpc__title">
            لیست پیغام ها
          </div>
          <div className="overflow-x-auto">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>نام و نام خانوادگی</th>
                  <th>دوره</th>
                  <th>پیام</th>
                  <th>کنترل</th>
                </tr>
              </thead>
              <tbody id="course-tbody-table">
                {allComment.map((message, index) => (
                  <tr key={message._id}>
                    <td
                      className={`${
                        message.answer === 1 ? "text-blue-500" : ""
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td>{message.creator && message.creator.name}</td>
                    <td>{message.course}</td>
                    <td>
                      <button
                        onClick={() => actionShowMessageHandler(message)}
                        title="پیام را مشاهده کن"
                        className="inline-block seeDetailBtn"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.09562 20.8906L7.70135 21.5286L8.09562 20.8906ZM7.68699 20.6563L7.96312 19.959L7.68699 20.6563ZM6.85373 20.6736L7.0419 21.3996L6.85373 20.6736ZM7.24178 20.589L7.29956 21.3368L7.24178 20.589ZM3.34979 17.1696L2.62378 16.9814L3.34979 17.1696ZM3.43431 16.7812L4.18211 16.8386L3.43431 16.7812ZM3.13203 15.9282L2.49502 16.3241L3.13203 15.9282ZM3.36627 16.3347L2.6695 16.6122L3.36627 16.3347ZM2.95298 19.5094L3.68792 19.3598L2.95298 19.5094ZM4.51396 21.0704L4.66353 20.3354L4.51396 21.0704ZM8.05279 13.1078C7.63858 13.1078 7.30279 13.4436 7.30279 13.8578C7.30279 14.272 7.63858 14.6078 8.05279 14.6078V13.1078ZM16.0528 14.6078C16.467 14.6078 16.8028 14.272 16.8028 13.8578C16.8028 13.4436 16.467 13.1078 16.0528 13.1078V14.6078ZM8.05279 9.1078C7.63858 9.1078 7.30279 9.44359 7.30279 9.8578C7.30279 10.272 7.63858 10.6078 8.05279 10.6078V9.1078ZM12.0528 10.6078C12.467 10.6078 12.8028 10.272 12.8028 9.8578C12.8028 9.44359 12.467 9.1078 12.0528 9.1078V10.6078ZM5.48261 5.45926C9.09496 1.84691 14.9517 1.84691 18.5641 5.45926L19.6247 4.3986C15.4266 0.200466 8.62009 0.200466 4.42195 4.3986L5.48261 5.45926ZM18.5641 5.45926C22.1764 9.07161 22.1764 14.9284 18.5641 18.5407L19.6247 19.6014C23.8229 15.4033 23.8229 8.59674 19.6247 4.3986L18.5641 5.45926ZM3.76904 15.5323C2.68315 13.785 2.5484 11.8402 2.97494 10.0253C3.40407 8.19937 4.39389 6.54798 5.48261 5.45926L4.42195 4.3986C3.14228 5.67827 2.00974 7.57586 1.51472 9.68213C1.01712 11.7994 1.15644 14.1701 2.49502 16.3241L3.76904 15.5323ZM18.5641 18.5407C17.5261 19.5788 15.8769 20.5687 14.0348 21.0093C12.2032 21.4475 10.2366 21.332 8.4899 20.2526L7.70135 21.5286C9.8645 22.8653 12.2614 22.9759 14.3838 22.4682C16.4958 21.963 18.3911 20.835 19.6247 19.6014L18.5641 18.5407ZM8.4899 20.2526C8.30665 20.1393 8.12408 20.0227 7.96312 19.959L7.41086 21.3536C7.39817 21.3486 7.40673 21.3505 7.46297 21.3832C7.51725 21.4149 7.58911 21.4592 7.70135 21.5286L8.4899 20.2526ZM7.0419 21.3996C7.1463 21.3725 7.20817 21.3566 7.25518 21.3459C7.29944 21.3359 7.30684 21.3362 7.29956 21.3368L7.18399 19.8413C7.01304 19.8545 6.83467 19.9037 6.66555 19.9475L7.0419 21.3996ZM7.96312 19.959C7.69983 19.8547 7.46635 19.8194 7.18399 19.8413L7.29956 21.3368C7.34236 21.3335 7.35548 21.3358 7.3566 21.336C7.35771 21.3362 7.37094 21.3378 7.41086 21.3536L7.96312 19.959ZM4.0758 17.3578C4.11965 17.1886 4.16896 17.0101 4.18211 16.8386L2.68651 16.7239C2.68706 16.7166 2.68739 16.724 2.67741 16.7682C2.66678 16.8152 2.65085 16.877 2.62378 16.9814L4.0758 17.3578ZM2.49502 16.3241C2.56432 16.4356 2.6085 16.5068 2.64002 16.5606C2.67259 16.6162 2.67448 16.6247 2.6695 16.6122L4.06305 16.0572C3.99882 15.896 3.88211 15.7143 3.76904 15.5323L2.49502 16.3241ZM4.18211 16.8386C4.2038 16.5559 4.16796 16.3207 4.06305 16.0572L2.6695 16.6122C2.68515 16.6515 2.68692 16.665 2.68717 16.6666C2.68742 16.6683 2.68974 16.6817 2.68651 16.7239L4.18211 16.8386ZM2.62378 16.9814C2.46345 17.6 2.33331 18.1005 2.25755 18.5023C2.18244 18.9006 2.14238 19.2871 2.21805 19.659L3.68792 19.3598C3.67139 19.2786 3.66672 19.1241 3.73157 18.7803C3.79576 18.4399 3.91012 17.997 4.0758 17.3578L2.62378 16.9814ZM6.66555 19.9475C6.02634 20.1132 5.58349 20.2276 5.24309 20.2918C4.89922 20.3566 4.74477 20.352 4.66353 20.3354L4.36439 21.8053C4.73623 21.881 5.12276 21.8409 5.52105 21.7658C5.92283 21.69 6.42332 21.5599 7.0419 21.3996L6.66555 19.9475ZM2.21805 19.659C2.4381 20.7402 3.28313 21.5852 4.36439 21.8053L4.66353 20.3354C4.17205 20.2354 3.78794 19.8513 3.68792 19.3598L2.21805 19.659ZM8.05279 14.6078H16.0528V13.1078H8.05279V14.6078ZM8.05279 10.6078H12.0528V9.1078H8.05279V10.6078Z"
                            fill="var(--white-color)"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="flex justify-center">
                      <button
                        onClick={(e) => actionAnswerHandler(message)}
                        title="پاسخ"
                        className="inline-block seeDetailBtn"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.37 19.25C10.9558 19.25 10.62 19.5858 10.62 20C10.62 20.4142 10.9558 20.75 11.37 20.75V19.25ZM20.9182 10.8995L20.1753 11.0026V11.0026L20.9182 10.8995ZM21.0929 16.8297L21.7909 17.1041L21.0929 16.8297ZM18.8921 19.3573L18.5242 18.7037L18.8921 19.3573ZM17.69 4.45483L18.0025 3.77306V3.77306L17.69 4.45483ZM19.8217 6.31092L19.1894 6.71429L19.8217 6.31092ZM6.67429 4.45483L6.36174 3.77306V3.77306L6.67429 4.45483ZM2.70322 10.7963C2.64624 11.2066 2.93264 11.5853 3.34292 11.6423C3.75319 11.6993 4.13198 11.4129 4.18896 11.0026L2.70322 10.7963ZM4.54259 6.31092L3.91029 5.90756L4.54259 6.31092ZM4.98972 7.7368L5.52005 7.20647L5.51062 7.19704L5.50086 7.18795L4.98972 7.7368ZM19.99 6.87868L19.4597 6.34835V6.34835L19.99 6.87868ZM19.1319 7.7368L18.6015 7.20647L18.6015 7.20647L19.1319 7.7368ZM2 17.25C1.58579 17.25 1.25 17.5858 1.25 18C1.25 18.4142 1.58579 18.75 2 18.75V17.25ZM8 18.75C8.41421 18.75 8.75 18.4142 8.75 18C8.75 17.5858 8.41421 17.25 8 17.25V18.75ZM2 14.25C1.58579 14.25 1.25 14.5858 1.25 15C1.25 15.4142 1.58579 15.75 2 15.75V14.25ZM5 15.75C5.41421 15.75 5.75 15.4142 5.75 15C5.75 14.5858 5.41421 14.25 5 14.25V15.75ZM11.37 4.75H12.9942V3.25H11.37V4.75ZM12.9942 19.25H11.37V20.75H12.9942V19.25ZM20.1753 11.0026C20.3952 12.5859 20.5529 13.7262 20.5999 14.6241C20.6466 15.5146 20.5782 16.089 20.3949 16.5552L21.7909 17.1041C22.0871 16.3508 22.1495 15.5303 22.0979 14.5457C22.0467 13.5685 21.8773 12.3534 21.661 10.7963L20.1753 11.0026ZM12.9942 20.75C14.5663 20.75 15.7931 20.7506 16.7681 20.6669C17.7504 20.5825 18.5546 20.4079 19.26 20.0109L18.5242 18.7037C18.0876 18.9494 17.5281 19.0961 16.6397 19.1724C15.7439 19.2494 14.5927 19.25 12.9942 19.25V20.75ZM20.3949 16.5552C20.0371 17.4652 19.3764 18.2241 18.5242 18.7037L19.26 20.0109C20.4129 19.362 21.3068 18.3353 21.7909 17.1041L20.3949 16.5552ZM12.9942 4.75C14.2402 4.75 15.1326 4.75051 15.8386 4.80466C16.5352 4.85809 16.9938 4.96075 17.3774 5.13661L18.0025 3.77306C17.394 3.49408 16.7392 3.36933 15.9533 3.30905C15.1767 3.24949 14.2173 3.25 12.9942 3.25V4.75ZM17.3774 5.13661C18.1206 5.47729 18.7497 6.02507 19.1894 6.71429L20.454 5.90756C19.8591 4.97509 19.0079 4.23397 18.0025 3.77306L17.3774 5.13661ZM11.37 3.25C10.147 3.25 9.18756 3.24949 8.41097 3.30905C7.62503 3.36933 6.9703 3.49408 6.36174 3.77306L6.98683 5.13661C7.37044 4.96075 7.82905 4.85809 8.52568 4.80466C9.23166 4.75051 10.124 4.75 11.37 4.75V3.25ZM4.18896 11.0026C4.45672 9.07477 4.60786 8.02255 4.89827 7.27003L3.49887 6.72997C3.13038 7.6848 2.95958 8.9505 2.70322 10.7963L4.18896 11.0026ZM4.89827 7.27003C4.9799 7.05852 5.0705 6.87792 5.17489 6.71429L3.91029 5.90756C3.74645 6.1644 3.61237 6.43586 3.49887 6.72997L4.89827 7.27003ZM6.36174 3.77306C5.35631 4.23397 4.50514 4.97509 3.91029 5.90756L5.17489 6.71429C5.61456 6.02507 6.24368 5.47729 6.98683 5.13661L6.36174 3.77306ZM5.50086 7.18795L4.70971 6.45115L3.68743 7.54885L4.47858 8.28565L5.50086 7.18795ZM19.4597 6.34835L18.6015 7.20647L19.6622 8.26713L20.5203 7.40901L19.4597 6.34835ZM4.45939 8.26713C6.11107 9.9188 7.40205 11.212 8.54367 12.0831C9.7026 12.9673 10.7953 13.4868 12.0608 13.4868V11.9868C11.2552 11.9868 10.479 11.673 9.45354 10.8905C8.41073 10.0949 7.20171 8.88813 5.52005 7.20647L4.45939 8.26713ZM18.6015 7.20647C16.9199 8.88813 15.7108 10.0949 14.668 10.8905C13.6425 11.673 12.8664 11.9868 12.0608 11.9868V13.4868C13.3262 13.4868 14.419 12.9673 15.5779 12.0831C16.7195 11.212 18.0105 9.9188 19.6622 8.26713L18.6015 7.20647ZM2 18.75H8V17.25H2V18.75ZM2 15.75H5V14.25H2V15.75ZM21.661 10.7963C21.384 8.80147 21.2078 7.47896 20.7633 6.48414L19.3938 7.09613C19.7296 7.84754 19.884 8.90537 20.1753 11.0026L21.661 10.7963ZM20.7633 6.48414C20.6729 6.282 20.5709 6.09084 20.454 5.90756L19.1894 6.71429C19.2642 6.83165 19.3317 6.9573 19.3938 7.09613L20.7633 6.48414ZM20.5203 7.40901L20.6088 7.32047L19.5482 6.25981L19.4597 6.34835L20.5203 7.40901Z"
                            fill="var(--white-color)"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => actionDeleteHandler(message)}
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
                        onClick={(e) => actionBanHandler(message)}
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
                      <button
                        onClick={() => actionAcceptHandler(message)}
                        title="تایید کن"
                        className="inline-block acceptBtn"
                      >
                        <svg
                          width="20"
                          height="13"
                          viewBox="0 0 20 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 2L9.62006 7.64473C7.88447 9.88158 7.01664 11 5.875 11C4.73334 11 3.86553 9.88158 2.12992 7.64473L1 6.18852"
                            stroke="#3C9969"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18.799 1.78616L14.4405 7.6256C12.7134 9.93961 11.8499 11.0966 10.6496 11.149C10.6496 11.149 10.1235 11.2509 9.16185 10.3161"
                            stroke="#3C9969"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => actionRejectHandler(message)}
                        title="رد کردن"
                        className="inline-block deleteBtn"
                      >
                        <svg
                          width="20"
                          height="11"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.344267 0.344279C0.803291 -0.11476 1.5475 -0.11476 2.00654 0.344279L4.50001 2.83768L6.99343 0.344279C7.45247 -0.11476 8.19675 -0.11476 8.65563 0.344279C9.11467 0.803318 9.11467 1.54759 8.65563 2.00647L6.16226 4.4999L8.65579 6.99337C9.11467 7.45241 9.11467 8.19668 8.65579 8.65572C8.19675 9.11476 7.45247 9.11476 6.99343 8.65572L4.49995 6.16226L2.00654 8.65572C1.5475 9.11476 0.803291 9.11476 0.344267 8.65572C-0.114756 8.19668 -0.114756 7.45241 0.344267 6.99337L2.83767 4.5L0.344267 2.00663C-0.114756 1.54759 -0.114756 0.803318 0.344267 0.344279Z"
                            fill="#DC3545"
                          />
                          <path
                            d="M0.344267 0.344279C0.803291 -0.11476 1.5475 -0.11476 2.00654 0.344279L4.50001 2.83768L6.99343 0.344279C7.45247 -0.11476 8.19675 -0.11476 8.65563 0.344279C9.11467 0.803318 9.11467 1.54759 8.65563 2.00647L6.16226 4.4999L8.65579 6.99337C9.11467 7.45241 9.11467 8.19668 8.65579 8.65572C8.19675 9.11476 7.45247 9.11476 6.99343 8.65572L4.49995 6.16226L2.00654 8.65572C1.5475 9.11476 0.803291 9.11476 0.344267 8.65572C-0.114756 8.19668 -0.114756 7.45241 0.344267 6.99337L2.83767 4.5L0.344267 2.00663C-0.114756 1.54759 -0.114756 0.803318 0.344267 0.344279Z"
                            fill="#DC3545"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isModalDelete && (
          <DeleteModal
            role="DELETE_COMMENT"
            deleteAction={deleteAction}
            cancelAction={cancelDeleteAction}
            MainInfo={mainComment}
          ></DeleteModal>
        )}
        {isModalDetail && (
          <DetailModal
            typeInfoShow={"READ"}
            mainInfo={mainComment}
            propertyName="body"
            cancelAction={cancelShowMessageAction}
          ></DetailModal>
        )}
        {isAnswerModal && (
          <EditModal
            updateAction={answerAction}
            cancelAction={cancelAnswerAction}
            userMainInfo={mainComment}
            updateText="ارسال شو"
          >
            <InputBox
              id="answer"
              type="textarea"
              placeHolder="پیغام پاسخگویی"
              validations={[requiredValidatior()]}
              onInputHandler={onInputHandler}
            ></InputBox>
          </EditModal>
        )}
        {isModalBan && (
          <DeleteModal
            role="Ban_COMMENT"
            deleteAction={banMemberAction}
            cancelAction={cancelBanMemberAction}
            MainInfo={mainComment}
          ></DeleteModal>
        )}
        {isAcceptModal && (
          <DeleteModal
            role="ACCEPT_COMMENT"
            deleteAction={acceptAction} // doAcceoptComment
            cancelAction={cancelAcceptAction} // doNotAcceoptComment
            MainInfo={mainComment}
          ></DeleteModal>
        )}
        {isRejectModal && (
          <DeleteModal
            role="REJECT_COMMENT"
            deleteAction={rejectAction} // doRejectComment
            cancelAction={cancelRejectAction} // doNotRejectComment
            MainInfo={mainComment}
          ></DeleteModal>
        )}
        <Toaster></Toaster>
      </>
    );
  }
}

export default Comments;
