import React from "react";
import styles from "./external-support.module.scss";
import TwitterIcon from "../../assets/icons/twitter-icon.svg";
import TelegramIcon from "../../assets/icons/telegram-icon.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";
import GlobeIcon from "../../assets/icons/globe-icon.svg";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
import { getMobileOS } from "../../helpers/common.helpers";
import { useTranslation } from "react-i18next";

const constants = [
  {
    icon: TwitterIcon,
    link: "https://twitter.com/SentinelVPN",
  },
  {
    icon: GithubIcon,
    link:
      getMobileOS() === "ios"
        ? "https://github.com/sentinel-official/sentinel-dvpn-app-ios"
        : "https://github.com/sentinel-official/sentinel-dvpn-app-android",
  },
  {
    icon: TelegramIcon,
    link: "https://t.me/sentinel_co",
  },
  {
    icon: GlobeIcon,
    link: "https://www.sentinel.co/",
  },
];
const ExternalSupport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <section className={styles.social}>
        {constants.map((i) => {
          return (
            <button
              key={i.link}
              className={styles["social-button"]}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                dispatch(dispatchWindowOpen(i.link));
              }}
            >
              <img src={i.icon} alt="" />
            </button>
          );
        })}
      </section>
      <section className={styles["report-issue"]}>
        <span>{t("any_problems")}</span>
        <button
          className={styles["report-issue-link"]}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dispatch(dispatchWindowOpen("mailto:Support@snt.foundation"));
          }}
        >
          {t("report_an_issue")}
        </button>
      </section>
    </div>
  );
};

export default ExternalSupport;
