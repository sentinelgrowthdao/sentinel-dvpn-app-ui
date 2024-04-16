import React from "react";

import SubscriptionsIcon from "../../assets/icons/subcriptions-icon.svg";
import WalletIcon from "../../assets/icons/wallet-icon.svg";
import LogoutIcon from "../../assets/icons/logout-icin.svg";
import RightArrow from "../../assets/icons/right-arrow-icon.svg";
import Card, { variants } from "../../components/Card";
import styles from "./account.module.scss";
import { MODAL_VARIANTS } from "../../containers/Modal/modal-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useTranslation } from "react-i18next";

const cards = [
  {
    icon: SubscriptionsIcon,
    title: "subscriptions",
    href: "/account/subscriptions",
  },
  {
    icon: WalletIcon,
    title: "wallet",
    href: "/account/wallet-details",
  },
  {
    icon: LogoutIcon,
    title: "logout",
    isLogout: true,
    state: {
      showModal: true,
      type: "logout",
      variant: MODAL_VARIANTS.PRIMARY,
    },
  },
];

const Account = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <span className={styles.header}>{t("account")}</span>
      {cards.map((c) => {
        return (
          <Card
            variant={variants.PRIMARY}
            key={c.title}
            className={styles.card}
          >
            <button
              className={styles.btn}
              onClick={async (event) => {
                event.preventDefault();
                if (c.isLogout) {
                  await dispatch(
                    CHANGE_MODAL_STATE({
                      show: true,
                      type: "logout",
                      variant: MODAL_VARIANTS.PRIMARY,
                    })
                  );
                  navigate(location.pathname, {
                    state: c.state,
                  });
                  return;
                }
                navigate(c.href, { replace: true });
              }}
            >
              <section className={styles.left}>
                <img src={c.icon} alt="" />
                <span className={styles.title}>{t(c.title)}</span>
              </section>
              <section className={styles.right}>
                <img src={RightArrow} alt="" />
              </section>
            </button>
          </Card>
        );
      })}
    </div>
  );
};

export default Account;
