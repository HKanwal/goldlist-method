import Goal from "../Goal/Goal";
import Styles from "./GoalScreen.module.css";

function GoalScreen() {
  return (
    <div className={Styles["screen-container"]}>
      <div className={Styles["goal-container"]}>
        <div>
          <h2 className={Styles.title}>FOR TODAY</h2>
          <Goal text="CREATE HEADLIST" completed={true} />
          <Goal text="DISTILL" completed={false} />
        </div>
      </div>
    </div>
  );
}

export default GoalScreen;
