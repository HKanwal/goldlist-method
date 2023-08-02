import { useState } from "react";
import NewTransPage from "../NewTransPage/NewTransPage";
import Styles from "./BronzelistScreen.module.css";
import { Button } from "@mui/material";
import constants from "../../constants";
import Storage, { Translation } from "../../helpers/StorageWrapper";

function formatNum(num: number): string {
  return num < 10 ? "0" + num : "" + num;
}

function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${formatNum(today.getMonth() + 1)}-${formatNum(today.getDate())}`;
}

function BronzelistScreen() {
  const [pageNum, setPageNum] = useState(1);
  const [pageValid, setPageValid] = useState(false);
  const [trans, setTrans] = useState<Translation>({ phrase: "", meaning: "" });

  const handleNextClick = () => {
    setPageNum((prevState) => prevState + 1);
    Storage.putTrans(getToday(), trans);
  };

  return (
    <div className={Styles["screen-container"]}>
      <header className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </header>

      <NewTransPage pageNumber={pageNum} onValidityChange={setPageValid} onTransChange={setTrans} />

      <div className={Styles["btns-container"]} style={{ opacity: !pageValid ? "0" : "100%" }}>
        <div id="Prev btn placeholder"></div>
        {pageNum < constants.headlistLength ? (
          <Button variant="contained" onClick={handleNextClick} disabled={!pageValid}>
            Next
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default BronzelistScreen;
