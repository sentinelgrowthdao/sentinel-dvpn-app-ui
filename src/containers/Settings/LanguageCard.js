import React from "react";
import styles from "./language-card.module.scss";
import Card, { variants } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import LangIcon from "../../assets/icons/language-icon.svg";
import { useTranslation } from "react-i18next";
import { langs } from "../../constants";

const LanguageCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className={styles.card} variant={variants.SECONDARY}>
      <button
        className={styles.btn}
        onClick={() => {
          navigate("langs", { replace: true });
        }}
      >
        <section>
          <img src={LangIcon} alt="" />
          <span>{t("language")}</span>
        </section>
        <span className={styles.value}>
          {window.localStorage.getItem("language")
            ? langs[window.localStorage.getItem("language")]
            : "English"}
        </span>
      </button>
    </Card>
  );
};

export default LanguageCard;
