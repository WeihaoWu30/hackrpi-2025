import Form from './Components/Form';
import "./App.css";

function FormApp() {
  return (
    <div>
      <h1>Create New Electronic Health Record</h1>
      <Form title="Patient Name:"><h4>Patient Name</h4></Form>
      <Form title="Patient ID:"><h4>Patient ID</h4></Form>
      <Form title="Age:"><h4>Patient Age</h4></Form>
    </div>
  );
}

export default FormApp;