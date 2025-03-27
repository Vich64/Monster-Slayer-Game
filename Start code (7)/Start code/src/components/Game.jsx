import React, { useState } from "react";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random value in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: `${isPlayer ? "Player" : "Monster"} takes ${damage} damage`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: `Player heals ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [battleLog, setBattleLog] = useState([]);

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  const attackHandler = () => {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(prev - playerDamage, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));

    setBattleLog((prev) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
  };

  const healHandler = () => {
    const healValue = getRandomValue(8, 20);
    setPlayerHealth((prev) => Math.min(prev + healValue, 100));

    setBattleLog((prev) => [createLogHeal(healValue), ...prev]);
  };

  const resetHandler = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setBattleLog([]);
  };

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  const renderBattleLog = () => {
    return battleLog.map((log, index) => (
      <li
        key={index}
        style={{ color: log.isPlayer ? (log.isDamage ? "red" : "green") : "blue" }}
      >
        {log.text}
      </li>
    ));
  };

  // ----------------------------------------------------------------------------------------------------------
  // MAIN TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div className="game">
      <h1>Monster Slayer</h1>
      <div className="health-bars">
        <div>
          <h2>Player Health</h2>
          <progress value={playerHealth} max="100"></progress>
          <p>{playerHealth} / 100</p>
        </div>
        <div>
          <h2>Monster Health</h2>
          <progress value={monsterHealth} max="100"></progress>
          <p>{monsterHealth} / 100</p>
        </div>
      </div>
      <div className="controls">
        <button onClick={attackHandler} disabled={playerHealth === 0 || monsterHealth === 0}>
          Attack
        </button>
        <button onClick={healHandler} disabled={playerHealth === 0 || monsterHealth === 0}>
          Heal
        </button>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <div className="battle-log">
        <h2>Battle Log</h2>
        <ul>{renderBattleLog()}</ul>
      </div>
    </div>
  );
}

export default Game;
