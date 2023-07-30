import React, { useEffect, useState } from "react";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { mainUrlApi } from "../../../Utils/Utils";
import { useForm } from "../../../Hooks/useForm";
import InputBox from "../../../Components/InputBox/InputBox";
import {
  fileValidator,
  requiredValidatior,
} from "../../../Components/InputBox/Validation/Rules";
import { Toaster, toast } from "react-hot-toast";
import TicketBox from "../../../Components/TicketBox/TicketBox";

const mainListTicketObj = {
  _id: "-1",
  title: "لطفا یک گزینه را انتخاب کنید",
};

const mainItemTicketObj = {
  _id: "-1",
  title: "لطفا یک دپارتمان انتخاب کنید",
};

const mainImportantObj = {
  _id: "-1",
  title: "اولویت تیکت خود را مشخص کنید",
};

const listImportantObj = [
  { _id: "0", title: "کم" },
  { _id: "1", title: "متوسط" },
  { _id: "2", title: "زیاد" },
];

function Tickets() {
  const [isNewTicket, setIsNewTicket] = useState(false);

  // ============== Start New Ticket Handler ==============

  const [listTicketDepartment, setListTicketDepartment] = useState([]);
  const [mainItemCategoryCourse, setMainItemCategoryCourse] =
    useState(mainListTicketObj);
  const [listTicketDepartmentDifValue, setListTicketDepartmentDifValue] =
    useState([]);

  const [itemTicketDepartment, setItemTicketDepartment] = useState([]);
  const [mainItemTicketDepartment, setMainItemTicketDepartment] =
    useState(mainItemTicketObj);

  const [listTicketImportant, setListTicketImportant] =
    useState(listImportantObj);
  const [mainListTicketImportant, setMainListTicketImportant] =
    useState(mainImportantObj);

  const [ticketFile, setTicketFile] = useState(null);

  const [formState, onInputHandler] = useForm(
    {
      ticketTitle: {
        value: "",
        isValid: false,
      },
      ticketBody: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const listTicketDepartmentRender = () => {
    fetch(`${mainUrlApi}/tickets/departments`)
      .then((res) => res.json())
      .then((listTicketData) => {
        let mainlistTicketDepartmentDifValue;

        if (mainItemCategoryCourse._id === mainListTicketObj._id) {
          mainlistTicketDepartmentDifValue = [
            ...listTicketData,
            mainItemCategoryCourse,
          ];
        } else {
          mainlistTicketDepartmentDifValue = [
            ...listTicketData,
            mainListTicketObj,
          ];
          setMainItemCategoryCourse(mainListTicketObj);
        }

        setListTicketDepartment(listTicketData);
        setListTicketDepartmentDifValue(mainlistTicketDepartmentDifValue);
      });
  };

  const addNewTicket = () => {
    if (
      formState.isFormValid &&
      mainItemCategoryCourse._id != -1 &&
      mainItemTicketDepartment._id != -1
    ) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));

      const mainNewTicketObj = {
        departmentID: mainItemCategoryCourse._id,
        departmentSubID: mainItemTicketDepartment._id,
        title: formState.inputs.ticketTitle.value,
        body: formState.inputs.ticketBody.value,
        priority: 23,
      };

      fetch(`${mainUrlApi}/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainNewTicketObj),
      }).then((res) => {
        if (res.status === 201) {
          toast.success("تیکت با موفقیت ثبت شد");
          allTicketReder();
          setTimeout(() => {
            setIsNewTicket(false);
          }, 3000);
        } else {
          toast.error("خطا در سرور");
        }
      });
    } else {
      toast.error("لطفا اطلاعات را به درستی کامل کنید");
    }
  };

  useEffect(() => {
    if (mainItemCategoryCourse._id != -1) {
      fetch(
        `${mainUrlApi}/tickets/departments-subs/${mainItemCategoryCourse._id}`
      )
        .then((res) => res.json())
        .then((mainItemDipartmentData) =>
          setItemTicketDepartment(mainItemDipartmentData)
        );
    } else {
      setMainItemTicketDepartment(mainItemTicketObj);
      setItemTicketDepartment([]);
    }
  }, [mainItemCategoryCourse]);

  // ============== Finish New Ticket Handler ==============

  // ============== Start Show Tickets Handler ==============
  const [allTickets, setAllTickets] = useState([]);
  const [answerTickets, setAnswerTickets] = useState();
  const [notAnswerTickets, setNotAnswerTickets] = useState();

  const allTicketReder = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`${mainUrlApi}/tickets/user`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allTicketData) => {
        let answerTicketArray = allTicketData.filter(
          (ticket) => ticket.answer === 1
        );
        let notAnswerTicketArray = allTicketData.filter(
          (ticket) => ticket.answer === 0
        );
        setAnswerTickets(answerTicketArray);
        setNotAnswerTickets(notAnswerTicketArray);
        setAllTickets(allTicketData);
      });
  };

  // ============== Finish Show Tickets Handler ==============

  useEffect(() => {
    listTicketDepartmentRender();
    allTicketReder();
  }, []);

  if (isNewTicket) {
    return (
      <>
        <div className="grid grid-cols-12 gap-10">
          <button
            onClick={() => setIsNewTicket(false)}
            className="relative overflow-hidden group text-white hover:text-[#43c67a] hover:bg-[#43c67a] trnasition duration-700 col-span-12 h-[5rem] flex items-center justify-center gap-5 border border-solid border-[#43c67a] rounded-lg"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#43c67a] group-hover:fill-white"
            >
              <path d="M2.00005 5L2.00005 5.75H2.00005V5ZM3.00005 14.25C2.58584 14.25 2.25005 14.5858 2.25005 15C2.25005 15.4142 2.58584 15.75 3.00005 15.75V14.25ZM3.67204 9.53269C3.96624 9.82427 4.44111 9.82215 4.73269 9.52796C5.02427 9.23376 5.02216 8.75889 4.72796 8.46731L3.67204 9.53269ZM2.78962 7.60215L2.26167 8.13484H2.26167L2.78962 7.60215ZM2.78962 2.39785L2.26167 1.86516L2.26167 1.86516L2.78962 2.39785ZM4.72796 1.53269C5.02216 1.24111 5.02427 0.766238 4.73269 0.472041C4.44111 0.177844 3.96624 0.175726 3.67204 0.467309L4.72796 1.53269ZM1.01591 5.25067L0.271931 5.34549L0.271931 5.3455L1.01591 5.25067ZM1.01591 4.74933L0.271931 4.6545L0.271931 4.65451L1.01591 4.74933ZM2.00005 5.75H11V4.25H2.00005V5.75ZM11 14.25H3.00005V15.75H11V14.25ZM15.25 10C15.25 12.3472 13.3473 14.25 11 14.25V15.75C14.1757 15.75 16.75 13.1756 16.75 10H15.25ZM11 5.75C13.3473 5.75 15.25 7.65279 15.25 10H16.75C16.75 6.82436 14.1757 4.25 11 4.25V5.75ZM4.72796 8.46731L3.31758 7.06946L2.26167 8.13484L3.67204 9.53269L4.72796 8.46731ZM3.31758 2.93054L4.72796 1.53269L3.67204 0.467309L2.26167 1.86516L3.31758 2.93054ZM3.31758 7.06946C2.74268 6.49967 2.35733 6.11614 2.09823 5.79351C1.84863 5.48272 1.77852 5.302 1.75989 5.15584L0.271931 5.3455C0.339893 5.87869 0.594265 6.31633 0.928691 6.73276C1.25361 7.13735 1.71182 7.58988 2.26167 8.13484L3.31758 7.06946ZM2.26167 1.86516C1.71182 2.41012 1.25362 2.86265 0.928692 3.26724C0.594266 3.68366 0.339893 4.12131 0.271931 4.6545L1.75989 4.84416C1.77852 4.698 1.84863 4.51728 2.09823 4.20649C2.35733 3.88386 2.74268 3.50033 3.31758 2.93054L2.26167 1.86516ZM1.75989 5.15584C1.7533 5.10409 1.75 5.05204 1.75 5H0.25C0.25 5.1154 0.257311 5.23079 0.271931 5.34549L1.75989 5.15584ZM1.75 5C1.75 4.94796 1.7533 4.89591 1.75989 4.84416L0.271931 4.65451C0.257311 4.76921 0.25 4.8846 0.25 5H1.75ZM2.00005 4.25L1 4.25L0.999999 5.75L2.00005 5.75L2.00005 4.25Z" />
            </svg>
            <span className="group-hover:absolute -right-96 duration-100">
              لیست تیکت ها
            </span>
          </button>
          <div className="hpc__part-section col-span-12 grid grid-cols-12 gap-14">
            <div className="col-span-12 hpc__title">تیکت جدید</div>
            <div className="courses-header__custom-fillter w-full col-span-12 md:col-span-6">
              <span className="custom-fillter__default">
                <span
                  id="custom-filter__selection-name"
                  className="custom-fillter__default-name"
                >
                  {mainItemCategoryCourse.title}
                </span>
                <svg
                  className="svg-inline--fa fa-angle-down custom-fillter-icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                  ></path>
                </svg>
              </span>
              <div className="custom-fillter__dropdown">
                {listTicketDepartment.length && (
                  <CategoryBar
                    setCategoryId={setMainItemCategoryCourse}
                    mainItemCategoryCourse={mainItemCategoryCourse}
                    categorItemArray={listTicketDepartmentDifValue}
                    setMainItemCategoryCourse={setMainItemCategoryCourse}
                  ></CategoryBar>
                )}
              </div>
            </div>
            <div className="courses-header__custom-fillter w-full col-span-12 md:col-span-6">
              <span className="custom-fillter__default">
                <span
                  id="custom-filter__selection-name"
                  className="custom-fillter__default-name"
                >
                  {mainItemTicketDepartment.title}
                </span>
                <svg
                  className="svg-inline--fa fa-angle-down custom-fillter-icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                  ></path>
                </svg>
              </span>
              <div className="custom-fillter__dropdown">
                {listTicketDepartment.length && (
                  <CategoryBar
                    mainItemCategoryCourse={mainItemTicketDepartment}
                    categorItemArray={itemTicketDepartment}
                    setMainItemCategoryCourse={setMainItemTicketDepartment}
                  ></CategoryBar>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 my-5">
              <InputBox
                mode="dark-input"
                id="ticketTitle"
                onInputHandler={onInputHandler}
                placeHolder="عنوان تیکت"
                validations={[requiredValidatior()]}
              ></InputBox>
            </div>
            <div className="courses-header__custom-fillter w-full col-span-12 md:col-span-6">
              <span className="custom-fillter__default">
                <span
                  id="custom-filter__selection-name"
                  className="custom-fillter__default-name"
                >
                  {mainListTicketImportant.title}
                </span>
                <svg
                  className="svg-inline--fa fa-angle-down custom-fillter-icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                  ></path>
                </svg>
              </span>
              <div className="custom-fillter__dropdown">
                {listTicketDepartment.length && (
                  <CategoryBar
                    mainItemCategoryCourse={mainListTicketImportant}
                    categorItemArray={listTicketImportant}
                    setMainItemCategoryCourse={setMainListTicketImportant}
                  ></CategoryBar>
                )}
              </div>
            </div>
            <div className="col-span-12 my-5">
              <InputBox
                mode="dark-input"
                id="ticketBody"
                type="textarea"
                placeHolder="محتوای تیکت"
                validations={[requiredValidatior()]}
                onInputHandler={onInputHandler}
              ></InputBox>
            </div>
            <div className="col-span-12 my-5 hpc__center">
              <button
                id="submit-new-menu-btn"
                className="login-form__submit w-100 w-lg-50"
                onClick={addNewTicket}
              >
                ارسال شوو
              </button>
            </div>
          </div>
        </div>
        <Toaster></Toaster>
      </>
    );
  } else {
    return (
      <>
        {allTickets.length ? (
          <div className="flex flex-col gap-5">
            <button
              title="تیکت جدید"
              onClick={() => setIsNewTicket(true)}
              className="relative overflow-hidden group text-white hover:text-[#43c67a] hover:bg-[#43c67a] trnasition duration-700 w-full h-[5rem] flex items-center justify-center gap-5 border border-solid border-[#43c67a] rounded-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-0 group-hover:opacity-100"
              >
                <g clipPath="url(#clip0_22_3)">
                  <path
                    d="M11.75 8C11.75 7.58579 11.4142 7.25 11 7.25C10.5858 7.25 10.25 7.58579 10.25 8V10.25H8C7.58579 10.25 7.25 10.5858 7.25 11C7.25 11.4142 7.58579 11.75 8 11.75H10.25V14C10.25 14.4142 10.5858 14.75 11 14.75C11.4142 14.75 11.75 14.4142 11.75 14V11.75H14C14.4142 11.75 14.75 11.4142 14.75 11C14.75 10.5858 14.4142 10.25 14 10.25H11.75V8Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.3798 1.34815C16.5734 0.762324 15.6291 0.500006 14.4635 0.373728C13.3214 0.249985 11.8818 0.249992 10.0452 0.25H9.98893C8.82888 0.25 7.83152 0.25 6.97432 0.279369C5.10087 0.343555 3.7239 0.546296 2.62024 1.34815C2.13209 1.70281 1.70281 2.13209 1.34815 2.62024C0.546295 3.7239 0.343555 5.10087 0.279369 6.97432C0.25 7.83153 0.25 8.82891 0.25 9.98898V10.0453C0.249992 11.8818 0.249985 13.3214 0.373728 14.4635C0.500006 15.6291 0.762323 16.5734 1.34815 17.3798C1.70281 17.8679 2.13209 18.2972 2.62024 18.6518C3.42656 19.2377 4.37094 19.5 5.53648 19.6263C6.67859 19.75 8.11817 19.75 9.95465 19.75H10.0453C11.8818 19.75 13.3214 19.75 14.4635 19.6263C15.6291 19.5 16.5734 19.2377 17.3798 18.6518C17.8679 18.2972 18.2972 17.8679 18.6518 17.3798C19.2377 16.5734 19.5 15.6291 19.6263 14.4635C19.75 13.3214 19.75 11.8818 19.75 10.0453V9.95473C19.75 8.11824 19.75 6.67859 19.6263 5.53648C19.5 4.37094 19.2377 3.42656 18.6518 2.62024C18.2972 2.13209 17.8679 1.70281 17.3798 1.34815ZM10 1.75C11.8916 1.75 13.25 1.75103 14.302 1.865C15.3399 1.97745 15.9901 2.19259 16.4981 2.56168C16.8589 2.82382 17.1762 3.14111 17.4383 3.50191C17.8074 4.00992 18.0225 4.66013 18.135 5.69804C18.249 6.74999 18.25 8.10843 18.25 10C18.25 11.8916 18.249 13.25 18.135 14.302C18.0225 15.3399 17.8074 15.9901 17.4383 16.4981C17.1762 16.8589 16.8589 17.1762 16.4981 17.4383C15.9901 17.8074 15.3399 18.0225 14.302 18.135C13.25 18.249 11.8916 18.25 10 18.25C8.10843 18.25 6.74999 18.249 5.69804 18.135C4.66013 18.0225 4.00992 17.8074 3.50191 17.4383C3.14111 17.1762 2.82382 16.8589 2.56168 16.4981C2.19259 15.9901 1.97745 15.3399 1.865 14.302C1.75103 13.25 1.75 11.8916 1.75 10C1.75 9.15165 1.75005 8.40822 1.76082 7.74818C2.23547 7.74381 2.58489 7.72904 2.8995 7.67921C5.35988 7.28952 7.28952 5.35988 7.67921 2.8995C7.72904 2.58489 7.74381 2.23547 7.74818 1.76082C8.40822 1.75005 9.15165 1.75 10 1.75ZM2.66485 6.19768C2.45981 6.23015 2.22239 6.24254 1.81744 6.24722C1.91121 4.88688 2.12615 4.10137 2.56168 3.50191C2.82382 3.14111 3.14111 2.82382 3.50191 2.56168C4.10137 2.12615 4.88688 1.91121 6.24722 1.81744C6.24254 2.22238 6.23015 2.45981 6.19768 2.66485C5.90965 4.48339 4.48339 5.90965 2.66485 6.19768Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_22_3">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="group-hover:absolute -right-96 duration-100">
                تیکت جدید
              </span>
            </button>
            <div className="flex flex-col gap-5">
              <div className="hpc__part-section col-span-12 flex justify-between gap-5">
                <div className="w-4/12 py-5 flex flex-col gap-5 items-center bg-[#242532] rounded-lg cursor-default">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#43c67a]"
                  >
                    <path d="M7.75 1C7.75 0.585786 7.41421 0.25 7 0.25C6.58579 0.25 6.25 0.585786 6.25 1V2.06667C6.25 2.48088 6.58579 2.81667 7 2.81667C7.41421 2.81667 7.75 2.48088 7.75 2.06667V1Z" />
                    <path d="M7.75 5.26667C7.75 4.85245 7.41421 4.51667 7 4.51667C6.58579 4.51667 6.25 4.85245 6.25 5.26667V7.4C6.25 7.81421 6.58579 8.15 7 8.15C7.41421 8.15 7.75 7.81421 7.75 7.4V5.26667Z" />
                    <path d="M7.75 10.6C7.75 10.1858 7.41421 9.85 7 9.85C6.58579 9.85 6.25 10.1858 6.25 10.6V12.7333C6.25 13.1475 6.58579 13.4833 7 13.4833C7.41421 13.4833 7.75 13.1475 7.75 12.7333V10.6Z" />
                    <path d="M7.75 15.9333C7.75 15.5191 7.41421 15.1833 7 15.1833C6.58579 15.1833 6.25 15.5191 6.25 15.9333V17C6.25 17.4142 6.58579 17.75 7 17.75C7.41421 17.75 7.75 17.4142 7.75 17V15.9333Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6979 6.51233C14.1685 4.82922 11.8315 4.82922 11.3021 6.51233C11.258 6.65245 11.1417 6.72473 11.035 6.72473C9.25955 6.72473 8.63517 8.99751 9.97762 10.005C10.0791 10.0812 10.1329 10.2295 10.0877 10.3732C9.82931 11.1946 10.1618 11.9661 10.7282 12.3912C11.2981 12.8189 12.141 12.918 12.843 12.3912C12.9383 12.3197 13.0617 12.3197 13.157 12.3912C13.859 12.918 14.7019 12.8189 15.2718 12.3912C15.8382 11.9661 16.1707 11.1946 15.9123 10.3732C15.8671 10.2295 15.9209 10.0812 16.0224 10.005C17.3648 8.99751 16.7405 6.72473 14.965 6.72473C14.8583 6.72473 14.742 6.65245 14.6979 6.51233ZM12.733 6.9624C12.822 6.6792 13.178 6.6792 13.267 6.9624C13.4996 7.70164 14.1766 8.22473 14.965 8.22473C15.0418 8.22473 15.091 8.24753 15.1277 8.27685C15.1695 8.31027 15.2093 8.36487 15.232 8.43714C15.2779 8.58309 15.2384 8.71797 15.122 8.80534C14.4993 9.27264 14.2501 10.0877 14.4815 10.8233C14.5324 10.9851 14.4748 11.1139 14.3714 11.1915C14.3185 11.2312 14.2633 11.2485 14.2174 11.2499C14.1777 11.2511 14.1245 11.2419 14.0574 11.1915C13.4286 10.7196 12.5714 10.7196 11.9426 11.1915C11.8755 11.2419 11.8223 11.2511 11.7826 11.2499C11.7366 11.2485 11.6815 11.2312 11.6286 11.1915C11.5252 11.1139 11.4676 10.9851 11.5185 10.8233C11.7499 10.0877 11.5007 9.27264 10.878 8.80534C10.7616 8.71797 10.7221 8.58309 10.768 8.43714C10.7907 8.36487 10.8305 8.31027 10.8723 8.27685C10.909 8.24753 10.9582 8.22473 11.035 8.22473C11.8234 8.22473 12.5004 7.70164 12.733 6.9624Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.44444 0.25C2.57563 0.25 0.25 2.57563 0.25 5.44444C0.25 6.27618 0.72698 7.03421 1.47681 7.39413L1.96417 7.62806C3.1152 8.18055 3.1152 9.81945 1.96417 10.3719L1.47681 10.6059C0.726981 10.9658 0.25 11.7238 0.25 12.5556C0.25 15.4244 2.57563 17.75 5.44444 17.75H16.5556C19.4244 17.75 21.75 15.4244 21.75 12.5556C21.75 11.7238 21.273 10.9658 20.5232 10.6059L20.0358 10.3719C18.8848 9.81945 18.8848 8.18056 20.0358 7.62806L20.5232 7.39413C21.273 7.03421 21.75 6.27618 21.75 5.44444C21.75 2.57563 19.4244 0.25 16.5556 0.25H5.44444ZM1.75 5.44444C1.75 3.40406 3.40406 1.75 5.44444 1.75H16.5556C18.5959 1.75 20.25 3.40406 20.25 5.44444C20.25 5.69929 20.1038 5.93156 19.8741 6.04184L19.3867 6.27578C17.1012 7.37285 17.1012 10.6272 19.3867 11.7242L19.8741 11.9582C20.1038 12.0684 20.25 12.3007 20.25 12.5556C20.25 14.5959 18.5959 16.25 16.5556 16.25H5.44444C3.40406 16.25 1.75 14.5959 1.75 12.5556C1.75 12.3007 1.89615 12.0684 2.1259 11.9582L2.61327 11.7242C4.89884 10.6272 4.89883 7.37285 2.61327 6.27578L2.1259 6.04184C1.89615 5.93156 1.75 5.69929 1.75 5.44444Z"
                    />
                  </svg>

                  <span>پاسخ داده شده</span>
                  <span className="text-[#43c67a]">{answerTickets.length}</span>
                </div>
                <div className="w-4/12 py-5 flex flex-col gap-5 items-center bg-[#242532] rounded-lg cursor-default">
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#dc3545]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.8843 0.250001C12.9858 0.249973 12.2366 0.249949 11.6418 0.329915C11.014 0.414319 10.4472 0.59999 9.99172 1.05546C9.53625 1.51093 9.35058 2.07773 9.26617 2.70552C9.22272 3.0287 9.20289 3.39748 9.19384 3.81102C9.08302 3.41132 8.97834 3.06284 8.86519 2.76832C8.68822 2.30771 8.46191 1.8981 8.08304 1.58019C7.8373 1.37399 7.55737 1.21237 7.25593 1.10266C6.79117 0.933499 6.32328 0.942315 5.8359 1.01936C5.37063 1.09291 4.81066 1.24297 4.13954 1.42281L4.10107 1.43312C1.33001 2.17562 -0.314462 5.02393 0.428041 7.79499C0.643309 8.59838 1.30023 9.20713 2.11766 9.36072L2.64897 9.46054C3.90377 9.6963 4.32795 11.2793 3.35914 12.1109L2.83417 12.5615C2.27319 13.043 2.03805 13.8036 2.22939 14.5177C2.272 14.6767 2.33486 14.8296 2.41643 14.9726L2.60378 15.3011C3.46745 16.8153 5.07675 17.75 6.81991 17.75L9.99994 17.75L9.93626 17.75H18.4918C21.3606 17.75 23.6863 15.4244 23.6863 12.5556C23.6863 11.7238 23.2093 10.9658 22.4595 10.6059L21.9721 10.3719C20.8211 9.81945 20.8211 8.18056 21.9721 7.62807L22.4595 7.39413C23.2093 7.03421 23.6863 6.27618 23.6863 5.44445C23.6863 2.57564 21.3606 0.250003 18.4918 0.250003L13.8843 0.250001ZM10.6864 9.58972C10.6865 9.59795 10.6864 9.60616 10.6863 9.61436L10.6758 9.72514L10.6863 10C10.6863 10.4142 10.3505 10.75 9.93626 10.75C9.52205 10.75 9.18626 10.4142 9.18626 10V9.69242L8.38456 6.57951L7.92539 4.86584C7.73258 4.14629 7.6022 3.66344 7.46498 3.30629C7.33258 2.96169 7.22305 2.81668 7.11885 2.72925C7.00715 2.63553 6.87992 2.56207 6.7429 2.51219C6.61508 2.46567 6.43474 2.44332 6.0701 2.50096C5.6922 2.5607 5.20885 2.68921 4.4893 2.88201C2.51844 3.4101 1.34884 5.4359 1.87693 7.40676C1.94289 7.65293 2.14417 7.83945 2.39464 7.88651L2.92595 7.98634C5.41758 8.45448 6.25986 11.5979 4.33611 13.2491L3.81115 13.6997C3.6879 13.8055 3.63624 13.9726 3.67828 14.1295C3.68764 14.1644 3.70145 14.198 3.71937 14.2294L3.90672 14.5579C4.50349 15.6041 5.61545 16.25 6.81991 16.25H18.4918C20.5322 16.25 22.1863 14.5959 22.1863 12.5556C22.1863 12.3007 22.0401 12.0684 21.8104 11.9582L21.323 11.7242C19.0374 10.6272 19.0374 7.37285 21.323 6.27578L21.8104 6.04184C22.0401 5.93156 22.1863 5.6993 22.1863 5.44445C22.1863 3.40406 20.5322 1.75 18.4918 1.75H13.9363C12.9722 1.75 12.3247 1.7516 11.8417 1.81654C11.3802 1.87858 11.1827 1.9858 11.0524 2.11612C10.9221 2.24644 10.8148 2.44393 10.7528 2.9054C10.6879 3.38843 10.6863 4.03599 10.6863 5V9.58148C10.6863 9.58423 10.6864 9.58698 10.6864 9.58972Z"
                    />
                    <path d="M10.6863 5C10.6863 4.58579 10.3504 4.25 9.93622 4.25C9.52201 4.25 9.18622 4.58579 9.18622 5V6.2C9.18622 6.61421 9.52201 6.95 9.93622 6.95C10.3504 6.95 10.6862 6.61421 10.6862 6.2L10.6863 5Z" />
                    <path d="M10.6863 10C10.6863 9.58579 10.3505 10.75 9.93626 10.75C9.52205 10.75 9.18622 9.38579 9.18622 9.8V12.2C9.18622 12.6142 9.52201 12.95 9.93622 12.95C10.3504 12.95 10.6862 12.6142 10.6862 12.2L10.6863 10Z" />
                    <path d="M10.6862 15.8C10.6862 15.3858 10.3504 15.05 9.93622 15.05C9.52201 15.05 9.18622 15.3858 9.18622 15.8V17C9.18622 17.4142 9.52205 17.75 9.93626 17.75C10.3505 17.75 10.6862 17.4142 10.6862 17V15.8Z" />
                  </svg>

                  <span>بسته شده</span>
                  <span className="text-[#dc3545]">0</span>
                </div>
                <div className="w-4/12 py-5 flex flex-col gap-5 items-center bg-[#242532] rounded-lg cursor-default">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#f7bd02]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.44444 0.25C2.57563 0.25 0.25 2.57563 0.25 5.44444C0.25 6.27618 0.72698 7.03421 1.47681 7.39413L1.96417 7.62806C3.1152 8.18055 3.1152 9.81945 1.96417 10.3719L1.47681 10.6059C0.726981 10.9658 0.25 11.7238 0.25 12.5556C0.25 15.4244 2.57563 17.75 5.44444 17.75H16.5556C19.4244 17.75 21.75 15.4244 21.75 12.5556C21.75 11.7238 21.273 10.9658 20.5232 10.6059L20.0358 10.3719C18.8848 9.81945 18.8848 8.18056 20.0358 7.62806L20.5232 7.39413C21.273 7.03421 21.75 6.27618 21.75 5.44444C21.75 2.57563 19.4244 0.25 16.5556 0.25H5.44444ZM1.75 5.44444C1.75 3.40406 3.40406 1.75 5.44444 1.75H16.5556C18.5959 1.75 20.25 3.40406 20.25 5.44444C20.25 5.69929 20.1038 5.93156 19.8741 6.04184L19.3867 6.27578C17.1012 7.37285 17.1012 10.6272 19.3867 11.7242L19.8741 11.9582C20.1038 12.0684 20.25 12.3007 20.25 12.5556C20.25 14.5959 18.5959 16.25 16.5556 16.25H5.44444C3.40406 16.25 1.75 14.5959 1.75 12.5556C1.75 12.3007 1.89615 12.0684 2.1259 11.9582L2.61327 11.7242C4.89884 10.6272 4.89883 7.37285 2.61327 6.27578L2.1259 6.04184C1.89615 5.93156 1.75 5.69929 1.75 5.44444Z"
                    />
                    <path d="M13.75 1.75C13.75 1.75 13.4337 1.75 13.0195 1.75C12.6053 1.75 12.25 1.75 12.25 1.75V2.06667C12.25 2.48088 12.5858 2.81667 13 2.81667C13.4142 2.81667 13.75 2.48088 13.75 2.06667V1.75Z" />
                    <path d="M13.75 5.26667C13.75 4.85245 13.4142 4.51667 13 4.51667C12.5858 4.51667 12.25 4.85245 12.25 5.26667V7.4C12.25 7.81421 12.5858 8.15 13 8.15C13.4142 8.15 13.75 7.81421 13.75 7.4V5.26667Z" />
                    <path d="M13.75 10.6C13.75 10.1858 13.4142 9.85 13 9.85C12.5858 9.85 12.25 10.1858 12.25 10.6V12.7333C12.25 13.1475 12.5858 13.4833 13 13.4833C13.4142 13.4833 13.75 13.1475 13.75 12.7333V10.6Z" />
                    <path d="M13.75 15.9333C13.75 15.5191 13.4142 15.1833 13 15.1833C12.5858 15.1833 12.25 15.5191 12.25 15.9333V16.25H13H13.75V15.9333Z" />
                  </svg>
                  <span>در انتظار</span>
                  <span className="text-[#f7bd02]">
                    {notAnswerTickets.length}
                  </span>
                </div>
              </div>
              <div className="hpc__part-section flex flex-col gap-5">
                {allTickets.map((ticket) => (
                  <TicketBox key={ticket._id} {...ticket}></TicketBox>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="hpc__title text-center">تیکتی ثبت نکرده ای</div>

            <button
              title="تیکت جدید"
              onClick={() => setIsNewTicket(true)}
              className="relative overflow-hidden group text-white hover:text-[#43c67a] hover:bg-[#43c67a] trnasition duration-700 w-full h-[5rem] flex items-center justify-center gap-5 border border-solid border-[#43c67a] rounded-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-0 group-hover:opacity-100"
              >
                <g clipPath="url(#clip0_22_3)">
                  <path
                    d="M11.75 8C11.75 7.58579 11.4142 7.25 11 7.25C10.5858 7.25 10.25 7.58579 10.25 8V10.25H8C7.58579 10.25 7.25 10.5858 7.25 11C7.25 11.4142 7.58579 11.75 8 11.75H10.25V14C10.25 14.4142 10.5858 14.75 11 14.75C11.4142 14.75 11.75 14.4142 11.75 14V11.75H14C14.4142 11.75 14.75 11.4142 14.75 11C14.75 10.5858 14.4142 10.25 14 10.25H11.75V8Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.3798 1.34815C16.5734 0.762324 15.6291 0.500006 14.4635 0.373728C13.3214 0.249985 11.8818 0.249992 10.0452 0.25H9.98893C8.82888 0.25 7.83152 0.25 6.97432 0.279369C5.10087 0.343555 3.7239 0.546296 2.62024 1.34815C2.13209 1.70281 1.70281 2.13209 1.34815 2.62024C0.546295 3.7239 0.343555 5.10087 0.279369 6.97432C0.25 7.83153 0.25 8.82891 0.25 9.98898V10.0453C0.249992 11.8818 0.249985 13.3214 0.373728 14.4635C0.500006 15.6291 0.762323 16.5734 1.34815 17.3798C1.70281 17.8679 2.13209 18.2972 2.62024 18.6518C3.42656 19.2377 4.37094 19.5 5.53648 19.6263C6.67859 19.75 8.11817 19.75 9.95465 19.75H10.0453C11.8818 19.75 13.3214 19.75 14.4635 19.6263C15.6291 19.5 16.5734 19.2377 17.3798 18.6518C17.8679 18.2972 18.2972 17.8679 18.6518 17.3798C19.2377 16.5734 19.5 15.6291 19.6263 14.4635C19.75 13.3214 19.75 11.8818 19.75 10.0453V9.95473C19.75 8.11824 19.75 6.67859 19.6263 5.53648C19.5 4.37094 19.2377 3.42656 18.6518 2.62024C18.2972 2.13209 17.8679 1.70281 17.3798 1.34815ZM10 1.75C11.8916 1.75 13.25 1.75103 14.302 1.865C15.3399 1.97745 15.9901 2.19259 16.4981 2.56168C16.8589 2.82382 17.1762 3.14111 17.4383 3.50191C17.8074 4.00992 18.0225 4.66013 18.135 5.69804C18.249 6.74999 18.25 8.10843 18.25 10C18.25 11.8916 18.249 13.25 18.135 14.302C18.0225 15.3399 17.8074 15.9901 17.4383 16.4981C17.1762 16.8589 16.8589 17.1762 16.4981 17.4383C15.9901 17.8074 15.3399 18.0225 14.302 18.135C13.25 18.249 11.8916 18.25 10 18.25C8.10843 18.25 6.74999 18.249 5.69804 18.135C4.66013 18.0225 4.00992 17.8074 3.50191 17.4383C3.14111 17.1762 2.82382 16.8589 2.56168 16.4981C2.19259 15.9901 1.97745 15.3399 1.865 14.302C1.75103 13.25 1.75 11.8916 1.75 10C1.75 9.15165 1.75005 8.40822 1.76082 7.74818C2.23547 7.74381 2.58489 7.72904 2.8995 7.67921C5.35988 7.28952 7.28952 5.35988 7.67921 2.8995C7.72904 2.58489 7.74381 2.23547 7.74818 1.76082C8.40822 1.75005 9.15165 1.75 10 1.75ZM2.66485 6.19768C2.45981 6.23015 2.22239 6.24254 1.81744 6.24722C1.91121 4.88688 2.12615 4.10137 2.56168 3.50191C2.82382 3.14111 3.14111 2.82382 3.50191 2.56168C4.10137 2.12615 4.88688 1.91121 6.24722 1.81744C6.24254 2.22238 6.23015 2.45981 6.19768 2.66485C5.90965 4.48339 4.48339 5.90965 2.66485 6.19768Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_22_3">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="group-hover:absolute -right-96 duration-100">
                تیکت جدید
              </span>
            </button>
          </>
        )}
        <Toaster></Toaster>
      </>
    );
  }
}

export default Tickets;
