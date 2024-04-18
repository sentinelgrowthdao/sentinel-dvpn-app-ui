import { createAsyncThunk } from "@reduxjs/toolkit";
import dnsServices from "../services/dns.services";
import { CHANGE_ERROR_ALERT } from "../redux/reducers/alerts.reducer";
import registryServices from "../services/registry.services";
import proxyServices from "../services/proxy.services";

export const dispatchGetAvailableDNS = createAsyncThunk(
  "GET_AVAILABLE_DNS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const availableDNSResponse = await dnsServices.getAvailableDNS();
      const currentDNSResponse = await dnsServices.getCurrentDNS();
      return fulfillWithValue({
        available: availableDNSResponse.servers,
        current: currentDNSResponse,
      });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_fetch_dnss",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchPutSelectedDNS = createAsyncThunk(
  "PUT_SELECTED_DNS",
  async (dns, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await dnsServices.putDNS(dns);
      if (response.status === 200) {
        return fulfillWithValue({ ...dns, isCustom: false });
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_change_dns",
        })
      );
      return rejectWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_change_dns",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetLogs = createAsyncThunk(
  "SHARE_LOGS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await registryServices.getLogs();
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_open_share",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchWindowOpen = createAsyncThunk(
  "WINDOW_OPEN",
  async (link, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await proxyServices.postWindowOpen({ url: link });
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_open_link",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchAddCustomDNS = createAsyncThunk(
  "ADD_CUSTOM_DNS",
  async (dns, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { name, preferredIP, alternateIP } = dns;

      const response = await dnsServices.putDNS({
        name: "custom",
        addresses: `${preferredIP}, ${alternateIP}`,
      });
      if (response.status === 200) {
        return fulfillWithValue({
          name,
          addresses: `${preferredIP}, ${alternateIP}`,
          isCustom: true,
        });
      }
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_change_dns",
        })
      );
      return rejectWithValue();
    } catch (e) {
      return rejectWithValue();
    }
  }
);
