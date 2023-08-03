import { useEffect, useState } from "react";
import Goal from "../Goal/Goal";
import { Goal as GoalType } from "../../helpers/StorageWrapper.ts";
import Styles from "./GoalScreen.module.css";
import Storage, { getToday } from "../../helpers/StorageWrapper";
import constants from "../../constants";

function GoalScreen() {
  const [goals, setGoals] = useState<GoalType[]>([]);

  useEffect(() => {
    const today = getToday();
    const todaysGoals = Storage.getGoals(today);

    if (todaysGoals === null) {
      const goals: GoalType[] = [];
      const headlist = Storage.getHeadlist(today);

      if (headlist === null) {
        goals.push({
          goal: "CREATE HEADLIST",
          completed: false,
        });
      } else if (headlist.length < constants.headlistLength) {
        goals.push({
          goal: "CONTINUE HEADLIST",
          completed: false,
        });
      }

      setGoals(goals);
      Storage.postGoals(today, goals);
    } else {
      setGoals(todaysGoals);
    }
  }, []);

  return (
    <div className={Styles["screen-container"]}>
      <div className={Styles["goal-container"]}>
        <div>
          <h2 className={Styles.title}>FOR TODAY</h2>
          {goals.map((goal) => {
            return <Goal key={goal.goal} text={goal.goal} completed={goal.completed} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default GoalScreen;
