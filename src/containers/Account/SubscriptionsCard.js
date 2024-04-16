import React from "react";
import Card, { variants } from "../../components/Card";
import styles from "./subscriptions-card.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const SubscriptionsCard = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const { subscription } = useSelector((state) => state.home);

  React.useEffect(() => {
    if (subscription && subscription.id) {
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const currentDate = new Date();
      const targetDate = new Date(subscription.inactiveAt);
      const remainingDays = Math.ceil(
        (targetDate.getTime() - currentDate.getTime()) / millisecondsPerDay
      );
      setValue(remainingDays);
    }
  }, [subscription, subscription.id, subscription.inactiveAt]);

  return (
    <Card className={styles.root} variant={variants.PRIMARY}>
      <span className={styles.title}>{t("subscription_status")}</span>
      <span className={styles.value}>{t("days_remaining", { value })}</span>
    </Card>
  );
};

export default SubscriptionsCard;
