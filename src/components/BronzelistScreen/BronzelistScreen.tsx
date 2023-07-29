import { useState } from "react";
import NewTransPage from "../NewTransPage/NewTransPage";
import Styles from "./BronzelistScreen.module.css";
import { Button } from "@mui/material";
import constants from "../../constants";

function BronzelistScreen() {
  const [pageNum, setPageNum] = useState(1);

  const handleNextClick = () => {
    setPageNum((prevState) => prevState + 1);
  };

  return (
    <div className={Styles["screen-container"]}>
      <header className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </header>

      <NewTransPage pageNumber={pageNum} />

      <div className={Styles["btns-container"]}>
        <div id="Prev btn placeholder"></div>
        {pageNum < constants.headlistLength ? (
          <Button variant="contained" onClick={handleNextClick}>
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
