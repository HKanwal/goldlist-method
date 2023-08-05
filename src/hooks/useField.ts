import { useCallback, useEffect, useRef, useState } from "react";

type Field = {
  value: string;
  dirty: boolean;
  touched: boolean;
  errors: string[];
};

type Validator = {
  name: string;

  /**
   * Returns false if error, true if valid.
   */
  fn: (field: Field) => boolean;
};
type Validators = {
  required: Validator;
};

export const Validators: Validators = {
  required: {
    name: "required",
    fn: (field) => {
      return !field.touched || field.value.length > 0;
    },
  },
};

/**
 * Pass the returned ref to your field input's `ref` prop.
 * @returns [ref, field] where changes to field cause a re-render but
 * changes to ref do not.
 */
function useField(
  initialValue: string,
  validators: Validator[]
): [React.MutableRefObject<HTMLInputElement | undefined>, Field] {
  const ref = useRef<HTMLInputElement>();
  const [field, setField] = useState<Field>({
    value: initialValue,
    touched: false,
    dirty: false,
    errors: [],
  });
  const [firstRender, setFirstRender] = useState(true);

  const validate = useCallback(() => {
    for (const validator of validators) {
      if (!validator.fn(field)) {
        if (!field.errors.includes(validator.name)) {
          setField((prevState) => {
            return { ...prevState, errors: [...prevState.errors, validator.name] };
          });
        }
      } else {
        if (field.errors.includes(validator.name)) {
          setField((prevState) => {
            return {
              ...prevState,
              errors: prevState.errors.filter((err) => err !== validator.name),
            };
          });
        }
      }
    }
  }, [field, validators]);

  useEffect(() => {
    if (ref.current !== undefined) {
      if (firstRender) {
        ref.current.value = field.value;
        setFirstRender(false);
      }

      ref.current.onfocus = () => {
        setField((prevState) => {
          return { ...prevState, touched: true };
        });
      };

      ref.current.oninput = () => {
        setField((prevState) => {
          return { ...prevState, dirty: true, value: ref.current!.value };
        });
      };

      ref.current.onblur = () => {
        validate();
      };
    }
  }, [validate]);

  useEffect(() => {
    validate();
  }, [field.value]);

  return [ref, field];
}

export default useField;
