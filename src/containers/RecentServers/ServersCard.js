import React from "react";
import ReactCountryFlag from "react-country-flag";
import Card, { variants } from "../../components/Card";
import styles from "./servers-card.module.scss";
import { parseWalletAddress } from "../../helpers/common.helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectAction } from "../../actions/vpn.actions";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";
import OnlineIcon from "../../assets/icons/online-icon.svg";
import OfflineIcon from "../../assets/icons/offline-icon.svg";
import TrashIcon from "../../assets/icons/trash-icon.svg";
import Button from "../../components/Button";
import { REMOVE_RECENT_SERVER } from "../../redux/reducers/device.reducer";
import { useTranslation } from "react-i18next";
const ServersCard = ({ server }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  const connect = async () => {
    const dispatched = dispatch(connectAction(server));

    try {
      const { payload } = await dispatched;
      if (payload) navigate("/", { replace: true });
    } catch (e) {
      console.log("CONSOLE FAILED TO CONNECT", JSON.stringify(e));
    }
  };

  return (
    <Card variant={variants.SECONDARY} className={styles.root}>
      <button
        className={styles.left}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!server.is_available) {
            dispatch(
              CHANGE_ERROR_ALERT({
                show: true,
                message: `error_server_is_offline`,
              })
            );
            return;
          }
          if (isVPNConnected) {
            dispatch(
              CHANGE_ERROR_ALERT({
                show: true,
                message: `error_disconnect_before_switch`,
              })
            );
            return;
          }
          connect();
        }}
      >
        <section className={styles.top}>
          <ReactCountryFlag
            style={{
              width: "21px",
              height: "21px",
            }}
            countryCode={server.code?.toUpperCase()}
            svg
          />
          <span
            className={styles.location}
          >{`${server.city}, ${server.code}`}</span>
          {server.is_available ? (
            <section className={`${styles.health} ${styles.active}`}>
              <img src={OnlineIcon} alt="" />
              <span>{t("online")}</span>
            </section>
          ) : (
            <section className={`${styles.health} ${styles.inactive}`}>
              <img src={OfflineIcon} alt="" />
              <span>{t("offline")}</span>
            </section>
          )}
        </section>
        <section className={styles.bottom}>
          <span className={styles.name}>{server.name}</span>
          <span className={styles.address}>
            {parseWalletAddress(server.address, 12, -12)}
          </span>
        </section>
      </button>
      <section className={styles.right}>
        <Button
          icon={TrashIcon}
          variant={variants.TRANSPARENT}
          onClick={() => {
            dispatch(REMOVE_RECENT_SERVER(server));
          }}
        />
      </section>
    </Card>
  );
};

export default ServersCard;
