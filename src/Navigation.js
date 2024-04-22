import React from "react";
import {
  Account,
  CitiesList,
  CountriesList,
  Home,
  PrivateKey,
  ServersList,
  Settings,
} from "./Screens/App";
import { Create, Import, Start } from "./Screens/Onboarding";
import { Route, Routes } from "react-router-dom";

import { AppLayout, ListLayout, OnboardingLayout } from "./layouts";
import { useSelector } from "react-redux";
import RecentServers from "./Screens/App/RecentServers";
import AccountLayout from "./layouts/AccountLayout";
import WalletDetails from "./Screens/App/WalletDetails";
import SubscriptionsDetails from "./Screens/App/SubscriptionsDetails";
import DNSList from "./Screens/App/DNSList";
import NewDNS from "./Screens/App/NewDNS";
import SettingsLayout from "./layouts/SettingsLayout";
import NewRPC from "./Screens/App/NewRPC";
import FeeGranter from "./Screens/App/FeeGranter";

const Navigation = () => {
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );
  if (isRegistered && isWalletCreated) {
    return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<ListLayout />}>
            <Route index element={<CountriesList />} />
            <Route path=":countryId/cities" element={<CitiesList />} />
            <Route
              path=":countryId/cities/:cityId/servers"
              element={<ServersList />}
            />
          </Route>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="wallet-details" element={<WalletDetails />} />
            <Route path="subscriptions" element={<SubscriptionsDetails />} />
          </Route>
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Settings />} />
            <Route path="dns-list" element={<DNSList />} />
            <Route path="new-dns" element={<NewDNS />} />
            <Route path="rpc-change" element={<NewRPC />} />
            <Route path="fee-granter" element={<FeeGranter />} />
          </Route>
          <Route path="private-key" element={<PrivateKey />} />
          <Route path="recent-servers" element={<RecentServers />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<OnboardingLayout />}>
        <Route index element={<Start />} />
        <Route path="create" element={<Create />} />
        <Route path="import" element={<Import />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
