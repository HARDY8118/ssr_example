import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./Context";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.hydrate(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let value = {};
if (window && window.initialData) {
  value = window.initialData;
}

ReactDOM.hydrate(
  <Context.Provider value={value}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
