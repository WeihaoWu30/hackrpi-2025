import "./components.css";

// BULLET SUPPORTED
function ClinicalCard(props) {

  const patient = props.patient;
  
  return (
    <section className="clinical-summary">
      <div className="summary-card">
        <h2>
          <i className="fa-solid fa-pills"></i> Medications
        </h2>
        <ul>
          {patient.medications.map((m, index) => (
            <li key={index}>
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-card">
        <h2>
          <i className="fa-solid fa-triangle-exclamation"></i> Allergies
        </h2>
        <ul>
          {patient.allergies.map((allergy, index) => (
            <li key={index}>{allergy}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ClinicalCard;