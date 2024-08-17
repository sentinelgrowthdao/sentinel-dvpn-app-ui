import { BTN_VARIANTS, Button, Card, Text } from "@components/index";
import React from "react";
import styles from "./balance-card.module.scss";
import { useUserSelector } from "@hooks/use-selector";
import formatAmount from "@helpers/formatAmount";
import PoweredByCosmosIcon from "@svgs/powered-by-cosmos.svg";
import ReloadIcon from "@svgs/reload-icon.svg";
import BalanceIcon from "@svgs/balance-icon.svg";
import useRefetch from "@hooks/use-refetch";

const BalanceCard = () => {
  const { balance, price } = useUserSelector();
  const refetch = useRefetch();
  return (
    <Card className={`${styles.root} py-12`}>
      <section className={`${styles.top} px-12`}>
        <section className={styles.left}>
          <img src={BalanceIcon} alt="" className={styles.icon} />
          <section className={`${styles["details"]} ml-4 py-2`}>
            <Text text={"your_tokens"} className={`fs-13 fw-6 text-9cabc9`} />
            <Text
              text={`${formatAmount(balance / 1e6)} DVPN`}
              className={`fs-20 fw-6`}
            />
          </section>
        </section>
        <section className={styles.right}>
          <Button
            variant={BTN_VARIANTS.TRANSPARENT}
            className={styles.icon}
            onClick={refetch}
          >
            <img src={ReloadIcon} alt="" className={styles.icon} />
          </Button>
        </section>
      </section>
      <section className={`${styles.bottom} py-2 px-12 mt-12 mr-12`}>
        <Text
          text={`~$${formatAmount(price * (balance / 1e6))}`}
          className="fs-14 fw-4 text-9cabc9"
        />
      </section>
    </Card>
  );
};

export default BalanceCard;
