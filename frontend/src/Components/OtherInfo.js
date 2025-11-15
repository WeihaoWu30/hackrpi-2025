import React, { useState } from "react";

const OtherInfo = () => {
  const [medications, setMedications] = useState([""]);
  const [allergies, setAllergies] = useState([""]);
  const [labs, setLabs] = useState([""]);

  const handleChange = (setter, index, value) => {
    const updated = [...setter];
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
          onChange={(e) => handleChange(setter, i, e.target.value)}
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
      {renderFields("Allergies", allergies, setAllergies)}
      {renderFields("Labs", labs, setLabs)}

      <button type="submit">Save</button>
    </form>
  );
};

export default OtherInfo;
