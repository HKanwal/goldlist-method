import Styles from "./App.module.css";
import NewTransScreen from "./components/NewTransPage/NewTransScreen";

function App() {
  return (
    <div className={Styles["app-container"]}>
      <NewTransScreen />
    </div>
  );
}

export default App;
