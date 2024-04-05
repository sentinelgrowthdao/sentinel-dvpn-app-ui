import { sleep } from "../helpers/sleep";
import blockchainServices from "../services/blockchain.services";

export const getTxDetails = async (txhash) => {
  const maxAttempts = 60;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const response = await blockchainServices.getTXDetails(txhash);

      if (response.status === 200) {
        return response.data;
      }
      if (response.response && response.response.status !== 404) {
        throw new Error(response.response.status);
      }
    } catch (error) {
      throw error;
    }
    await sleep(1000);
    attempt++;
  }

  return null;
};
