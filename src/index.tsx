import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { App } from "./App";

const GOOGLE_CLIENT_ID = "858727940257-poeecro2n2tlamnq55b2rellli63n69l.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);