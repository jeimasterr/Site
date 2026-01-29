export function EvoLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#ffcc00"/>
      <text
        x="50"
        y="62"
        fontFamily="Inter, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="#191919"
        textAnchor="middle"
      >
        evo
      </text>
    </svg>
  );
}
