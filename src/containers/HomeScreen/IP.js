import React from "react";
import styles from "./ip.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const IP = () => {
  const { t } = useTranslation();
  const ip = useSelector((state) => state.home.ip);
  return (
    <span className={styles.text}>
      <span className={styles.title}>{t("your_ip")}</span>
      {ip}
    </span>
  );
};

export default IP;
