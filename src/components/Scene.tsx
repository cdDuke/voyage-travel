import { memo, useId } from 'react';

export type SceneKind = 'mountains' | 'sea' | 'desert' | 'city' | 'aurora' | 'islands' | 'forest' | 'savanna';

export type Palette = {
  sky: [string, string];
  sun: string;
  far: string;
  mid: string;
  near: string;
  water?: string;
  accent?: string;
};

export type SceneConfig = { kind: SceneKind; seed: number; palette: Palette; night?: boolean };

/** Small deterministic PRNG so every destination always draws the same landscape. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 300;

/** A jagged ridge line closed to the bottom of the canvas. */
function ridge(rand: () => number, base: number, amp: number, peaks: number, sharp = true) {
  const pts: string[] = [`M0,${H}`, `L0,${base}`];
  const step = W / peaks;
  for (let i = 0; i <= peaks; i++) {
    const x = i * step;
    const peakY = base - amp * (0.35 + rand() * 0.65);
    const valleyY = base - amp * rand() * 0.25;
    if (sharp) {
      pts.push(`L${x + step * 0.5},${peakY}`, `L${x + step},${valleyY}`);
    } else {
      pts.push(`Q${x + step * 0.5},${peakY} ${x + step},${valleyY}`);
    }
  }
  pts.push(`L${W},${H}`, 'Z');
  return pts.join(' ');
}

/** Soft rolling hills / dunes using quadratic curves. */
function dunes(rand: () => number, base: number, amp: number, count: number) {
  const step = W / count;
  let d = `M0,${H} L0,${base}`;
  for (let i = 0; i < count; i++) {
    const x2 = (i + 1) * step;
    d += ` Q${i * step + step / 2},${base - amp * (0.5 + rand() * 0.5)} ${x2},${base - amp * rand() * 0.2}`;
  }
  return `${d} L${W},${H} Z`;
}

function Stars({ rand, count }: { rand: () => number; count: number }) {
  return (
    <g fill="#fff">
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={rand() * W} cy={rand() * H * 0.55} r={rand() * 1.1 + 0.3} opacity={0.4 + rand() * 0.6} />
      ))}
    </g>
  );
}

function Tree({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return <path d={`M${x},${y - 34 * s} L${x + 10 * s},${y - 12 * s} L${x + 5 * s},${y - 12 * s} L${x + 13 * s},${y} L${x - 13 * s},${y} L${x - 5 * s},${y - 12 * s} L${x - 10 * s},${y - 12 * s} Z`} fill={color} />;
}

function Palm({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <g stroke={color} strokeLinecap="round" fill="none">
      <path d={`M${x},${y} Q${x + 6 * s},${y - 22 * s} ${x + 2 * s},${y - 44 * s}`} strokeWidth={3 * s} />
      {[-60, -20, 20, 60, 100].map((a) => (
        <path key={a} d={`M${x + 2 * s},${y - 44 * s} q${Math.cos((a * Math.PI) / 180) * 18 * s},${-8 * s} ${Math.cos((a * Math.PI) / 180) * 26 * s},${Math.abs(Math.sin((a * Math.PI) / 180)) * 10 * s + 2}`} strokeWidth={2.2 * s} />
      ))}
    </g>
  );
}

function Scene({ config, className, layered = false }: { config: SceneConfig; className?: string; layered?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const { kind, seed, palette: p, night } = config;
  const rand = mulberry32(seed);
  const skyId = `sky-${uid}`;
  const glowId = `glow-${uid}`;
  const waterId = `water-${uid}`;
  const sunX = 80 + rand() * 240;
  const sunY = kind === 'aurora' ? 60 : 70 + rand() * 50;
  // optional per-layer hook for parallax
  const L = (depth: number) => (layered ? { 'data-depth': depth } : {});

  const horizon = kind === 'sea' || kind === 'islands' ? 190 : 200;

  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={skyId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={waterId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={p.water ?? p.far} />
          <stop offset="1" stopColor={p.near} />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${skyId})`} />
      {night && <Stars rand={rand} count={70} />}

      {kind === 'aurora' && (
        <g {...L(0.2)} opacity="0.85" style={{ mixBlendMode: 'screen' }}>
          <path d="M-20,120 C60,40 140,110 220,50 S360,60 420,20 L420,70 C340,110 280,80 220,120 S80,90 -20,170Z" fill={p.accent ?? '#5dffb0'} opacity="0.35" />
          <path d="M-20,90 C80,30 160,90 240,40 S380,40 420,10 L420,40 C330,80 260,70 200,100 S60,80 -20,130Z" fill={p.accent ?? '#5dffb0'} opacity="0.5" />
          <path d="M-20,70 C80,30 180,80 280,40 S380,30 420,40 L420,55 C360,50 320,70 260,75 S80,70 -20,100Z" fill="#a78bfa" opacity="0.28" />
        </g>
      )}

      <g {...L(0.15)}>
        <circle cx={sunX} cy={sunY} r="60" fill={`url(#${glowId})`} />
        <circle cx={sunX} cy={sunY} r={night ? 12 : 20} fill={p.sun} />
      </g>

      {kind === 'city' && (
        <g {...L(0.3)}>
          {Array.from({ length: 22 }, (_, i) => {
            const w = 12 + rand() * 18;
            const h = 50 + rand() * 110;
            const x = i * 19 - 10;
            return <rect key={i} x={x} y={horizon + 20 - h} width={w} height={h + 100} fill={i % 3 ? p.far : p.mid} />;
          })}
          <g fill={p.accent ?? '#ffe08a'} opacity="0.9">
            {Array.from({ length: 70 }, (_, i) => (
              <rect key={i} x={rand() * W} y={110 + rand() * 100} width="2.4" height="3.2" opacity={rand() > 0.4 ? 1 : 0.3} />
            ))}
          </g>
        </g>
      )}

      {(kind === 'mountains' || kind === 'aurora' || kind === 'forest') && (
        <>
          <path {...L(0.3)} d={ridge(rand, horizon - 20, 110, 4)} fill={p.far} />
          {kind === 'mountains' && (
            <path {...L(0.3)} d={ridge(mulberry32(seed), horizon - 20, 110, 4)} fill="#fff" opacity="0.18" transform="translate(0,-4) scale(1,1)" />
          )}
          <path {...L(0.5)} d={ridge(rand, horizon + 10, 80, 6)} fill={p.mid} />
        </>
      )}

      {(kind === 'desert' || kind === 'savanna') && (
        <>
          <path {...L(0.3)} d={dunes(rand, horizon, 50, 3)} fill={p.far} />
          {kind === 'desert' && (
            <path {...L(0.35)} d={`M${250 + rand() * 60},${horizon - 6} l46,-58 l46,58Z`} fill={p.mid} opacity="0.9" />
          )}
          <path {...L(0.5)} d={dunes(rand, horizon + 30, 40, 2)} fill={p.mid} />
        </>
      )}

      {(kind === 'sea' || kind === 'islands' || (kind === 'mountains' && p.water)) && (
        <g {...L(0.6)}>
          <rect x="0" y={horizon + (kind === 'mountains' ? 30 : 0)} width={W} height={H} fill={`url(#${waterId})`} />
          <g stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round">
            {Array.from({ length: 12 }, (_, i) => {
              const y = horizon + 14 + i * 9 + (kind === 'mountains' ? 30 : 0);
              const x = rand() * 340;
              return <line key={i} x1={x} x2={x + 20 + rand() * 40} y1={y} y2={y} />;
            })}
          </g>
          {/* sun reflection */}
          <rect x={sunX - 16} y={horizon + (kind === 'mountains' ? 30 : 0)} width="32" height="60" fill={p.sun} opacity="0.18" />
        </g>
      )}

      {kind === 'sea' && (
        <g {...L(0.8)}>
          <path d={`M-10,${H} L-10,210 Q60,170 150,200 Q200,215 230,${H}Z`} fill={p.near} />
          <g fill="#fff">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={20 + i * 26} y={186 - i * 5} width="20" height="20" rx="2" />
            ))}
            <path d="M40,176 a10,10 0 0 1 20,0Z" fill={p.accent ?? '#2b6cb0'} />
          </g>
        </g>
      )}

      {kind === 'islands' && (
        <g {...L(0.8)}>
          <ellipse cx="110" cy="232" rx="90" ry="16" fill={p.near} />
          <ellipse cx="310" cy="212" rx="50" ry="9" fill={p.mid} />
          <Palm x={100} y={228} s={1.2} color={p.accent ?? '#0f3d3e'} />
          <Palm x={130} y={230} s={0.9} color={p.accent ?? '#0f3d3e'} />
          <path d="M240,250 l30,0 l-6,8 l-20,0Z M254,250 l0,-26 l14,22Z" fill="#fff" opacity="0.9" />
        </g>
      )}

      {kind === 'forest' && (
        <g {...L(0.8)}>
          <path d={`M0,${H} L0,238 L${W},244 L${W},${H}Z`} fill={p.near} />
          {Array.from({ length: 16 }, (_, i) => (
            <Tree key={i} x={i * 27 + rand() * 10} y={244 + rand() * 12} s={0.9 + rand() * 0.8} color={i % 2 ? p.near : p.mid} />
          ))}
          <rect x="0" y="262" width={W} height="40" fill={p.water ?? p.near} opacity="0.9" />
        </g>
      )}

      {kind === 'savanna' && (
        <g {...L(0.8)}>
          <path d={`M0,${H} L0,250 Q200,236 ${W},252 L${W},${H}Z`} fill={p.near} />
          <g fill={p.accent ?? '#2d2a26'}>
            <path d="M290,252 l3,-40 l3,40Z" />
            <ellipse cx="293" cy="208" rx="40" ry="9" />
            <ellipse cx="110" cy="226" rx="10" ry="6" />
            <path d="M104,226 l-2,16 M116,226 l2,16 M118,222 l14,-30" stroke={p.accent ?? '#2d2a26'} strokeWidth="2.4" />
          </g>
        </g>
      )}

      {(kind === 'mountains' || kind === 'aurora') && (
        <path {...L(0.9)} d={ridge(rand, H - 20, 40, 8, false)} fill={p.near} />
      )}

      {kind === 'aurora' && (
        <g {...L(0.95)} fill={p.accent ?? '#5dffb0'}>
          <path d="M300,282 l18,-26 l18,26Z" fill="#f59e0b" opacity="0.9" />
          <path d="M318,256 l0,26" stroke="#1f2937" strokeWidth="1.5" />
        </g>
      )}

      {(kind === 'city' || kind === 'desert') && (
        <path {...L(0.9)} d={dunes(rand, H - 10, 26, 3)} fill={p.near} />
      )}
    </svg>
  );
}

export default memo(Scene);
