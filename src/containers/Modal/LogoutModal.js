import React from "react";
import Button, { variants } from "../../components/Button";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useDispatch } from "react-redux";
import styles from "./logout.module.scss";
import CheckIcon from "../../assets/icons/checkbox-icon.svg";
import { useNavigate } from "react-router-dom";
import { dispatchDeleteWallet } from "../../actions/account.actions";
import vpnServices from "../../services/vpn.services";
import { useTranslation } from "react-i18next";

const LogoutModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isUserSavedKey, setIsUserSavedKey] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <span className={styles.title}>{t("modal_logout_title")}</span>
      <span className={styles.description}>{t("modal_logout_desc")}</span>
      <label className={styles.confirmation}>
        <input
          type="checkbox"
          checked={isUserSavedKey}
          onChange={() => {
            setIsUserSavedKey(!isUserSavedKey);
          }}
        />
        <div className={`${styles["check-box"]}`}>
          {isUserSavedKey && <img src={CheckIcon} alt="" />}
        </div>
        <span className={styles.label}>{t("modal_logout_checkbox_label")}</span>
      </label>
      <Button
        title={t("btn_cancel")}
        variant={variants.PRIMARY}
        className={`${styles.btn} ${styles["cancel-btn"]}`}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
      <Button
        title={t("logout")}
        variant={variants.SECONDARY}
        className={`${styles.btn} ${styles["logout-btn"]}`}
        onClick={async () => {
          try {
            await window.localStorage.clear();
            await vpnServices.postDisconnect();
            await dispatch(dispatchDeleteWallet());
            navigate("/", { replace: true });
            navigate(0, { replace: true });
            navigate(0, { replace: true });
          } catch (e) {
            try {
              await window.localStorage.clear();
              await vpnServices.postDisconnect();
              navigate("/", { replace: true });
              navigate(0, { replace: true });
              navigate(0, { replace: true });
            } catch (e) {
              await window.localStorage.clear();
              navigate("/", { replace: true });
              navigate(0, { replace: true });
              navigate(0, { replace: true });
            }
          }
        }}
        disabled={!isUserSavedKey}
      />
    </div>
  );
};

export default LogoutModal;
