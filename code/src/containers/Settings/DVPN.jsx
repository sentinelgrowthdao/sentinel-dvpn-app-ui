import React from "react";
import styles from "./styles.module.scss";
import { Card, CARD_VARIANTS, Image, Text } from "@components/index";
import { useNavigate } from "react-router-dom";
import DNSIcon from "@svgs/dns-icon.svg";
import FeeGranterIcon from "@svgs/fee-granter-icon.svg";
import RPCIcon from "@svgs/rpc-icon.svg";
import RightArrowIcon from "@svgs/right-arrow-icon.svg";
import { useUserSelector } from "@hooks/use-selector";
import capitalizeFirstLetter from "@helpers/capitalizeFirstLetter";

const DVPN = () => {
  const navigate = useNavigate();
  const { dns } = useUserSelector();

  return (
    <div className={`${styles.root} my-18`}>
      <Text text={"dvpn"} className="fs-16 fw-6 text-9cabc9" />
      <Card
        variant={CARD_VARIANTS.SECONDARY}
        onClick={() => navigate("dns-details")}
        className={`${styles.card} my-4 px-14`}
      >
        <section className={styles.left}>
          <Image src={DNSIcon} height={"20px"} />
          <Text text={"dns"} className="fs-14 fw-5 ml-8" />
        </section>
        <section className={styles.right}>
          <Text
            text={`${capitalizeFirstLetter(dns.name || "")}`}
            className="fs-14 fw-5 ml-8 text-9cabc9"
          />
        </section>
      </Card>
      <Card
        variant={CARD_VARIANTS.SECONDARY}
        onClick={() => navigate("rpc-details")}
        className={`${styles.card} my-4 px-14`}
      >
        <section className={styles.left}>
          <Image src={RPCIcon} height={"20px"} />
          <Text text={"rpc"} className="fs-14 fw-5 ml-8" />
        </section>
        <section className={styles.right}>
          <Image src={RightArrowIcon} height={"14px"} />
        </section>
      </Card>
      <Card
        variant={CARD_VARIANTS.SECONDARY}
        onClick={() => navigate("fee-granter")}
        className={`${styles.card} my-4 px-14`}
      >
        <section className={styles.left}>
          <Image src={FeeGranterIcon} height={"20px"} />
          <Text text={"set_fee_granter"} className="fs-14 fw-5 ml-8" />
        </section>
        <section className={styles.right}>
          <Image src={RightArrowIcon} height={"14px"} />
        </section>
      </Card>
    </div>
  );
};

export default DVPN;
