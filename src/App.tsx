import { ThemeProvider, createTheme } from "@mui/material/styles";
import Styles from "./App.module.css";
import NewTransScreen from "./components/NewTransPage/NewTransScreen";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={Styles["app-container"]}>
        <NewTransScreen targetLang="French" pageNumber={1} />
      </div>
    </ThemeProvider>
  );
}

export default App;
