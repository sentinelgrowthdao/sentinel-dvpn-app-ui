import React from "react";
import styles from "./fee-granter.module.scss";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";
import RadioButton from "../../components/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_FEE_GRANT_ENABLED } from "../../redux/reducers/device.reducer";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { dispatchIsFeeGrantEnabled } from "../../actions/home.actions";
const FeeGranter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const feeGrantEnabled = useSelector((state) => state.device.feeGrantEnabled);
  const [isEnabled, setIsEnabled] = React.useState(feeGrantEnabled);
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <BackButton to={"Home"} />
      <div className={styles.container}>
        <span className={styles.header}>{t("fee_grant")}</span>
        <section className={styles.form}>
          <RadioButton
            value={t("default_granter_address")}
            className={styles.radio}
            isChecked={isEnabled}
            onChange={() => {
              setIsEnabled(true);
            }}
          />
          <RadioButton
            value={t("no_granter")}
            className={styles.radio}
            isChecked={!isEnabled}
            onChange={() => {
              setIsEnabled(false);
            }}
          />
        </section>
      </div>
      <section className={styles.btns}>
        <Button
          className={styles.btn}
          variant={variants.PRIMARY}
          title={t("btn_save")}
          onClick={() => {
            dispatch(CHANGE_FEE_GRANT_ENABLED(isEnabled));
            if (isEnabled) {
              dispatch(dispatchIsFeeGrantEnabled());
            }
            navigate(-1, { replace: true });
          }}
          disabled={isEnabled === feeGrantEnabled}
        />
      </section>
    </div>
  );
};

export default FeeGranter;
