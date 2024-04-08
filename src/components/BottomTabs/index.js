import React from "react";
import styles from "./bottom-tabs.module.scss";
import { tabs } from "./constants";
import Tab from "./Tab";
import { useLocation, useNavigate } from "react-router-dom";
import Button, { variants } from "../Button";
import BackIcon from "../../assets/icons/back-icon.svg";

const BottomTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (
    ["/", "/countries", "/account", "/settings", "/recent-servers"].includes(
      location.pathname
    )
  ) {
    return (
      <div className={styles.root}>
        {tabs.map((tab) => (
          <Tab
            key={tab.title}
            icon={tab.icon}
            title={tab.title}
            href={tab.href}
            isActive={location.pathname === tab.href}
          />
        ))}
      </div>
    );
  }
  if (
    [
      "/private-key",
      "/account/subscriptions",
      "/account/wallet-details",
    ].includes(location.pathname)
  ) {
    return (
      <div className={styles["back-root"]}>
        <Button
          className={styles.back}
          variant={variants.PRIMARY}
          icon={BackIcon}
          onClick={() => navigate(-1, { replace: true })}
        />
      </div>
    );
  }
};

export default BottomTabs;
