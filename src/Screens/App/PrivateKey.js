import React from "react";
import copyToClipboard from "copy-to-clipboard";
import styles from "./private-key.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";

const PrivateKey = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.device.mnemonic);

  const handleRevealCopy = () => {
    copyToClipboard(mnemonic);
    dispatch(
      CHANGE_SUCCESS_ALERT({ show: true, message: "success_key_coped" })
    );
    return;
  };

  return (
    <div className={styles.root}>
      <BackButton to={"wallet_details"} />
      <section className={styles.top}>
        <span className={styles.title}>
          {t("your_unique_private_key_title")}
        </span>
        <span className={styles.description}>
          {t("your_unique_private_key_desc", {
            length: mnemonic.split(" ").length,
          })}
        </span>
      </section>
      <section className={styles.middle}>
        {mnemonic.split(" ").map((v, index) => (
          <span key={`${v}-${index}`} className={`${styles["mnemonic-value"]}`}>
            {v}
          </span>
        ))}
      </section>

      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={t("btn_copy_private_key")}
          className={styles["primary-btn"]}
          onClick={handleRevealCopy}
        />
      </section>
    </div>
  );
};

export default PrivateKey;
