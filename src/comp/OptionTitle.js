import React from "react";
import OptionsDM from "./OptionsDM";

const OptionTitle = ({ setQuestDone, section, obj, title }) => {
  console.log("OptionTitle :", section);
  console.log(" setQuestDone options title: ", setQuestDone);
  let name = obj[title].name || obj[title].title;
  let other = obj[title].description || obj[title].destination;
  const json = "Reply in pure json format. ";
  const dm =
    "You are the dungeon master, please form your answer to the following question with these details: ";
  const dmNotes =
    "Provide a DM notes section at the end of the reponse this will the following current location, at least 2 Quests named quests, at least 2 items named items, atleast 2 people named people, atleast 2 events named events from the response, at least 2 travel options named travel.";
  let promt =
    json +
    dm +
    " The character has chosen a " +
    title +
    " to enteract with. The name of the " +
    title +
    " is " +
    name +
    " with the description of " +
    other +
    ". Please give the character 4 options for interacting with the" +
    title;

  // console.log("Promt = ",promt)

  let bookObj = JSON.parse(localStorage.getItem("Book"));
  // const newBook = {
  //   ...bookObj,
  //   pages: [
  //     ...bookObj.pages,
  //     {
  //       pageNum: bookObj.numPages,
  //       quests: [
  //         ...quests,
  //         {
  //           title: { name },
  //           other: { other },
  //         },
  //       ],
  //     },
  //   ],
  // };
  // localStorage.setItem("Book", JSON.stringify(newBook));

  return (
    <>
      <br></br>
      <div className="card">
        <div className="card-body">
          <br />
          <h5 className="card-title">
            <u>{name}</u> : {other}{" "}
          </h5>
          <br />
          <OptionsDM
            setQuestDone={setQuestDone}
            section={section}
            prompt={promt}
            title={name}
          ></OptionsDM>
          <br />
        </div>
      </div>
    </>
  );
};

export default OptionTitle;
