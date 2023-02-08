import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, 
  Route, Redirect,  useNavigate} from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#app")).render(
  <>
  {/* <React.StrictMode>
    <App />
  </React.StrictMode> */}
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter></>
);
