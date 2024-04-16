import { createAsyncThunk } from "@reduxjs/toolkit";
import vpnServices from "../services/vpn.services";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import { withLoader } from "./loader.action";
import {
  dispatchGetAccountBalance,
  dispatchGetIPAddress,
} from "./home.actions";
import {
  connectToVPN,
  createCredentials,
  createSession,
  getSession,
} from "./vpn.support";

export const dispatchGetVPNStatus = createAsyncThunk(
  "GET_VPN_STATUS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "loader_fetching_vpn_status",
        })
      );
      const response = await vpnServices.getStatus();
      return fulfillWithValue(response.isConnected);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_fetch_vpn_status",
        })
      );
      return rejectWithValue();
    }
  }
);

export const disconnectAction = createAsyncThunk(
  "DISCONNECT_TO_VPN",
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await vpnServices.postDisconnect();
      if (response.isConnected) {
        throw new Error("Failed to Disconnect");
      } else {
        return fulfillWithValue(response.isConnected);
      }
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "error_failed_to_disconnect_vpn",
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(
        withLoader([
          dispatchGetVPNStatus(),
          dispatchGetIPAddress(),
          dispatchGetAccountBalance(),
        ])
      );
    }
  }
);

export const connectAction = createAsyncThunk(
  "CONNECT_ACTION",
  async (node, { fulfillWithValue, rejectWithValue, dispatch, getState }) => {
    try {
      const walletAddress = getState().device.walletAddress;
      const subscription = getState().home.subscription;
      dispatch(
        CHANGE_LOADER_STATE({ show: true, message: "loader_creating_session" })
      );
      const { success, message } = await createSession({
        node,
        subscription,
        walletAddress,
      });

      if (!success) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: message,
          })
        );
        return rejectWithValue();
      }

      if (success) {
        const session = await getSession(walletAddress);
        if (session && session === 500) {
          throw new Error({ msg: "Failed to Create a Session" });
        }
        if (session) {
          dispatch(
            CHANGE_LOADER_STATE({
              show: true,
              message: "loader_fetching_creds",
            })
          );
          const credentials = await createCredentials({
            session,
            node,
            walletAddress,
          });
          if (credentials) {
            dispatch(
              CHANGE_LOADER_STATE({
                show: true,
                message: "loader_connecting_vpn",
              })
            );
            const isConnected = await connectToVPN(credentials);
            if (isConnected) {
              return fulfillWithValue({ isConnected, node });
            } else {
              throw new Error({ msg: "error_failed_to_connect" });
            }
          } else {
            throw new Error({ msg: "error_failed_fetch_creds" });
          }
        } else {
          throw new Error({ msg: "error_failed_create_session" });
        }
      }
    } catch (e) {
      if (e && e.msg) {
        dispatch(CHANGE_ERROR_ALERT({ show: true, message: e.msg }));
        return rejectWithValue();
      } else {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "error_failed_to_connect",
          })
        );
        return rejectWithValue();
      }
    } finally {
      dispatch(
        withLoader([
          dispatchGetVPNStatus(),
          dispatchGetIPAddress(),
          dispatchGetAccountBalance(),
        ])
      );
    }
  }
);
