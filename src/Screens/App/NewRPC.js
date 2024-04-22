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
  dispatchGetUserSubscriptions,
} from "../../actions/home.actions";

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
    if (port < Number.parseInt(9999) && port > Number.parseInt(100)) {
      try {
        await Axios.post("/blockchain/endpoint", {
          host,
          port: Number.parseInt(port),
        });
        dispatch(
          withLoader([
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
    } else {
      setError("Invalid Port");
    }
  };
  return (
    <div className={styles.root}>
      <BackButton to={"Home"} />
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
          disabled={String(host).trim() === "" || ![3, 4].includes(port.length)}
        />
        <Button
          className={styles["btn-clear"]}
          variant={variants.SECONDARY}
          title={t("btn_clear")}
          onClick={handleClear}
          disabled={host === rpc.host || port === rpc.port}
        />
      </section>
    </div>
  );
};

export default NewRPC;
