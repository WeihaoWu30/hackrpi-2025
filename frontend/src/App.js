import ClinicalCard from "./Components/ClinicalCard.js";
import Card from "./Components/Card.js";
import PatientCard from "./Components/Profile.js";
import Speech from "./Components/Speech.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/components.css";
import React from "react";

import "./App.css";
import TableCard from "./Components/TableCard.js";

function App() {
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
    </React.Fragment>
  ));

  return (
    <main className="container">
      {renderPatients}
    </main>
  );
}

export default App;
