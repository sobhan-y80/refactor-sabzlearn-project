import React, { useEffect, useState } from "react";

function CategoryBar({
  categorItemArray,
  mainCategoryItem,
  mainItemCategoryCourse,
  setMainItemCategoryCourse,
  changeCategoryHandler = null,
}) {
  const [itemCategoryCourse, setItemCategoryCourse] = useState([]);

  const changeCategorySortHandler = (e) => {
    changeCategoryHandler && changeCategoryHandler(e);
    const categoryMain = e.target.dataset.key;
    const categoryMainObj = categorItemArray
      .filter((item) => item.key === categoryMain)
      .pop();
    setMainItemCategoryCourse(categoryMainObj);
    console.log(categoryMainObj);
  };

  useEffect(() => {
    const itemCategoryCourseMain = categorItemArray.filter(
      (item) => item.key !== mainItemCategoryCourse.key
    );

    setItemCategoryCourse(itemCategoryCourseMain);
  }, [mainItemCategoryCourse]);

  return (
    <ul
      className="custom-fillter__dropdown-list"
      onClick={(e) => changeCategorySortHandler(e)}
    >
      {itemCategoryCourse.map((item) => (
        <li
          key={item.id}
          className={`custom-fillter__dropdown-item`}
          data-key={item.key}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryBar;
