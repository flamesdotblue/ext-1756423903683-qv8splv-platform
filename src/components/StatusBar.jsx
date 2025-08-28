import React from 'react';

export default function StatusBar({ rollsLeft, message, dice }) {
  const counts = React.useMemo(() => {
    const map = { 1:0,2:0,3:0,4:0,5:0,6:0 };
    dice.forEach((v) => { map[v] = (map[v] || 0) + 1; });
    return map;
  }, [dice]);

  const isYahtzee = Object.values(counts).some((n) => n === 5);

  return (
    <div className="w-full max-w-5xl rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-zinc-400">Rolls left: <b className="text-zinc-100">{rollsLeft}</b></span>
        <span className="hidden sm:inline text-zinc-500">|
        </span>
        <span className="truncate">
          {isYahtzee ? (
            <span className="text-emerald-400">Yahtzee! The spirits are pleased.</span>
          ) : (
            message
          )}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-3 text-zinc-400">
        {Object.entries(counts).map(([v, n]) => (
          <span key={v} className="tabular-nums"><span className="text-zinc-500">{v}:</span> {n}</span>
        ))}
      </div>
    </div>
  );
}
