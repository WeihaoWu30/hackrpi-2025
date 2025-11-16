import { useState } from "react";

function Form({ children }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    sex: "",
    insurance: {
      provider: "",
      policyNumber: "",
      coverage: "",
    },
    relationship: {
      name: "",
      relationship: "",
      phone: "",
    },
    billing: {
      balance: "",
      lastPayment: "",
    },
    vitals: [
      { type: "Temperature", value: "", icon: "fas fa-thermometer-half" },
      { type: "Breath Rate", value: "", icon: "fas fa-lungs" },
      { type: "Respiratory Rate", value: "", icon: "fas fa-wind" },
      { type: "Blood Pressure", value: "", icon: "fas fa-heartbeat" },
    ],
  });

  const [medications, setMedications] = useState([""]);
  const [allergies, setAllergies] = useState([""]);
  const [labs, setLabs] = useState([[],[],[],[]]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVitalChange = (index, value) => {
    setFormData((prevData) => {
      const updatedVitals = [...prevData.vitals];
      updatedVitals[index].value = value;
      return {
        ...prevData,
        vitals: updatedVitals,
      };
    });
  };

  const handleNestedChange = (section, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const handleMoreChange = (values, setter, index, value) => {
    const updated = [...values];
    updated[index] = value;
    setter(updated);
  };

  const addField = (setter, count = 1) => {
    setter((prev) => [...prev, ...Array(count).fill("")]);
  };

  const handleSubmit = async (event) => {
    const fullData = {
      ...formData,
      medications,
      allergies,
    };
    event.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND + "/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // clear form
      setFormData({
        patientName: "",
        patientId: "",
        age: "",
        phone: "",
        email: "",
        address: "",
        sex: "",
        insurance: { provider: "", policyNumber: "", coverage: "" },
        relationship: { name: "", relationship: "", phone: "" },
        billing: { balance: "", lastPayment: "" },
        vitals: [
          { type: "Temperature", value: "", icon: "fas fa-thermometer-half" },
          { type: "Breath Rate", value: "", icon: "fas fa-lungs" },
          { type: "Respiratory Rate", value: "", icon: "fas fa-wind" },
          { type: "Blood Pressure", value: "", icon: "fas fa-heartbeat" },
        ],
      });
      setMedications([""]);
      setAllergies([""]);
    } catch (error) {
      console.log("Error posting data");
    }
    console.log("Submitted data:", fullData);

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
          onChange={(e) => handleMoreChange(values, setter, i, e.target.value)}
        />
      ))}
      <button type="button" onClick={() => addField(setter)}>
        + Add {label}
      </button>
    </div>
  );

  const placeholderText = ["Date", "Test", "Result", "Reference Range"];
  const submitLabs = (data) => {
    data.forEach(element => {
      labs.push({
        date:"",
        test:"",
        result:"",
        referenceRange:""
      })
    });
  };

  const renderLab = (label, values, setter) => (
    <div>
      <label>{label}</label>
      {values.map((val, i) => (
        <input
          key={i}
          type="text"
          value={val}
          onChange={(e) => handleMoreChange(values, setter, i, e.target.value)}
          placeholder={placeholderText[i % 4]}
        />
      ))}
      <button type="button" onClick={() => submitLabs(values)}>
        + Submit {label}
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
        Patient Sex:
        <input
          type="text"
          name="sex"
          value={formData.sex}
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

      <h1>Vitals</h1>
      <p>Basic patient information</p>

      {formData.vitals.map((vital, index) => (
        <label key={index}>
          {vital.type}:
          <input
            type="number"
            value={vital.value}
            onChange={(e) => handleVitalChange(index, e.target.value)}
          />
        </label>
      ))}

      <h1>Other Patient Information</h1>
      <p>Record medications, allergies, and labs</p>

      {renderFields("Medications", medications, setMedications)}

      <div className="allergies-section">
        {renderFields("Allergies", allergies, setAllergies)}
      </div>

      <div className="labs-section">{renderLab("Labs", labs, setLabs)}</div>

      <h1>Miscellaneous Patient Information</h1>
      <p>record insurance, emergency info, and billing information</p>

      <label>
        Insurance:
        <input
          type="text"
          name="provider"
          value={formData.insurance.provider}
          onChange={(e) => handleNestedChange("insurance", e)}
          placeholder="Provider"
        />
        <input
          type="text"
          name="policyNumber"
          value={formData.insurance.policyNumber}
          onChange={(e) => handleNestedChange("insurance", e)}
          placeholder="Policy Number"
        />
        <input
          type="text"
          name="coverage"
          value={formData.insurance.coverage}
          onChange={(e) => handleNestedChange("insurance", e)}
          placeholder="Coverage"
        />
      </label>

      <label>
        Emergency Contact:
        <input
          type="text"
          name="name"
          value={formData.relationship.name}
          onChange={(e) => handleNestedChange("relationship", e)}
          placeholder="Name"
        />
        <input
          type="text"
          name="relationship"
          value={formData.relationship.relationship}
          onChange={(e) => handleNestedChange("relationship", e)}
          placeholder="Relationship"
        />
        <input
          type="text"
          name="phone"
          value={formData.relationship.phone}
          onChange={(e) => handleNestedChange("relationship", e)}
          placeholder="Phone"
        />
      </label>

      <label className="billing">
        Billing Information:
        <input
          type="number"
          name="balance"
          value={formData.billing.balance}
          onChange={(e) => handleNestedChange("billing", e)}
          placeholder="Balance"
        />
        <input
          type="date"
          name="lastPayment"
          value={formData.billing.lastPayment}
          onChange={(e) => handleNestedChange("billing", e)}
          placeholder="Last Payment"
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
