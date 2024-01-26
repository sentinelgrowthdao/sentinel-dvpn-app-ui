import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Success } from "./components/Alerts";
import { Route, Routes } from "react-router-dom";
import {
  OnboardingCreateScreen,
  OnboardingImportScreen,
  OnboardingStartScreen,
} from "./screens/Onboarding";
import OnboardingLayout from "./layouts/OnboardingLayout";
import AppLayout from "./layouts/AppLayout";
import HomeScreen from "./screens/HomeScreen";
import { Cities, Countries, Nodes } from "./screens/NodesScreen";
import AccountScreen from "./screens/AccountScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LaunchingScreen from "./screens/LaunchingScreen";
import ListLayout from "./layouts/ListLayout";
import Loader from "./components/Loader";
import LaunchingLayout from "./layouts/LaunchingLayout";
import APIService from "./services/app.services";
import { SET_IS_VPN_CONNECTED } from "./redux/device.reducer";
import { SET_SHOW_ERROR_ALERT } from "./redux/alerts.reducer";

function App() {
  const dispatch = useDispatch();
  const { showSuccessAlert, showErrorAlert, isLoading } = useSelector(
    (state) => state.alerts
  );

  const getStatus = React.useCallback(async () => {
    const response = await APIService.getStatus();
    if (response) {
      dispatch(SET_IS_VPN_CONNECTED(response.isConnected));
    } else {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch VPN Connection Status",
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    getStatus();
  }, [getStatus]);


  return (
    <>
      <Routes>
        <Route exact path="/" element={<LaunchingLayout />} />
        <Route index element={<LaunchingScreen />} />

        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<OnboardingStartScreen />} />
          <Route path="create" element={<OnboardingCreateScreen />} />
          <Route path="import" element={<OnboardingImportScreen />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="countries" element={<ListLayout />}>
            <Route index element={<Countries />} />
            <Route path=":countryId/cities" element={<Cities />} />
            <Route path=":countryId/cities/:cityId/nodes" element={<Nodes />} />
          </Route>
          <Route path="account" element={<AccountScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
      {isLoading && <Loader />}
      {showSuccessAlert && <Success />}
      {showErrorAlert && <Error />}
    </>
  );
}

export default React.memo(App);
