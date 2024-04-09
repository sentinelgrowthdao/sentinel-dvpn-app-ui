import { createAsyncThunk } from "@reduxjs/toolkit";
import proxyServices from "../services/proxy.services";
import blockchainServices from "../services/blockchain.services";
import {
  parseAccountBalance,
  parsePlans,
  parseSubscriptions,
} from "../helpers/data.parser";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import otherServices from "../services/other.services";
import registryServices from "../services/registry.services";
import { getTxDetails } from "./common.support";

export const dispatchGetIPAddress = createAsyncThunk(
  "GET_IP_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({
        show: true,
        message: "Fetching IP address...",
      })
    );

    try {
      let response = await proxyServices.getIpAddress();
      return fulfillWithValue(response.data);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Connection Error, Try again.",
        })
      );

      return rejectWithValue();
    }
  }
);

export const dispatchGetAccountBalance = createAsyncThunk(
  "GET_ACCOUNT_BALANCE",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({
        show: true,
        message: "Fetching Account Balance...",
      })
    );
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getBalance(walletAddress);
      const balance = parseAccountBalance(response.balances);
      return fulfillWithValue(balance);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to get Balance" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetAvailablePlans = createAsyncThunk(
  "GET_AVAILABLE_PLANS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ show: true, message: "Fetching Plans..." }));
    try {
      const response = await blockchainServices.getPlans();
      const plan = parsePlans(response);
      return fulfillWithValue(plan);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to get Plans" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetUserSubscriptions = createAsyncThunk(
  "GET_USER_SUBSCRIPTIONS",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "Fetching Subscriptions..." })
    );
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getSubScriptions(walletAddress);
      const subscription = parseSubscriptions(response.planSubscriptions);
      return fulfillWithValue(subscription);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to get Subscriptions",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchCurrentPrice = createAsyncThunk(
  "GET_CURRENT_PRICE",
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "Fetching current price...",
        })
      );
      const price = await otherServices.getCurrentPrice();
      return fulfillWithValue(Number.parseFloat(price));
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to get current price",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchSubscribeToPlan = createAsyncThunk(
  "SUBSCRIBE_TO_PLAN",
  async (payload, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "Renewing your Subscription",
        })
      );
      const response = await blockchainServices.postSubscription(6, payload);

      if (response.code) {
        if (response.code === 5 || response.code === "5") {
          return {
            success: false,
            message: "Failed to subscribe due to insufficient balance",
          };
        }
        if (response.code !== 0 || response.code !== "0") {
          return {
            success: false,
            message: `Failed to subscribe [CODE: ${response.code}]`,
          };
        }
      }

      const details = await getTxDetails(response.txhash);

      if (details.code) {
        if (details.code === 5 || details.code === "5") {
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: "Failed to subscribe due to insufficient balance",
            })
          );
          return;
        }
        if (details.code !== 0 || details.code === "0") {
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: `Failed to subscribe [CODE: ${response.code}]`,
            })
          );
          return;
        }
      }
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Error while Subscribing",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetAppVersion = createAsyncThunk(
  "GET_APP_VERSION",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "Fetching App Version",
        })
      );
      const response = await registryServices.getVersion();
      return fulfillWithValue(response);
    } catch (e) {
      console.error(e);
      return rejectWithValue();
    }
  }
);
