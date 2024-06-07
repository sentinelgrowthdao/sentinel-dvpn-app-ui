import React from "react";
import styles from "./onboarding-home.module.scss";
import HomeImage from "../../assets/images/onboarding-home.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OnboardingHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/start", { replace: true });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div className={styles.root}>
      <img className={styles["home-img"]} src={HomeImage} alt="" />
      <section className={styles.title}>
        <span className={styles.text}>{t("welcome_home_welcome_to")}</span>
        <span className={styles.text}>{t("welcome_sentinel_shield_dvpn")}</span>
      </section>
      <span className={styles.description}>
        {t("welcome_home_description")}
      </span>
    </div>
  );
};

export default OnboardingHome;
