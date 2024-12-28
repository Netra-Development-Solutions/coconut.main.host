import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import DataManagementService from "data_management/DataManagementService";
import pluginRegistry from "data_management/pluginRegistry";
import PluginInjector from "plugin_injector/PluginInjector";

pluginRegistry.register("header_navigation", lazy(() => import("header_navigation/HeaderNavigation")))
pluginRegistry.register("sign_in", lazy(() => import("user_management/SignIn")))

import "./index.css";

window.GUID = function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = (c === 'x' ? r : (r & 0x3 | 0x8));
      return v.toString(16);
  });
}

const App = () => {
  DataManagementService.registerModel("auth", { loggedIn: true })
  return (
  <>
    <PluginInjector pluginName={"header_navigation"} />
    <PluginInjector pluginName={"sign_in"} />
  </>
)};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)