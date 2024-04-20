import React from "react";
import OptionTitle from "./OptionTitle";

const title = ({ setQuestDone, obj, title }) => {
  // console.log("title : ", title);
  console.log(" setQuestDone title: ", setQuestDone);
  let keys = Object.keys(obj[title]);
  let newData = obj[title];
  // console.log("New DATA",newData)

  return (
    <div>
      <br />
      <h2>
        <u>{title.toUpperCase()}</u>
      </h2>
      <br />
      {keys.map((item, index) => (
        <OptionTitle
          setQuestDone={setQuestDone}
          section={title}
          obj={newData}
          title={item}
        ></OptionTitle>
      ))}
    </div>
  );
};

export default title;
