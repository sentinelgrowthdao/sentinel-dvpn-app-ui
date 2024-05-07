import React from "react";
import TimeIcon from "../../assets/icons/time-icon.svg";
import styles from "./renew.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
  CHANGE_SUCCESS_ALERT,
} from "../../redux/reducers/alerts.reducer";
import {
  withLoader,
  withSingleDispatcherLoader,
} from "../../actions/loader.action";
import {
  dispatchGetAvailablePlans,
  dispatchGetUserSubscriptions,
  dispatchSubscribeToPlan,
} from "../../actions/home.actions";
import { MODAL_VARIANTS } from "./modal-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dispatchWindowOpen } from "../../actions/settings.action";

const RenewSubscriptionModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { balance, subscription, plan } = useSelector((state) => state.home);

  const [price, setPrice] = React.useState(0.0);

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        await dispatch(withSingleDispatcherLoader(dispatchGetAvailablePlans()));
        if (plan && plan.amount === 0) {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: "error_no_plans_to_subscribe",
            })
          );
        }
      } catch (e) {
        dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "error_failed_to_get_plans",
          })
        );
      }
    };
    if (plan && plan.providerAddress) {
      const amount = Number.parseFloat(Number.parseInt(plan.amount) / 1e6);
      setPrice(amount);
    } else {
      fetchPlans();
    }
  }, [dispatch, plan]);

  const handleRenewSubcription = async () => {
    if (balance < plan.amount) {
      await dispatch(
        CHANGE_MODAL_STATE({
          show: true,
          type: "no-balance",
          variant: MODAL_VARIANTS.PRIMARY,
        })
      );
      navigate(location.pathname, {
        state: {
          showModal: true,
          type: "no-balance",
          variant: MODAL_VARIANTS.PRIMARY,
        },
      });
      return;
    }
    try {
      const payload = {
        denom: "udvpn",
        address: plan.providerAddress,
      };
      await dispatch(
        withLoader([
          CHANGE_MODAL_STATE({ show: false, type: "" }),
          dispatchSubscribeToPlan(payload),
          dispatchGetUserSubscriptions(),
        ])
      );
      if (subscription && Object.values(subscription).length > 0) {
        dispatch(
          CHANGE_SUCCESS_ALERT({
            show: true,
            message: "success_subscribed",
          })
        );
        return;
      }
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_subscribe",
        })
      );
    }
  };

  return (
    <div className={styles["renew-subscription-modal"]}>
      <img src={TimeIcon} alt="" />
      <span className={styles.title}>{t("modal_no_subscriptions_title")}</span>
      <section className={styles.subtitle}>
        <span className={styles.description}>
          {t("modal_no_subscriptions_desc")}
        </span>
        <span
          className={styles.link}
          onClick={() =>
            dispatch(
              dispatchWindowOpen(
                "https://medium.com/sentinel/introduction-of-on-chain-subscriptions-and-time-based-payments-sentinels-biggest-dvpn-protocol-a2b240199f18#:~:text=Sentinel's%20biggest%20upgrade%20to%20its,dVPN%20applications%20built%20on%20Sentinel"
              )
            )
          }
        >
          {t("modal_no_subscriptions_link_text")}
        </span>
      </section>
      <Button
        className={styles.btn}
        title={t("btn_renew", { price })}
        variant={variants.PRIMARY}
        onClick={handleRenewSubcription}
      />
      <Button
        className={styles.btn}
        title={t("btn_cancel")}
        variant={variants.SECONDARY}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
        }}
      />
    </div>
  );
};

export default RenewSubscriptionModal;
