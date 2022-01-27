import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter as Router } from "react-router-dom";
import AuthProviderWithHistory from "./auth/AuthProvider";

ReactDOM.render(
  <Router>
    <AuthProviderWithHistory>
      <App />
    </AuthProviderWithHistory>
  </Router>,
  document.getElementById("root")
);