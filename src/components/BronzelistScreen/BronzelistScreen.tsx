import { useState } from "react";
import NewTransPage from "../NewTransPage/NewTransPage";
import Styles from "./BronzelistScreen.module.css";
import { Button } from "@mui/material";
import constants from "../../constants";

function BronzelistScreen() {
  const [pageNum, setPageNum] = useState(1);

  const incrementPageNum = () => {
    setPageNum((prevState) => prevState + 1);
  };

  const decrementPageNum = () => {
    setPageNum((prevState) => prevState - 1);
  };

  return (
    <div className={Styles["screen-container"]}>
      <header className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </header>

      <NewTransPage pageNumber={pageNum} targetLang="French" />

      <div className={Styles["btns-container"]}>
        {pageNum > 1 ? (
          <Button variant="contained" onClick={decrementPageNum}>
            Prev
          </Button>
        ) : (
          <div></div>
        )}
        {pageNum < constants.headlistLength ? (
          <Button variant="contained" onClick={incrementPageNum}>
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
