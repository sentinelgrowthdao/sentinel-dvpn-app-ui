import React from "react";
import styles from "./alerts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";
import { useTranslation } from "react-i18next";

const SuccessAlert = () => {
  const { show, message, value } = useSelector((state) => state.alerts.success);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (show && message) {
      setTimeout(() => {
        dispatch(CHANGE_SUCCESS_ALERT({ show: false, message: null }));
      }, 2000);
    }
  }, [show, dispatch, message]);

  if (show) {
    return (
      <div className={styles.success}>
        <span>{t(message, { value })}</span>
      </div>
    );
  }
  return null;
};

export default SuccessAlert;
