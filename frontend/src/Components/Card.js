import "./components.css";

// BULLET UNSUPORTED
function Card({ array }) {
  return (array || []).map((vital, index) => (
    <div className="vital-card" key={index}>
      <i className={vital.icon}></i>
      <div className="vital-info">
        <h3>{vital.type}</h3>
        <p>{vital.value}</p>
      </div>
    </div>
  ));
}

//asdas
export default Card;
