import { ThemeProvider, createTheme } from "@mui/material/styles";
import Styles from "./App.module.css";
import BronzelistScreen from "./components/BronzelistScreen/BronzelistScreen";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={Styles["app-container"]}>
        <BronzelistScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
