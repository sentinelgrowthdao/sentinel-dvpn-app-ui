import settingsServices from "@services/settings.services";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getFeeGrantDetails = async (walletAddress) => {
  while (true) {
    try {
      const response = await settingsServices.fetchFeeGrantDetails(walletAddress);
      if (response.status === 200) {
        return response.data;
      }
      if (response.response && response.response.status !== 500) {
        throw new Error(response.response.status);
      }
    } catch (error) {
      throw error;
    }
    await sleep(1000);
  }
};

export default getFeeGrantDetails;
