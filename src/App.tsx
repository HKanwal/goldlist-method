import { ThemeProvider, createTheme } from "@mui/material/styles";
import Styles from "./App.module.css";
import BronzelistScreen from "./components/BronzelistScreen/BronzelistScreen";
import GoalScreen from "./components/GoalScreen/GoalScreen";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [screen, setScreen] = useState<"GoalScreen" | "ListScreen">("GoalScreen");

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={Styles["app-container"]}>
        {screen === "GoalScreen" ? (
          <GoalScreen onCreateHeadlist={() => setScreen("ListScreen")} />
        ) : (
          <BronzelistScreen onDone={() => setScreen("GoalScreen")} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
