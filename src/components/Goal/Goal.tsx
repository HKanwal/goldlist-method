import Styles from "./Goal.module.css";

interface GoalProps {
  text: string;
  completed: boolean;
}

function Goal(props: GoalProps) {
  return (
    <div className={Styles["goal-container"]}>
      {!props.completed ? (
        <svg viewBox="0 0 30 30" height="30px" width="30px">
          <circle className={Styles["unchecked-circle"]} r="15px" cx="15px" cy="15px"></circle>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.5 98.5" height="30px" width="30px">
          <circle className={Styles["unchecked-circle"]} r="49.25px" cx="49.25" cy="49.25"></circle>
          <path
            className={Styles["checkmark-path"]}
            fill="none"
            strokeWidth={8}
            strokeMiterlimit={10}
            d="M81.7,17.8C73.5,9.3,62,4,49.2,4 C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
          />
        </svg>
      )}
      <span className={Styles["goal-text"]}>{props.text}</span>
    </div>
  );
}

export default Goal;
