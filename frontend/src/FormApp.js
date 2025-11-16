import Form from "./Components/Form";
import { Fragment } from "react/jsx-runtime";
import { Header } from "./Components/Header";
import "./App.css";

function FormApp() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // smooth scroll
    });
  };

  return (
    <Header>
      <button
        onClick={scrollToBottom}
        style={{ position: "sticky", top: "15vh" }}
      >
        Scroll to Bottom
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="form-container">
          <Form>
            <h1>Create New Patient</h1>
            <p>Fill out the patient information below</p>
          </Form>
        </div>
      </div>
    </Header>
  );
}

export default FormApp;
