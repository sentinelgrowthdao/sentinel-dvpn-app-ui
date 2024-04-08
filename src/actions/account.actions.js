import { createAsyncThunk } from "@reduxjs/toolkit";
import blockchainServices from "../services/blockchain.services";
import { CHANGE_LOADER_STATE } from "../redux/reducers/alerts.reducer";

export const dispatchDeleteWallet = createAsyncThunk(
  "DISPATCH_DELETE_WALLET",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "Fetching Subscriptions...",
        })
      );
      const response = await blockchainServices.deleteWallet();
      return fulfillWithValue(response);
    } catch (e) {
      return rejectWithValue();
    }
  }
);
