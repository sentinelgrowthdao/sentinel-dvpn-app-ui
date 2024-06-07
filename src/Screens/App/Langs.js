import React from "react";
import styles from "./langs.module.scss";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { langs } from "../../constants";
import Card, { variants } from "../../components/Card";
import CheckIcon from "../../assets/icons/check-icon.svg";
import i18n from "../../i18n";

const Langs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const current = window.localStorage.getItem("language") || "en";
  return (
    <div className={styles.root}>
      <BackButton to={"home"} />
      <section className={styles.container}>
        <span className={styles.header}>{t("choose_lang")}</span>
        <section className={styles.list}>
          {Object.entries(langs).map(([key, value]) => {
            return (
              <Card
                className={styles.card}
                key={key}
                variant={variants.SECONDARY}
              >
                <button
                  className={styles.btn}
                  onClick={() => {
                    window.localStorage.setItem("language", key);
                    i18n.changeLanguage(key);
                    navigate("/", { replace: true });
                  }}
                >
                  <span>{value}</span>
                  {current === key && <img src={CheckIcon} alt="" />}
                </button>
              </Card>
            );
          })}
        </section>
      </section>
    </div>
  );
};

export default Langs;
