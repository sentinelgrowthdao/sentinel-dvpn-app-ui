import React from "react";
import styles from "./styles.module.scss";
import { Text } from "@components/index";

const NoOfWords = ({ noOfWords = 24, changeNoOfWords = () => {} }) => {
  return (
    <div className={`${styles["no-of-words"]} p-8`}>
      <Text
        className={`fs-14 fw-6 ${
          noOfWords === 24 ? "text-link" : "text - ffffff"
        }`}
        text={"no_of_words"}
        data={{ noOfWords: 24 }}
        onClick={() => {
          changeNoOfWords(24);
        }}
      />
      <Text
        className={`fs-14 fw-6 ${
          noOfWords === 12 ? "text-link" : "text - ffffff"
        }`}
        text={"no_of_words"}
        data={{ noOfWords: 12 }}
        onClick={() => {
          changeNoOfWords(12);
        }}
      />
    </div>
  );
};

export default NoOfWords;
