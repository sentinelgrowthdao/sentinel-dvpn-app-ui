import React from "react";
import styles from "./import.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";

const Import = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = React.useState("");
  const isValidMnemonic =
    mnemonic.trim().split(" ").length === 24 ||
    mnemonic.trim().split(" ").length === 12;

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>Log in with your key</span>
        <span className={styles.description}>
          Provide your unique 12 / 24 word key
        </span>
      </section>
      <section className={styles.middle}>
        <textarea
          placeholder="Your private key"
          value={mnemonic}
          onChange={(event) => setMnemonic(event.target.value)}
        />
      </section>

      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={"Log in"}
          disabled={!isValidMnemonic}
          className={styles["primary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            const { payload } = await dispatch(
              withSingleDispatcherLoader(createWalletWithMnemonic(mnemonic))
            );
            if (
              payload &&
              payload.error &&
              payload.error.message &&
              payload.error.message === "Rejected"
            ) {
              return;
            }
            navigate("/", { replace: true });
          }}
        />
        <Button
          variant={variants.SECONDARY}
          title={"Signup"}
          className={styles["primary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            navigate("/create", { replace: true });
          }}
        />
        
      </section>
    </div>
  );
};

export default Import;
