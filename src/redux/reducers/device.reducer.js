import { createSlice } from "@reduxjs/toolkit";
import {
  createWalletWithMnemonic,
  getWalletAddressAction,
} from "../../actions/onboarding.action";
import {
  connectAction,
  disconnectAction,
  dispatchGetVPNStatus,
} from "../../actions/vpn.actions";
import { createRecentServerToStore } from "../../helpers/parseRecentServes";
import { dispatchGetRecentServersList } from "../../actions/recents.actions";

const initialState = {
  isWalletCreated: false,
  isRegistered: false,
  walletAddress: null,
  selectedNode: {},
  isVPNConnected: false,
  protocols: "V2RAY,WIREGUARD",
  recentServers: [],
};

const deviceSlice = createSlice({
  name: "DEVICE",
  initialState,
  reducers: {
    CHANGE_IS_REGISTERED: (state, { payload }) => ({
      ...state,
      isRegistered: payload,
    }),
    SET_PROTOCOL: (state, { payload }) => ({
      ...state,
      protocols: payload,
    }),
    CHANGE_RECENT_SERVERS: (state, { payload }) => {
      const otherServers = state.recentServers.filter(
        (e) => e.address !== payload.node.address
      );
      const server = createRecentServerToStore(payload.node);
      const recentServers = [server].concat(otherServers);
      return {
        ...state,
        recentServers,
      };
    },
    REMOVE_RECENT_SERVER: (state, { payload }) => {
      const recentServers = state.recentServers.filter(
        (e) => e.address !== payload.address
      );
      return {
        ...state,
        recentServers,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createWalletWithMnemonic.fulfilled,
      (state, { payload }) => ({
        ...state,
        isWalletCreated: true,
        mnemonic: payload,
      })
    );
    builder.addCase(dispatchGetVPNStatus.fulfilled, (state, { payload }) => ({
      ...state,
      isVPNConnected: payload,
    }));
    builder.addCase(getWalletAddressAction.fulfilled, (state, { payload }) => ({
      ...state,
      walletAddress: payload,
    }));
    builder.addCase(connectAction.fulfilled, (state, { payload }) => {
      const otherServers = state.recentServers.filter(
        (e) => e.address !== payload.node.address
      );
      const recentServers = [payload.node].concat(otherServers);
      return {
        ...state,
        selectedNode: payload.node,
        recentServers,
      };
    });
    builder.addCase(disconnectAction.fulfilled, (state, { payload }) => ({
      ...state,
      isVPNConnected: payload,
    }));
    builder.addCase(
      dispatchGetRecentServersList.fulfilled,
      (state, { payload }) => ({
        ...state,
        recentServers: payload,
      })
    );
  },
});

export const {
  CHANGE_IS_REGISTERED,
  SET_PROTOCOL,
  CHANGE_RECENT_SERVERS,
  REMOVE_RECENT_SERVER,
} = deviceSlice.actions;

export default deviceSlice.reducer;
