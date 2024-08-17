import BalanceCard from "@containers/Home/BalanceCard";
import BottomCard from "@containers/Home/BottomCard";
import Map from "@containers/Home/Map";
import React from "react";
import styles from "./home.module.scss";
const Home = () => {
  return (
    <div className={`${styles.root}`}>
      <Map />
      <section className={`${styles.container} px-16 pt-16 pb-8`}>
        <BalanceCard />
        <BottomCard />
      </section>
    </div>
  );
};

export default Home;
