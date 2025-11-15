import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components.css";

function TableCard(props) {
  const patient = props.patient.map((patientData, index) => (
    <tr key={index}>
      <td>{patientData.test}</td>
      <td>{patientData.date}</td>
      <td>{patientData.result}</td>
      <td>{patientData.reference}</td>
    </tr>
  )); // single patient object

  return (
    <section class="labs-card">
      <h2>
        <i class="fa-solid fa-flask"></i> Past Labs
      </h2>
      <table class="labs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Test</th>
            <th>Result</th>
            <th>Reference Range</th>
          </tr>
        </thead>
        <tbody>{patient}</tbody>
      </table>
    </section>
  );
}

export default TableCard;
