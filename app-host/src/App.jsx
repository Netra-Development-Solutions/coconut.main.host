import React from "react";
import ReactDOM from "react-dom/client";
import DataManagementService from "data_management/DataManagementService";
import HeaderNavigation from "header_navigation/HeaderNavigation";
import SignIn from "user_management/SignIn";

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
    <HeaderNavigation />
    <SignIn />
  </>
)};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)