import React, { useEffect } from "react";
import DataManagementService from "data_management/DataManagementService";

import "./index.css";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log("Setting auth state")
      DataManagementService.setState({
        "auth": {
          "loggedIn": true,
        }
      })
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