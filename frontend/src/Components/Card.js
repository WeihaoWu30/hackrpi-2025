import "./components.css";

// BULLET UNSUPORTED
function Card(props) {
  return props.array.map((patient, index) => (
    <div class="vital-card" key={index}>
      <i class={patient.icon}></i>
      <div class="vital-info">
        <h3>{patient.type}</h3>
        <p>{patient.value}</p>
      </div>
    </div>
  ));

}

//asdas
export default Card;
