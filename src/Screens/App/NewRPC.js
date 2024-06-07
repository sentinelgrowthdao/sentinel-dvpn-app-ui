import React from "react";
import styles from "./new-rpc.module.scss";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";
import Button, { variants } from "../../components/Button";
import Axios from "../../services/Axios";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";
import { useNavigate } from "react-router-dom";
import { withLoader } from "../../actions/loader.action";
import {
  dispatchGetAccountBalance,
  dispatchGetAvailablePlans,
  dispatchGetCurrnetRPC,
  dispatchGetUserSubscriptions,
} from "../../actions/home.actions";
import { dispatchWindowOpen } from "../../actions/settings.action";

const NewRPC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rpc = useSelector((state) => state.dns.rpc);

  const [host, setHost] = React.useState(rpc.host);
  const [port, setPort] = React.useState(rpc.port);
  const [error, setError] = React.useState("");

  const handleClear = () => {
    setHost("");
    setPort("");
  };

  const handleChangeRPC = async () => {
    if (port === rpc.port && host === rpc.host) {
      navigate(-1, { replace: true });
      return;
    }

    if (String(host).trim().length === 0) {
      setError("Invalid Host");
      return;
    }

    const portInt = Number.parseInt(port);

    if (!(portInt >= 100 && portInt <= 9999)) {
      setError("Invalid Port");
      return;
    }

    try {
      await Axios.post("/blockchain/endpoint", {
        host,
        port: portInt,
      });
      dispatch(
        withLoader([
          dispatchGetCurrnetRPC(),
          dispatchGetAvailablePlans(),
          dispatchGetAccountBalance(),
          dispatchGetUserSubscriptions(),
        ])
      );
      navigate(-1, { replace: true });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_change_endpoint",
        })
      );
    }
  };
  return (
    <div className={styles.root}>
      <BackButton to={"home"} />
      <div className={styles.container}>
        <span className={styles.header}>{t("blockchain_endpoint")}</span>
        <section className={styles.form}>
          <label className={`${styles.input}`}>
            <span className={styles.title}>{t("host")}</span>
            <input
              type="text"
              className={`${styles.field}`}
              value={host}
              onChange={(event) => {
                event.preventDefault();
                setHost(event.target.value);
                setError("");
              }}
            />
          </label>
          <label className={`${styles.input}`}>
            <span className={styles.title}>{t("port")}</span>
            <input
              type="number"
              className={`${styles.field}`}
              value={port}
              onChange={(event) => {
                event.preventDefault();
                setPort(event.target.value);
                setError("");
              }}
            />
          </label>
        </section>
        <span
          className={styles.link}
          onClick={() =>
            dispatch(
              dispatchWindowOpen("https://cosmos.directory/sentinel/nodes")
            )
          }
        >
          Sentinel Community RPC List
        </span>
      </div>
      <section className={styles.error}>
        {error && error.length > 0 && (
          <span className={styles.text}>{error}</span>
        )}
      </section>
      <section className={styles.btns}>
        <Button
          className={styles["btn-save"]}
          variant={variants.PRIMARY}
          title={t("btn_save")}
          onClick={handleChangeRPC}
        />
        <Button
          className={styles["btn-clear"]}
          variant={variants.SECONDARY}
          title={t("btn_clear")}
          onClick={handleClear}
        />
      </section>
    </div>
  );
};

export default NewRPC;
