'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export default function DashboardPage() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(160deg,#010814 0%,#061a2e 55%,#010a18 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(32px, 6vw, 100px)',
      boxSizing: 'border-box',
    }}>

      {/* ── Stars ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {Array.from({ length: 200 }, (_, i) => {
          const sin = (n: number, s: number) => { const v = Math.sin(n * 93.9898 + s * 47.233) * 43758.5453; return v - Math.floor(v) }
          const size = i % 21 === 0 ? 3 : i % 7 === 0 ? 2 : 1
          return (
            <span key={i} style={{
              position: 'absolute',
              width: size, height: size,
              left: `${(sin(i, 1) * 100).toFixed(2)}%`,
              top: `${(sin(i, 2) * 100).toFixed(2)}%`,
              opacity: (0.3 + sin(i, 3) * 0.6),
              borderRadius: '50%',
              background: '#fff',
              animation: `twinkle ${(3.4 + sin(i, 5) * 4.8).toFixed(2)}s ${(sin(i, 4) * -7).toFixed(2)}s ease-in-out infinite`,
            }} />
          )
        })}
        {/* Green dash accents */}
        {[
          { top: '18%', left: '14%' }, { top: '33%', left: '7%' },
          { top: '58%', left: '4%' }, { top: '74%', left: '22%' },
          { top: '22%', left: '47%' }, { top: '46%', left: '41%' },
          { top: '70%', left: '54%' }, { top: '12%', left: '62%' },
          { top: '82%', left: '70%' }, { top: '88%', left: '82%' },
        ].map((pos, i) => (
          <span key={`dash-${i}`} style={{
            position: 'absolute',
            width: 26, height: 2,
            top: pos.top, left: pos.left,
            background: 'rgba(52,211,153,0.5)',
            borderRadius: 2,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.25;transform:scale(1);} 50%{opacity:1;transform:scale(1.5);} }
        @keyframes floatEarth { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-16px);} }
        @keyframes glowPulse { 0%,100%{opacity:.45;} 50%{opacity:.9;} }
        @keyframes orbitRing { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      `}</style>

      {/* ── LEFT: Text ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, flex: '0 0 auto', maxWidth: 480 }}
      >
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.08,
          margin: 0,
          letterSpacing: '-0.01em',
          textShadow: '0 2px 32px rgba(0,0,0,0.8)',
        }}>
          Sustainable<br />Development<br />Goals
        </h1>
        <p style={{
          marginTop: 20,
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          color: 'rgba(255,255,255,0.65)',
          fontWeight: 400,
        }}>
          17 Goals to Transform Our World
        </p>
        <Link href="/Pages/sdg">
          <button
            style={{
              marginTop: 32,
              padding: '11px 30px',
              border: '1.5px solid rgba(255,255,255,0.65)',
              borderRadius: 999,
              background: 'transparent',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
          >
            Explore Goals
          </button>
        </Link>
      </motion.div>

      {/* ── RIGHT: Full Complete Earth Globe ── */}
      <motion.div
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.1 : 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          flex: '0 0 auto',
          /* Size: fits fully within the viewport height with padding */
          width: 'min(46vw, calc(100vh - 80px))',
          height: 'min(46vw, calc(100vh - 80px))',
          animation: 'floatEarth 8s ease-in-out infinite',
        }}
      >
        {/* Outer atmospheric glow */}
        <div style={{
          position: 'absolute',
          inset: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 65%)',
          animation: 'glowPulse 4s ease-in-out infinite',
          zIndex: 1,
        }} />

        {/* Dark halo ring */}
        <div style={{
          position: 'absolute',
          inset: '-3%',
          borderRadius: '50%',
          border: '14px solid rgba(0,0,0,0.75)',
          boxShadow: '0 0 0 16px rgba(0,0,0,0.35)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Full Earth — complete sphere, no cropping */}
        <div style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 3,
          boxShadow: '0 0 80px rgba(56,189,248,0.3), 0 0 160px rgba(10,40,100,0.5), inset -20px 0 50px rgba(0,0,20,0.55)',
        }}>
          <Image
            src="/earth.png"
            alt="Earth"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Crescent night shadow on earth */}
        <div style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '50%',
          background: 'linear-gradient(105deg, rgba(0,0,0,0.0) 50%, rgba(0,5,20,0.45) 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }} />
      </motion.div>

    </div>
  )
}
