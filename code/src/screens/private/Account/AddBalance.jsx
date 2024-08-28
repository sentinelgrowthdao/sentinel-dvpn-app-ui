import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import styles from "./add-balance.module.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CARD_VARIANTS, Image, RadioButton, Text } from "@components/index";
import SentinelLogo from "@pngs/sentinel-logo.png";
import { usePaymentsSelector, useUserSelector } from "@hooks/use-selector";
import RadioCheckIcon from "@components/RadioButton/RadioCheckIcon";
import { dispatchBuyProduct } from "@actions/payments.actions";
import useRefetch from "@hooks/use-refetch";
import { useNavigate } from "react-router-dom";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";

const AddBalance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refetch = useRefetch();
  const showAlert = useAlerts();
  const { products = [] } = usePaymentsSelector();
  const [selected, setSelected] = React.useState({});

  const { balance } = useUserSelector();

  const oldBalance = React.useMemo(() => balance, []);

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "add_balance",
        canGoBack: true,
      })
    );
  }, []);

  React.useEffect(() => {
    if (products.length > 0) {
      setSelected(products[Math.floor(products.length / 2)]);
    }
  }, [products.length]);

  const refresh = React.useCallback(async () => {
    while (true) {
      const isRefetched = await refetch();
      if (isRefetched && balance !== oldBalance) {
        return true;
      }
    }
  }, [balance]);

  return (
    <div className={`${styles.root} px-14 pb-24`}>
      <section className={styles.top}>
        <Text text={"get_some_dvpn"} className="fs-22 fw-6 mb-16 " />
        <Text text={"get_some_dvpn_desc"} className="fs-14 fw-4 text-9cabc9 mb-28" />
        <section className={styles.offers}>
          {products.map((p) => {
            const amount = p.identifier.split("_")[1];
            return (
              <Card key={p.identifier} className={`${styles.card} px-12  mb-8`} onClick={() => setSelected(p)} variant={CARD_VARIANTS.SECONDARY}>
                <section className={styles.left}>
                  <RadioCheckIcon isChecked={selected.identifier === p.identifier} />
                  <Text text={`${Number.parseInt(amount).toLocaleString()}`} className="fs-20 fw-4 ml-6 mr-4" />
                  <Image src={SentinelLogo} width={"16px"} />
                </section>
                <Text text={p.localizedPriceString} className="fs-20 fw-4" />
              </Card>
            );
          })}
        </section>
      </section>
      <section className={styles.bottom}>
        <Button
          className={`${styles["buy-button"]} mb-14`}
          onClick={async () => {
            try {
              const payload = await dispatch(dispatchBuyProduct(selected)).unwrap();
              if (payload && payload.transaction) {
                const isRefetched = await refresh();
                if (isRefetched) {
                  navigate(-1, { replace: true });
                }
              }
            } catch (e) {
              showAlert({ type: ALERT_TYPES.error, message: "error_adding_balance" });
            }
          }}
        >
          <Text text={"buy_now"} className="py-8" />
        </Button>
        <Text text={"get_some_dvpn_foot_note"} className="text-9cabc9 fs-12 fw-4" data={{ amount: selected?.localizedPriceString, tokens: Number.parseInt(selected?.identifier?.split("_")[1])?.toLocaleString() }} />
      </section>
    </div>
  );
};

export default AddBalance;
