import { GoogleGenerativeAI } from "@google/generative-ai";
import { process_params } from "express/lib/router";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import ButtonList from "./OptionsDisplay";

function MyComponent() {
  const [errorMessage, setErrorMessage] = useState("");
  const [questDone, setQuestDone] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [error, setError] = useState(false);
  const [apiButtonIsLoading, setApiButtonIsLoading] = useState(false);
  const [adventure, setAdventure] = useState([]);
  const [adventureData, setAdventureData] = useState({});
  const [adventureKey, setAdventureKeys] = useState([]);
  const [hasBook, setHasBook] = useState(false);
  const [adventureStarted, setAdventureStarted] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [inputText, setInputText] = useState("");
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const savedData = localStorage.getItem("saveFile");
  let book = localStorage.getItem("Book");
  function hasSaveFileChecker() {
    console.log("Book: ", localStorage.getItem("Book") !== null);
    if (localStorage.getItem("Book") !== null) {
      setHasBook(true);
    }
  }

  // setBook(localStorage.getItem("Book"));
  // Parse saved data from JSON
  const parsedData = JSON.parse(savedData);
  // Use parsedData to load the game state

  useEffect(() => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    hasSaveFileChecker();

    // Access your API key as an environment variable (see "Set up your API key" above)
  });
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  // console.log(parsedData);
  let text;
  async function run(model) {
    setError(false);
    setApiButtonIsLoading(true);
    const json = "Reply in pure json format. ";
    const dm =
      "You are the gamemaster please form your answer to the following question with these details ";
    const dmNotes =
      "Provide a DM notes section at the end of the reponse this will the following current location, at least 2 Quests named quests, at least 2 items named items, atleast 2 people named people, atleast 2 events named events from the response, at least 2 travel options named travel.";
    const startPromt = `The Character is loacated in a tavern  please  welcome them. Explain the 1 Avalible quests`;
    const joshPrompt =
      "The Charater has heard about a boxing match, He was told there will be a cheater but doesnt know who. please act like in welcoming them.Explain the 4 quests, 3 events,3 people, and 3 travel options, no prices ";
    const prompt = json + dm + startPromt + inputText;
    console.log(prompt);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      // console.log(response);
      let adventureObj;

      try {
        adventureObj = JSON.parse(
          response.text().split("json")[1].split("`")[0]
        );
        setAdventureData(
          JSON.parse(response.text().split("json")[1].split("`")[0])
        );
      } catch {
        setErrorMessage("Retry on split");
        setError(true);
      }

      var div = document.getElementById("response");
      try {
        // console.log(adventureObj);
        div.innerHTML =
          adventureObj.greeting ||
          adventureObj.welcome ||
          adventureObj.welcome_message ||
          adventureObj.welcomeMessage ||
          adventureObj.dialogue ||
          adventureObj.innkeeper_greeting ||
          adventureObj.innkeeper.greeting ||
          adventureObj.innkeeper ||
          adventureObj.character_greeting ||
          adventureObj.message;
      } catch {
        setErrorMessage("Retry at getting greeting");
        setError(true);
      }
      //get the keys
      let keyArray = [];
      try {
        const keys = Object.keys(adventureObj);
        keys.forEach(function eachKey(key) {
          // console.log(key, " : ",adventureObj[key])

          try {
            if (
              adventureObj[key][0].description ||
              adventureObj[key][0].title ||
              adventureObj[key][0].destination ||
              adventureObj[key][0].innkeeper.welcome
            ) {
              // console.log("Has children :", key)
              keyArray.push(key);
            }
          } catch {
            setErrorMessage("Retry on getting keys");
            setError(true);
          }
        });
      } catch {
        setErrorMessage("Retry at keys.keys");
        setError(true);
      }
      //build book object
      let bookObj = {
        numPages: 1,
        pages: {
          1: {
            quests: {},
          },
        },
      };
      // book = localStorage.setItem("Book", JSON.stringify(bookObj));
      setAdventureStarted(true);
      setAdventureKeys(keyArray);
      setApiButtonIsLoading(false);
    } catch {}
  }

  return (
    <div className="">
      <h1>Adventure</h1>
      {error ? (
        <button
          onClick={() => {
            run(model);
          }}
        >
          Retry the
        </button>
      ) : (
        <></>
      )}
      <div className="">
        <h3>
          <div id="response"></div>
        </h3>

        <br />
        {questDone ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              setNextPage(true);
              setQuestDone(false);
            }}
          >
            nextPage
          </button>
        ) : (
          <></>
        )}

        <br />
      </div>
      {apiButtonIsLoading ? (
        <>
          <div class="loading-icon"></div>
        </>
      ) : (
        <div>
          {adventureStarted ? (
            // this is where we will put page 2 - rest of the adventure.
            <>
              {nextPage ? (
                <div> new page </div>
              ) : (
                <>
                  <ButtonList
                    setQuestDone={setQuestDone}
                    obj={adventureData}
                    keys={adventureKey}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {hasBook ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      run(model);
                    }}
                  >
                    Start Adventure
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    run(model);
                  }}
                >
                  Start Adventure
                </button>
              )}
            </>
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default MyComponent;
