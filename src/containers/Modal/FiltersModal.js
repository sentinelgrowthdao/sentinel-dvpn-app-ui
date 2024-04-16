import React from "react";
import styles from "./filters.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import RadioButton from "../../components/RadioButton";
import { SET_PROTOCOL } from "../../redux/reducers/device.reducer";
import { useTranslation } from "react-i18next";

const types = {
  All: "V2RAY,WIREGUARD",
  V2Ray: "V2RAY",
  Wireguard: "WIREGUARD",
};

const FiltersModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const protocols = useSelector((state) => state.device.protocols);
  return (
    <div className={styles.root}>
      <span className={styles.title}>{t("modal_filter_by_protocols")}</span>
      <section className={styles.list}>
        {Object.entries(types).map(([key, value]) => {
          const isChecked = value === protocols;
          return (
            <RadioButton
              className={styles["filter-item"]}
              value={t(`modal_${String(key).toLowerCase()}`)}
              key={key}
              isChecked={isChecked}
              onChange={() => {
                dispatch(SET_PROTOCOL(value));
                dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
              }}
            />
          );
        })}
      </section>
      <Button
        title={t("btn_ok")}
        variant={variants.PRIMARY}
        className={styles["ok-btn"]}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
    </div>
  );
};

export default FiltersModal;
