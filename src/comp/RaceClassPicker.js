import React, { useState, useEffect } from "react";
import StatSetter from "./StatSetter";
import ApiButton from "./ApiButton";

const CharacterCreatorForm = () => {
  const [hasSubmit, setHasSubmit] = useState(false);
  const [hasRolls, setHasRolls] = useState(false);
  const [rolls, setRolls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    level: 0,
    class: "",
    backstory: "",
    hp: "",
    spells: {},
    items: "",
    story: {},
    location: {},
    equiped: {},
    party: {},
    status: "",
    age: "",
    languages: {},
    str: 0,
    wis: 0,
    con: 0,
    dex: 0,
    int: 0,
    chr: 0,
  });
  const [isValid, setIsValid] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const { race, class: charClass, name, backstory, age } = formData;
    const isEmpty = !race || !charClass || !name || !backstory || !age;

    setIsValid(!isEmpty);
  };
  const roll = () => {
    const newRolls = []; // Array to store new roll results

    for (let i = 0; i < 6; i++) {
      const dice = [];
      for (let j = 0; j < 4; j++) {
        dice.push(Math.floor(Math.random() * 6) + 1); // Generate random numbers between 1-6
      }

      const sortedDice = dice.sort((a, b) => a - b); // Sort dice in ascending order
      const droppedDice = sortedDice.slice(1); // Remove the lowest die
      const total = droppedDice.reduce((acc, curr) => acc + curr, 0); // Add remaining dice

      newRolls.push(total); // Add the current roll to the newRolls array
    }

    setRolls([...newRolls]); // Update state with new rolls
    setHasRolls(true);
    console.log(rolls);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const { race, class: charClass, name, backstory, age } = formData;
    const isEmpty = !race || !charClass || !name || !backstory || !age;

    if (!isEmpty) {
      // Store data in an object named data
      console.log("Character Data:", formData);
      localStorage.setItem("saveFile", JSON.stringify({ ...formData }));

      setHasSubmit(true);
      // You can use this data object for further processing (e.g., save to local storage)
    }
  };

  return (
    <>
      {hasSubmit ? (
        <ApiButton />
      ) : (
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
              className={`form-control ${!formData.race && "is-invalid"}`}
            />
            <div className="invalid-feedback">
              Please enter your character's race.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <input
              type="text"
              name="class"
              id="class"
              value={formData.class}
              onChange={handleChange}
              className={`form-control ${!formData.class && "is-invalid"}`}
            />
            <div className="invalid-feedback">
              Please enter your character's class.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${!formData.name && "is-invalid"}`}
            />
            <div className="invalid-feedback">
              Please enter your character's name.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="backstory">Backstory:</label>
            <textarea
              name="backstory"
              id="backstory"
              rows="5"
              value={formData.backstory}
              onChange={handleChange}
              className={`form-control ${!formData.backstory && "is-invalid"}`}
            ></textarea>
            <div className="invalid-feedback">
              Please enter your character's backstory.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className={`form-control ${!formData.age && "is-invalid"}`}
            />
            <div className="invalid-feedback">
              Please enter your character's age.
            </div>
          </div>

          <h5> Select your stat scores</h5>

          {hasRolls ? (
            rolls.map((item, index) => {
              return (
                <StatSetter
                  obj={formData}
                  onClick={setFormData}
                  title={index}
                  num={item}
                ></StatSetter>
              );
            })
          ) : (
            <>
              <button onClick={roll}> Roll Stats</button> <br /> <br />
            </>
          )}
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Create Character
          </button>
          {isValid && <p className="text-success">Character data is valid!</p>}

          {console.log(formData.wis)}
        </form>
      )}
    </>
  );
};

export default CharacterCreatorForm;
