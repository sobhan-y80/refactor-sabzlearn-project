import React, { useEffect, useState } from "react";

function CategoryBar({
  categorItemArray,
  mainItemCategoryCourse,
  setMainItemCategoryCourse,
  changeCategoryHandler = null,
  isKey = false,
  setCategoryId = null,
}) {
  console.log("categorItemArray", categorItemArray);
  const [itemCategoryCourse, setItemCategoryCourse] = useState([]);

  const changeCategorySortHandler = (e) => {
    changeCategoryHandler && changeCategoryHandler(e);

    const categoryMain = e.target.dataset.key;

    setCategoryId && setCategoryId(categoryMain);

    const categoryMainObj = categorItemArray
      .filter((item) => (isKey ? item.key : item._id === categoryMain))
      .pop();

    setMainItemCategoryCourse(categoryMainObj);
  };

  useEffect(() => {
    let itemCategoryCourseMain;
    if (isKey) {
      itemCategoryCourseMain = categorItemArray.filter(
        (item) => item.key !== mainItemCategoryCourse.key
      );
    } else {
      itemCategoryCourseMain = categorItemArray.filter(
        (item) => item._id !== mainItemCategoryCourse._id
      );
    }

    setItemCategoryCourse(itemCategoryCourseMain);
  }, [mainItemCategoryCourse, categorItemArray]);

  return (
    <ul
      className="custom-fillter__dropdown-list"
      onClick={(e) => changeCategorySortHandler(e)}
    >
      {itemCategoryCourse.map((item) => (
        <li
          key={item._id}
          className={`custom-fillter__dropdown-item`}
          data-key={isKey ? item.key : item._id}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default CategoryBar;
