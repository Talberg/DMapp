import React, { useState, useEffect } from 'react';

const StatSetter = ( {onClick, title, obj, num ,} ) => {
  console.log(obj)
  const [stat, setStat] = useState(false);


     
 




  return (
    <div>
        {stat ? <></> : <>        <><h3>{num}</h3></>
       {obj.wis === 0 ? <button onClick={()=>{onClick({...obj,wis:num});setStat(true)}}>Wisdom </button>:<></>}
       {obj.str === 0 ? <button onClick={()=>{onClick({...obj,str:num});setStat(true)}}>Strength </button>:<></>}
       {obj.dex === 0 ? <button onClick={()=>{onClick({...obj,dex:num});setStat(true)}}>Dexterity </button>:<></>}
       {obj.con === 0 ? <button onClick={()=>{onClick({...obj,con:num});setStat(true)}}>Constitution </button>:<></>}
       {obj.int === 0 ? <button onClick={()=>{onClick({...obj,int:num});setStat(true)}}>Intelligence </button>:<></>}
       {obj.chr === 0 ? <button onClick={()=>{onClick({...obj,chr:num});setStat(true)}}>Charisma </button>:<></>}

        

    <br/> 
___________________________________________________  </> }
    </div>
  );
};

export default StatSetter;
