import React, { useEffect, useState } from "react";
import { mainUrl, mainUrlApi } from "../../../Utils/Utils";
import { Link } from "react-router-dom";
import DeleteModal from "../../../Components/Modals/DeleteModal/DeleteModal";
import InputBox from "../../../Components/InputBox/InputBox";
import {
  requiredValidatior,
  fileValidator,
} from "../../../Components/InputBox/Validation/Rules";
import { useForm } from "../../../Hooks/useForm";
import Editor from "../../../Components/Editor/Editor";
import CategoryBar from "../../../Components/CategoryBar/CategoryBar";
import { Toaster, toast } from "react-hot-toast";
body: "<p>این یه بادی تستیه</p>";
categoryID: "635ef447f058a6af04d00510";
cover: "da877ea96a7e8f7c9bced14ac791f424af4b0b4eab101ef636545c20e9eed116.jpg";
createdAt: "2022-11-08T08:56:09.154Z";
creator: {
  createdAt: "2022-10-18T09:03:38.702Z";
  email: "qadiryoilme@gmail.com";
  name: "قدیر یلمه";
  phone: "09156781234";
  profile: "/images/yolme.jpg";
  role: "ADMIN";
  updatedAt: "2022-10-18T09:03:38.702Z";
  username: "qadir_yolme";
  __v: 0;
  _id: "634e6bea1d5142b91afa9bb7";
}
description: "این توضیحات تستی برای پیش نویس مقاله هست";
publish: 0;
shortName: "test-link";
title: "مقاله فیک برای تست پیش نویس";
updatedAt: "2022-11-08T08:56:09.154Z";
__v: 0;
function Article() {
  const [allArticle, setAllArticle] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [htmlTemplateNewArticle, setHtmlTemplateNewArticle] = useState("");
  const [formState, onInputHandler] = useForm(
    {
      ArticleTitle: {
        value: "",
        isValid: false,
      },
      ArticleShortName: {
        value: "",
        isValid: false,
      },
      ArticleImage: {
        value: "",
        isValid: false,
      },
      ArticleDesc: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [categoyCourse, setCategoyCourse] = useState([]);
  const [articleCover, setArticleCover] = useState(null);
  const [mainItemCategoryCourse, setMainItemCategoryCourse] = useState({
    _id: "-1",
    title: "یک دسته بندی انتخاب کن",
  });
  const [parentCategoryID, setParentCategoryID] = useState(-1);
  const [categoyCourseWithDefaultValue, setCategoyCourseWithDefaultValue] =
    useState([]);

  const getCategoryCourse = async () => {
    fetch(`${mainUrlApi}/category`).then(async (res) => {
      if (res.status === 404) {
        toast.error("دسته بندی یافت نشد");
      } else if (res.status === 200) {
        const categoryData = await res.json();

        let mainLeaderMenusWithDefualtValue = [
          ...categoryData,
          mainItemCategoryCourse,
        ];
        setCategoyCourseWithDefaultValue(mainLeaderMenusWithDefualtValue);
        setCategoyCourse(categoryData);
      }
    });
  };

  const articleRender = async () => {
    fetch(`${mainUrlApi}/articles`).then(async (res) => {
      const allArticleData = await res.json();
      setAllArticle(allArticleData);
    });
  };

  const addNewArticleHandler = () => {
    if (
      formState.isFormValid &&
      parentCategoryID != -1 &&
      htmlTemplateNewArticle
    ) {
      const localStorageData = JSON.parse(localStorage.getItem("token"));

      let formData = new FormData();

      formData.append("title", formState.inputs.ArticleTitle.value.trim());
      formData.append(
        "shortName",
        formState.inputs.ArticleShortName.value.trim()
      );
      formData.append("cover", articleCover);
      formData.append("description", formState.inputs.ArticleDesc.value.trim());
      formData.append("body", htmlTemplateNewArticle);
      formData.append("categoryID", parentCategoryID);

      fetch(`${mainUrlApi}/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.status === 201) {
          toast.success("مقاله با موفقیت ساخته شد");
          articleRender();
        } else if (res.status === 400) {
          toast.error("خطا در سرور");
        }
      });
    } else {
      toast.error("مشخصات رو کامل پر کنید");
    }
  };

  const actionDeleteHandler = (Article) => {
    setMainArticle(Article);
    setIsModalDelete(true);
  };

  const deleteAction = () => {
    const localStorageData = JSON.parse(localStorage.getItem("token"));
    fetch(`${mainUrlApi}/articles/${mainArticle._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setIsModalDelete(false);
        toast.success("مقاله با موفقیت پاک شد");
      } else {
        toast.error("خطا در سرور");
      }
    });
  };

  const cancelDeleteAction = () => {
    setIsModalDelete(false);
  };

  useEffect(() => {
    articleRender();
    getCategoryCourse();
  }, []);
  return (
    <>
      <div className="panel-home__last-users hpc__custom-scroll hpc__part-section">
        <div className="login-form__box-inputs my-5">
          <div className="grid gap-10 grid-cols-12 hpc__center">
            <div className="col-span-12 grid gap-10 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="ArticleTitle"
                  onInputHandler={onInputHandler}
                  placeHolder="عنوان مقاله"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="ArticleShortName"
                  onInputHandler={onInputHandler}
                  placeHolder="نام کوتاه"
                  validations={[requiredValidatior()]}
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <InputBox
                  mode="dark-input"
                  id="ArticleImage"
                  validations={[fileValidator()]}
                  onInputHandler={onInputHandler}
                  onChange={(e) => setArticleCover(e.target.files[0])}
                  type="file"
                ></InputBox>
              </div>
              <div className="col-span-12 lg:col-span-6 my-5">
                <div className="courses-header__custom-fillter w-full">
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
                    {categoyCourse.length && (
                      <CategoryBar
                        setCategoryId={setParentCategoryID}
                        mainItemCategoryCourse={mainItemCategoryCourse}
                        categorItemArray={categoyCourseWithDefaultValue}
                        setMainItemCategoryCourse={setMainItemCategoryCourse}
                      ></CategoryBar>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-12 my-16">
                <InputBox
                  mode="dark-input"
                  id="ArticleDesc"
                  type="textarea"
                  placeHolder="توضیحات دوره"
                  validations={[requiredValidatior()]}
                  onInputHandler={onInputHandler}
                ></InputBox>
              </div>
            </div>

            <div className="col-span-12 my-5">
              <Editor
                value={htmlTemplateNewArticle}
                setValue={setHtmlTemplateNewArticle}
              ></Editor>
            </div>

            <div className="col-span-12 my-5">
              <button
                onClick={addNewArticleHandler}
                id="submit-new-user-btn"
                className="login-form__submit w-full"
              >
                اضافه شو
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hpc__part-section flex flex-col gap-5">
        <div className="panel-home__last-users__title hpc__title">
          تمامی دوره ها
        </div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th>#</th>
                <th className="hidden lg:block">عکس</th>
                <th>عنوان</th>
                <th>لینک</th>
                <th>نویسنده</th>
                <th>زمان انتشار</th>
                <th>کنترل</th>
              </tr>
            </thead>
            <tbody id="course-tbody-table">
              {allArticle.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td className="hidden lg:block w-44">
                    <Link to={`/Course/${article.shortName}`}>
                      <img
                        className="w-full rounded-lg"
                        src={`${mainUrl}/courses/covers/${article.cover}`}
                        alt=""
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/blog/${article.shortName}`}>
                      {article.title}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/blog/${article.shortName}`}>
                      {article.shortName}
                    </Link>
                  </td>
                  <td>{article.creator.name}</td>
                  <td>
                    {new Date(article.updatedAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td>
                    <button
                      onClick={(e) => actionDeleteHandler(article)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalDelete && (
        <DeleteModal
          role="DELETE_ARTICLE"
          deleteAction={deleteAction}
          cancelAction={cancelDeleteAction}
          MainInfo={mainArticle}
        ></DeleteModal>
      )}
      <Toaster></Toaster>
    </>
  );
}

export default Article;
