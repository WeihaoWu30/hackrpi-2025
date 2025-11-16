import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FormApp from "./FormApp";
import ChatRoom from "./ChatRoom";
import Speech from "./Components/Speech";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TranscriptProvider } from "./Components/TranscriptContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Add this import

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TranscriptProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app" element={<App />} />
          <Route path="/form" element={<FormApp />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </TranscriptProvider>
  </React.StrictMode>
);

// If you want into start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
