import React from "react";
import styles from "./legal-cards.module.scss";
import LegalDocIcon from "../../assets/icons/legal-doc-icon.svg";
import VersionIcon from "../../assets/icons/version-icon.svg";

import Card, { variants } from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { dispatchWindowOpen } from "../../actions/settings.action";

const legalDocs = [
  {
    title: "Terms of Service",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/terms-of-service",
  },
  {
    title: "Privacy Policy",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/privacy-policy",
  },
];

const LegalCards = () => {
  const dispatch = useDispatch();

  const version = useSelector((state) => state.home.version);

  return (
    <>
      <div className={styles.root}>
        <span className={styles.title}>Legal</span>

        {legalDocs.map((doc) => {
          return (
            <Card
              key={doc.title}
              className={styles["card"]}
              variant={variants.SECONDARY}
            >
              <button
                className={styles["doc-card"]}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  dispatch(dispatchWindowOpen(doc.href));
                }}
              >
                <section>
                  <img src={doc.icon} alt="" />
                  <span>{doc.title}</span>
                </section>
              </button>
            </Card>
          );
        })}

        <Card variant={variants.SECONDARY} className={styles["card"]}>
          <button className={styles.version}>
            <section>
              <img src={VersionIcon} alt="" />
              <span>App Version</span>
            </section>
            <span className={styles.value}>{version}</span>
          </button>
        </Card>
      </div>
    </>
  );
};

export default LegalCards;
