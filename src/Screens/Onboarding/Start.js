import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.scss";
import SentinelIcon from "../../assets/images/sentinel-logo.png";
import { useTranslation } from "react-i18next";
import PageSlider from "../../containers/Onboarding/PageSlider";
const Start = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const navigateTo = (href) => {
    navigate(href, { replace: true });
  };

  const goToNextSlide = () => {
    window.scrollTo(0, 0);
    setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <img className={styles.logo} src={SentinelIcon} alt="" />
        <span className={styles.title}>
          {t("welcome_sentinel_shield_dvpn")}
        </span>
      </section>
      <section className={styles.middle}>
        <PageSlider
          navigateTo={navigateTo}
          goToNextSlide={goToNextSlide}
          currentSlide={currentSlide}
        />
      </section>
    </div>
  );
};

export default Start;
