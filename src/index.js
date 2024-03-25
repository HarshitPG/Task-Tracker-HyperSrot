import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ContextProvider } from "./context/context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(
  "Hi I am Harshit,\n",
  "I am the devloper of this site.\n you can context me through p.g.harshit@gmail.com."
);

{
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
  console.info = () => {};
  console.trace = () => {};
  console.group = () => {};
  console.groupEnd = () => {};
  console.groupCollapsed = () => {};
  console.time = () => {};
  console.timeEnd = () => {};
  console.timeLog = () => {};
  console.count = () => {};
  console.countReset = () => {};
  console.clear = () => {};
  console.table = () => {};
  console.assert = () => {};
  console.profile = () => {};
  console.profileEnd = () => {};
  console.dir = () => {};
  console.dirxml = () => {};
  console.timeStamp = () => {};
  console.context = () => {};
  console.memory = () => {};
  console.exception = () => {};
  console.trace = () => {};
  console.fatal = () => {};
  console.markTimeline = () => {};
  console.timeline = () => {};
  console.timelineEnd = () => {};
  console.count = () => {};
  console.countReset = () => {};
}

root.render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
);
