import React from "react"
import { useTranscript } from "./TranscriptContext";
import { Link } from "react-router-dom";

export const Header = ({children}) =>{
   const {transcript} = useTranscript();

   return (<><header className="header">
   <h1>EHR System</h1>
   <nav className="doctor-info">
   <p> Dr. Jeffrey Combs | General Medicine</p>
   <Link to="/form">Create Form</Link>{" "}
   <Link to="/app">Clinical Records</Link>
   <Link to="/chat">Message</Link>
   <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasLeft"
      aria-controls="offcanvasLeft"
   >
      Transcript
   </button>

   <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
   >
      Alerts
   </button>
   </nav>
   </header>
   {children}
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
   tabIndex="-1"
   id="offcanvasLeft"
   aria-labelledby="offcanvasLeftLabel"
   >
   <div className="offcanvas-header">
   <h5 id="offcanvasLeftLabel">Transcript</h5>
   <button
      type="button"
      className="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
   ></button>
   </div>
   <div className="offcanvas-body">
   {transcript.split("\n").map((v, i) => (
      <p key={i}>{v}</p>
   ))}
   </div>
   </div></>);
}

