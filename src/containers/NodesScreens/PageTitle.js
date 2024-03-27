import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page-title.module.scss";
import Card from "../../components/Card";
import Button, { variants } from "../../components/Button";
import BackIcon from "../../assets/icons/back-icon.svg";
import ReloadIcon from "../../assets/icons/reload-icon.svg";

import { useNavigate } from "react-router-dom";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { dispatchGetAvailableCountries } from "../../actions/nodes.action";

const PageTitle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageTitle, canGoBack } = useSelector((state) => state.nodes);

  return (
    <Card>
      <section className={styles.root}>
        {canGoBack && (
          <Button
            icon={BackIcon}
            className={styles["go-back-btn"]}
            onClick={() => navigate(-1)}
          />
        )}
        <span className={styles.title}>{pageTitle}</span>
        {!canGoBack && (
          <Button
            variant={variants.TRANSPARENT}
            icon={ReloadIcon}
            className={styles["reload-btn"]}
            onClick={() =>
              dispatch(
                withSingleDispatcherLoader(dispatchGetAvailableCountries())
              )
            }
          />
        )}
      </section>
    </Card>
  );
};

export default PageTitle;
