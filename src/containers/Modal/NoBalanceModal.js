import React from "react";
import styles from "./no-balance.module.scss";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useNavigate } from "react-router-dom";
import { formatAmount } from "../../helpers/data.format";
import { useTranslation } from "react-i18next";

const NoBalanceModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { balance } = useSelector((state) => state.home);

  return (
    <div className={styles["no-balance-modal"]}>
      <span className={styles.title}>{t("modal_no_balance_title")}</span>
      <span className={styles.description}>{t("modal_no_balance_desc")}</span>
      <section className={styles.balance}>
        <img src={BalanceIcon} alt="" />
        <span className={styles.amount}>
          {`${formatAmount(balance / 1e6)} DVPN`}
        </span>
      </section>
      <Button
        variant={variants.PRIMARY}
        className={styles["ok-btn"]}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
          navigate("/account/wallet-details");
        }}
        title={t("btn_add_balance")}
      />
    </div>
  );
};

export default NoBalanceModal;
