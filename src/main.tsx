import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App2 from "./App2.tsx";
// import audience from  "../config/audience.json"

const {VITE_AUTH0_ISSUER: domain, VITE_AUTHO_CLIENT: clientId, VITE_AUTH0_AUDIENCE: audience} = import.meta.env;
const redirectUri: string = window.location.origin + "/home"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider 
            domain={domain} 
            clientId={clientId }
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: audience,
        }}>
      <App2 />
    </Auth0Provider>
  </React.StrictMode>
);
