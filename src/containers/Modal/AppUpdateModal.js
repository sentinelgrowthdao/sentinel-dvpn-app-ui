import React from "react";
import localStyles from "./app-update.module.scss";
import styles from "./modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Button, { variants } from "../../components/Button";
import { dispatchWindowOpen } from "../../actions/settings.action";

const AppUpdateModal = () => {
  const version = useSelector((state) => state.home.version);
  const { latest } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  return (
    <div className={styles.secondary}>
      <div className={styles[`secondary-container`]}>
        <div className={localStyles.root}>
          <section className={localStyles.top}>
            <span className={localStyles.title}>Update available...!</span>
            <span
              className={localStyles.old}
            >{`Your app version is ${version}`}</span>
            <span className={localStyles.new}>
              {`Latest version available ${latest.version}`}
            </span>
            <span className={localStyles.support}>
              Please update the app to enjoy.
            </span>
          </section>
          <section className={localStyles.bottom}>
            <Button
              variant={variants.PRIMARY}
              title={`Update to ${latest.version}`}
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
