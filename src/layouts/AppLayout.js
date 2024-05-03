import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  dispatchGetCurrnetRPC,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
  dispatchIsFeeGrantEnabled,
} from "../actions/home.actions";
import { dispatchGetVPNStatus } from "../actions/vpn.actions";
import { dispatchGetAvailableDNS } from "../actions/settings.action";
import { CHANGE_IS_HOME_LOADED } from "../redux/reducers/home.reducer";
import { dispatchGetAvailableCountries } from "../actions/nodes.action";
import { CHANGE_MODAL_STATE } from "../redux/reducers/alerts.reducer";
import { MODAL_VARIANTS } from "../containers/Modal/modal-types";

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isWalletCreated, isRegistered, feeGrantEnabled } = useSelector(
    (state) => state.device
  );
  const { modal, granter, latest } = useSelector((state) => state.alerts);
  const { isHomeLoaded } = useSelector((state) => state.home);

  const checkAppVersion = React.useCallback(async () => {
    if (latest.loading) {
      dispatch(
        withLoader([dispatchGetAppVersion(), dispatchCheckLatestVersion()])
      );
      return;
    }
  }, [dispatch, latest.loading]);

  const showFeeGrantModal = React.useCallback(() => {
    dispatch(
      CHANGE_MODAL_STATE({
        show: true,
        type: "fee-granter",
        variant: MODAL_VARIANTS.SECONDARY,
      })
    );
    navigate(location.pathname, {
      state: {
        showModal: true,
        type: "fee-granter",
        variant: MODAL_VARIANTS.SECONDARY,
      },
    });
    return;
  }, [dispatch, location.pathname, navigate]);

  React.useEffect(() => {
    const dispatchInit = () => {
      if (!isHomeLoaded) {
        dispatch(
          withLoader([
            dispatchGetVPNStatus(),
            dispatchGetCurrnetRPC(),
            dispatchGetAvailableCountries(),
            dispatchGetAvailableDNS(),
            dispatchGetIPAddress(),
            dispatchCurrentPrice(),
            dispatchGetAvailablePlans(),
            dispatchGetAccountBalance(),
            dispatchGetUserSubscriptions(),
            CHANGE_IS_HOME_LOADED(),
          ])
        );
      }
    };

    if (!feeGrantEnabled) {
      dispatchInit();
      return;
    }

    if (feeGrantEnabled) {
      if (granter.continue) {
        dispatchInit();
        return;
      }
      if (granter.loading) {
        dispatch(withLoader([dispatchIsFeeGrantEnabled()]));
        return;
      }
      showFeeGrantModal();
    }
  }, [
    dispatch,
    feeGrantEnabled,
    granter.continue,
    granter.loading,
    isHomeLoaded,
    location.pathname,
    showFeeGrantModal,
  ]);

  React.useEffect(() => {
    checkAppVersion();
  }, [checkAppVersion]);

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
