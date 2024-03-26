import blockchainServices from "../services/blockchain.services";
import vpnServices from "../services/vpn.services";

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

export const createSession = async ({ node, subscription, walletAddress }) => {
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
    const response = await blockchainServices.postSession(
      walletAddress,
      payload
    );
    if (response.code) {
      if (response.code === 5) {
        return {
          success: false,
          message: "Failed to Create a Session since insufficient balance",
        };
      }
      if (response.code !== 0) {
        return {
          success: false,
          message: `Failed to create a Session [CODE: ${response.code}]`,
        };
      }
    }
    return { success: true };
  } catch (e) {
    return { success: false, message: "Failed to create a Session" };
  }
};

export const createCredentials = async ({ session, node, walletAddress }) => {
  try {
    const payload = {
      url: node.remote_url,
      nodeProtocol: node.protocol,
      address: walletAddress,
      session: Number.parseInt(session.id),
    };
    const credentials = await blockchainServices.postCredentials(payload);
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
