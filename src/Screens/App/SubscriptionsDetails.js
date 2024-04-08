import React from "react";
import SubscriptionsCard from "../../containers/Account/SubscriptionsCard";
import styles from "./account.module.scss";
import BackButton from "../../components/BackButton";
const SubscriptionsDetails = () => {
  return (
    <>
      <BackButton to="Home" />
      <div className={styles.root}>
        <span className={styles["small-header"]}>Subscriptions</span>
        <SubscriptionsCard />
      </div>
    </>
  );
};

export default SubscriptionsDetails;
