import React from "react";
import styles from "./radio-icon.module.scss";
import { Text } from "..";

const RadioButton = ({
  value,
  isChecked = false,
  onChange = () => {},
  className = "",
  textClassName = "",
}) => {
  return (
    <label
      className={`${styles.radioBtn} mb-24 ${className} `}
      htmlFor={`dns-value-${value}`}
    >
      <input
        name={value}
        value={value}
        type="radio"
        checked={isChecked}
        onChange={onChange}
        id={`dns-value-${value}`}
      />
      <svg
        className={styles.svg}
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        height="16px"
        width="16px"
        viewBox="0 0 34 34"
      >
        <circle
          className={styles.radioOutline}
          cx="17"
          cy="17"
          r="15"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
        />
        <circle
          className={styles.radioDot}
          cx="17"
          cy="17"
          r="8"
          fill="#0156FC"
        />
      </svg>
      <Text text={value} className={`fs-14 fw-5  ${textClassName}`} />
    </label>
  );
};

export default RadioButton;
