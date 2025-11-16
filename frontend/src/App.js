import ClinicalCard from "./Components/ClinicalCard.js";
import Card from "./Components/Card.js";
import PatientCard from "./Components/Profile.js";
import Speech from "./Components/Speech.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/components.css";
import React, { Fragment } from "react";
import { Header } from "./Components/Header.js";
import { useState, useEffect } from "react";
import PDFGenerator from "./GeneratePDF/generate.js";

import "./App.css";
import AdditionalInfo from "./AdditionalInfo";
function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

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
        setData(result.patients);
        console.log(result.patients);
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once on mount

  const firstPatient = data?.[index]; // optional chaining in case data is undefined

  const renderPatient = firstPatient && (
    <section style={{ border: "#4AC7F4 2px solid" }}>
      <PatientCard patient={firstPatient} />
      <section
        className="vitals-grid"
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        <Card array={firstPatient.vitals} />
      </section>
      <ClinicalCard patient={firstPatient} />
      <AdditionalInfo patient={firstPatient} />
    </section>
  );
  const switchCard = (i) => {
    console.log("switching card");
    setIndex(i);
    <section style={{ border: "#4AC7F4 2px solid" }}>
      <PatientCard patient={data[index]} />
      <section
        className="vitals-grid"
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        <Card array={data[index].vitals} />
      </section>
      <ClinicalCard patient={data[index]} />
      <AdditionalInfo patient={data[index]} />
    </section>;
  };

  return (
    <>
      <PDFGenerator>
        <Header>
          <main className="container">
            <Speech></Speech>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select Patient
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {data.map((patient, index) => (
                  <button
                    className="dropdown-item"
                    key={index}
                    onClick={() => switchCard(index)}
                  >
                    {" "}
                    {patient.patientName}{" "}
                  </button>
                ))}
              </div>
            </div>
            {renderPatient}
          </main>
        </Header>
      </PDFGenerator>
    </>
  );
}

export default App;
