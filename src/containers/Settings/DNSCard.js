import React from "react";
import styles from "./dns-card.module.scss";
import Card, { variants } from "../../components/Card";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import FeeIcon from "../../assets/icons/fee-icon.svg";
import SwitchIcon from "../../assets/icons/switch-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RightArrow from "../../assets/icons/right-arrow-icon.svg";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";

const DNSCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((state) => state.dns.current);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  return (
    <div className={styles.root}>
      <span className={styles.title}>DVPN</span>
      <Card className={styles["dns-card"]} variant={variants.SECONDARY}>
        <button
          disabled={!(current && current.name)}
          className={styles.dns}
          onClick={() => {
            navigate("dns-list", { replace: true });
          }}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>{t("dns")}</span>
          </section>
          <span className={styles.value}>
            {capitalizeFirstLetter(current?.name)}
          </span>
        </button>
      </Card>
      <Card className={styles["dns-card"]} variant={variants.SECONDARY}>
        <button
          className={styles.dns}
          onClick={() => {
            if (isVPNConnected) {
              dispatch(
                CHANGE_ERROR_ALERT({
                  show: true,
                  message: `error_disconnect_before_changing_rpc`,
                })
              );
              return;
            }
            navigate("rpc-change", { replace: true });
          }}
        >
          <section>
            <img src={FeeIcon} alt="" />
            <span>{t("rpc")}</span>
          </section>
          <img src={RightArrow} alt="" />
        </button>
      </Card>
      <Card className={styles["dns-card"]} variant={variants.SECONDARY}>
        <button
          className={styles.dns}
          onClick={() => {
            if (isVPNConnected) {
              dispatch(
                CHANGE_ERROR_ALERT({
                  show: true,
                  message: `error_disconnect_before_changing_fee_granter`,
                })
              );
              return;
            }
            navigate("fee-granter", { replace: true });
          }}
        >
          <section>
            <img src={SwitchIcon} alt="" />
            <span>{t("fee_grant")}</span>
          </section>
          <img src={RightArrow} alt="" />
        </button>
      </Card>
    </div>
  );
};

export default DNSCard;
