import { deviceReducer, authReducer, settingsReducer } from "@reducers";
import alertsReducer from "@reducers/alerts.reducer";
import loaderReducer from "@reducers/loader.reducer";
import nodesReducer from "@reducers/nodes.reducer";
import userReducer from "@reducers/user.reducer";
import vpnReducer from "@reducers/vpn.reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import process from "process";
import paymentsReducer from "@reducers/payments.reducer";

const persistConfig = {
  device: {
    key: "device",
    version: 1,
    storage,
    safelist: ["device"],
  },
  auth: {
    key: "auth",
    version: 1,
    storage,
    safelist: ["auth"],
  },
  settings: {
    key: "settings",
    version: 1,
    storage,
    safelist: ["settings"],
  },
};

const persistedReducers = {
  auth: persistReducer(persistConfig.auth, authReducer),
  device: persistReducer(persistConfig.device, deviceReducer),
  settings: persistReducer(persistConfig.settings, settingsReducer),
};

const reducer = combineReducers({
  auth: persistedReducers.auth,
  device: persistedReducers.device,
  settings: persistedReducers.settings,
  loader: loaderReducer,
  alerts: alertsReducer,
  nodes: nodesReducer,
  user: userReducer,
  vpn: vpnReducer,
  payments: paymentsReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV == "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
