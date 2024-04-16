import React from "react";
import copyToClipboard from "copy-to-clipboard";
import styles from "./create.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
  CHANGE_SUCCESS_ALERT,
} from "../../redux/reducers/alerts.reducer";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";
import blockchainServices from "../../services/blockchain.services";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [revealed, setRevealed] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState([]);

  React.useLayoutEffect(() => {
    const fetchMnemonic = async () => {
      try {
        dispatch(
          CHANGE_LOADER_STATE({
            show: true,
            message: "loader_fetching_private_key",
          })
        );
        const response = await blockchainServices.getPrivateKey();
        setMnemonic(response.keywords);
        dispatch(
          CHANGE_LOADER_STATE({
            show: false,
            message: "",
          })
        );
      } catch (e) {
        dispatch(
          CHANGE_LOADER_STATE({
            show: false,
            message: "",
          })
        );
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "error_Failed_to_get_private_key",
          })
        );
      }
    };
    fetchMnemonic();
  }, [dispatch]);

  const handleRevealCopy = () => {
    if (revealed) {
      copyToClipboard(mnemonic.join(" "));
      dispatch(
        CHANGE_SUCCESS_ALERT({ show: true, message: "success_key_coped" })
      );

      return;
    }
    setRevealed(true);
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>
          {t("your_unique_private_key_title")}
        </span>
        <span className={styles.description}>
          {t("your_unique_private_key_desc", { length: mnemonic.length })}
        </span>
      </section>
      <section className={styles.middle}>
        {mnemonic.map((v, index) => (
          <span
            key={`${v}-${index}`}
            className={`${styles["mnemonic-value"]} ${
              revealed ? "" : styles.blur
            }`}
          >
            {v}
          </span>
        ))}
      </section>

      <section className={styles.bottom}>
        <Button
          variant={`${revealed ? variants.SECONDARY : variants.PRIMARY}`}
          title={`${
            revealed ? t("btn_copy_private_key") : t("btn_reveal_private_key")
          }`}
          className={styles["primary-btn"]}
          onClick={handleRevealCopy}
          disabled={!(mnemonic && mnemonic.length > 0)}
        />
        <Button
          disabled={!revealed}
          variant={`${revealed ? variants.PRIMARY : variants.SECONDARY}`}
          title={t("btn_create_account")}
          className={styles["secondary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            const { payload } = await dispatch(
              withSingleDispatcherLoader(
                createWalletWithMnemonic(mnemonic.join(" "))
              )
            );
            if (
              payload &&
              payload.error &&
              payload.error.message &&
              payload.error.message === "Rejected"
            ) {
              return;
            }
            navigate("/", { replace: true });
          }}
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>
            {t("already_have_an_account")}
          </span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/import", { replace: true });
            }}
          >
            {t("btn_login")}
          </button>
        </section>
      </section>
    </div>
  );
};

export default Create;
