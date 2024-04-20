import React, { useState, useEffect } from "react";
import Title from "./title";
import title from "./title";

const SkillChecker = ({
  isRolled,
  isRolledSetter,
  skill,
  player,
  pass,
  reward,
  setOutcome,
  title,
  text,
  setQuestDone,
}) => {
  console.log(" setQuestDone: ", setQuestDone);
  let bookObj = JSON.parse(localStorage.getItem("Book"));
  console.log("Book :", bookObj);
  const saveBook = (data) => {
    localStorage.setItem("Book", JSON.stringify(data));
  };
  const skills = [
    { name: "acrobatics", ability: "dex" },
    { name: "dexterity", ability: "dex" },
    { name: "wisdom", ability: "wis" },
    { name: "animal handling", ability: "wis" },
    { name: "intelligence", ability: "int" },
    { name: "arcana", ability: "int" },
    { name: "athletics", ability: "str" },
    { name: "deception", ability: "chr" },
    { name: "charisma", ability: "chr" },
    { name: "history", ability: "int" },
    { name: "insight", ability: "wis" },
    { name: "intimidation", ability: "chr" },
    { name: "investigation", ability: "int" },
    { name: "medicine", ability: "wis" },
    { name: "nature", ability: "int" },
    { name: "perception", ability: "wis" },
    { name: "performance", ability: "chr" },
    { name: "persuasion", ability: "chr" },
    { name: "religion", ability: "int" },
    { name: "sleight of hand", ability: "dex" },
    { name: "stealth", ability: "dex" },
    { name: "survival", ability: "wis" },
    { name: "diplomacy", ability: "wis" },
    { name: "combat", ability: "str" },
    { name: "strength", ability: "str" },
    { name: "atack", ability: "str" },
  ];
  const [modifierSet, setModifierSet] = useState(false);
  const [modifier, setModifier] = useState(
    skills.forEach((item) => {
      if (skill.toLowerCase() == item.name) {
        const number = item.ability;

        return player[number];
      }
    })
  );

  const [skillScore, setSkill] = useState(0);
  useState();

  function rollD20(advantage, disadvantage) {
    if (advantage && disadvantage) {
      throw new Error("Cannot roll with both advantage and disadvantage");
    }

    const rolls = [];
    if (disadvantage == true || advantage == true) {
      for (let i = 0; i < 2; i++) {
        rolls.push(Math.floor(Math.random() * 20) + 1);
      }
    } else {
      for (let i = 0; i < 1; i++) {
        rolls.push(Math.floor(Math.random() * 20) + 1);
      }
    }

    const result = advantage
      ? Math.max(...rolls)
      : disadvantage
      ? Math.min(...rolls)
      : rolls[0];
    return { value: result, rolls };
  }
  function dndModifier(pass, advantage, disadvantage) {
    isRolledSetter(true);
    skills.forEach((item) => {
      if (skill.toLowerCase() == item.name) {
        // console.log(item.name, item.ability, player[item.ability]);
        setSkill(player[item.ability]);
        const localSkillNum = player[item.ability];
        // console.log("localSkillNum :", localSkillNum);
        const modifiers = Math.floor((localSkillNum - 10) / 2);
        // console.log("modifier :", modifiers);
        setModifier(modifiers);
        const roll1 = rollD20();

        if (roll1.value + modifiers >= 0) {
          console.log("pass", roll1.value + modifiers, modifiers);
          console.log("reward", reward);
          console.log("Title : ", title);
          let flatTitle = title.split(" ").join("_");

          // 1. build obj
          let newQuestObj;
          if (bookObj === null) {
            newQuestObj = {
              numPages: 1,
              pages: {
                [1]: {
                  quests: [
                    {
                      flatTitle: flatTitle,
                      title: title,
                      description: text,
                      outcome: "pass",
                      reward: { reward },
                    },
                  ],
                },
              },
            };
          } else {
            newQuestObj = {
              numPages: bookObj.numPages,
              pages: {
                ...bookObj.pages,
                [bookObj.numPages]: {
                  quests: [
                    ...bookObj.pages[bookObj.numPages].quests,
                    {
                      flatTitle: flatTitle,
                      title: title,
                      description: text,
                      outcome: "pass",
                      reward: { reward },
                    },
                  ],
                },
              },
            };
          }

          // 2. save
          localStorage.setItem("Book", JSON.stringify(newQuestObj));
          setOutcome(reward);
          setQuestDone(true);
        } else {
          console.log("fail", modifiers);
          setOutcome("fail");
          //save;
        }
        const roll2 = rollD20(advantage, disadvantage);
        // console.log("Mod : ", modifiers);
        // console.log("Roll : ", roll1.value);
        // console.log("Roll + Moddy : ", roll1.value + modifiers);
      }
    });
  }

  let showMod;

  function skillCheck(pass, advantage, disadvantage) {
    const roll1 = rollD20();

    if (roll1.value + dndModifier() > pass) {
      console.log("pass", dndModifier());
    }
    if (roll1.value + dndModifier() < pass) {
      console.log("fail", dndModifier());
    }
    const roll2 = rollD20(advantage, disadvantage);
    console.log("Mod : ", dndModifier());
    console.log("Roll : ", roll1.value);
    console.log("Roll + Moddy : ", roll1.value + dndModifier());

    // console.log(skill);
  }

  return (
    <div>
      {/* If any roll is clicked set the  */}
      {isRolled ? (
        <></>
      ) : (
        <button
          onClick={() => {
            dndModifier(pass);
          }}
          class="btn btn-primary"
        >
          {skill}
          {modifier}
        </button>
      )}
      {/* {modifierSet ? (
        <button
          onClick={() => {
            dndModifier(pass);
          }}
          class="btn btn-primary"
        >
          {skill}
          {modifier}
        </button>
      ) : (
        <button
          onClick={() => {
            dndModifier(pass);
          }}
          class="btn btn-primary"
        >
          {skill}
        </button>
      )} */}
    </div>
  );
};

export default SkillChecker;
