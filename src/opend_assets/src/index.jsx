import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Principal } from "@dfinity/principal";

// const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
const CURRENT_USER_ID = Principal.fromText("kmh7u-piaaa-aaaak-qcz5q-cai");
export default CURRENT_USER_ID;

const init = async () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

init();
