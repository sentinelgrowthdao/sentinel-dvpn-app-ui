import React from "react";
import styles from "./page-slider.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
import BuiltOnCosmosImg from "../../assets/images/built-on-cosmos.svg";

const SlideOne = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className={styles.slide}>
      <section className={styles.para}>
        <span>{t("intro_slides_one_text_one")}</span>
      </section>
      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span>{t("intro_slides_one_text_two")}</span>
        <span
          onClick={() => {
            dispatch(dispatchWindowOpen("https://www.mintscan.io/sentinel"));
          }}
          className={styles.link}
        >
          {t("intro_slides_one_link_one")}
        </span>
        <span>{t("intro_slides_one_text_three")}</span>
      </section>
      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span>{t("intro_slides_one_text_four")}</span>
        <span
          onClick={() => {
            dispatch(dispatchWindowOpen("https://cosmos.network/"));
          }}
          className={styles.link}
        >
          {t("intro_slides_one_link_two")}
        </span>
      </section>
      <section className={styles.image}>
        <img className={styles["cosmos-img"]} src={BuiltOnCosmosImg} alt="" />
      </section>
      <section className={`${styles.para} ${styles["para-with-links"]}`}>
        <span
          onClick={() => {
            dispatch(dispatchWindowOpen("https://cosmos.network/"));
          }}
          className={styles.link}
        >
          {t("intro_slides_one_link_three")}
        </span>
        <span>{t("intro_slides_one_text_five")}</span>
      </section>
    </div>
  );
};

export default SlideOne;
