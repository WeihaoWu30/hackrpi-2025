import Form from './Components/Form';
import "./App.css";

function FormApp() {
  return (
    <div className='form-container'>
      <Form>
        <h1>Create New Patient</h1>
        <p>Fill out the patient information below</p>
      </Form>
    </div>
  );
}

export default FormApp;