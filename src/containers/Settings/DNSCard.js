import React from "react";
import styles from "./dns-card.module.scss";
import Card, { variants } from "../../components/Card";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { MODAL_VARIANTS } from "../Modal/modal-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DNSCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const current = useSelector((state) => state.dns.current);

  return (
    <div className={styles.root}>
      <span className={styles.title}>DVPN</span>
      <Card variant={variants.SECONDARY}>
        <button
          disabled={!(current && current.name)}
          className={styles.dns}
          onClick={() => {
            dispatch(
              CHANGE_MODAL_STATE({
                show: true,
                type: "dns",
                variant: MODAL_VARIANTS.SECONDARY,
              })
            );
            navigate(location.pathname, {
              state: {
                showModal: true,
                type: "dns",
                variant: MODAL_VARIANTS.SECONDARY,
              },
            });
          }}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>{t("dns")}</span>
          </section>
          <span className={styles.value}>
            {capitalizeFirstLetter(current?.name)}
          </span>
        </button>
      </Card>
    </div>
  );
};

export default DNSCard;
