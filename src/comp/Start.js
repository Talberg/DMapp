import React, { useState , useEffect} from 'react';
import CharacterCreatorForm from './RaceClassPicker';

const StartButton = () => {

    function hasSaveFileChecker() {
        console.log(localStorage.getItem('saveFile') !== null)
        if(localStorage.getItem('saveFile') !== null){
            setHasSaveFile(true)
            setIsSaveFileLoaded(true)
        }
         }
      
  const [hasSaveFile, setHasSaveFile] = useState(false);
  const [isSaveFileLoaded, setIsSaveFileLoaded] = useState(false); // Track if save is loaded
 
  const handleStartClick = () => {
    console.log(hasSaveFile)
    if (hasSaveFile) {
        setHasSaveFile(true);
    } else {
        //Starting data for Character. 
        const data = {
            name:"dsadsadas",
            race:{},
            level:0,
            class:{},
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

        }
        handleCreateSave(data)
        window.location.replace("/cc")
    }
  };

  const handleLoadSaveClick = () => {
    const savedData = localStorage.getItem('saveFile');
    // Parse saved data from JSON
    const parsedData = JSON.parse(savedData);
    // Use parsedData to load the game state
    setIsSaveFileLoaded(true);
  };

  const handleCreateSave = (gameData) => {
    localStorage.setItem('saveFile', JSON.stringify(gameData));
    setHasSaveFile(true);
  };

  useEffect(() => {
    hasSaveFileChecker();
  });

  const handleLoadClick = ()=>{
    window.location.replace("/adventure")
  }

  return (
    <div>
      {hasSaveFile && !isSaveFileLoaded ? (
        <p>You have a saved game! Would you like to load it?</p>
      ) : (
        <p>{isSaveFileLoaded ? <button onClick={handleLoadClick} >Load Game</button> : <button onClick={handleStartClick}>Start Game</button>}</p>
      )}
      {setHasSaveFile ? "" :  <button onClick={handleStartClick}>Start Game</button>}
     
      {hasSaveFile && !isSaveFileLoaded && (
        <button onClick={handleLoadSaveClick}>Load Saved Game</button>
      )}

    </div>
  );
};

export default StartButton;
