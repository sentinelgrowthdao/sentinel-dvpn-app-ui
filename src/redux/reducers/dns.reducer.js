import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchGetAvailableDNS,
  dispatchPutSelectedDNS,
} from "../../actions/settings.action";
import { dispatchGetCurrnetRPC } from "../../actions/home.actions";

const initialState = {
  available: [],
  current: {},
  rpc: {
    host: "",
    port: "",
  },
};

const dnsSlice = createSlice({
  name: "DNS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchPutSelectedDNS.fulfilled, (state, { payload }) => ({
      ...state,
      current: payload,
    }));
    builder.addCase(dispatchGetCurrnetRPC.fulfilled, (state, { payload }) => ({
      ...state,
      rpc: {
        ...state.rpc,
        ...payload,
      },
    }));
    builder.addCase(
      dispatchGetAvailableDNS.fulfilled,
      (state, { payload }) => ({
        ...state,
        current: payload.current,
        available: payload.available,
      })
    );
  },
});

export default dnsSlice.reducer;
