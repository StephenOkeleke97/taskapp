import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from "./routes/Task";
import Authenticate from "./authentication/Authenticate";
import NotFound from "./routes/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Authenticate />
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/task" element={<Task />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
