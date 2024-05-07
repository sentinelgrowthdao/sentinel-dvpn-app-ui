import React from "react";
import styles from "./page-slider.module.scss";
import SubscriptionImg from "../../assets/images/subscription.png";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
const SlideThree = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className={styles.slide}>
      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span>{t("onboarding.slides.three.text_one")}</span>
        <span
          onClick={() => {
            dispatch(dispatchWindowOpen("https://sentinel.co"));
          }}
          className={styles.link}
        >
          {t("onboarding.slides.three.link_one")}
        </span>
        <span>{t("onboarding.slides.three.text_two")}</span>
      </section>
      <section className={styles.image}>
        <img
          className={styles["subscription-img"]}
          src={SubscriptionImg}
          alt=""
        />
      </section>

      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span>{t("onboarding.slides.three.text_three")}</span>
        <span
          onClick={() => {
            dispatch(
              dispatchWindowOpen(
                "https://medium.com/sentinel/introduction-of-on-chain-subscriptions-and-time-based-payments-sentinels-biggest-dvpn-protocol-a2b240199f18"
              )
            );
          }}
          className={styles.link}
        >
          {t("onboarding.slides.three.link_two")}
        </span>
        <span>{t("onboarding.slides.three.text_four")}</span>
      </section>
    </div>
  );
};

export default SlideThree;
