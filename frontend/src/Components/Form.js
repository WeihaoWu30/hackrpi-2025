import { useState } from 'react';

function Form(props) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default browser form submission
    console.log("Submitted name:", name);
    // Perform actions with the submitted data
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {props.title}
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
