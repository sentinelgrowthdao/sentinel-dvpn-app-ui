import { dispatchFetchAccountBalance, dispatchFetchTokenPrice } from "@actions/auth.actions";
import { dispatchFetchAvailableDNS } from "@actions/settings.actions";
import { dispatchFetchAvailablePlans, dispatchFetchAvailableSubscriptions, dispatchFetchCurrentDNS, dispatchFetchCurrentRPC } from "@actions/user.actions";

const { useDispatch } = require("react-redux");
const { default: useAlerts, ALERT_TYPES } = require("./use-alerts");
const { default: useLoader } = require("./use-loader");
const { useAuthSelector, useUserSelector, useSettingsSelector } = require("./use-selector");

const useRefetch = () => {
  const dispatch = useDispatch();
  const showAlert = useAlerts();
  const { startLoader, stopLoader } = useLoader();
  const { walletAddress } = useAuthSelector();
  const { isPlansFetched, isSubscriptionFetched, rpc, dns } = useUserSelector();
  const { dnsList } = useSettingsSelector();

  const refetch = async () => {
    try {
      startLoader({
        message: "refreshing_your_details",
      });

      const promises = [dispatch(dispatchFetchAccountBalance(walletAddress)), dispatch(dispatchFetchTokenPrice())];

      if (!(rpc && rpc.host)) {
        promises.push(dispatch(dispatchFetchCurrentRPC()));
      }

      if (!(dns && dns.name)) {
        promises.push(dispatch(dispatchFetchCurrentDNS()));
      }

      if (!(dnsList && dnsList.length > 0)) {
        promises.push(dispatch(dispatchFetchAvailableDNS()));
      }

      if (!isPlansFetched) {
        promises.push(dispatch(dispatchFetchAvailablePlans()));
      }

      if (!isSubscriptionFetched) {
        promises.push(dispatch(dispatchFetchAvailableSubscriptions(walletAddress)));
      }

      await Promise.all(promises);
      return true;
    } catch (err) {
      showAlert({
        type: ALERT_TYPES.error,
        message: err.message || JSON.stringify(err),
      });
      return false;
    } finally {
      stopLoader();
    }
  };

  return refetch;
};

export default useRefetch;
