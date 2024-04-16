import HomeIcon from "../../assets/icons/bottom-tab/tab-home-icon.svg";
import NodesIcon from "../../assets/icons/bottom-tab/tab-nodes-icon.svg";
import AccountIcon from "../../assets/icons/bottom-tab/tab-account-icon.svg";
import SettingsIcon from "../../assets/icons/bottom-tab/tab-settings-icon.svg";
import RecentsIcon from "../../assets/icons/bottom-tab/tab-recents-icon.svg";

export const tabs = [
  {
    icon: HomeIcon,
    title: "home",
    href: "/",
  },
  {
    icon: NodesIcon,
    title: "nodes",
    href: "/countries",
  },
  {
    icon: RecentsIcon,
    title: "recent",
    href: "/recent-servers",
  },
  {
    icon: AccountIcon,
    title: "account",
    href: "/account",
  },
  {
    icon: SettingsIcon,
    title: "settings",
    href: "/settings",
  },
];
