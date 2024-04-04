import React from "react";
import ReactCountryFlag from "react-country-flag";
import Card, { variants } from "../../components/Card";
import styles from "./servers-card.module.scss";
import { parseWalletAddress } from "../../helpers/common.helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectAction } from "../../actions/vpn.actions";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";

const ServersCard = ({ server }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  const connect = async () => {
    const dispatched = dispatch(connectAction(server));

    try {
      const { payload } = await dispatched;
      if (payload) navigate("/");
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
          if (isVPNConnected) {
            dispatch(
              CHANGE_ERROR_ALERT({
                show: true,
                message: `Please dis-connect from VPN before switching`,
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
        </section>
        <section className={styles.bottom}>
          <span className={styles.name}>{server.name}</span>
          <span className={styles.address}>
            {parseWalletAddress(server.address, 12, -12)}
          </span>
        </section>
      </button>
      <section className={styles.right}></section>
    </Card>
  );
};

export default ServersCard;
