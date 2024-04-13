import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import BottomTabs from "../components/BottomTabs";
import Modal from "../containers/Modal";
import styles from "./app-layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchCheckLatestVersion,
  withLoader,
} from "../actions/loader.action";
import {
  dispatchCurrentPrice,
  dispatchGetAccountBalance,
  dispatchGetAppVersion,
  dispatchGetAvailablePlans,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
  dispatchPostFeeGrant,
} from "../actions/home.actions";
import { dispatchGetVPNStatus } from "../actions/vpn.actions";
import { dispatchGetAvailableDNS } from "../actions/settings.action";
import { CHANGE_IS_HOME_LOADED } from "../redux/reducers/home.reducer";
import { dispatchGetAvailableCountries } from "../actions/nodes.action";

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );
  const { modal, initiated } = useSelector((state) => state.alerts);
  const { isHomeLoaded } = useSelector((state) => state.home);

  React.useEffect(() => {
    const initateApp = async () => {
      if (initiated.loading && !initiated.success) {
        dispatch(withLoader([dispatchPostFeeGrant()]));
        return;
      }
      if (!initiated.loading && initiated.success) {
        dispatch(
          withLoader([
            dispatchGetVPNStatus(),
            dispatchGetAppVersion(),
            dispatchCheckLatestVersion(),
            dispatchCurrentPrice(),
            dispatchGetAccountBalance(),
            dispatchGetAvailablePlans(),
            dispatchGetUserSubscriptions(),
            dispatchGetAvailableDNS(),
            dispatchGetIPAddress(),
            dispatchGetAvailableCountries(),
            CHANGE_IS_HOME_LOADED(),
          ])
        );
        return;
      }
    };
    if (!isHomeLoaded) {
      initateApp();
    }
  }, [
    dispatch,
    initiated.loading,
    initiated.show,
    initiated.success,
    isHomeLoaded,
  ]);

  const showBottomNavbar = [
    "/",
    "/countries",
    "/account",
    "/settings",
    "/recent-servers",
  ].includes(location.pathname);

  if (!(isRegistered && isWalletCreated)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className={styles.root}>
        <section
          className={`${styles.outlet} ${
            showBottomNavbar ? styles.with : styles.without
          }`}
        >
          <Outlet />
        </section>
        {showBottomNavbar && (
          <section className={styles.nav}>
            <BottomTabs />
          </section>
        )}
      </div>
      <Modal type={modal.type} show={modal.show} variant={modal.variant} />
    </>
  );
};

export default AppLayout;
