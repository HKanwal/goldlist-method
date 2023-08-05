import Styles from "./NewTransPage.module.css";
import constants from "../../constants";
import NewTransInputs, { NewTransInputsProps } from "../NewTransInputs/NewTransInputs";
import { useEffect, useMemo } from "react";
import Storage, { Translation, getToday } from "../../helpers/StorageWrapper";

export interface NewTransPageProps {
  pageNumber: number;
  onValidityChange: NewTransInputsProps["onValidityChange"];
  onTransChange: NewTransInputsProps["onTransChange"];
}

function NewTransPage(props: NewTransPageProps) {
  const pages = useMemo(() => [...Array(constants.headlistLength).keys()].map((x) => x + 1), []);
  const initialTrans: Translation[] = useMemo(() => {
    const storedTrans = Storage.getHeadlist(getToday());
    const translations: Translation[] = [];

    if (storedTrans) {
      for (let i = 0; i < constants.headlistLength; i++) {
        const translation = storedTrans[i];

        if (translation) {
          translations.push(translation);
        } else {
          translations.push({ phrase: "", meaning: "" });
        }
      }
    } else {
      for (let i = 0; i < constants.headlistLength; i++) {
        translations.push({ phrase: "", meaning: "" });
      }
    }

    return translations;
  }, []);

  useEffect(() => {
    props.onValidityChange(false);
    props.onTransChange({ phrase: "", meaning: "" });
  }, [props.pageNumber]);

  return (
    <div className={Styles.container}>
      <div className={Styles["page-number-container"]}>
        <span className={Styles["page-number"]}>{props.pageNumber}</span>
        <span className={Styles["total-pages"]}>/{constants.headlistLength}</span>
      </div>

      <div className={Styles["inputs-container"]}>
        {pages.map((i) => {
          return (
            <NewTransInputs
              key={i}
              targetLang="French"
              displacement={i - props.pageNumber}
              position={i === 1 ? "relative" : "absolute"}
              onValidityChange={props.onValidityChange}
              trans={initialTrans[i - 1]}
              onTransChange={props.onTransChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewTransPage;
