import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import RecoverPass from "./components/RecoverPass";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";

ReactDOM.createRoot(document.querySelector("#app")).render(
  <>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/RecoverPass" element={<RecoverPass />} />
        <Route path="/Profile" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>{" "}
    */
  </>
);
