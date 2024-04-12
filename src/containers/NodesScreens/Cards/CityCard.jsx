import React from "react";
import Card, { variants } from "../../../components/Card";
import styles from "./city-card.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_SELECTED } from "../../../redux/reducers/nodes.reducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/Button";
import QuickConnectIcon from "../../../assets/icons/quick-connect-icon.svg";
import {
  getRandomNode,
  getServersByCityAndCountryId,
} from "../../../helpers/filterServers";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../../redux/reducers/alerts.reducer";
import { connectAction } from "../../../actions/vpn.actions";
import { dispatchGetAvailableNodes } from "../../../actions/nodes.action";
import { MODAL_VARIANTS } from "../../Modal/modal-types";
import { GAS_PRICE_NUMBER } from "../../../constants";

const CityQuickConnect = ({ city }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.servers.all);
  const { balance, subscription } = useSelector((state) => state.home);
  const [servers, setServers] = React.useState([]);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  React.useEffect(() => {
    const servers = getServersByCityAndCountryId(
      city.id,
      city.country_id,
      nodes
    );
    setServers(servers);
    return;
  }, [city, nodes]);

  const connect = async () => {
    if (isVPNConnected) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: `Please dis-connect from VPN before switching`,
        })
      );
      return;
    }

    if (balance <= GAS_PRICE_NUMBER) {
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
      await dispatch(
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
    let list = servers;
    const nodes = await dispatch(dispatchGetAvailableNodes(city));
    list = nodes.payload.current;

    if (!(list && list.length > 0)) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: `Failed fetch Servers of ${city.name}`,
        })
      );
    }

    const node = getRandomNode(list);
    const dispatched = dispatch(connectAction(node));

    try {
      const { payload } = await dispatched;
      if (payload) navigate("/", { replace: true });
    } catch (e) {
      console.log("CONSOLE FAILED TO CONNECT");
    }
  };

  return (
    <Button
      className={styles["quick-connect-btn"]}
      variant={isVPNConnected ? variants.SECONDARY : variants.PRIMARY}
      icon={QuickConnectIcon}
      onClick={connect}
    />
  );
};

const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card variant={variants.SECONDARY} className={styles.root}>
      <button
        className={styles.left}
        onClick={(event) => {
          event.preventDefault();
          dispatch(SET_SELECTED({ city }));
          navigate(`${city.id}/servers`);
        }}
      >
        <section className={styles.details}>
          <span className={styles.name}>{city.name}</span>
          <span className={styles.value}>
            {city.servers_available}{" "}
            {`${city.servers_available > 1 ? "Nodes" : "Node"}`}
          </span>
        </section>
      </button>
      <CityQuickConnect city={city} />
    </Card>
  );
};

export default CityCard;
