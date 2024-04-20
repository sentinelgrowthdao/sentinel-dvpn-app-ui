import React from "react";
import styles from "./dns-card.module.scss";
import Card, { variants } from "../../components/Card";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RightArrow from "../../assets/icons/right-arrow-icon.svg";

const DNSCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const current = useSelector((state) => state.dns.current);

  return (
    <div className={styles.root}>
      <span className={styles.title}>DVPN</span>
      <Card className={styles["dns-card"]} variant={variants.SECONDARY}>
        <button
          disabled={!(current && current.name)}
          className={styles.dns}
          onClick={() => {
            navigate("dns-list", { replace: true });
          }}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>{t("dns")}</span>
          </section>
          <span className={styles.value}>
            {capitalizeFirstLetter(current?.name)}
          </span>
        </button>
      </Card>
      <Card className={styles["rpc-card"]} variant={variants.SECONDARY}>
        <button
          disabled={!(current && current.name)}
          className={styles.dns}
          onClick={() => {
            navigate("rpc-change", { replace: true });
          }}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>{t("rpc")}</span>
          </section>
          <img src={RightArrow} alt="" />
        </button>
      </Card>
    </div>
  );
};

export default DNSCard;
