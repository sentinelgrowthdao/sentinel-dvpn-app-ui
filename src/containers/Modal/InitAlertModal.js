import React from "react";
import styles from "./modal.module.scss";
import localStyles from "./init-alert-modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button, { variants } from "../../components/Button";
import { withLoader } from "../../actions/loader.action";
import { dispatchPostFeeGrant } from "../../actions/home.actions";

const InitAlertModal = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.alerts.initiated);
  return (
    <div className={styles.secondary}>
      <div className={styles[`secondary-container`]}>
        <div className={localStyles.root}>
          <section className={localStyles.top}>
            <span className={localStyles.title}>Something went wrong...!</span>
            <span className={localStyles.text}>
              {`There is an error while initiating the app.`}
            </span>
            {message && (
              <span className={localStyles.text}>{`${message}`}</span>
            )}
          </section>
          <section className={localStyles.bottom}>
            <Button
              variant={variants.PRIMARY}
              title={`Try again`}
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
