import { TextField } from "@mui/material";
import Styles from "./NewTransInputs.module.css";
import useField, { Validators } from "../../hooks/useField";
import { useEffect } from "react";
import { Translation } from "../../helpers/StorageWrapper";

export interface NewTransInputsProps {
  targetLang: "French" | "Spanish";
  position: "relative" | "absolute";
  /**
   * In terms of # of pages from the currently displayed page.
   * Can be positive or negative.
   * Will animate to new displacement if it changes.
   */
  displacement: number;
  onValidityChange: (valid: boolean) => void;
  /**
   * Initial translation to display.
   */
  trans?: Translation;
  onTransChange: (newTrans: Translation) => void;
}

function NewTransInputs(props: NewTransInputsProps) {
  const [phraseRef, phraseField] = useField(props.trans?.phrase ?? "", [Validators.required]);
  const [meaningRef, meaningField] = useField(props.trans?.meaning ?? "", [Validators.required]);
  const valid =
    phraseField.dirty &&
    meaningField.dirty &&
    phraseField.errors.length === 0 &&
    meaningField.errors.length === 0;

  const positionStyles: React.CSSProperties =
    props.position === "absolute"
      ? { position: "absolute", top: "0", left: "0" }
      : { position: "relative" };

  const phraseError =
    phraseField.errors.length === 0
      ? ""
      : phraseField.errors[0] === "required"
      ? "Please enter a target word or phrase"
      : "Unhandled error";

  const meaningError =
    meaningField.errors.length === 0
      ? ""
      : meaningField.errors[0] === "required"
      ? "Please enter a meaning"
      : "Unhandled error";

  useEffect(() => {
    props.onValidityChange(valid);
  }, [valid, props.onValidityChange]);

  useEffect(() => {
    props.onTransChange({ phrase: phraseField.value, meaning: meaningField.value });
  }, [phraseField.value, meaningField.value, props.onTransChange]);

  return (
    <div
      className={Styles["animated-container"]}
      style={{
        transform: `translateX(${props.displacement * window.screen.width}px)`,
        ...positionStyles,
      }}
    >
      <TextField
        variant="filled"
        label="Target Word or Phrase"
        placeholder={`enter in ${props.targetLang}...`}
        inputRef={phraseRef}
        error={phraseError.length > 0}
        helperText={phraseError}
      />
      <div
        className={phraseError.length > 0 ? Styles["half-input-spacer"] : Styles["input-spacer"]}
      ></div>
      <TextField
        variant="filled"
        label="Meaning"
        placeholder="enter in English..."
        inputRef={meaningRef}
        error={meaningError.length > 0}
        helperText={meaningError}
      />
    </div>
  );
}

export default NewTransInputs;
