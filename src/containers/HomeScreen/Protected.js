import React from "react";
import InfoIcon from "../../assets/icons/info-icon.svg";
import styles from "./protected.module.scss";
import { useTranslation } from "react-i18next";
const Protected = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.protected}>
      <img src={InfoIcon} alt="" />
      <span>{t("you_are_not_protected")}</span>
    </div>
  );
};

export default Protected;
