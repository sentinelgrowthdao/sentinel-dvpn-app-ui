import { useSelector } from "react-redux";

export const useLoaderSelector = () => useSelector((state) => state.loader);
export const useAuthSelector = () => useSelector((state) => state.auth);
export const useDeviceSelector = () => useSelector((state) => state.device);
export const useVPNSelector = () => useSelector((state) => state.vpn);
export const useSettingsSelector = () => useSelector((state) => state.settings);
export const useUserSelector = () => useSelector((state) => state.user);
export const useNodesSelector = () => useSelector((state) => state.nodes);
export const useAlertsSelector = () => useSelector((state) => state.alerts);
