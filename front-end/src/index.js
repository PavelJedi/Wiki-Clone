import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./context/AppProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import ReactModal from "react-modal";

// Add this line to set the app element
ReactModal.setAppElement("#root");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
