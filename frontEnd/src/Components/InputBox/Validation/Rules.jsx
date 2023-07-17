const requiredValue = "REQUIRED_VALUE";
const maxValue = "MAX_VALUE";
const minValue = "MIN_VALUE";
const emailValue = "EMAIL_VALUE";
const fileImageValue = "FILE_IMAGE";

export const requiredValidatior = () => ({
  value: requiredValue,
});

export const maxValidator = (max) => ({
  value: maxValue,
  max,
});

export const minValidator = (min) => ({
  value: minValue,
  min,
});

export const emailValidator = () => ({
  value: emailValue,
});

export const fileValidator = () => ({
  value: fileImageValue,
});

export default {
  requiredValue,
  maxValue,
  minValue,
  emailValue,
  fileImageValue,
};
