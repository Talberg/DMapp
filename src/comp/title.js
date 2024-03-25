import React from 'react';
import OptionTitle from './OptionTitle';

const title = ( {obj,title} ) => {
    
console.log("title : ",title)
// console.log("obj : ",obj)
let keys = Object.keys(obj[title])
let newData = obj[title]
// console.log("New DATA",newData)



  return (
    <div>
        <br/>
      <h2><u>{title.toUpperCase()}</u></h2>
      <br/>
      {keys.map((item, index) => (
      <OptionTitle section={title} obj = {newData} title={item}></OptionTitle>
    ))}       
    </div>
  );
};

export default title;
