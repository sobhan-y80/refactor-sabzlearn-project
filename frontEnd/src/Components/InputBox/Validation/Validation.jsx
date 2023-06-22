import { testEmail } from "./EmailRegex";
import Rules from "./Rules";
const validator = (value, validation) => {
  const validationResualt = [];

  const mainValue = value.trim();

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
      console.log(testEmail(value));
      !testEmail(value) && validationResualt.push(false);
    }
  }

  // console.log(validationResualt);

  if (validationResualt.length) {
    return false;
  } else {
    return true;
  }
};

export default validator;
