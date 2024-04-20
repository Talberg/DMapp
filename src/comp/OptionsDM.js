import { GoogleGenerativeAI } from "@google/generative-ai";
import { process_params } from "express/lib/router";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import React, { setQuestDone, useState, useEffect } from "react";
import Nav from "./Nav";
import OptionsOptions from "./OptionsOptions";
function MyComponent({ setQuestDone, section, prompt, title }) {
  const [isRolled, isRolledSetter] = useState(false);
  const [optionsDMIsLoading, setOptionsDMIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [optionPicked, setOptionPicked] = useState("");
  const [adventureData, setAdventureData] = useState({});
  const [adventureKey, setAdventureKeys] = useState([]);
  const [adventureStarted, setAdventureStarted] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const savedData = localStorage.getItem("saveFile");
  // Parse saved data from JSON
  const parsedData = JSON.parse(savedData);
  // Use parsedData to load the game state

  useEffect(() => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
  });

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  // console.log(parsedData);
  let text;
  async function run(model) {
    setOptionsDMIsLoading(true);
    //need to add the characters details from local storage
    const json = "Reply in pure json format. ";

    const dm =
      "You are the dungeon master for this character please form your answer to the following question with these details : ";
    const dmNotes =
      "Provide a DM notes section at the end of the reponse this will include the following info  location, Quests , items, people, events from the response, at least 2 travel options.";
    const startPromt =
      "The Character is in a tavern please act like a tavern keeper in welcoming them.";
    const optionsStructure =
      "each option should have an action and a description";
    const pass = "each option should have a 'pass' value between 5 and 15.";
    const xp = "each option should have a 'xp' value between 10 and 50.";
    const skill =
      " each option should have a dungeons and dragons skill as key value pair .";
    const reward =
      " Must Include a 'reward' descriprion is the player is successfull this can be one of the following types as an object; information, an item with a discription and name, gold amount with a number";
    let finalPromt =
      json + dm + prompt + optionsStructure + skill + pass + savedData;

    const fail =
      "Must Include a 'fail' descriprion is the player is not successfull with one of the following types as an object; combat with a skill check number and amount of hp lost if failed, theft the player loses this amount of gold.  ";

    if (section.includes("quest")) {
      finalPromt =
        json +
        dm +
        prompt +
        optionsStructure +
        reward +
        fail +
        xp +
        skill +
        pass +
        savedData;
    }
    const result = await model.generateContent(finalPromt);
    const response = await result.response;
    // console.log(response.text);
    let adventureObj = "";

    try {
      setAdventureData(
        JSON.parse(response.text().split("json")[1].split("`")[0])
      );
      //TODO : Turn this into a functon that takes in an obj and returns the array of the keys
      const keys = Object.keys(adventureObj);
      let keyArray = [];
      keys.forEach(function eachKey(key) {
        // console.log(key, " : ", adventureObj[key]);
        if (
          adventureObj[key][0].description ||
          adventureObj[key][0].title ||
          adventureObj[key][0].destination
        ) {
          // console.log("Has children :", key);
          keyArray.push(key);
        }
      });
      setOptionPicked(true);
      setAdventureKeys(keyArray);

      text = marked.parse(response.text());
      setOptionsDMIsLoading(false);
      // console.log(adventureObj);

      //   var div = document.getElementById(title)
      //   div.innerHTML = text

      // Use the parts array here
    } catch (error) {
      console.error("retry", error.message);
      run(model);
      // Handle the error (provide a default value, log the error, etc.)
    }
  }

  return (
    <div className="">
      <div id={title}>{text}</div>
      <br />
      {optionsDMIsLoading ? (
        <>
          loading <div class="loading-icon"></div>
        </>
      ) : (
        <div>
          {optionPicked ? (
            <OptionsOptions
              setQuestDone={setQuestDone}
              retry={() => {
                run(model);
              }}
              isRolledSetter={(boo) => {
                isRolledSetter(boo);
              }}
              isRolled={isRolled}
              player={parsedData}
              section={section}
              title={title}
              obj={adventureData}
              keys={adventureKey}
              text={text}
            />
          ) : (
            <button
              onClick={() => {
                run(model);
              }}
            >
              {title}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MyComponent;
