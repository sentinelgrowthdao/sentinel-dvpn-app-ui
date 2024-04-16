import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.scss";
import Button, { variants } from "../../components/Button";
import SentinelIcon from "../../assets/images/sentinel-logo.png";
import GitHubIcon from "../../assets/icons/github-blue-icon.svg";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
import { useTranslation } from "react-i18next";
const Start = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <img className={styles["sentinel-logo"]} src={SentinelIcon} alt="" />
        <span className={styles.title}>{t("welcome_to_sentinel_title")}</span>
        <span className={styles.description}>{t("welcome_to_sentinel_desc")}</span>
      </section>
      <section className={styles.github}>
        <img className={styles.img} src={GitHubIcon} alt="" />
        <span className={styles.text}>{t("sentinel_dvpn_github")}</span>
      </section>
      <section className={styles.middle}>
        <span className={styles.title}>
          {t("how_does_sentinel_dvpn_work_title")}
        </span>
        <span className={styles.description}>
          {t("how_does_sentinel_dvpn_work_desc")}
        </span>
        <section className={styles.external}>
          <span className={styles.text}>{t("for_more_info_visit")}</span>
          <button
            className={styles.btn}
            onClick={() => {
              dispatch(dispatchWindowOpen("https://sentinel.co/"));
            }}
          >
            Sentinel.co
          </button>
        </section>
      </section>
      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={t("btn_continue")}
          className={styles["continue-btn"]}
          onClick={() => {
            navigate("/create", { replace: true });
          }}
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>
            {t("already_have_an_account")}
          </span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/import", { replace: true });
            }}
          >
            {t("btn_login")}
          </button>
        </section>
      </section>
    </div>
  );
};

export default Start;
