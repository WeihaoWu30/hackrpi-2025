import "./components.css";

// BULLET UNSUPORTED
function Card(props) {
  const patientInfo = props.array.map((patient, index) => (
    <div class="vital-card" key={index}>
      <i class="fa-solid fa-stethoscope vital-icon bp"></i>
      <div class="vital-info">
        <h3>{patient.type}</h3>
        <p>{patient.value}</p>
      </div>
    </div>
  ));

  return (
    <section>:{patientInfo}</section>
  );
}

export default Card;
