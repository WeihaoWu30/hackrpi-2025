import Form from "./Components/Form.js";
import Card from "./Components/Card.js";

import "./App.css";

function App() {
  const patients = [
    { info: "aaaa", important: true },
    { info: "bbbbb", important: false },
  ];
  return (
    <div>
      <Card title="blood pressure" array={patients} />
      <Card title="allergies" array={patients} />
    </div>
  );
}

export default App;
