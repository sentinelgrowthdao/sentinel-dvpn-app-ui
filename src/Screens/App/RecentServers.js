import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ServersCard from "../../containers/RecentServers/ServersCard";
import styles from "./recent-servers.module.scss";
import { SET_SEARCH_TEXT } from "../../redux/reducers/nodes.reducer";
import SearchBox from "../../containers/NodesScreens/SearchBox";
import Filter from "../../containers/NodesScreens/Filter";
import Button, { variants } from "../../components/Button";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";
import { getRandomNode } from "../../helpers/filterServers";
import { connectAction } from "../../actions/vpn.actions";
import { useNavigate } from "react-router-dom";
import { dispatchGetRecentServersList } from "../../actions/recents.actions";
import { withSingleDispatcherLoader } from "../../actions/loader.action";

const RecentServers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const servers = useSelector((state) => state.device.recentServers);
  const searchText = useSelector((state) => state.nodes.searchText);
  const protocols = useSelector((state) => state.device.protocols);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  const [filtered, setFiltered] = React.useState([]);

  React.useLayoutEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
  }, [dispatch]);

  React.useEffect(() => {
    let result = servers;
    if (searchText && searchText.length > 0) {
      result = servers.filter(
        (c) =>
          String(c.name)
            .toLowerCase()
            .includes(String(searchText).toLowerCase()) ||
          String(c.city)
            .toLowerCase()
            .includes(String(searchText).toLowerCase()) ||
          String(c.country)
            .toLowerCase()
            .includes(String(searchText).toLowerCase()) ||
          String(c.address)
            .toLowerCase()
            .includes(String(searchText).toLowerCase())
      );
    }
    const p = protocols.split(",");
    result = result.filter((c) => {
      if (p.includes(c.protocol)) {
        return c;
      }
      return null;
    });
    setFiltered(result);
  }, [servers, searchText, protocols]);

  React.useEffect(() => {
    dispatch(withSingleDispatcherLoader(dispatchGetRecentServersList()));
  }, [dispatch]);

  const ConnectButton = React.useMemo(() => {
    const connect = async () => {
      const node = getRandomNode(filtered);
      if (node) {
        const dispatched = dispatch(connectAction(node));

        try {
          const { payload } = await dispatched;
          if (payload) navigate("/");
        } catch (e) {
          console.length("CONSOLE FAILED TO CONNECT");
        }
      }
    };
    return (
      <Button
        onClick={(event) => {
          event.preventDefault();
          if (isVPNConnected) {
            dispatch(
              CHANGE_ERROR_ALERT({
                show: true,
                message: `Please dis-connect from VPN before switching`,
              })
            );
            return;
          }
          connect();
        }}
        disabled={filtered.length <= 0}
        variant={isVPNConnected ? variants.SECONDARY : variants.PRIMARY}
        className={styles["connect-btn"]}
        icon={QuickConnectIcon}
      />
    );
  }, [dispatch, filtered, isVPNConnected, navigate]);
  return (
    <div className={styles.root}>
      <section className={styles["page-handler"]}>
        <section className={styles["page-handler-top"]}>
          <SearchBox />
          <Filter />
          {ConnectButton}
        </section>
        <section className={styles["page-handler-bottom"]}>
          <span className={styles.title}>Recently Connected Servers</span>
        </section>
      </section>
      {filtered && filtered.length > 0 && (
        <section className={styles.list}>
          {filtered.map((s, i) => {
            return <ServersCard server={s} key={`server_${i}`} />;
          })}
        </section>
      )}
    </div>
  );
};

export default RecentServers;
