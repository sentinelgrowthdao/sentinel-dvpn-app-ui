import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import proxyServices from "../services/proxy.services";
import { getMobileOS, isVersionGreater } from "../helpers/common.helpers";

export const withLoader = createAsyncThunk(
  "WITH_LOADER",
  async (dispatchers = [], { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      for (const dispatcher of dispatchers) {
        await dispatch(dispatcher);
      }
      return fulfillWithValue(true);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const withSingleDispatcherLoader = createAsyncThunk(
  "WITH_SINGLE_DISPATCHER_LOADER",
  async (dispatcher, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const result = await dispatch(dispatcher);
      return fulfillWithValue(result);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const dispatchCheckLatestVersion = createAsyncThunk(
  "CHECK_LATEST_VERSION",
  async (_, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const appVersion = getState().home.version;
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: `Checking your app version`,
        })
      );

      const os = getMobileOS();
      const response = await proxyServices.getOnlineVersion();
      const isLatest = isVersionGreater(appVersion, response.data[os]);
      return fulfillWithValue({ show: isLatest, version: response.data[os] });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Connection error, Try again!",
        })
      );
      return rejectWithValue();
    }
  }
);
