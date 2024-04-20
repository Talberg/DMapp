import React, { useState, useEffect } from "react";
import CharacterCreatorForm from "./RaceClassPicker";
import ApiButton from "./ApiButton";

const StartButton = (book, setBook) => {
  function hasSaveFileChecker() {
    console.log("saveFile: ", localStorage.getItem("saveFile") !== null);
    if (localStorage.getItem("saveFile") !== null) {
      setHasSaveFile(true);
      setIsSaveFileLoaded(true);
    }
  }

  const [isNew, setIsNew] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [hasSaveFile, setHasSaveFile] = useState(false);
  const [isSaveFileLoaded, setIsSaveFileLoaded] = useState(false); // Track if save is loaded

  const handleStartClick = () => {
    // console.log(hasSaveFile);
    if (hasSaveFile) {
      setHasSaveFile(true);
    } else {
      //Starting data for Character.
      const data = {
        name: "dsadsadas",
        race: {},
        level: 0,
        class: {},
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
      };
    }
    setIsStarted(true);
    setIsNew(true);
  };

  const handleLoadSaveClick = () => {
    const savedData = localStorage.getItem("saveFile");
    // Parse saved data from JSON
    const parsedData = JSON.parse(savedData);
    // Use parsedData to load the game state
    setIsSaveFileLoaded(true);
  };

  const handleCreateSave = (gameData) => {
    localStorage.setItem("saveFile", JSON.stringify(gameData));
    setHasSaveFile(true);
  };

  useEffect(() => {
    hasSaveFileChecker();
  });

  const handleLoadClick = () => {
    setIsStarted(true);
  };

  const handleClearClick = () => {
    localStorage.removeItem("saveFile");
    window.location.reload();
  };

  return (
    <div className="row ">
      {isStarted ? (
        <>
          {isNew ? (
            <CharacterCreatorForm></CharacterCreatorForm>
          ) : (
            <ApiButton></ApiButton>
          )}
        </>
      ) : (
        <>
          {
            <>
              {hasSaveFile ? (
                <>
                  {" "}
                  <button className="btn btn-info" onClick={handleLoadClick}>
                    Load Game
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={handleClearClick}
                  >
                    Clear Save
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    className="btn btn-success"
                    onClick={handleStartClick}
                  >
                    Start New Game
                  </button>
                </>
              )}
            </>
          }
        </>
      )}
    </div>
  );
};

export default StartButton;
