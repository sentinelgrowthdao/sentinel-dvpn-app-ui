import React from "react";
import Button, { variants } from "../../components/Button";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../../actions/loader.action";
import { connectAction, disconnectAction } from "../../actions/vpn.actions";
import styles from "./connect-button.module.scss";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../redux/reducers/alerts.reducer";
import {
  getCitiesByCountry,
  getRandomNode,
  getServersByCityAndCountryId,
} from "../../helpers/filterServers";
import {
  dispatchGetAvailableCities,
  dispatchGetAvailableNodes,
} from "../../actions/nodes.action";
import { MODAL_VARIANTS } from "../Modal/modal-types";
import { useLocation, useNavigate } from "react-router-dom";
import proxyServices from "../../services/proxy.services";
import { GAS_PRICE_AMOUNT } from "../../constants";
import { useTranslation } from "react-i18next";

const ConnectButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const node = useSelector((state) => state.device.selectedNode);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);
  const { balance, subscription } = useSelector((state) => state.home);
  const countries = useSelector((state) => state.nodes.countries);
  const cities = useSelector((state) => state.nodes.cities.all);
  const nodes = useSelector((state) => state.nodes.servers.all);
  const isConnecting = useSelector((state) => state.alerts.isConnecting);

  const getServers = async () => {
    try {
      if (countries && countries.length > 0) {
        let currentCountry;
        let currentCity;

        currentCountry = getRandomNode(countries);

        const localCities = getCitiesByCountry(currentCountry, cities);

        if (localCities && localCities.length > 0) {
          currentCity = getRandomNode(localCities);
        } else {
          const { payload } = await dispatch(
            dispatchGetAvailableCities(currentCountry)
          );
          currentCity = getRandomNode(payload.current);
        }

        const servers = getServersByCityAndCountryId(
          currentCity.id,
          currentCountry.id,
          nodes
        );

        if (servers && servers.length > 0) {
          return servers;
        } else {
          const { payload } = await dispatch(
            dispatchGetAvailableNodes(currentCity)
          );

          return payload.current;
        }
      } else {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: `error_no_countries_available`,
          })
        );
        return [];
      }
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: `error_failed_to_fetch_a_server`,
        })
      );
      return [];
    }
  };

  const handleConnect = async () => {
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
    if (node && node.address) {
      try {
        const resp = await proxyServices.postRecentServersList({
          addresses: [node.address],
        });
        const nodeStatus = resp?.data[0]?.is_available;
        if (nodeStatus) {
          dispatch(withLoader([connectAction(node)]));
          return;
        } else {
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: `error_offline_node`,
            })
          );
        }
      } catch (e) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: `error_unable_to_fetch_server_details`,
          })
        );
      } finally {
        return;
      }
    }
    let list = await getServers();

    if (list && list.length > 0) {
      const node = getRandomNode(list);

      const dispatched = dispatch(connectAction(node));

      try {
        await dispatched;
      } catch (e) {
        console.log("CONSOLE FAILED TO CONNECT");
      }
    }
  };

  const handleDisconnect = () => {
    dispatch(withLoader([disconnectAction(node)]));
  };

  if (isVPNConnected) {
    return (
      <Button
        variant={variants.SECONDARY}
        title={t("btn_disconnect")}
        className={styles.btn}
        onClick={handleDisconnect}
      />
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={(countries && countries.length === 0) || isConnecting}
      icon={QuickConnectIcon}
      variant={variants.PRIMARY}
      title={t("btn_quick_connect")}
      className={styles.btn}
    />
  );
};

export default ConnectButton;
