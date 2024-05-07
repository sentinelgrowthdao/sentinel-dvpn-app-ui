import { CHANGE_LOADER_STATE } from "../redux/reducers/alerts.reducer";
import blockchainServices from "../services/blockchain.services";
import vpnServices from "../services/vpn.services";
import { getTxDetails } from "./common.support";

export const getSession = async (walletAddress) => {
  try {
    const session = await blockchainServices.getSession(walletAddress);
    if (session && session === 500) {
      return 500;
    }
    return session;
  } catch (e) {
    return null;
  }
};

const getSessionId = (sessionGot) => {
  if (sessionGot && sessionGot.id) {
    return Number.parseInt(sessionGot.id);
  }
  return null;
};

export const createSession = async (
  { node, subscription, walletAddress, feeGrantEnabled },
  dispatch
) => {
  try {
    const sessionGot = await getSession(walletAddress);
    if (sessionGot && sessionGot === 500) {
      return 500;
    }
    const payload = {
      activeSession: getSessionId(sessionGot, node, subscription),
      subscriptionID: Number.parseInt(subscription.id),
      node: node.address,
    };
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "loader_creating_session" })
    );
    const response = await blockchainServices.postSession(
      walletAddress,
      payload,
      feeGrantEnabled
    );

    if (response.code) {
      if (response.code === 5 || response.code === "5") {
        return {
          success: false,
          message: "error_failed_create_session_no_balance",
        };
      }
      if (response.code !== 0 || response.code !== "0") {
        return {
          success: false,
          message: `error_failed_create_session_of`,
          value: response.code,
        };
      }
    }
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "loader_creating_session" })
    );
    const details = await getTxDetails(response.txhash);

    if (details.code) {
      if (details.code === 5 || details.code === "5") {
        return {
          success: false,
          message: "error_failed_create_session_no_balance",
        };
      }
      if (details.code !== 0 || details.code !== "0") {
        return {
          success: false,
          message: `error_failed_create_session_of`,
          value: details.code,
        };
      }
    }

    return { success: true };
  } catch (e) {
    return { success: false, message: "error_failed_create_session" };
  }
};

export const createCredentials = async ({
  session,
  node,
  walletAddress,
  feeGrantEnabled,
}) => {
  try {
    const payload = {
      url: node.remote_url,
      nodeProtocol: node.protocol,
      address: walletAddress,
      session: Number.parseInt(session.id),
    };
    const credentials = await blockchainServices.postCredentials(
      payload,
      feeGrantEnabled
    );
    return credentials;
  } catch (e) {
    return null;
  }
};

export const connectToVPN = async (credentials) => {
  try {
    const status = await vpnServices.getStatus();
    if (status.isConnected) {
      await vpnServices.postDisconnect();
    }
    const response = await vpnServices.postConnect({ data: credentials });
    return response.isConnected;
  } catch (e) {
    return null;
  }
};
