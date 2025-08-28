import React from 'react';

export default function HorrorScene() {
  // Subtle ambient pulsing background and a silhouette at the top center
  return (
    <div className="absolute inset-0">
      {/* Vignette and fog */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[1px]" />

      {/* Scary silhouette */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2">
        <ScaryGuy />
      </div>

      {/* Floor glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
  );
}

function ScaryGuy() {
  // An SVG silhouette with glowing eyes and idle animation
  return (
    <div className="relative h-28 w-24">
      <svg viewBox="0 0 120 160" className="absolute inset-0 h-full w-full text-zinc-900">
        <g>
          {/* Hood */}
          <path d="M60 10 C 20 10, 5 60, 5 110 C 5 140, 25 150, 60 150 C 95 150, 115 140, 115 110 C 115 60, 100 10, 60 10 Z" fill="#0b0b0d" />
          {/* Face void */}
          <ellipse cx="60" cy="80" rx="28" ry="26" fill="#040405" />
        </g>
      </svg>
      {/* Eyes */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 flex gap-3">
        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
      </div>
      {/* Head sway */}
      <div className="absolute inset-0 animate-[sway_6s_ease-in-out_infinite]" />
      <style>{`
        @keyframes sway { 0%,100%{ transform: rotate(0deg) translateY(0) } 50%{ transform: rotate(2deg) translateY(1px) } }
      `}</style>
    </div>
  );
}
