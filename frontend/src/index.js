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
        <header className="header">
          <h1>EHR System</h1>
          <nav className="doctor-info">
            <p> Dr. Jeffrey Combs | General Medicine</p>
            <Link to="/form">Create Form</Link>{" "}
            <Link to="/app">Clinical Records</Link>
            <Link to="/chat">Message</Link>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvasChat"
              data-bs-target="#offcanvasChat"
              aria-controls="offcanvasStart"
              id="transcript"
            >
              Transcript
            </button>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              id="notifs"
            >
              Alerts
            </button>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app" element={<App />} />
          <Route path="/form" element={<FormApp />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Notifications</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">...</div>
        </div>

        <div
          className="offcanvas offcanvas-start"
          tabindex="-1"
          id="transcript"
          aria-labelledby="offcanvasStart"
        >
          <div className="offcanvas-header">
            <h5 id="transcript">Offcanvas top</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvasChat"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">...</div>
        </div>
      </BrowserRouter>
    </TranscriptProvider>
  </React.StrictMode>
);

// If you want into start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
