import React from "react";
import SubscriptionsCard from "../../containers/Account/SubscriptionsCard";
import styles from "./account.module.scss";
const SubscriptionsDetails = () => {
  return (
    <div className={styles.root}>
      <span className={styles["small-header"]}>Subscriptions</span>
      <SubscriptionsCard />
    </div>
  );
};

export default SubscriptionsDetails;
