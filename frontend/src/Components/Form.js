import { useState } from "react";

function Form({ children }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    age: "",
    phone: "",
    email: "",
    address: " ",
  });

  const [medications, setMedications] = useState([""]);
  const [allergies, setAllergies] = useState([""]);
  const [labs, setLabs] = useState([""]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtherChange = (values, setter, index, value) => {
    const updated = [...values];
    updated[index] = value;
    setter(updated);
  };

  const addField = (setter) => setter((prev) => [...prev, ""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", formData);
    console.log({ medications, allergies, labs });

    // Send formData to backend or process it
  };

  const renderFields = (label, values, setter) => (
    <div>
      <label>{label}</label>
      {values.map((val, i) => (
        <input
          key={i}
          type="text"
          value={val}
          onChange={(e) => handleChange(values, setter, i, e.target.value)}
        />
      ))}
      <button type="button" onClick={() => addField(setter)}>
        + Add {label}
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {children}

      <label>
        Patient Name:
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
        />
      </label>

      <label>
        Patient ID:
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <h1>Other Patient Information</h1>
      <p>Record medications, allergies, and labs</p>

      {renderFields("Medications", medications, setMedications)}

      <div className="allergies-section">
        {renderFields("Allergies", allergies, setAllergies)}
      </div>

      <div className="labs-section">{renderFields("Labs", labs, setLabs)}</div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
