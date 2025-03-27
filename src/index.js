/**
=========================================================
* EGEAD Fulfilment POD - v2.2.0
=========================================================

* Product Page: https://www.egeadcompany.com/product/material-dashboard-react
* Copyright 2023 Dev Egead Company (https://www.egeadcompany.com)

Coded by www.egeadcompany.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from "redux-persist/integration/react";
import { NotificationContainer } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import { MaterialUIControllerProvider } from "context";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="89602650243-pni7p799kse8avn22jvncscrj6rdjm1i.apps.googleusercontent.com">
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <App />
            <NotificationContainer />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
