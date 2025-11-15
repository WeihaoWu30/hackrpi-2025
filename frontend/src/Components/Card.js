import "./components.css";

function Card(props) {
  const patientInfo = props.array.map((patient, index) => (
    <li key={index}>
      {patient.important ? <strong>{patient.info}</strong> : patient.info}
    </li>
  ));

  return (
    <div className="vital-card">
      <i className="fa-solid fa-stethoscope vital-icon bp"></i>
      <div className="vital-info">
        <h2>{props.title}</h2>
        <ul>{patientInfo}</ul>
      </div>
    </div>
  );
}

export default Card;
