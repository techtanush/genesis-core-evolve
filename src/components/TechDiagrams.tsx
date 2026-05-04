export const NeuralFlow = () => (
  <svg viewBox="0 0 600 200" className="w-full h-auto" fill="none">
    <defs>
      <linearGradient id="flowAmber" x1="0" x2="1">
        <stop offset="0%" stopColor="hsl(45 100% 50%)" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(45 100% 50%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(45 100% 50%)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="flowCyan" x1="0" x2="1">
        <stop offset="0%" stopColor="hsl(186 100% 50%)" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(186 100% 50%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(186 100% 50%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* nodes left */}
    {[40, 80, 120, 160].map((y, i) => (
      <circle key={`l${i}`} cx="40" cy={y} r="4" fill="hsl(186 100% 50%)" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* hidden layer */}
    {[30, 70, 110, 150, 190].map((y, i) => (
      <circle key={`m${i}`} cx="300" cy={y} r="5" fill="hsl(45 100% 50%)" opacity="0.9">
        <animate attributeName="r" values="4;7;4" dur="2.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* output */}
    {[80, 120].map((y, i) => (
      <circle key={`r${i}`} cx="560" cy={y} r="6" fill="hsl(186 100% 50%)" opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* connections */}
    {[40, 80, 120, 160].flatMap((y1, i) =>
      [30, 70, 110, 150, 190].map((y2, j) => (
        <line key={`l-${i}-${j}`} x1="40" y1={y1} x2="300" y2={y2} stroke="hsl(186 100% 50%)" strokeOpacity="0.15" strokeWidth="0.5" />
      ))
    )}
    {[30, 70, 110, 150, 190].flatMap((y1, i) =>
      [80, 120].map((y2, j) => (
        <line key={`r-${i}-${j}`} x1="300" y1={y1} x2="560" y2={y2} stroke="hsl(45 100% 50%)" strokeOpacity="0.18" strokeWidth="0.5" />
      ))
    )}
    {/* moving pulse along main path */}
    <path id="path1" d="M 40 100 Q 200 20 300 110 T 560 100" stroke="url(#flowAmber)" strokeWidth="1.5" fill="none" />
    <circle r="3" fill="hsl(45 100% 60%)">
      <animateMotion dur="3.5s" repeatCount="indefinite">
        <mpath href="#path1" />
      </animateMotion>
    </circle>
    <path id="path2" d="M 40 120 Q 180 200 300 90 T 560 130" stroke="url(#flowCyan)" strokeWidth="1.2" fill="none" />
    <circle r="3" fill="hsl(186 100% 65%)">
      <animateMotion dur="4.2s" repeatCount="indefinite">
        <mpath href="#path2" />
      </animateMotion>
    </circle>
  </svg>
);

export const WireframeChip = () => (
  <svg viewBox="0 0 400 400" className="w-full h-auto" fill="none">
    <defs>
      <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(186 100% 50%)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="hsl(45 100% 50%)" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <rect x="60" y="60" width="280" height="280" stroke="url(#chipGrad)" strokeWidth="1" />
    <rect x="100" y="100" width="200" height="200" stroke="hsl(186 100% 50% / 0.5)" strokeWidth="0.6" />
    <rect x="170" y="170" width="60" height="60" fill="hsl(45 100% 50% / 0.1)" stroke="hsl(45 100% 50%)" strokeWidth="1" />
    {/* pins */}
    {Array.from({ length: 14 }).map((_, i) => (
      <g key={i}>
        <line x1={70 + i * 20} y1="20" x2={70 + i * 20} y2="60" stroke="hsl(186 100% 50% / 0.4)" />
        <line x1={70 + i * 20} y1="340" x2={70 + i * 20} y2="380" stroke="hsl(186 100% 50% / 0.4)" />
        <line x1="20" y1={70 + i * 20} x2="60" y2={70 + i * 20} stroke="hsl(186 100% 50% / 0.4)" />
        <line x1="340" y1={70 + i * 20} x2="380" y2={70 + i * 20} stroke="hsl(186 100% 50% / 0.4)" />
      </g>
    ))}
    {/* traces */}
    <path d="M 200 170 L 200 100 M 200 230 L 200 300 M 170 200 L 100 200 M 230 200 L 300 200" stroke="hsl(45 100% 50%)" strokeWidth="0.8" />
    <circle cx="200" cy="200" r="8" fill="hsl(45 100% 50%)" opacity="0.9">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);
