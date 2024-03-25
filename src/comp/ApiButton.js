import { GoogleGenerativeAI } from "@google/generative-ai";
import { process_params } from "express/lib/router";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import React, { useState, useEffect } from 'react';
import Nav from "./Nav"
import ButtonList from "./OptionsDisplay";
function MyComponent() {

  const [adventure, setAdventure] = useState([]);
    const [adventureData, setAdventureData] = useState({});
    const [adventureKey, setAdventureKeys] = useState([]);
    const [adventureStarted, setAdventureStarted] = useState(false);

    const [inputText, setInputText] = useState('');
    const handleChange = (event) => {
      setInputText(event.target.value);};
   
      const savedData = localStorage.getItem('saveFile');
      // Parse saved data from JSON
      const parsedData = JSON.parse(savedData);
      // Use parsedData to load the game state
      
  useEffect(() => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable (see "Set up your API key" above)

    
  });
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});
  // console.log(parsedData);
    let text
    async function run(model) {
    const json = "Reply in pure json format. "
    const dm = "You are the dungeon master please form your answer to the following question with these details "
    const dmNotes = "Provide a DM notes section at the end of the reponse this will the following current location, at least 2 Quests named quests, at least 2 items named items, atleast 2 people named people, atleast 2 events named events from the response, at least 2 travel options named travel."
    const startPromt ="The Character is in a tavern please act like a tavern keeper in welcoming them. Explain the Avalible quests, events, people, and travel options, no prices"
    const prompt = json+dm+startPromt+inputText

  const result = await model.generateContent(prompt);
  const response = await result.response;
  // console.log(response);
  
  let adventureObj= JSON.parse(response.text().split("json")[1].split("`")[0])
  setAdventureData(adventureObj)
  // console.log("canidate: ",JSON.parse(response.text().split("json")[1].split("`")[0]));

   text =marked.parse(response.text());
        // console.log(marked.parse(text));
        var div = document.getElementById('response')
        div.innerHTML = adventureObj.greeting || adventureObj.welcome ||adventureObj.welcome_message || adventureObj.welcomeMessage
        
  //get the keys 
      const keys = Object.keys(adventureObj)
      let keyArray = []
      keys.forEach(function eachKey(key){
        // console.log(key, " : ",adventureObj[key])
        if(adventureObj[key][0].description ||adventureObj[key][0].title || adventureObj[key][0].destination){
          // console.log("Has children :", key)
          keyArray.push(key)
        }
      
      }
        
      )
      setAdventureStarted(true);
      setAdventureKeys(keyArray)
}
    
     
    
  return (
    <div className="">
    <h1>Adventure</h1>
    <div id="response">{text }</div>
    
    {adventureStarted ? 
    <ButtonList obj={adventureData} keys={adventureKey} />
    :<button onClick={()=>{run(model)}}>
      Start Adventure
      </button> }
      
    </div>
  );
}

export default MyComponent