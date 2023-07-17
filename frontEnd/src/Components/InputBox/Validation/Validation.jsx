import { testEmail } from "./EmailRegex";
import Rules from "./Rules";
const validator = (value, validation) => {
  const validationResualt = [];

  const mainValue = !validator.value === Rules.fileImageValue && value.trim();

  for (const validator of validation) {
    if (validator.value === Rules.requiredValue) {
      mainValue.length === 0 && validationResualt.push(false);
    }
    if (validator.value === Rules.maxValue) {
      mainValue.length > validator.max && validationResualt.push(false);
    }
    if (validator.value === Rules.minValue) {
      mainValue.length < validator.min && validationResualt.push(false);
    }
    if (validator.value === Rules.emailValue) {
      !testEmail(value) && validationResualt.push(false);
    }
    if (validator.value === Rules.fileImageValue) {
      value.length === 0 && validationResualt.push(false);
    }
  }

  if (validationResualt.length) {
    return false;
  } else {
    return true;
  }
};

export default validator;
