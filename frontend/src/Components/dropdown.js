import Card from "./Card";
import PatientCard from "./Profile";
import ClinicalCard from "./ClinicalCard";
import AdditionalInfo from "../AdditionalInfo";
import { useState } from "react";

function Dropdown(props) {
  const [index, setIndex] = useState(0);

  const switchCard = (i) => {
    console.log("switching card");
    setIndex(i);
    <section style={{ border: "#4AC7F4 2px solid" }}>
      <PatientCard patient={props.patients[index]} />
      <section
        className="vitals-grid"
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        <Card array={props.patients[index].vitals} />
      </section>
      <ClinicalCard patient={props.patients[index]} />
      <AdditionalInfo patient={props.patients[index]} />
    </section>;
  };

  return (
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
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.patients.map((patient, index) => (
          <button className="dropdown-item" key={index} onClick={() => switchCard(index)}>
            {" "}
            {patient.patientName}{" "}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
