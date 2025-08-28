import React from 'react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import StatusBar from './components/StatusBar';
import HorrorScene from './components/HorrorScene';

export default function App() {
  const [rollsLeft, setRollsLeft] = React.useState(3);
  const [dice, setDice] = React.useState([1, 1, 1, 1, 1]);
  const [held, setHeld] = React.useState([false, false, false, false, false]);
  const [rolling, setRolling] = React.useState(false);
  const [message, setMessage] = React.useState('Welcome to Yahtzee (Night Shift)');

  const resetRound = React.useCallback(() => {
    setRollsLeft(3);
    setHeld([false, false, false, false, false]);
    setDice([1, 1, 1, 1, 1]);
    setMessage('New round. Roll when ready.');
  }, []);

  const toggleHold = React.useCallback((index) => {
    setHeld((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const rollDice = React.useCallback(async () => {
    if (rolling || rollsLeft <= 0) return;
    setRolling(true);
    setMessage('The hands reach for the dice...');

    // Animate duration simulation
    await new Promise((res) => setTimeout(res, 750));

    setDice((prev) => prev.map((v, i) => (held[i] ? v : 1 + Math.floor(Math.random() * 6))));
    setRollsLeft((r) => r - 1);

    setTimeout(() => {
      setRolling(false);
      setMessage((m) => (rollsLeft - 1 <= 0 ? "No rolls left. Choose your fate or reset." : 'The dice whisper...'));
    }, 300);
  }, [held, rolling, rollsLeft]);

  const clearHolds = React.useCallback(() => {
    setHeld([false, false, false, false, false]);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0c] text-zinc-100 overflow-hidden">
      <HorrorScene />

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 pt-6 pb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100 drop-shadow-[0_4px_12px_rgba(255,0,0,0.25)]">
          Yahtzee: The Witching Table
        </h1>
        <StatusBar rollsLeft={rollsLeft} message={message} dice={dice} />

        <GameBoard
          dice={dice}
          held={held}
          onToggleHold={toggleHold}
          rolling={rolling}
        />

        <Controls
          onRoll={rollDice}
          onReset={resetRound}
          onClearHolds={clearHolds}
          rollsLeft={rollsLeft}
          canRoll={!rolling && rollsLeft > 0}
        />
      </div>
    </div>
  );
}
