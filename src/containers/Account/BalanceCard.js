import React from "react";
import Card from "../../components/Card";
import styles from "./balance-card.module.scss";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import ReloadIcon from "../../assets/icons/reload-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../../helpers/data.format";
import { withLoader } from "../../actions/loader.action";
import {
  dispatchCurrentPrice,
  dispatchGetAccountBalance,
  dispatchGetAvailablePlans,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
} from "../../actions/home.actions";
import { useTranslation } from "react-i18next";

const BalanceCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { balance, plan, subscription, price } = useSelector(
    (state) => state.home
  );
  const handleReloader = () => {
    const dispatchers = [
      dispatchGetAccountBalance(),
      dispatchGetIPAddress(),
      dispatchCurrentPrice(),
    ];
    if (plan && plan.providerAddress === null) {
      dispatchers.push(dispatchGetAvailablePlans());
    }
    if (Object.values(subscription).length === 0) {
      dispatchers.push(dispatchGetUserSubscriptions());
    }
    dispatch(withLoader(dispatchers));
  };
  return (
    <Card className={styles.root} variant={variants.PRIMARY}>
      <section className={styles.left}>
        <span className={styles.title}>{t("your_balance")}</span>
        <section className={styles.bottom}>
          <img src={BalanceIcon} alt="" />
          <span className={styles.description}>
            {`${formatAmount(balance / 1e6)}`} DVPN
          </span>
        </section>
      </section>

      <section className={styles.right}>
        <Button
          variant={variants.TRANSPARENT}
          icon={ReloadIcon}
          onClick={handleReloader}
          className={`${styles["reload-btn"]}`}
        />

        <span className={styles["current-value"]}>
          ${formatAmount(price * (balance / 1e6))}
        </span>
      </section>
    </Card>
  );
};

export default BalanceCard;
