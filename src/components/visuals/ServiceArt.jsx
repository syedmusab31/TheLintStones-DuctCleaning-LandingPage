/*
 * Line illustrations for each service. Drawn on a shared 240×160 grid with
 * `currentColor` for structure and gold for anything that moves air.
 */

const GOLD = 'var(--color-gold-400)'

function Frame({ children, className, title }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      {children}
    </svg>
  )
}

export function DuctArt({ className }) {
  return (
    <Frame className={className} title="Air duct with clean airflow">
      {/* Trunk line receding in perspective */}
      <g stroke="currentColor" strokeWidth="2">
        <path d="M20 46h120l40-26h44" opacity=".35" />
        <path d="M20 46v58h120l40-26V20" opacity=".35" />
        <path d="M140 46v58M180 20v58h44" opacity=".35" />
        <rect x="20" y="46" width="120" height="58" rx="4" />
        <path d="M140 46l40-26h44v58h-44l-40 26" />
        {[44, 68, 92, 116].map((x) => (
          <path key={x} d={`M${x} 46v58`} opacity=".25" />
        ))}
      </g>
      {/* Register grille */}
      <g stroke="currentColor" strokeWidth="2">
        <rect x="52" y="118" width="56" height="26" rx="3" />
        {[124, 130, 136].map((y) => (
          <path key={y} d={`M58 ${y}h44`} opacity=".6" />
        ))}
      </g>
      <g stroke={GOLD} strokeWidth="2.5" className="flow-line">
        <path d="M30 66c30-8 60 8 100 0s60-24 88-30" />
        <path d="M30 84c34-6 64 8 104 2s58-20 84-24" />
        <path d="M80 144c-6 6-6 12 0 16M68 144c-8 6-8 12-2 16M92 144c4 6 4 12-2 16" />
      </g>
    </Frame>
  )
}

export function CoilArt({ className }) {
  return (
    <Frame className={className} title="HVAC coil being spray cleaned">
      <g stroke="currentColor" strokeWidth="2">
        <rect x="20" y="24" width="120" height="112" rx="6" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${32 + i * 8} 34v92`} opacity={i % 2 ? 0.35 : 0.7} />
        ))}
        {/* Spray wand */}
        <path d="M222 112l-38-22M184 90l-10 6 6 10 10-6" />
        <path d="M206 102l8 22h10" />
      </g>
      <g stroke={GOLD} strokeWidth="2.5">
        <path className="flow-line" d="M172 92L146 70M172 96l-26 2M172 100l-24 26" />
        {[
          [150, 82],
          [156, 112],
          [162, 74],
          [148, 100],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill={GOLD} stroke="none" />
        ))}
      </g>
    </Frame>
  )
}

export function DryerArt({ className }) {
  return (
    <Frame className={className} title="Dryer with a cleared vent hose">
      <g stroke="currentColor" strokeWidth="2">
        <rect x="24" y="40" width="96" height="108" rx="8" />
        <path d="M24 62h96" />
        <circle cx="38" cy="51" r="3" />
        <circle cx="72" cy="104" r="28" />
        <circle cx="72" cy="104" r="18" opacity=".45" />
        {/* Accordion vent hose */}
        <path d="M120 74c30 0 40-10 52-30s26-24 48-24" strokeWidth="14" opacity=".15" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const t = i / 5
          const x = 124 + t * 92
          const y = 74 - Math.sin(t * Math.PI * 0.9) * 40 - t * 14
          return <path key={i} d={`M${x - 3} ${y - 8}l6 16`} opacity=".7" />
        })}
      </g>
      <g stroke={GOLD} strokeWidth="2.5" className="flow-line">
        <path d="M126 74c28 0 38-8 48-26s28-26 48-26" />
      </g>
    </Frame>
  )
}

export function CommercialArt({ className }) {
  return (
    <Frame className={className} title="Commercial building duct network">
      <g stroke="currentColor" strokeWidth="2">
        <path d="M20 148V52l60-28 60 28v96" />
        <path d="M140 148V80h80v68M12 148h216" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={40 + col * 44}
              y={70 + row * 26}
              width="16"
              height="14"
              rx="2"
              opacity=".5"
            />
          )),
        )}
        <rect x="158" y="96" width="44" height="20" rx="3" opacity=".5" />
        {/* Rooftop unit */}
        <rect x="160" y="62" width="40" height="18" rx="3" />
      </g>
      <g stroke={GOLD} strokeWidth="2.5" className="flow-line">
        <path d="M180 62V40H110M110 40v16" />
        <path d="M30 64h100M30 90h100M30 116h100" opacity=".9" />
      </g>
    </Frame>
  )
}

export function MoldArt({ className }) {
  return (
    <Frame className={className} title="Mold spores neutralised by a plant-based treatment">
      <g stroke="currentColor" strokeWidth="2">
        {[
          [52, 54, 14],
          [80, 40, 9],
          [76, 76, 11],
          [42, 92, 8],
          [104, 62, 6],
        ].map(([cx, cy, r]) => (
          <g key={`${cx}-${cy}`} opacity=".55">
            <circle cx={cx} cy={cy} r={r} />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.2} r={r * 0.18} fill="currentColor" />
            <circle cx={cx + r * 0.35} cy={cy + r * 0.25} r={r * 0.14} fill="currentColor" />
          </g>
        ))}
        <path d="M30 140h180" />
      </g>
      <g stroke={GOLD} strokeWidth="2.5">
        <path d="M168 140c0-46 14-80 46-100-40 2-62 30-62 64 0 14 6 26 16 36z" />
        <path d="M168 140c4-30 14-56 34-80" />
        <path className="flow-line" d="M150 96c-14-4-28-4-40 4M146 116c-16 2-30 8-40 18" />
      </g>
    </Frame>
  )
}

export function SanitizeArt({ className }) {
  return (
    <Frame className={className} title="Sanitising mist leaving an air vent">
      <g stroke="currentColor" strokeWidth="2">
        <rect x="64" y="20" width="112" height="46" rx="5" />
        {[30, 38, 46, 54].map((y) => (
          <path key={y} d={`M74 ${y}h92`} opacity=".55" />
        ))}
      </g>
      <g stroke={GOLD} strokeWidth="2.5">
        <path
          className="flow-line"
          d="M92 74c-8 18 4 30-4 50M120 74c0 22 8 34 0 56M148 74c8 18-4 30 4 50"
        />
        {[
          [70, 110],
          [176, 104],
          [120, 146],
          [196, 136],
          [46, 140],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y - 7}v14M${x - 7} ${y}h14`} />
        ))}
      </g>
    </Frame>
  )
}
