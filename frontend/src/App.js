import ClinicalCard from "./Components/ClinicalCard.js";
import Card from "./Components/Card.js";
import PatientCard from "./Components/Profile.js";
import Speech from "./Components/Speech.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/components.css";
import React, { Fragment } from "react";
import { Header } from "./Components/Header.js";
import { useState, useEffect } from "react";

import "./App.css";
import TableCard from "./Components/TableCard.js";
import AdditionalInfo from "./AdditionalInfo";

function App() {
  const [data, setData] = useState([]);

  const extraInfo = [
    {
      insurance: {
        provider: "N/A",
        policyNumber: "N/A",
        coverage: "N/A",
      },
    },
    {
      emergencyContact: {
        name: "N/A",
        relationship: "N/A",
        phone: "N/A",
      },
    },
    {
      billing: {
        balance: "N/A",
        pastPayment: "N/A",
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + "/patient"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const patientsWithProvider = result.patients.map((p) => ({
          ...p,
          ...Object.assign({}, ...extraInfo),
        }));
        setData(patientsWithProvider);
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once on mount

  const renderPatients = data?.map((patient, index) => (
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
      <Header>
        <main className="container">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <Speech></Speech>
          {renderPatients}
        </main>
      </Header>
    </>
  );
}

export default App;
