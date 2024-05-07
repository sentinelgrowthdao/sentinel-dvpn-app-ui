import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.scss";
import SentinelIcon from "../../assets/images/sentinel-logo.png";
import { useTranslation } from "react-i18next";
import PageSlider from "../../containers/Onboarding/PageSlider";
const Start = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateTo = (href) => {
    navigate(href, { replace: true });
  };
  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <img className={styles.logo} src={SentinelIcon} alt="" />
        <span className={styles.title}>
          {t("onboarding.sentinel_shield_dvpn")}
        </span>
      </section>
      <section className={styles.middle}>
        <PageSlider navigateTo={navigateTo} />
      </section>
    </div>
  );
};

export default Start;
