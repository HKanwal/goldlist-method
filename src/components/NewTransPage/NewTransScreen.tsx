import Styles from "./NewTransScreen.module.css";

function NewTransScreen() {
  return (
    <div className={Styles.screenContainer}>
      <div className={Styles.header}>
        <h1 className={Styles.title}>BRONZELIST</h1>
        <h3 className={Styles.subtitle}>CREATE HEADLIST</h3>
      </div>
    </div>
  );
}

export default NewTransScreen;
