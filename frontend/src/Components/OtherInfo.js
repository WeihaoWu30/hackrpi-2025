import React, { useState } from "react";

const OtherInfo = () => {
  const [medications, setMedications] = useState([""]);
  const [allergies, setAllergies] = useState([""]);
  const [labs, setLabs] = useState([""]);

  const handleChange = (values, setter, index, value) => {
    const updated = [...values];
    updated[index] = value;
    setter(updated);
  };

  const addField = (setter) => setter((prev) => [...prev, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ medications, allergies, labs });
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
      <h1>Other Patient Information</h1>
      <p>Record medications, allergies, and labs</p>

      {renderFields("Medications", medications, setMedications)}

      <div className="allergies-section">
        {renderFields("Allergies", allergies, setAllergies)}
      </div>

      <div className="labs-section">
        {renderFields("Labs", labs, setLabs)}
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default OtherInfo;
