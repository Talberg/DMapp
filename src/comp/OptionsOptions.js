import React, { useState, useEffect } from 'react';
import Title from './title';
import OptionsButton from './OptionsButton';

const OptionsOptions = ( {obj,keys, title} ) => {
  
  const [newadventureData, setnewAdventureData] = useState({});
  const [newoptionkeys, setnewOptionKeys] = useState({});

  // useEffect(()=>{
  //   if(obj.options){
  //     const newObj = obj.options
  //     setnewAdventureData(newObj)
  //     const newKeys =Object.keys(newadventureData)
  //     setnewOptionKeys(newKeys)
  //     console.log(newadventureData , newoptionkeys)
  //    }
  // })

     
 




  return (
    <div>
      

{Object.keys(obj.options).map((item,index)=>{
      const optionObj = obj.options[item]
      console.log(optionObj)
     return <OptionsButton reward={optionObj.reward} optionNum={index} skill={optionObj.skill} pass={optionObj.pass} action={optionObj.action} text={optionObj.description ||optionObj.text} ></OptionsButton>
    })}
    <br/>   
    </div>
  );
};

export default OptionsOptions;
