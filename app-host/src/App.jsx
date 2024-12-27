import React from "react";
import ReactDOM from "react-dom/client";
import DataManagementService from "data_management/DataManagementService";
import TestApp from "test_app/RemoteComponent";

import "./index.css";

const App = () => {
  DataManagementService.subscribe("auth", (state) => {
    console.log("auth state", state);
  })
  return (
  <div className="container"> 
    <div>Name: coconut-app-host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <div>{JSON.stringify(DataManagementService.getState())}</div>

    <TestApp />    
  </div>
)};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)