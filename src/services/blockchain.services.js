import { FEE_GRANT_WALLET_ADDERSS, GAS_PRICE_AMOUNT } from "../constants";
import Axios from "./Axios";

const blockchainServices = {
  getPrivateKey: () =>
    Axios.get("/blockchain/keywords")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getWalletAddress: () =>
    Axios.get("/blockchain/wallet")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getBalance: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/balance`)
      .then((response) => {
        if (response.request.status === 500) {
          return { data: null, error: true };
        }
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getPlans: () =>
    Axios.get("/blockchain/plans", { params: { limit: 100000, offset: 0 } })
      .then((response) => {
        return response.data.plans;
      })
      .catch((error) => {
        throw error;
      }),
  getSubScriptions: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/subscriptions`, {
      params: { limit: 100000, offset: 0 },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getSession: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/session`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return null;
        } else if (error.response.status === 500) {
          return 500;
        } else {
          throw new Error({ msg: "Failed to Create Session" });
        }
      }),
  getTXDetails: (txHash) =>
    Axios.get(`blockchain/transactions/${txHash}`)
      .then((response) => response)
      .catch((error) => error),
  getCurrnetRPC: () =>
    Axios.get("/blockchain/endpoint")
      .then((response) => response.data)
      .catch((error) => error),
  getIsFeeGrantEnabled: ({ walletAddress }) =>
    Axios.get(
      `blockchain/wallet/${walletAddress}/grants/${FEE_GRANT_WALLET_ADDERSS}`
    )
      .then((response) => response)
      .catch((error) => {
        throw error;
      }),
  postWalletAddress: (data) =>
    Axios.post("/blockchain/wallet", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  postSubscription: (planId, data, feeGrantEnabled) =>
    Axios.post(`/blockchain/plans/${planId}/subscription`, data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled
          ? { "x-fee-granter": FEE_GRANT_WALLET_ADDERSS }
          : {}),
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  postSession: (walletAddress, data, feeGrantEnabled) =>
    Axios.post(`/blockchain/wallet/${walletAddress}/session`, data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled
          ? { "x-fee-granter": FEE_GRANT_WALLET_ADDERSS }
          : {}),
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  postCredentials: (data, feeGrantEnabled) =>
    Axios.post("/blockchain/wallet/connect", data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled
          ? { "x-fee-granter": FEE_GRANT_WALLET_ADDERSS }
          : {}),
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  deleteWallet: () =>
    Axios.delete("blockchain/wallet")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
};

export default blockchainServices;
