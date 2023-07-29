import { TextField } from "@mui/material";
import Styles from "./NewTransInputs.module.css";
import { useState } from "react";

interface NewTransInputsProps {
  targetLang: "French" | "Spanish";
  position: "relative" | "absolute";
  /**
   * In terms of # of pages from the currently displayed page.
   * Can be positive or negative.
   */
  displacement: number;
}

/**
 * Should have a positioned parent.
 */
function NewTransInputs(props: NewTransInputsProps) {
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");

  const positionStyles: React.CSSProperties =
    props.position === "absolute"
      ? { position: "absolute", top: "0", left: "0" }
      : { position: "relative" };

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
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <div className={Styles["input-spacer"]}></div>
      <TextField
        variant="filled"
        label="Meaning"
        placeholder="enter in English..."
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
      />
    </div>
  );
}

export default NewTransInputs;
