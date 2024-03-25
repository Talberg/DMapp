import React, { useState, useEffect } from 'react';
import Title from './title';

const OptionsButton = ( { reward,optionNum, skill,pass,action ,text} ) => {
  


     
 




  return (
    <div>
        <br/>
        <p> <b><u>Option</u> {optionNum + 1}</b></p>
        <p> {text}</p>
        {reward ? <p>Reward : {reward}</p>:<></>}
        <p>Skill : {skill}</p>
        <p>Pass : {pass}</p>

        <br></br>
        <button> {action}</button>
    <br/> 
___________________________________________________  
    </div>
  );
};

export default OptionsButton;
