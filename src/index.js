import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RecoverPass from "./components/RecoverPass";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchUsers from "./components/SearchUsers";

ReactDOM.createRoot(document.querySelector("#app")).render(
  <>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/RecoverPass" element={<RecoverPass />} />
        <Route path="/Profile" element={<Dashboard />} />
        <Route path="/Users" element={<SearchUsers />} />
      </Routes>
    </BrowserRouter>{" "}
    */
  </>
);
