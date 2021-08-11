import React from "react";
import { hydrate } from "react-dom";
import "./index.pcss";
import App from "../common/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../common/store";

const store = configureStore({ ...window["INITIAL_DATA"] });

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

hydrate(app, document.getElementById("root"));
