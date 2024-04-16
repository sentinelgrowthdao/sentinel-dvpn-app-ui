import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchCheckLatestVersion,
  withLoader,
  withSingleDispatcherLoader,
} from "../../actions/loader.action";
import { connectAction } from "../../actions/vpn.actions";
import { MODAL_VARIANTS } from "../../containers/Modal/modal-types";
import { dispatchPostFeeGrant } from "../../actions/home.actions";

const initialState = {
  success: {
    show: false,
    message: null,
    value: null,
  },
  error: {
    show: false,
    message: null,
    value: null,
  },
  loader: {
    show: false,
    message: null,
    value: null,
  },
  modal: {
    show: false,
    type: null,
    variant: MODAL_VARIANTS.PRIMARY,
  },
  latest: {
    show: false,
    version: "0.0.0",
  },
  initiated: {
    show: false,
    loading: true,
    success: false,
    message: null,
  },
};

const alertsSlice = createSlice({
  name: "ALERTS",
  initialState,
  reducers: {
    CHANGE_SUCCESS_ALERT: (state, { payload }) => ({
      ...state,
      success: {
        ...state.success,
        ...payload,
      },
    }),
    CHANGE_ERROR_ALERT: (state, { payload }) => ({
      ...state,
      error: {
        ...state.error,
        ...payload,
      },
    }),
    CHANGE_LOADER_STATE: (state, { payload }) => ({
      ...state,
      loader: {
        ...state.loader,
        ...payload,
      },
    }),
    CHANGE_MODAL_STATE: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        ...payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(withLoader.pending, (state) => ({
        ...state,
        loader: { ...state.loader, show: true, message: "Loading..." },
      }))
      .addCase(withLoader.rejected, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }))
      .addCase(withLoader.fulfilled, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }));

    builder
      .addCase(withSingleDispatcherLoader.pending, (state) => ({
        ...state,
        loader: { ...state.loader, show: true, message: "Loading..." },
      }))
      .addCase(withSingleDispatcherLoader.rejected, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }))
      .addCase(withSingleDispatcherLoader.fulfilled, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }));

    builder
      .addCase(connectAction.pending, (state) => ({
        ...state,
        loader: { ...state.loader, show: true, message: "Loading..." },
      }))
      .addCase(connectAction.rejected, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }))
      .addCase(connectAction.fulfilled, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }));

    builder
      .addCase(dispatchCheckLatestVersion.pending, (state) => ({
        ...state,
      }))
      .addCase(dispatchCheckLatestVersion.rejected, (state) => ({
        ...state,
      }))
      .addCase(dispatchCheckLatestVersion.fulfilled, (state, { payload }) => ({
        ...state,
        latest: {
          ...state.latest,
          show: payload.show,
          version: payload.version,
        },
      }));

    builder
      .addCase(dispatchPostFeeGrant.pending, (state) => ({
        ...state,
        initiated: {
          ...state.initiated,
          show: false,
          loading: true,
          success: false,
          message: null,
        },
      }))
      .addCase(dispatchPostFeeGrant.rejected, (state, { payload }) => ({
        ...state,
        initiated: {
          ...state.initiated,
          show: true,
          loading: false,
          success: false,
          message: payload.message,
        },
      }))
      .addCase(dispatchPostFeeGrant.fulfilled, (state) => ({
        ...state,
        initiated: {
          ...state.initiated,
          show: false,
          loading: false,
          success: true,
          message: null,
        },
      }));
  },
});

export const {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
  CHANGE_SUCCESS_ALERT,
  CHANGE_MODAL_STATE,
} = alertsSlice.actions;

export default alertsSlice.reducer;
