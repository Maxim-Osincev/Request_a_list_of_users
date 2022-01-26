import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.jsx";
import 'react-app-polyfill/ie11';

ReactDOM.render(<App />, document.querySelector(".root"));