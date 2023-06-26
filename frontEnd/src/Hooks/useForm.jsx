import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      {
        let isFormValid = true;
        for (const inputID in state.inputs) {
          if (inputID === action.inputID) {
            isFormValid = isFormValid && action.isValid;
          } else {
            isFormValid = isFormValid && state.inputs[inputID].isValid;
          }
        }

        // console.log(state, action);

        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputID]: {
              value: action.value,
              isValid: action.isValid,
            },
          },
          isFormValid: isFormValid,
        };
      }
      break;

    default:
      {
        return state;
      }
      break;
  }
};

export const useForm = (initInputs, initIsFormValid) => {
  const [formState, dipatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initIsFormValid,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dipatch({
      type: "INPUT_CHANGE",
      inputID: id,
      value,
      isValid,
    });
  }, []);

  return [formState, onInputHandler];
};
