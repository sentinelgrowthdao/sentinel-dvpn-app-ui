import React from "react";
import QRCodeCard from "../../containers/Account/QRCodeCard";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import styles from "./wallet-details.module.scss";
import BalanceCard from "../../containers/Account/BalanceCard";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";

const WalletDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <BackButton to="Home" />
      <span className={styles.header}>{t("wallet_details")}</span>
      <BalanceCard />
      <QRCodeCard />
      <Button
        onClick={() => {
          navigate("/private-key");
        }}
        className={styles["copy-mnemonic"]}
        title={t("show_mnemonic")}
        variant={variants.PRIMARY}
      />
      <section className={styles["how-to-deposit"]}>
        <span className={styles.title}>{t("how_to_deposit_title")}</span>
        <span className={styles.description}>{t("how_to_deposit_desc")}</span>
      </section>
    </div>
  );
};

export default WalletDetails;
