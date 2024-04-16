import React from "react";
import styles from "./modal.module.scss";
import localStyles from "./init-alert-modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button, { variants } from "../../components/Button";
import { withLoader } from "../../actions/loader.action";
import { dispatchPostFeeGrant } from "../../actions/home.actions";
import { useTranslation } from "react-i18next";
const InitAlertModal = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.alerts.initiated);
  const { t } = useTranslation();

  return (
    <div className={styles.secondary}>
      <div className={styles[`secondary-container`]}>
        <div className={localStyles.root}>
          <section className={localStyles.top}>
            <span className={localStyles.title}>
              {t("modal_something_wrong")}
            </span>
            <span className={localStyles.text}>
              {t("modal_error_while_initiating_the_app")}
            </span>
            {message && (
              <span className={localStyles.text}>{`${message}`}</span>
            )}
          </section>
          <section className={localStyles.bottom}>
            <Button
              variant={variants.PRIMARY}
              title={t("btn_try_again")}
              className={localStyles.btn}
              onClick={() => {
                dispatch(withLoader([dispatchPostFeeGrant()]));
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default InitAlertModal;
