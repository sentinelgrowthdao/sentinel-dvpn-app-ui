import React from "react";
import styles from "./checkbox.module.scss";

const Checkbox = ({ id = "cb", checked, onChange, label }) => {
  return (
    <div class={styles["checkbox-wrapper"]}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id} class={styles["check-box"]}></label>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Checkbox;
