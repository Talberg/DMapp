import React, { useState } from 'react';

const CharacterCreatorForm = () => {
  const [formData, setFormData] = useState({
    name:"",
    race:"",
    level:0,
    class:"",
    backstory:"",
    hp:"",
    spells:{},
    items:"",
    story:{},
    location:{},
    equiped:{},
    party:{},
    status:"",
    age:"",
    languages:{},
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const { race, class: charClass, name, backstory, age } = formData;
    const isEmpty = !race || !charClass || !name || !backstory || !age;

    setIsValid(!isEmpty)
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
   
    const { race, class: charClass, name, backstory, age } = formData;
    const isEmpty = !race || !charClass || !name || !backstory || !age;

    
    

    if (!isEmpty) {
      // Store data in an object named data
      console.log('Character Data:', formData);
      localStorage.setItem('saveFile', JSON.stringify({...formData}));
      window.location.replace("/ci")
      // You can use this data object for further processing (e.g., save to local storage)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your D&D Character</h2>
      <div className="form-group">
        <label htmlFor="race">Race:</label>
        <input
          type="text"
          name="race"
          id="race"
          value={formData.race}
          onChange={handleChange}
          className={`form-control ${!formData.race && 'is-invalid'}`}
        />
        <div className="invalid-feedback">Please enter your character's race.</div>
      </div>
      <div className="form-group">
        <label htmlFor="class">Class:</label>
        <input
          type="text"
          name="class"
          id="class"
          value={formData.class}
          onChange={handleChange}
          className={`form-control ${!formData.class && 'is-invalid'}`}
        />
        <div className="invalid-feedback">Please enter your character's class.</div>
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${!formData.name && 'is-invalid'}`}
        />
        <div className="invalid-feedback">Please enter your character's name.</div>
      </div>
      <div className="form-group">
        <label htmlFor="backstory">Backstory:</label>
        <textarea
          name="backstory"
          id="backstory"
          rows="5"
          value={formData.backstory}
          onChange={handleChange}
          className={`form-control ${!formData.backstory && 'is-invalid'}`}
        ></textarea>
        <div className="invalid-feedback">Please enter your character's backstory.</div>
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className={`form-control ${!formData.age && 'is-invalid'}`}
        />
        <div className="invalid-feedback">Please enter your character's age.</div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Create Character
      </button>
      {isValid && <p className="text-success">Character data is valid!</p>}
    </form>
  );
};

export default CharacterCreatorForm;
