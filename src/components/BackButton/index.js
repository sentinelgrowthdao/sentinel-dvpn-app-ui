import React from "react";
import styles from "./back-button.module.scss";
import BackArrowIcon from "../../assets/icons/back-arrow-icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BackButton = ({ to }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const path = t(to);

  return (
    <section className={styles["back-handler"]}>
      <button
        className={styles.btn}
        onClick={() => {
          navigate(-1, { replace: true });
        }}
      >
        <img src={BackArrowIcon} alt="" />
        <span>{t(`back_to`, { to: path })}</span>
      </button>
    </section>
  );
};

export default BackButton;
