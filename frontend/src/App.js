import Form from "./Components/Form.js";
import Card from "./Components/Card.js";
import PatientCard from "./Components/Profile.js";
import Speech from "./Components/Speech.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/components.css";

import "./App.css";

function App() {
  const patients = [
    {
      name: "John Doe",
      id: "12345",
      sex: "Male",
      age: 45,
      phone: "555-123-4567",
      email: "johndoe@gmail.com",
      address: "123 Main St, Springfield, IL",
      photo: "https://example.com/photos/johndoe.jpg",
      vitals: [
        { type: "blood pressure", value: "120/80 mmHg" },
        { type: "heart rate", value: "72 bpm" },
        { type: "temperature", value: "98.6 °F" },
        { type: "respiratory rate", value: "16 breaths/min" },
      ],
      medication: [ 
        { name: "Aspirin", dosage: "81 mg", frequency: "Once daily" },
        { name: "Lisinopril", dosage: "10 mg", frequency: "Once daily" },
      ],
      allergies: ["Penicillin", "Peanuts"],
      labs: [
        { test: "CBC", date: "2023-01-15", result: "Normal" },
        { test: "Lipid Panel", date: "2023-02-20", result: "Elevated LDL" },
      ],
    },
  ];

  const patientInfo = patients.map((patient, index) => (
    <Card key={index} array={patient.vitals}/>
  ));
  return (
    <main className="container">
      <PatientCard patient={patients[0]} />
      {patientInfo}
      <Speech/>
    </main>
  );
}

export default App;
