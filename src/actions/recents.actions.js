import { createAsyncThunk } from "@reduxjs/toolkit";
import proxyServices from "../services/proxy.services";
import {
  getAddressesFromServers,
  parseExistingServers,
} from "../helpers/parseRecentServes";
import { CHANGE_LOADER_STATE } from "../redux/reducers/alerts.reducer";

export const dispatchGetRecentServersList = createAsyncThunk(
  "GET_RECENT_SERVERS",
  async (_, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "loader_fetching_recent_servers_details",
        })
      );
      const recents = getState().device.recentServers;
      const addresses = getAddressesFromServers(recents);
      const response = await proxyServices.postRecentServersList({ addresses });
      const recentServers = parseExistingServers(
        recents,
        response.data,
        addresses
      );
      return fulfillWithValue(recentServers);
    } catch (e) {
      return rejectWithValue();
    }
  }
);
