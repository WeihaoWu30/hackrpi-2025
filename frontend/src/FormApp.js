import Form from "./Components/Form";
import FormTwo from "./Components/OtherInfo";
import { Fragment } from "react/jsx-runtime";
import "./App.css";

function FormApp() {
  return (
    <Fragment>
      <div className="form-container">
        <Form>
          <h1>Create New Patient</h1>
          <p>Fill out the patient information below</p>
        </Form>
      </div>
      <div className="form-container">
        <FormTwo></FormTwo>
        <div></div>
      </div>
    </Fragment>
  );
}

export default FormApp;
