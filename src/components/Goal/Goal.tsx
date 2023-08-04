import Styles from "./Goal.module.css";

interface GoalProps {
  text: string;
  completed: boolean;
  onClick: () => void;
}

function Goal(props: GoalProps) {
  return (
    <div className={Styles["goal-container"]}>
      {props.completed ? (
        <>
          <svg className={Styles.svg} viewBox="0 0 98.5 98.5">
            <path
              className={Styles["checkmark-path"]}
              fill="none"
              strokeWidth={8}
              strokeMiterlimit={10}
              d="M81.7,17.8C73.5,9.3,62,4,49.2,4 C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
            />
          </svg>
          <span className={Styles["goal-text"] + " " + Styles["text-completed"]}>{props.text}</span>
        </>
      ) : (
        <span
          className={Styles["goal-text"] + " " + Styles["text-incomplete"]}
          onClick={props.onClick}
        >
          {props.text}
        </span>
      )}
    </div>
  );
}

export default Goal;
