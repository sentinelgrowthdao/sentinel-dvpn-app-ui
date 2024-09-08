import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./wallet-details.module.scss";
import BalanceCard from "@containers/Account/BalanceCard";
import QRCodeCard from "@containers/Account/QRCodeCard";
import { Button, Text } from "@components/index";
import { getMobileOS } from "@helpers/getOSType";

const WalletDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "wallet_details",
        canGoBack: true,
      })
    );
  }, []);
  return (
    <div className={styles.root}>
      <BalanceCard />
      <QRCodeCard />
      <Button onClick={() => navigate("/user/private-key")}>
        <Text text="show_mnemonic" className="py-14" />
      </Button>
      {getMobileOS() !== "ios" && (
        <section className={`${styles["how-to-deposit"]} mt-24`}>
          <Text text={"how_to_deposit_title"} className="fs-20 fw-6 mb-16  ml-8" />
          <Text text={"how_to_deposit_desc"} className="fs-14 fw-4 text-9cabc9 ml-8 mb-16" />
        </section>
      )}
    </div>
  );
};

export default WalletDetails;
