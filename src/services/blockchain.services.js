import Axios from "./Axios";

const blockchainServices = {
  getPrivateKey: () =>
    Axios.get("/blockchain/keywords")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getWalletAddress: () =>
    Axios.get("/blockchain/wallet")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getBalance: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/balance`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getPlans: () =>
    Axios.get("/blockchain/plans", { params: { limit: 100000, offset: 0 } })
      .then((response) => {
        return response.data.plans;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getSubScriptions: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/subscriptions`, {
      params: { limit: 100000, offset: 0 },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
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

  postWalletAddress: (data) =>
    Axios.post("/blockchain/wallet", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  postSubscription: (planId, data) =>
    Axios.post(`/blockchain/plans/${planId}/subscription`, data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": 150000,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  postSession: (walletAddress, data) =>
    Axios.post(`/blockchain/wallet/${walletAddress}/session`, data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": 150000,
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),
  postCredentials: (data) =>
    Axios.post("/blockchain/wallet/connect", data, {
      headers: {
        "x-chain-id": "sentinelhub-2",
        "x-gas-prices": 150000,
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),
  deleteWallet: () =>
    Axios.delete("blockchain/wallet")
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),
};

export default blockchainServices;
