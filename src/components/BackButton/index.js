import React from "react";
import styles from "./back-button.module.scss";
import BackArrowIcon from "../../assets/icons/back-arrow-icon.svg";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["back-handler"]}>
      <button
        className={styles.btn}
        onClick={() => {
          navigate(-1, { replace: true });
        }}
      >
        <img src={BackArrowIcon} alt="" />
        <span>{`Back to ${to}`}</span>
      </button>
    </section>
  );
};

export default BackButton;
