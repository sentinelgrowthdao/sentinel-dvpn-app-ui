import React from "react";
import DNSCard from "../../containers/Settings/DNSCard";
import LegalCards from "../../containers/Settings/LegalCards";
import styles from "./settings.module.scss";
import ShareLogButton from "../../containers/Settings/ShareLogButton";
import ExternalSupport from "../../containers/Settings/ExternalSupport";
const Settings = () => {
  return (
    <div className={styles.root}>
      <span className={styles.header}>Settings</span>
      <DNSCard />
      <LegalCards />
      <ShareLogButton />
      <ExternalSupport />
    </div>
  );
};

export default Settings;
