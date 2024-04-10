import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.scss";
import Button, { variants } from "../../components/Button";
import SentinelIcon from "../../assets/images/sentinel-logo.png";
import GitHubIcon from "../../assets/icons/github-blue-icon.svg";
import { useDispatch } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";
const Start = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <img className={styles["sentinel-logo"]} src={SentinelIcon} alt="" />
        <span className={styles.title}>Welcome to Sentinel</span>
        <span className={styles.description}>
          Create a new on-chain account anonymously today or import an existing
          account from Sentinel's Layer-1 Networking DePin focused chain.
        </span>
      </section>
      <section className={styles.github}>
        <img className={styles.img} src={GitHubIcon} alt="" />
        <span className={styles.text}>Sentinel dVPN Github</span>
      </section>
      <section className={styles.middle}>
        <span className={styles.title}>How does Sentinel dVPN work?</span>
        <span className={styles.description}>
          A Sentinel dVPN account that you can generate has a public key and a
          private key. The public key is like your phone number and is shared
          with others in order to receive an incoming transaction. The private
          key is the password and must be stored safely as there is no back-up
          being stored anywhere on any server. You are the only one who has your
          password and if you lose it your account is lost. This is real
          security, real trust, and real decentralization. Don't trust
          centralized VPN applications which offer 0 transparency.
        </span>
        <section className={styles.external}>
          <span className={styles.text}>for more info visit</span>
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
          title={"Continue"}
          className={styles["continue-btn"]}
          onClick={() => {
            navigate("/create", { replace: true });
          }}
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>Already have an account?</span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/import", { replace: true });
            }}
          >
            Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Start;
