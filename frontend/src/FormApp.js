import Form from "./Components/Form";
import { Fragment } from "react/jsx-runtime";
import "./App.css";

function FormApp() {
  return (
    <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
      <div className="form-container">
        <Form>
          <h1>Create New Patient</h1>
          <p>Fill out the patient information below</p>
        </Form>
      </div>
    </div>
  );
}

export default FormApp;
