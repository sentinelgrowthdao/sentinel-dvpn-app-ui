import React from "react";
import SubscriptionsCard from "../../containers/Account/SubscriptionsCard";
import styles from "./account.module.scss";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";
const SubscriptionsDetails = () => {
  const { t } = useTranslation();
  return (
    <>
      <BackButton to={t("home")} />
      <div className={styles.root}>
        <span className={styles["small-header"]}>{t("subscriptions")}</span>
        <SubscriptionsCard />
      </div>
    </>
  );
};

export default SubscriptionsDetails;
