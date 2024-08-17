import BottomNavBar from "@containers/BottomNavBar";
import { useAuthSelector, useLoaderSelector, useSettingsSelector } from "@hooks/use-selector";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./private-router.module.scss";
import settingsServices from "@services/settings.services";
import useInitApp from "@hooks/use-init-app";
import useModal from "@hooks/use-modal";
import { dispatchGetFeeGrantDetails } from "@actions/auth.actions";
import { useDispatch } from "react-redux";
import useLoader from "@hooks/use-loader";
import { SET_FEEGRANT_CHECKED } from "@reducers/loader.reducer";

const PrivateRouter = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, walletAddress } = useAuthSelector();
  const { isFeegrantChecked } = useLoaderSelector();
  const { feeGrantEnabled } = useSettingsSelector();
  const { initApp } = useInitApp();
  const { showModal } = useModal();
  const { startLoader, stopLoader } = useLoader();

  const showBottomNavbar = React.useMemo(() => ["/user", "/user/countries", "/user/account", "/user/settings", "/user/recent-servers"].includes(location.pathname), [location.pathname]);

  // const shouldUserPay = React.useCallback(async () => {
  //   if (feeGrantEnabled) {
  //     try {
  //       const response = await settingsServices.fetchFeeGrantDetails(walletAddress);
  //       if (response.status === 200) {
  //         return false;
  //       }
  //       return true;
  //     } catch (e) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }, [feeGrantEnabled]);

  const shouldUserPay = React.useCallback(async () => {
    startLoader({ message: "checking_feegrant" });
    const isEnabled = await dispatch(dispatchGetFeeGrantDetails({ walletAddress, feeGrantEnabled }));
    stopLoader();
    return !isEnabled;
  }, [feeGrantEnabled, walletAddress]);

  const init = React.useCallback(async () => {
    if (!isFeegrantChecked) {
      const should = await shouldUserPay();
      if (should) {
        showModal({ name: "fee-grant", cancellable: false });
        return;
      }
      dispatch(SET_FEEGRANT_CHECKED(true));
    }

    initApp();
  }, [initApp, shouldUserPay]);

  React.useEffect(() => {
    if (isAuthenticated) {
      init();
      return;
    }
  }, [init, isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className={styles.root}>
        <section className={`${styles.outlet} ${showBottomNavbar ? styles.with : styles.without}`}>
          <Outlet />
        </section>
        {showBottomNavbar && (
          <section className={styles.navbar}>
            <BottomNavBar />
          </section>
        )}
      </div>
    );
  }
  return <Navigate to={"/"} replace={true} />;
});

export default PrivateRouter;
