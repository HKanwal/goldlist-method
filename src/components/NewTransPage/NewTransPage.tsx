import Styles from "./NewTransPage.module.css";
import constants from "../../constants";
import NewTransInputs, { NewTransInputsProps } from "../NewTransInputs/NewTransInputs";

export interface NewTransPageProps {
  pageNumber: number;
  onValidityChange: NewTransInputsProps["onValidityChange"];
}

function NewTransPage(props: NewTransPageProps) {
  const pages = [...Array(constants.headlistLength).keys()].map((x) => x + 1);

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
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewTransPage;
