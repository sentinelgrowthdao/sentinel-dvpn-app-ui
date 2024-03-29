import React from "react";
import styles from "./list-layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import PageTitle from "../containers/NodesScreens/PageTitle";
import SearchBox from "../containers/NodesScreens/SearchBox";
import QuickConnectButton from "../containers/NodesScreens/QuickConnectButton";
import Filter from "../containers/NodesScreens/Filter";

const ListLayout = () => {
  const location = useLocation();
  const showBottomNavbar = [
    "/",
    "/countries",
    "/account",
    "/settings",
  ].includes(location.pathname);

  return (
    <div className={styles.root}>
      <section className={styles.details}>
        <PageTitle />
        <section className={styles.bottom}>
          <SearchBox />
          <Filter />
          <QuickConnectButton />
        </section>
      </section>
      <section
        className={`${styles.lists} ${
          showBottomNavbar ? styles.with : styles.without
        }`}
      >
        <Outlet />
      </section>
    </div>
  );
};

export default ListLayout;
