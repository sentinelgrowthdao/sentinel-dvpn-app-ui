import { createAsyncThunk } from "@reduxjs/toolkit";
import blockchainServices from "../services/blockchain.services";

export const dispatchDeleteWallet = createAsyncThunk(
  "DISPATCH_DELETE_WALLET",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await blockchainServices.deleteWallet();
      return fulfillWithValue(response);
    } catch (e) {
      return rejectWithValue();
    }
  }
);
