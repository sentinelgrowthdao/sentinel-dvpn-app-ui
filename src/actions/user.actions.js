import { createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../services/app.services";
import { SET_SHOW_ERROR_ALERT, SHOW_NO_BALANCE } from "../redux/alerts.reducer";

export const dispatchGetPlans = createAsyncThunk(
  "DISPATCH_GET_PLANS",
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const plans = await APIService.getPlans();
      const plan = plans.filter((p) => p.id === "6")[0];
      return fulfillWithValue(plan);
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch plans",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchFetchCurrentPrice = createAsyncThunk(
  "DISPATCH_FETCH_CURRENT_PRICE",
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const price = await APIService.getCurrentPrice();
      return fulfillWithValue(Number.parseFloat(price));
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch current price",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetBalance = createAsyncThunk(
  "DISPATCH_GET_BALANCE",
  async (walletAddress, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      let amount = 0;
      const response = await APIService.getBalance(walletAddress);
      response &&
        response.balances &&
        response.balances.forEach(async (balance) => {
          if (balance.denom === "udvpn") {
            amount = Number.parseInt(balance.amount) / 1e6;
          }
        });
      if (amount === 0) {
        dispatch(SHOW_NO_BALANCE(true));
      }
      return fulfillWithValue(amount);
    } catch (e) {
      console.log(e);
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch balance",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetIpAddress = createAsyncThunk(
  "DISPATCH_GET_IP_ADDRESS",
  async (deviceToken, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const resposnse = await APIService.getIpAddress(deviceToken);
      const { ip = "0.0.0.0", latitude = 0.0, longitude = 0.0 } = resposnse;
      return fulfillWithValue({ ip, latitude, longitude });
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch ip address or location",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetSubscriptions = createAsyncThunk(
  "DISPATCH_GET_SUBSCRIPTIONS",
  async (walletAddress, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await APIService.getSubscriptions(walletAddress);
      if (response && response.planSubscriptions) {
        const subscription = response.planSubscriptions.find((subscription) => {
          return subscription.planId === "6";
        });
        return fulfillWithValue(subscription);
      }
      return rejectWithValue();
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const subscribeToPlanAction = createAsyncThunk(
  "SUBSCRIBE_TO_A_PLAN",
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await APIService.subscribeToPlan(6, payload);
      console.log("SUBSCRIBE_TO_A_PLAN response", response);
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to subscribe",
        })
      );
      return rejectWithValue();
    }
  }
);
