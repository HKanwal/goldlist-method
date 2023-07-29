import { useEffect, useRef, useState } from "react";

type Field = {
  value: string;
  dirty: boolean;
  touched: boolean;
  errors: string[];
};

type Validator = (field: Field) => boolean;
type Validators = {
  required: Validator;
};

export const Validators: Validators = {
  required: (field) => {
    return !field.touched || field.value.length > 0;
  },
};

/**
 * Pass the returned ref to your field input's `ref` prop.
 * @returns [ref, value] where changes to value cause a re-render but
 * changes to ref do not.
 */
function useField(
  validators: Validator[]
): [React.MutableRefObject<HTMLInputElement | undefined>, Field] {
  const ref = useRef<HTMLInputElement>();
  const [field, setField] = useState<Field>({
    value: "",
    touched: false,
    dirty: false,
    errors: [],
  });

  useEffect(() => {
    if (ref.current !== undefined) {
      ref.current.onfocus = () => {
        setField((prevState) => {
          return { ...prevState, touched: true };
        });
      };

      ref.current.oninput = () => {
        setField((prevState) => {
          let newErrors = [...prevState.errors];
          if (
            ref.current &&
            ref.current.value !== "" &&
            validators.includes(Validators.required) &&
            prevState.errors.includes("required")
          ) {
            newErrors = newErrors.filter((err) => err !== "required");
          } else if (
            ref.current &&
            ref.current.value === "" &&
            validators.includes(Validators.required) &&
            !prevState.errors.includes("required")
          ) {
            newErrors = [...newErrors, "required"];
          }
          return { ...prevState, dirty: true, value: ref.current?.value || "", errors: newErrors };
        });
      };

      ref.current.onblur = () => {
        if (
          field.touched &&
          field.value === "" &&
          validators.includes(Validators.required) &&
          !field.errors.includes("required")
        ) {
          setField((prevState) => {
            const newErrors = [...prevState.errors, "required"];
            return { ...prevState, errors: newErrors };
          });
        }
      };
    }
  }, [ref, field]);

  return [ref, field];
}

export default useField;
