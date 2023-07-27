import { TextField } from "@mui/material";
import Styles from "./NewTransScreen.module.css";
import { useEffect, useState } from "react";

interface NewTransScreenProps {
  targetLang: "French" | "Spanish";
}

function NewTransScreen(props: NewTransScreenProps) {
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");

  return (
    <div className={Styles.screenContainer}>
      <header className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </header>

      <div className={Styles["inputs-container"]}>
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
    </div>
  );
}

export default NewTransScreen;
