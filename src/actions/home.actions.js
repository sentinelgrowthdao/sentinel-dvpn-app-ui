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
import { withLoader } from "./loader.action";
import { SUBSCRIPTION_PLAN_ID_NUMBER } from "../constants";

export const dispatchGetIPAddress = createAsyncThunk(
  "GET_IP_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({
        show: true,
        message: "loader_fetching_ip_address",
      })
    );

    try {
      let response = await proxyServices.getIpAddress();
      return fulfillWithValue(response.data);
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_connection_error",
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
        message: "loader_fetching_account_balance",
      })
    );
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getBalance(walletAddress);
      const balance = parseAccountBalance(response.balances);
      return fulfillWithValue(balance);
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_get_balance",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetAvailablePlans = createAsyncThunk(
  "GET_AVAILABLE_PLANS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "loader_fetching_plans" })
    );
    try {
      const response = await blockchainServices.getPlans();
      const plan = parsePlans(response);
      return fulfillWithValue(plan);
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "error_failed_to_get_plans" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetUserSubscriptions = createAsyncThunk(
  "GET_USER_SUBSCRIPTIONS",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({
        show: true,
        message: "loader_fetching_subscriptions",
      })
    );
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getSubScriptions(walletAddress);
      const subscription = parseSubscriptions(response.planSubscriptions);
      return fulfillWithValue(subscription);
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_get_subscriptions",
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
          message: "loader_fetching_current_price",
        })
      );
      const price = await otherServices.getCurrentPrice();
      return fulfillWithValue(Number.parseFloat(price));
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_get_price",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchSubscribeToPlan = createAsyncThunk(
  "SUBSCRIBE_TO_PLAN",
  async (
    payload,
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    try {
      const feeGrantEnabled = getState().device.feeGrantEnabled;
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "loader_renewing_your_subscription",
        })
      );
      const response = await blockchainServices.postSubscription(
        SUBSCRIPTION_PLAN_ID_NUMBER,
        payload,
        feeGrantEnabled
      );

      if (response.code) {
        if (response.code === 5 || response.code === "5") {
          return {
            success: false,
            message: "error_failed_subscription_no_balance",
          };
        }
        if (response.code !== 0 || response.code !== "0") {
          return {
            success: false,
            message: `error_failed_subscription_of`,
            value: response.code,
          };
        }
      }

      const details = await getTxDetails(response.txhash);

      if (details.code) {
        if (details.code === 5 || details.code === "5") {
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: "error_failed_subscription_no_balance",
            })
          );
          return;
        }
        if (details.code !== 0 || details.code === "0") {
          dispatch(
            CHANGE_ERROR_ALERT({
              show: true,
              message: `error_failed_subscription_of`,
              value: details.code,
            })
          );
          return;
        }
      }
      return fulfillWithValue();
    } catch (e) {
      if (e.reason) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: e.reason,
          })
        );
        return rejectWithValue();
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_error_while_subscribe",
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(withLoader([dispatchGetAccountBalance()]));
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
          message: "loader_fetching_app_version",
        })
      );
      const response = await registryServices.getUserVersion();
      return fulfillWithValue(response);
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const dispatchGetCurrnetRPC = createAsyncThunk(
  "GET_CURRENT_RPC",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "loader_fetching_current_rpc",
        })
      );
      const response = await blockchainServices.getCurrnetRPC();

      return fulfillWithValue(response);
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const dispatchIsFeeGrantEnabled = createAsyncThunk(
  "IS_FEE_GRANT_ENABLED",
  async (_, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const walletAddress = getState().device.walletAddress;
      await blockchainServices.getIsFeeGrantEnabled({
        walletAddress,
      });
      return fulfillWithValue();
    } catch (e) {
      return rejectWithValue();
    }
  }
);
