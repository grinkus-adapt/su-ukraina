import React from "react";
import { HeadProvider } from "react-head";

import "@fontsource/roboto";
import "./src/styles/main.css";

export const wrapRootElement = ({ element }) => {
  return <HeadProvider>{element}</HeadProvider>;
};

export const onServiceWorkerUpdateReady = () => {
  window.location.reload();
};
