import React from "react";
import styles from "./fee-granter.module.scss";
import { useTranslation } from "react-i18next";
import Button, { variants } from "../../components/Button";
import { useDispatch } from "react-redux";
import { CHANGE_FEE_GRANT_ENABLED } from "../../redux/reducers/device.reducer";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { dispatchWindowOpen } from "../../actions/settings.action";
const FeeGranterModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <span className={styles.header}>{t("fee_grant")}</span>
      <span className={styles.subheader}>{t("fee_grant_subheader")}</span>
      <button
        className={styles["link-btn"]}
        onClick={() => {
          dispatch(
            dispatchWindowOpen(
              "https://docs.cosmos.network/v0.46/modules/feegrant/"
            )
          );
        }}
      >
        {t("what_is_fee_grant")}
      </button>
      <Button
        variant={variants.PRIMARY}
        title={t("btn_proceed")}
        className={styles["proceed-btn"]}
        onClick={() => {
          dispatch(CHANGE_FEE_GRANT_ENABLED(false));
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
    </div>
  );
};

export default FeeGranterModal;
