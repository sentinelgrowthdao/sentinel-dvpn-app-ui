import React from "react";
import styles from "./server-card.module.scss";
import Card, { variants } from "../../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { connectAction } from "../../../actions/vpn.actions";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../../redux/reducers/alerts.reducer";
import { MODAL_VARIANTS } from "../../Modal/modal-types";
import { parseWalletAddress } from "../../../helpers/common.helpers";
import { GAS_PRICE_AMOUNT } from "../../../constants";

const ServerCard = ({ server }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { balance, subscription } = useSelector((state) => state.home);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  const connect = async (node) => {
    if (balance <= GAS_PRICE_AMOUNT) {
      await dispatch(
        CHANGE_MODAL_STATE({
          show: true,
          type: "no-balance",
          variant: MODAL_VARIANTS.PRIMARY,
        })
      );
      navigate(location.pathname, {
        state: {
          showModal: true,
          type: "no-balance",
          variant: MODAL_VARIANTS.PRIMARY,
        },
      });
      return;
    }

    if (!subscription || Object.values(subscription).length === 0) {
      dispatch(
        CHANGE_MODAL_STATE({
          show: true,
          type: "renew-subscription",
          variant: MODAL_VARIANTS.PRIMARY,
        })
      );
      navigate(location.pathname, {
        state: {
          showModal: true,
          type: "renew-subscription",
          variant: MODAL_VARIANTS.PRIMARY,
        },
      });
      return;
    }
    const dispatched = dispatch(connectAction(node));

    try {
      const { payload } = await dispatched;
      if (payload) navigate("/", { replace: true });
    } catch (e) {
      console.length("CONSOLE FAILED TO CONNECT");
    }
  };

  return (
    <Card variant={variants.SECONDARY}>
      <button
        className={styles.root}
        onClick={(event) => {
          event.preventDefault();
          if (isVPNConnected) {
            dispatch(
              CHANGE_ERROR_ALERT({
                show: true,
                message: `error_disconnect_before_switch`,
              })
            );
            return;
          }
          connect(server);
        }}
      >
        <section className={styles.details}>
          <span className={styles.name}>{server.name}</span>
          <span className={styles.value}>
            {parseWalletAddress(server.address)}
          </span>
        </section>
      </button>
    </Card>
  );
};

export default ServerCard;
