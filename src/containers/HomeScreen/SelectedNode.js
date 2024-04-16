import React from "react";
import { useSelector } from "react-redux";
import styles from "./selected-node.module.scss";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const SelectedNode = () => {
  const { t } = useTranslation();
  const node = useSelector((state) => state.device.selectedNode);
  return (
    <>
      {node && node.address ? (
        <section className={styles["node-details"]}>
          <ReactCountryFlag
            style={{
              width: "24px",
              height: "100%",
            }}
            countryCode={node.code?.toUpperCase()}
            svg
          />
          <span className={styles.name}>{`${node.city}, ${node.code}`}</span>
        </section>
      ) : (
        <span className={styles["no-node-text"]}>
          {t("server_is_not_selected")}
        </span>
      )}
    </>
  );
};

export default SelectedNode;
