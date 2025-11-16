import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components.css";

function TableCard(props) {
  return (
    <section className="labs-card">
      <h2>
        <i className="fa-solid fa-flask"></i> Past Labs
      </h2>
      <table className="labs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Test</th>
            <th>Result</th>
            <th>Reference Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.labs?.map((labValue, index) => (
              <td key={index}>{labValue}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default TableCard;
