import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";
import styles from "./alerts.module.scss";
import { useTranslation } from "react-i18next";

const ErrorAlert = () => {
  const { show, message, value } = useSelector((state) => state.alerts.error);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (show && message) {
      setTimeout(() => {
        dispatch(CHANGE_ERROR_ALERT({ show: false, message: null }));
      }, 3000);
    }
  }, [show, dispatch, message]);

  if (show) {
    return (
      <div className={styles.error}>
        <span>{t(message, { value })}</span>
      </div>
    );
  }
  return null;
};

export default ErrorAlert;
