import React from 'react';
import { Dice6, RefreshCw, Hand } from 'lucide-react';

export default function Controls({ onRoll, onReset, onClearHolds, rollsLeft, canRoll }) {
  return (
    <div className="mt-2 flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onRoll}
          disabled={!canRoll}
          className={[
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium',
            canRoll ? 'bg-red-600 hover:bg-red-700 text-white shadow' : 'bg-zinc-800 text-zinc-400 cursor-not-allowed',
          ].join(' ')}
        >
          <Dice6 size={18} />
          Roll ({rollsLeft})
        </button>

        <button
          onClick={onClearHolds}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
        >
          <Hand size={18} />
          Release Holds
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700"
        >
          <RefreshCw size={18} />
          Reset Round
        </button>
      </div>

      <p className="text-xs text-zinc-400">Tip: Hold dice you like. Roll up to three times each round.</p>
    </div>
  );
}
