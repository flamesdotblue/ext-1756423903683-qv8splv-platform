import React from 'react';

const faceDots = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
  6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]],
};

export default function Dice({ value = 1, held = false, onClick, rolling = false, index }) {
  // Randomize a subtle tilt to avoid perfect uniformity
  const [tilt] = React.useState(() => (Math.random() * 10 - 5));
  const [spin, setSpin] = React.useState(0);

  React.useEffect(() => {
    if (rolling && !held) {
      const id = setInterval(() => setSpin((s) => s + 30 + Math.random() * 60), 60);
      return () => clearInterval(id);
    }
  }, [rolling, held]);

  const translateHeld = index % 2 === 0 ? '-translate-x-10 translate-y-6' : 'translate-x-10 translate-y-6';

  return (
    <button
      onClick={onClick}
      className={[
        'relative group focus:outline-none',
        'h-20 w-20 sm:h-24 sm:w-24',
        'transition-all duration-500 ease-out',
        held ? translateHeld : 'translate-y-0',
        'hover:scale-[1.03] active:scale-[0.98]'
      ].join(' ')}
      aria-pressed={held}
      title={held ? 'Held' : 'Click to hold'}
    >
      <div
        className={[
          'relative h-full w-full rounded-xl',
          'bg-white/95 shadow-[0_12px_20px_rgba(0,0,0,0.45)]',
          'ring-2', held ? 'ring-red-500' : 'ring-zinc-300',
          'transition-transform duration-500',
        ].join(' ')}
        style={{
          transform: `rotate(${tilt}deg) rotate(${spin}deg)`,
        }}
      >
        {/* Dice face dots */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-2">
          {Array.from({ length: 3 }).map((_, r) => (
            Array.from({ length: 3 }).map((_, c) => {
              const cx = c - 1; // -1,0,1
              const ry = r - 1;
              const show = faceDots[value].some(([x, y]) => x === cx && y === ry);
              return (
                <div key={`${r}-${c}`} className="flex items-center justify-center">
                  <span className={[
                    'block h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full',
                    show ? 'bg-zinc-900' : 'bg-transparent',
                    'drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]'
                  ].join(' ')} />
                </div>
              );
            })
          ))}
        </div>

        {/* Blood smear accent on held */}
        {held && (
          <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600/80 blur-[1px] shadow-[0_0_12px_rgba(220,38,38,0.6)]" />
        )}

        {/* Subtle specular highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_35%)]" />
      </div>
    </button>
  );
}
