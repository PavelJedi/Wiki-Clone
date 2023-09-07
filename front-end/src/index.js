import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import ReactModal from "react-modal";


ReactModal.setAppElement("#root");

const root = createRoot(document.getElementById("root"));

document.body.setAttribute('data-theme', 'dark'); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
