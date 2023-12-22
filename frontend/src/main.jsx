import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import { App } from "./App.jsx";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-akwdt.eu.auth0.com"
      clientId="eBwjER60pfXm3j4zCzd5SrBFx3kEvwHG"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
