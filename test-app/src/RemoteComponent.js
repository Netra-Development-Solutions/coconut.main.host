import React, { useEffect } from "react";
import DataManagementService from "data_management/DataManagementService";

import "./index.css";

const App = () => {
  const widgetId = window.GUID()

  useEffect(() => {
    setTimeout(() => {
      console.log("Setting auth state")
      console.log(DataManagementService.getModelData("auth"))
    }, 5000)
  }, [])

  return (
    <div className="container">
      <div>Name: test-app</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Empty CSS</div>
    </div>
  )
};

export default App;