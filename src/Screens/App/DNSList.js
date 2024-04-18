import React from "react";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import Button, { variants } from "../../components/Button";
import styles from "./dns-list.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../../actions/loader.action";
import { dispatchPutSelectedDNS } from "../../actions/settings.action";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import CheckIcon from "../../assets/icons/check-icon.svg";
import TrashIcon from "../../assets/icons/trash-icon.svg";
import Card from "../../components/Card";
import { REMOVE_FROM_CUSTOM_DNS_LIST } from "../../redux/reducers/device.reducer";

const DNSList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const available = useSelector((state) => state.dns.available);
  const custom = useSelector((state) => state.device.customDNSList);
  const current = useSelector((state) => state.dns.current);

  const handleOnChangeDNS = (dns) => {
    dispatch(
      withLoader([
        dispatchPutSelectedDNS(dns),
        CHANGE_MODAL_STATE({ show: false, type: null }),
      ])
    );
  };

  return (
    <div className={styles.root}>
      <BackButton to={"Home"} />
      <div className={styles.container}>
        <span className={styles.header}>{t("dns_details")}</span>
        <section className={styles.list}>
          {available &&
            available.length > 0 &&
            [...available, ...custom].map((dns, index) => {
              const isChecked =
                dns.addresses === current.addresses &&
                dns.name === current.name;
              return (
                <Card
                  variant={variants.SECONDARY}
                  key={`${dns.name}-${index}`}
                  className={styles["dns-card"]}
                >
                  <button
                    className={styles["dns-item"]}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleOnChangeDNS(dns);
                    }}
                  >
                    <span
                      className={`${
                        isChecked ? styles["text-selected"] : styles.text
                      }`}
                    >
                      {dns.isCustom
                        ? capitalizeFirstLetter(dns.preferredName)
                        : capitalizeFirstLetter(dns.name)}
                    </span>
                    <img
                      className={styles[isChecked ? "show-img" : "hide-img"]}
                      src={CheckIcon}
                      alt=""
                    />
                  </button>
                  {dns.isCustom && !isChecked && (
                    <Button
                      className={styles["trash-btn"]}
                      variant={variants.TRANSPARENT}
                      icon={TrashIcon}
                      onClick={() => {
                        dispatch(REMOVE_FROM_CUSTOM_DNS_LIST(dns));
                      }}
                    />
                  )}
                </Card>
              );
            })}
        </section>

        <Button
          className={styles["add-btn"]}
          variant={variants.PRIMARY}
          disabled={custom && custom.length >= 5}
          title={t("btn_add_dns")}
          onClick={() => {
            navigate("../new-dns");
          }}
        />
      </div>
    </div>
  );
};

export default DNSList;
