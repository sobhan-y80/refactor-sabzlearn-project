import React, { useEffect, useState } from "react";

function CategoryBar({
  categorItemArray,
  mainItemCategoryCourse,
  setMainItemCategoryCourse,
  changeCategoryHandler = null,
  isKey = false,
  setCategoryId = null,
  propertyValue = null,
}) {
  const [itemCategoryCourse, setItemCategoryCourse] = useState([]);
  const [propertyName, setPropertyName] = useState(
    propertyValue ? propertyValue : "title"
  );

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
      className="custom-fillter__dropdown-list h-80 overflow-y-auto"
      onClick={(e) => changeCategorySortHandler(e)}
    >
      {itemCategoryCourse.map((item) => (
        <li
          key={item._id}
          className={`custom-fillter__dropdown-item`}
          data-key={isKey ? item.key : item._id}
        >
          {item[propertyName]}
        </li>
      ))}
    </ul>
  );
}

export default CategoryBar;
