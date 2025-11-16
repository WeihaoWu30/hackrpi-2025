import React, { useEffect, useRef } from "react"
import { useTranscript } from "./TranscriptContext";
import { Link } from "react-router-dom";
import { useAlert } from "./AlertContext";

export const Header = ({children}) =>{
   const {transcript} = useTranscript();
   const {alert, updateAlert} = useAlert();
   const clicked = useRef(false);

   useEffect(() =>{
      const evtSource = new EventSource(process.env.REACT_APP_BACKEND + "/events");
      console.log("yurrrr");
      evtSource.onmessage = (msg) =>{
         console.log(msg);
         // const data = JSON.parse(msg.data);
         if (!clicked.current){
            document.getElementById("alert-button").click();
            clicked.current = true;
         }
         updateAlert(msg.data);
      };

      evtSource.onerror = (err) =>{
         console.log("Error", err);
      };

      return() =>{
         evtSource.close();
      };
   }, []);

   useEffect(() => {
      const dismissEl = document.getElementById("offcanvasRight");
      
      if (!dismissEl) {
          return; 
      }
  
      const handleDismiss = () => {
          clicked.current = false;
      };
  
      dismissEl.addEventListener('hidden.bs.offcanvas', handleDismiss);
  
      return () => {
          dismissEl.removeEventListener('hidden.bs.offcanvas', handleDismiss);
      };
  }, []);

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

   <button id="alert-button"
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
   <div className="offcanvas-body">{alert.map((m, i) =>(
      <div className="text-danger"key={i}>{m}</div>
   ))}</div>
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

