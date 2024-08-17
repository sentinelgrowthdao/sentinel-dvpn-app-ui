import React from "react";
import styles from "./mnemonic-area.module.scss";

const MnemonicArea = ({
  inputValues = {},
  changeValues = () => {},
  disabled = false,
  show = true,
}) => {
  return (
    <div className={`${styles["mnemonic-area"]} my-24`}>
      {Object.entries(inputValues).map(([_, value], index) => {
        return (
          <input
            disabled={disabled}
            key={`mnemonic-input-box-${index}`}
            className={`fs-16 m-4 py-4 ${styles["input-box"]} ${
              show ? "" : styles.blur
            }`}
            id={`mnemonic-input-box-${index}`}
            type="text"
            value={value}
            onChange={(event) => changeValues(event, index)}
            placeholder={`${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default MnemonicArea;
