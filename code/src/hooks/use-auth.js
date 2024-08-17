import { CHANGE_AUTH_STATUS } from "@reducers/auth.reducer";
import { useDispatch } from "react-redux";
import useLoader from "./use-loader";
import authServices from "@services/auth.services";
import vpnServices from "@services/vpn.services";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { ALERT_TYPES } from "./use-alerts";
// import useModal from "./use-modal";

const useAuth = () => {
  const dispatch = useDispatch();
  const { startLoader, changeMessage, stopLoader } = useLoader();
  // const { showModal } = useModal();
  const login = async (mnemonic = "") => {
    try {
      startLoader({ message: "login_authenticating" });
      await authServices.login({ mnemonic });
      changeMessage({ message: "login_fetching_wallet" });
      const response = await authServices.fetchWalletAddress();
      await authServices.registerWalletAddress(response.address);

      if (response.address) {
        dispatch(
          CHANGE_AUTH_STATUS({
            isAuthenticated: true,
            mnemonic,
            walletAddress: response.address,
            isEncrypted: true,
          })
        );
        // showModal({
        //   name: "manage-key",
        //   cancellable: false,
        //   data: { walletAddress: response.address, mnemonic },
        // });
      }
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_login`,
          data: { error: e.message },
        })
      );
      console.error(e);
    } finally {
      stopLoader();
    }
  };
  const logout = async () => {
    try {
      await vpnServices.postDisconnect();
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_disconnecting_vpn`,
          data: { error: e.message },
        })
      );
    } finally {
      const lanaguage = window.localStorage.getItem("language") || "en";
      await window.localStorage.clear();
      window.localStorage.setItem("language", lanaguage);
      await dispatch(
        CHANGE_AUTH_STATUS({
          isAuthenticated: false,
          walletAddress: "",
          mnemonic: "",
          isEncrypted: false,
        })
      );
    }
  };
  return { login, logout };
};

export default useAuth;
