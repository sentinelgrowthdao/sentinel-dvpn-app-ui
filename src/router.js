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
import { createBrowserRouter } from "react-router-dom";
import {
  AppLayout,
  IndexLayout,
  ListLayout,
  OnboardingLayout,
} from "./layouts";
const routes = [
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "countries",
        element: <ListLayout />,
        children: [
          {
            path: "",
            element: <CountriesList />,
          },
          {
            path: ":countryId/cities",
            element: <CitiesList />,
          },
          {
            path: ":countryId/cities/:cityId/servers",
            element: <ServersList />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "private-key",
        element: <PrivateKey />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnboardingLayout />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "import",
        element: <Import />,
      },
    ],
  },
  {
    path: "/",
    element: <IndexLayout />,
  },
];

const router = createBrowserRouter(routes);

export default router;
