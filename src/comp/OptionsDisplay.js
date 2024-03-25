import React from 'react';
import Title from './title';

const ButtonList = ( {obj,keys} ) => {
    // console.log(obj, keys)



  return (
    <div>
     {keys.map((item, index) => (
      <Title obj={obj} title={item} />
    ))}
    
    </div>
  );
};

export default ButtonList;
