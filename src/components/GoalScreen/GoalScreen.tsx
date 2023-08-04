import { useEffect, useState } from "react";
import Goal from "../Goal/Goal";
import Styles from "./GoalScreen.module.css";
import Storage, { getToday, Goal as GoalType } from "../../helpers/StorageWrapper";

interface GoalScreenProps {
  onCreateHeadlist: () => void;
}

function GoalScreen(props: GoalScreenProps) {
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [animatingOut, setAnimatingOut] = useState(false);

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
      }

      setGoals(goals);
      Storage.postGoals(today, goals);
    } else {
      setGoals(todaysGoals);
    }
  }, []);

  const handleGoalClick = (goal: GoalType["goal"]) => {
    if (goal === "CREATE HEADLIST" || goal === "CONTINUE HEADLIST") {
      setAnimatingOut(true);
      setTimeout(() => {
        props.onCreateHeadlist();
      }, 100 * goals.length + 500);
    }
  };

  return (
    <div className={Styles["screen-container"]}>
      <div className={Styles["goals-container"]}>
        <h2
          className={Styles.title}
          style={{
            animation: animatingOut
              ? `hide-down 1s ${0.1 * goals.length}s ease forwards`
              : "show-up 1s ease",
          }}
        >
          FOR TODAY
        </h2>
        {goals.map((goal, i) => {
          return (
            <div
              className={Styles["goal-container"]}
              key={i}
              style={{
                opacity: animatingOut ? 1 : 0,
                animation: animatingOut
                  ? `hide-down 1s ${0.1 * (goals.length - i - 1)}s ease forwards`
                  : `show-up 1s ${0.2 * (i + 1)}s ease forwards`,
              }}
            >
              <Goal
                text={goal.goal}
                completed={goal.completed}
                onClick={() => handleGoalClick(goal.goal)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoalScreen;
