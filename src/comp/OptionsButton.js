import React, { useState, useEffect } from "react";
import Title from "./title";
import SkillChecker from "./Skillcheck";

const OptionsButton = ({
  player,
  section,
  reward,
  optionNum,
  skill,
  pass,
  action,
  text,
  isRolledSetter,
  isRolled,
  outcome,
  setOutcome,
  title,
  description,
  setQuestDone,
}) => {
  console.log(" text", text);
  console.log("reward : ", reward);

  if (section.includes("quest")) {
    return (
      <div class=" col-sm-6  ">
        {isRolled ? (
          <>{outcome}</>
        ) : (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <u>Option{optionNum + 1}</u>{" "}
              </h5>
              <p class="card-text">
                <br></br>
                {text}
                <br></br>
                {action}
                <br></br>
                <b> {skill}</b>
                <br></br>
                {/* {reward.success ? (
                <p>
                  <u>Success </u>: {reward.success}
                </p>
              ) : (
                <>{reward}</>
              )} */}
                <>reward: {reward.type}</>
                <>:{reward.amount}</>
                <>
                  <br />
                  {reward.item}
                  <br />
                  {reward.name}
                  <br />
                  {reward.description}
                  <br />
                  {reward.value}
                </>
                <>{reward.skill}</>
              </p>

              <SkillChecker
                setQuestDone={setQuestDone}
                isRolledSetter={isRolledSetter}
                isRolled={isRolled}
                reward={reward}
                skill={skill}
                pass={pass}
                player={player}
                setOutcome={setOutcome}
                title={title}
                text={text}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // if (section.includes("travel")) {
  //   return (
  //     <div>
  //       <br />
  //       <p>
  //         <b>
  //           <u>Option</u> {optionNum + 1}
  //         </b>
  //       </p>
  //       <p> {text}</p>
  //       <br></br>
  //       <SkillChecker
  //         isRolledSetter={isRolledSetter}
  //         isRolled={isRolled}
  //         reward={reward}
  //         skill={skill}
  //         pass={pass}
  //         player={player}
  //         setOutcome={setOutcome}
  //       />
  //       <br />
  //       ___________________________________________________
  //     </div>
  //   );
  // }
  // if (section.includes("event")) {
  //   return (
  //     <div class="col-2 col-sm-6">
  //       <div class="card">
  //         <div class="card-body">
  //           <h5 class="card-title">
  //             <u>Option{optionNum + 1}</u>{" "}
  //           </h5>
  //           <p class="card-text">
  //             {text}
  //             <br></br>
  //             <u>{skill}</u>
  //           </p>

  //           <SkillChecker
  //             isRolledSetter={isRolledSetter}
  //             isRolled={isRolled}
  //             reward={reward}
  //             skill={skill}
  //             pass={pass}
  //             player={player}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // if (section.includes("people")) {
  //   return (
  //     <div class="col-sm-6">
  //       <div class="card">
  //         <div class="card-body">
  //           <h5 class="card-title">
  //             <u>Option{optionNum + 1}</u>{" "}
  //           </h5>
  //           <p class="card-text">
  //             {text}
  //             <br></br>
  //             <u>{skill}</u>
  //           </p>

  //           <SkillChecker
  //             isRolledSetter={isRolledSetter}
  //             isRolled={isRolled}
  //             reward={reward}
  //             skill={skill}
  //             pass={pass}
  //             player={player}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default OptionsButton;
