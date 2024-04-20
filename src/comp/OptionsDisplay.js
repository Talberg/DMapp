import React from "react";
import Title from "./title";

const ButtonList = ({ setQuestDone, obj, keys }) => {
  console.log(" setQuestDone buttonlist: ", setQuestDone);

  return (
    <div>
      {keys.map((item, index) => (
        <Title setQuestDone={setQuestDone} obj={obj} title={item} />
      ))}
    </div>
  );
};

export default ButtonList;
