import { GoogleGenerativeAI } from "@google/generative-ai";
import { process_params } from "express/lib/router";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import React, { useState, useEffect } from 'react';
import Nav from "./Nav"
function MyComponent({prompt,title}) {


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
          //need to add the characters details from local storage
          const json = "Reply in pure json format. "

      const dm = "You are the dungeon master for this character please form your answer to the following question with these details : "
      const dmNotes = "Provide a DM notes section at the end of the reponse this will include the following info  location, Quests, items, people, events from the response, at least 2 travel options."
      const startPromt ="The Character is in a tavern please act like a tavern keeper in welcoming them"
      
  
    const result = await model.generateContent(json+dm+prompt+savedData);
    const response = await result.response;
    let adventureObj= JSON.parse(response.text().split("json")[1].split("`")[0])
     text =marked.parse(response.text());
          // console.log(adventureObj);
          var div = document.getElementById(title)
          div.innerHTML = text
  }
  
  
  return (
    <div className="">
      
    <div id={title}>{text}</div>
    <br/>
    <button onClick={()=>{run(model)}}>
      {title}
      </button>
    </div>
  );
}

export default MyComponent