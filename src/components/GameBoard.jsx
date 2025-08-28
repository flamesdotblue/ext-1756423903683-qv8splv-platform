import React from 'react';
import Dice from './Dice';

export default function GameBoard({ dice, held, onToggleHold, rolling }) {
  // For hand animation triggers
  const [handAction, setHandAction] = React.useState({ side: null, index: null, action: null });

  const handleToggle = (i) => {
    setHandAction({ side: i % 2 === 0 ? 'left' : 'right', index: i, action: held[i] ? 'return' : 'take' });
    onToggleHold(i);
    // Clear hand after short animation window
    setTimeout(() => setHandAction({ side: null, index: null, action: null }), 600);
  };

  return (
    <div className="relative w-full max-w-5xl">
      {/* Table */}
      <div className="relative mx-auto h-[420px] w-full rounded-xl bg-gradient-to-b from-zinc-900 to-black shadow-2xl overflow-hidden ring-1 ring-zinc-800">
        {/* Wood edge */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#3b2a1f] to-[#1f1712] shadow-inner" />
        {/* Faux 3D table top */}
        <div className="absolute inset-x-6 bottom-10 top-8 rounded-lg bg-[radial-gradient(circle_at_50%_20%,#1b1b1e,transparent_60%),linear-gradient(180deg,#121214,transparent)]" />

        {/* Scary end silhouette eyes reflection on table */}
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-red-500/30 blur-[2px] text-[10px]">• •</div>

        {/* Dice Line */}
        <div className="absolute inset-x-8 bottom-24 flex items-end justify-center gap-6 perspective-[1200px]">
          {dice.map((value, i) => (
            <Dice
              key={i}
              index={i}
              value={value}
              held={held[i]}
              onClick={() => handleToggle(i)}
              rolling={rolling}
            />
          ))}
        </div>

        {/* Held lanes with subtle slots */}
        <div className="absolute inset-x-8 bottom-6 flex justify-center gap-6">
          {dice.map((_, i) => (
            <div key={i} className="h-10 w-16 rounded-md bg-zinc-800/40 ring-1 ring-zinc-700/40" />
          ))}
        </div>

        {/* Hands */}
        <SideHand side="left" active={handAction.side === 'left'} action={handAction.action} targetIndex={handAction.index} />
        <SideHand side="right" active={handAction.side === 'right'} action={handAction.action} targetIndex={handAction.index} />
      </div>

      {/* Legend */}
      <p className="mt-2 text-center text-sm text-zinc-400">Click a die to hold/release. The hands will move it aside. Roll up to three times.</p>
    </div>
  );
}

function SideHand({ side = 'left', active, action }) {
  // Simple stylized hand shape using gradients and a claw-like pointer
  const base = 'absolute top-28 h-28 w-28 rounded-full shadow-2xl';
  const isLeft = side === 'left';
  const xStart = isLeft ? '-left-32' : '-right-32';
  const xActive = isLeft ? 'left-2' : 'right-2';
  const dirClass = isLeft ? 'origin-right rotate-6' : 'origin-left -rotate-6';
  const gradient = 'bg-[radial-gradient(circle_at_30%_30%,#d1d5db,transparent_60%),linear-gradient(135deg,#b5b7ba,#7c7f84_60%,#3f4146)]';

  return (
    <div
      className={[
        base,
        gradient,
        'transition-all duration-500 ease-out',
        active ? xActive : xStart,
        dirClass,
        'ring-1 ring-zinc-600',
      ].join(' ')}
      aria-hidden
    >
      {/* Claw */}
      <div className={`absolute ${isLeft ? 'right-0' : 'left-0'} top-10 h-6 w-10 bg-zinc-700 rounded-${isLeft ? 'l' : 'r'}-full`} />
      {/* Fingers */}
      <div className={`absolute ${isLeft ? 'right-6' : 'left-6'} top-2 h-16 w-4 bg-zinc-600 rounded-full shadow`} />
      <div className={`absolute ${isLeft ? 'right-10' : 'left-10'} top-6 h-14 w-4 bg-zinc-700 rounded-full`} />
      <div className={`absolute ${isLeft ? 'right-14' : 'left-14'} top-10 h-10 w-4 bg-zinc-800 rounded-full`} />
      {/* Action pulse */}
      <div className={`absolute inset-0 rounded-full ${action ? 'ring-4 ring-red-500/20' : ''}`} />
    </div>
  );
}
