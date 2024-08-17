import Axios from "./Axios";

const authServices = {
  getUniqueKey: () =>
    Axios.get("/blockchain/keywords")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  login: ({ mnemonic }) =>
    Axios.post("/blockchain/wallet", { mnemonic })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchWalletAddress: () =>
    Axios.get("/blockchain/wallet")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchAccountBalance: (walletAddress) =>
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
  registerWalletAddress: (walletAddress) =>
    Axios.post("/proxy/wallet", { address: walletAddress })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchAvailablePlans: () =>
    Axios.get("/blockchain/plans", { params: { limit: 100000, offset: 0 } })
      .then((response) => {
        return response.data.plans;
      })
      .catch((error) => {
        throw error;
      }),
  fetchUserSubScriptions: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/subscriptions`, {
      params: { limit: 100000, offset: 0 },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
};

export default authServices;
