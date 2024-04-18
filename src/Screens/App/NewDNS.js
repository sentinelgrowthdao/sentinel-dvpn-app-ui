import React from "react";
import BackButton from "../../components/BackButton";
import styles from "./new-dns.module.scss";
import Button, { variants } from "../../components/Button";
import { useTranslation } from "react-i18next";
import RadioButton from "../../components/RadioButton";
import { isValidIP } from "../../helpers/isValidIP";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CUSTOM_DNS_LIST } from "../../redux/reducers/device.reducer";
import { useNavigate } from "react-router-dom";

const NewDNS = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customDNSList = useSelector((state) => state.device.customDNSList);

  const [error, setError] = React.useState("");
  const [IPType, setIPType] = React.useState("IPv4");
  const [name, setName] = React.useState("");
  const [preferredIP, setPreferredIP] = React.useState("");
  const [alternateIP, setAlternateIP] = React.useState("");

  const checkIsAlredyThere = () => {
    return customDNSList.filter(
      (i) =>
        i.preferredName === name ||
        i.addresses === `${preferredIP}, ${alternateIP}`
    );
  };

  const handleSaveNewDNS = async () => {
    const isValidPreferredIP = isValidIP(preferredIP, IPType);
    const isValidAlternateIP = isValidIP(alternateIP, IPType);

    if (isValidPreferredIP && isValidAlternateIP) {
      const { payload } = dispatch(
        CHANGE_CUSTOM_DNS_LIST({
          name: "custom",
          addresses: `${preferredIP}, ${alternateIP}`,
          isCustom: true,
          preferredName: name,
        })
      );
      if (payload && payload.isCustom) {
        navigate(-1, { replace: true });
      }
      return;
    }
    const isAlreadyThere = checkIsAlredyThere();
    if (isAlreadyThere && isAlreadyThere.preferredName) {
      setError("DNS details alredy there in the list");
      return;
    }
    setError("Invalid / Incorrect IP address");
  };

  const handleClear = () => {
    setIPType("IPv4");
    setName("");
    setPreferredIP("");
    setAlternateIP("");
    setError("");
  };

  return (
    <div className={styles.root}>
      <BackButton to={"DNS Details"} />
      <div className={styles.container}>
        <span className={styles.header}>{t("add_custom_dns")}</span>
        <section className={styles.form}>
          <label className={`${styles.input}`}>
            <span className={styles.title}>{t("dns_input_name")}</span>
            <input
              type="text"
              className={`${styles.field}`}
              value={name}
              onChange={(event) => {
                event.preventDefault();
                setName(event.target.value);
                setError("");
              }}
            />
          </label>

          <section className={styles["ip-types"]}>
            <span className={styles.title}>{t("internet_protocol")}</span>
            <section className={styles["ip-list"]}>
              {["IPv4", "IPv6"].map((value) => {
                return (
                  <RadioButton
                    className={styles["ip-radio"]}
                    value={t(`${String(value).toLowerCase()}`)}
                    key={value}
                    isChecked={value === IPType}
                    onChange={() => {
                      setIPType(value);
                      setError("");
                    }}
                  />
                );
              })}
            </section>
          </section>

          <label className={`${styles.input}`}>
            <span className={styles.title}>{t("dns_input_address_1")}</span>
            <input
              type="text"
              className={`${styles.field}`}
              value={preferredIP}
              onChange={(event) => {
                event.preventDefault();
                setPreferredIP(event.target.value);
                setError("");
              }}
            />
          </label>

          <label className={`${styles.input}`}>
            <span className={styles.title}>{t("dns_input_address_2")}</span>
            <input
              type="text"
              className={`${styles.field}`}
              value={alternateIP}
              onChange={(event) => {
                event.preventDefault();
                setAlternateIP(event.target.value);
                setError("");
              }}
            />
          </label>
        </section>
        <section className={styles.error}>
          {error && error.length > 0 && (
            <span className={styles.text}>{error}</span>
          )}
        </section>
        <section className={styles.btns}>
          <Button
            className={styles["btn-save"]}
            variant={variants.PRIMARY}
            title={"Save"}
            onClick={handleSaveNewDNS}
            disabled={[name, preferredIP, alternateIP].includes("")}
          />
          <Button
            className={styles["btn-clear"]}
            variant={variants.SECONDARY}
            title={"Clear"}
            onClick={handleClear}
          />
        </section>
      </div>
    </div>
  );
};

export default NewDNS;
