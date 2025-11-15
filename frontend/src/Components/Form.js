import { useState } from 'react';

function Form({ children }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    age: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
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

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;