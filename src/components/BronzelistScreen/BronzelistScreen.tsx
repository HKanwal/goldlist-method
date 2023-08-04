import { useEffect, useState } from "react";
import NewTransPage from "../NewTransPage/NewTransPage";
import Styles from "./BronzelistScreen.module.css";
import { Button } from "@mui/material";
import constants from "../../constants";
import Storage, { Translation, getToday } from "../../helpers/StorageWrapper";

function BronzelistScreen() {
  const [pageNum, setPageNum] = useState(1);
  const [pageValid, setPageValid] = useState(false);
  const [trans, setTrans] = useState<Translation>({ phrase: "", meaning: "" });
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    if (pageNum === constants.headlistLength && pageValid) {
      setShowDone(true);
    }
  }, [pageNum, pageValid]);

  const handleNextClick = () => {
    setPageNum((prevState) => prevState + 1);
    Storage.putTrans(getToday(), trans);
  };

  const handleDoneClick = () => {};

  return (
    <div className={Styles["screen-container"]}>
      <header className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </header>

      <NewTransPage pageNumber={pageNum} onValidityChange={setPageValid} onTransChange={setTrans} />

      <div className={Styles["btns-container"]}>
        <div
          className={Styles["page-btns-container"]}
          style={{ opacity: pageValid && pageNum < constants.headlistLength ? "100%" : "0%" }}
        >
          <div id="Prev btn placeholder"></div>
          <Button
            variant="contained"
            onClick={handleNextClick}
            disabled={!pageValid || pageNum === constants.headlistLength}
          >
            NEXT
          </Button>
        </div>

        {showDone ? (
          <div className={Styles["done-btn"]} style={{ opacity: pageValid ? "100%" : "0%" }}>
            <Button variant="contained" onClick={handleDoneClick} disabled={!pageValid}>
              DONE
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BronzelistScreen;
