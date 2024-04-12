import React from "react";
import Button, { variants } from "../../components/Button";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useDispatch } from "react-redux";
import styles from "./logout.module.scss";
import CheckIcon from "../../assets/icons/checkbox-icon.svg";
import { useNavigate } from "react-router-dom";
import { dispatchDeleteWallet } from "../../actions/account.actions";
import vpnServices from "../../services/vpn.services";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const [isUserSavedKey, setIsUserSavedKey] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <span className={styles.title}>Log out</span>
      <span className={styles.description}>
        Make sure you have a copy of your keys otherwise you cannot recover your
        wallet.
      </span>
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
        <span className={styles.label}>I have stored my private key</span>
      </label>
      <Button
        title={"Cancel"}
        variant={variants.PRIMARY}
        className={`${styles.btn} ${styles["cancel-btn"]}`}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
      <Button
        title={"Log out"}
        variant={variants.SECONDARY}
        className={`${styles.btn} ${styles["logout-btn"]}`}
        onClick={async () => {
          await window.localStorage.clear();
          await vpnServices.postDisconnect();
          await dispatch(dispatchDeleteWallet());
          navigate("/", { replace: true });
          navigate(0, { replace: true });
          navigate(0, { replace: true });
        }}
        disabled={!isUserSavedKey}
      />
    </div>
  );
};

export default LogoutModal;
