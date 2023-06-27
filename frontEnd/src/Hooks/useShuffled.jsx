import React from "react";

const useShuffled = (array) => {
  const shuffledArrayMenu = array.sort((a, b) => 0.5 - Math.random());
  return shuffledArrayMenu;
};

export default useShuffled;
