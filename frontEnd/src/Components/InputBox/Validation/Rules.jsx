const requiredValue = "REQUIRED_VALUE";
const maxValue = "MAX_VALUE";
const minValue = "MIN_VALUE";
const emailValue = "EMAIL_VALUE";

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

export default { requiredValue, maxValue, minValue, emailValue };
