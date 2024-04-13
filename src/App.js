import React from "react";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "./components/Alerts";
import Loader from "./components/Loader";
import Navigation from "./Navigation";
import AppUpdateModal from "./containers/Modal/AppUpdateModal";
import InitAlertModal from "./containers/Modal/InitAlertModal";

const App = () => {
  const { error, success, loader, latest, initiated } = useSelector(
    (state) => state.alerts
  );

  React.useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      if (loader.show) {
        root.style.overflow = "hidden";
      }
      if (!loader.show) {
        root.style.overflow = "auto";
      }
    }
  }, [loader.show]);

  return (
    <>
      <Navigation />
      {error.show && <ErrorAlert />}
      {success.show && <SuccessAlert />}
      {loader.show && <Loader />}
      {latest.show && <AppUpdateModal />}
      {initiated.show && <InitAlertModal />}
    </>
  );
};

export default App;
