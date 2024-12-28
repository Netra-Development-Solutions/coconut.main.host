import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import RemoteComponent from "./RemoteComponent";

const App = () => (
  <RemoteComponent />
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)