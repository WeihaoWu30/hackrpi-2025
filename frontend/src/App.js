import ClinicalCard from "./Components/ClinicalCard.js";
import Card from "./Components/Card.js";
import PatientCard from "./Components/Profile.js";
import Speech from "./Components/Speech.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/components.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranscript } from "./Components/TranscriptContext.js";

import "./App.css";
import TableCard from "./Components/TableCard.js";
import AdditionalInfo from "./AdditionalInfo";

function App() {
   const {transcript} = useTranscript();
  const patients = [
    {
      name: "John Doe",
      id: "12345",
      sex: "Male",
      age: 45,
      phone: "555-123-4567",
      email: "johndoe@gmail.com",
      address: "123 Main St, Springfield, IL",
      photo: "https://example.com/photos/johndoe.jpg",
      vitals: [
        {
          type: "blood pressure",
          value: "120/80 mmHg",
          icon: "fa-solid fa-stethoscope vital-icon bp",
        },
        {
          type: "heart rate",
          value: "72 bpm",
          icon: "fa-solid fa-heart vital-icon hr",
        },
        {
          type: "temperature",
          value: "98.6 °F",
          icon: "fa-solid fa-temperature-high vital-icon temp",
        },
        {
          type: "respiratory rate",
          value: "16 breaths/min",
          icon: "fa-solid fa-lungs vital-icon resp",
        },
      ],
      medication: [
        { name: "Aspirin", dosage: "81 mg", frequency: "daily" },
        { name: "Lisinopril", dosage: "10 mg", frequency: "twice daily" },
      ],
      allergies: ["Penicillin", "Peanuts"],
      labs: [
        {
          test: "CBC",
          date: "2023-01-15",
          result: "Normal",
          reference: "70–99 mg/dL",
        },
        {
          test: "Lipid Panel",
          date: "2023-02-20",
          result: "Elevated LDL",
          reference: "LDL 130 mg/dL",
        },
      ],

      // 🔹 New secondary info
      insurance: {
        provider: "BlueCross BlueShield",
        policyNumber: "123456789",
        coverage: "Full",
      },
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "555-987-6543",
      },
      billing: {
        balance: "$250",
        lastPayment: "2025-09-01",
      }
    },
  ];

  const renderPatients = patients.map((patient, index) => (
    <React.Fragment key={index}>
      <PatientCard patient={patient} />
      <section className="vitals-grid">
        <Card array={patient.vitals} />
      </section>
      <ClinicalCard patient={patient} />
      <TableCard patient={patient.labs} />
      <AdditionalInfo patient={patient} />
    </React.Fragment>
  ));

  return (
   <>
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
        <main className="container">
      <Speech></Speech>
      {renderPatients}
         </main>

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
        </div>
   </>
     
  );
}

export default App;
