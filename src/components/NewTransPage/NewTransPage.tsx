import Styles from "./NewTransPage.module.css";
import constants from "../../constants";
import NewTransInputs, { NewTransInputsProps } from "../NewTransInputs/NewTransInputs";
import { useEffect } from "react";

export interface NewTransPageProps {
  pageNumber: number;
  onValidityChange: NewTransInputsProps["onValidityChange"];
  onTransChange: NewTransInputsProps["onTransChange"];
}

function NewTransPage(props: NewTransPageProps) {
  const pages = [...Array(constants.headlistLength).keys()].map((x) => x + 1);

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
              onTransChange={props.onTransChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewTransPage;
