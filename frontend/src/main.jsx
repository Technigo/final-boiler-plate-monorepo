import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./App.css";
import "./pages/habits.css";
import "./components/createhabit.css";
//import "./components/header.css";
//import "./components/headermobile.css"
//import "./components/register.css";
//import "./components/Startpage/loginform.css"
//import "./components/Aboutus/aboutusinfo.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
