import { useState } from "react";

function Form({ children }) {
  const [formData, setFormData] = useState({
    pressure: "",
    heartrate: "",
    temp: "",
    resprate: "",
  });

  const [allergies, setAllergies] = useState([]);
  const [medication, setMedication] = useState([]);
  const [labs, setLabs] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", formData);
    // Send formData to backend or process it
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
