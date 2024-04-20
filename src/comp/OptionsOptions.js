import React, { useState, useEffect } from "react";
import Title from "./title";
import OptionsButton from "./OptionsButton";

const OptionsOptions = ({
  player,
  retry,
  section,
  obj,
  keys,
  title,
  isRolled,
  isRolledSetter,
  text,
  setQuestDone,
}) => {
  console.log("OptionsOptions :", text);
  const [outcome, setOutcome] = useState("");
  const [newadventureData, setnewAdventureData] = useState({});
  const [newoptionkeys, setnewOptionKeys] = useState({});
  try {
    return (
      <>
        {isRolled ? (
          <>{outcome.type}</>
        ) : (
          <div class="row">
            {Object.keys(obj.options).map((item, index) => {
              const optionObj = obj.options[item];
              console.log(optionObj);
              let skill = optionObj.skill || optionObj.dungeonsAndDragonsSkill;
              if (skill == null) {
                skill = "Stealth";
              }
              return (
                <OptionsButton
                  setQuestDone={setQuestDone}
                  outcome={outcome}
                  setOutcome={setOutcome}
                  isRolledSetter={isRolledSetter}
                  isRolled={isRolled}
                  player={player}
                  section={section}
                  reward={optionObj.reward}
                  optionNum={index}
                  skill={optionObj.skill}
                  pass={optionObj.pass}
                  action={optionObj.action}
                  text={optionObj.description || optionObj.text}
                  title={title}
                  description={text}
                ></OptionsButton>
              );
            })}
            <br />
          </div>
        )}
      </>
    );
  } catch {
    console.log("Retry  at OptionsOptions");
    retry();
  }
};

export default OptionsOptions;
