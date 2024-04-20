import React, { useState } from 'react';

function StatRoller() {
  const [roll, setRoll] = useState(0);

  const handleClick = () => {
    const dice = [];
    for (let i = 0; i < 4; i++) {
      dice.push(Math.floor(Math.random() * 6) + 1); // Generate random numbers between 1-6
    }

    const sortedDice = dice.sort((a, b) => a - b); // Sort dice in ascending order
    const droppedDice = sortedDice.slice(1); // Remove the lowest die
    const total = droppedDice.reduce((acc, curr) => acc + curr, 0); // Add remaining dice

    setRoll(total);
  };

  return (
    <div>
      <button onClick={handleClick}>Roll Dice (4d6 - Drop Lowest)</button>
      <p>Your roll: {roll}</p>
    </div>
  );
}

export default StatRoller;
