import React from "react";
import styles from "./page-slider.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
const SlideTwo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className={styles.slide}>
      <section className={styles.para}>
        <span>{t("onboarding.slides.two.text_one")}</span>
      </section>
      <section className={styles.frame}>
        <iframe
          src="https://map.sentinel.co"
          title="Sentinel Map"
          className={styles["map-frame"]}
        />
      </section>
      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span>{t("onboarding.slides.two.text_two")}</span>
        <span
          onClick={() => {
            dispatch(dispatchWindowOpen("https://map.sentinel.co/"));
          }}
          className={styles.link}
        >
          {t("onboarding.slides.two.link_one")}
        </span>
      </section>
      <section
        className={`${styles.para} ${styles["para-with-links"]} ${styles.center}`}
      >
        <span
          onClick={() => {
            dispatch(
              dispatchWindowOpen(
                "https://docs.sentinel.co/assets/files/whitepaper-513665f81a5d6c4b462e111926d26f57.pdf"
              )
            );
          }}
          className={styles.link}
        >
          {t("onboarding.slides.two.link_two")}
        </span>
      </section>
    </div>
  );
};

export default SlideTwo;

/**
 *
 * See the Sentinel dVPN Node Map
 */
