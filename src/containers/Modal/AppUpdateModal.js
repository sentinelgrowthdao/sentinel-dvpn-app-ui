import React from "react";
import localStyles from "./app-update.module.scss";
import styles from "./modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Button, { variants } from "../../components/Button";
import { dispatchWindowOpen } from "../../actions/settings.action";
import { useTranslation } from "react-i18next";

const AppUpdateModal = () => {
  const version = useSelector((state) => state.home.version);
  const { latest } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className={styles.secondary}>
      <div className={styles[`secondary-container`]}>
        <div className={localStyles.root}>
          <section className={localStyles.top}>
            <span className={localStyles.title}>
              {t("modal_update_available")}
            </span>
            <span className={localStyles.old}>
              {t("modal_your_app_version", { version })}
            </span>
            <span className={localStyles.new}>
              {t("modal_latest_app_version", { version: latest.version })}
            </span>
            <span className={localStyles.support}>
              {t("modal_update_app_to_enjoy")}
            </span>
          </section>
          <section className={localStyles.bottom}>
            <Button
              variant={variants.PRIMARY}
              title={`${t("btn_update_to_latest_version", {
                version: latest.version,
              })}`}
              className={localStyles.btn}
              onClick={() => {
                dispatch(dispatchWindowOpen("https://getdvpn.app/update"));
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppUpdateModal;
