'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, BarElement, Filler
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, BarElement, Filler)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('stepup_admin_session')
    if (!session) router.push('/Pages/login')
    if (localStorage.getItem('stepup_dark') === 'true') setDark(true)
  }, [])

  const toggleDark = () => setDark(d => {
    localStorage.setItem('stepup_dark', String(!d))
    return !d
  })

  // ── Design tokens ──────────────────────────────────────────────
  const c = {
    // backgrounds
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    // sidebar
    sidebar:     dark ? '#13161f' : '#1e3a8a',
    // text
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    // accent
    accent:      '#3b6ef6',
    accentLight: dark ? 'rgba(59,110,246,.18)' : 'rgba(59,110,246,.08)',
    accentText:  dark ? '#7aa3fb' : '#2563eb',
    // status
    green:  '#10b981',
    amber:  '#f59e0b',
    red:    '#ef4444',
    cyan:   '#06b6d4',
    // shadow
    shadow: dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
    shadowMd: dark ? '0 8px 32px rgba(0,0,0,.5)' : '0 4px 20px rgba(17,24,39,.1)',
  }

  const navItems = [
    { label: 'Dashboard',          href: '/Pages/dashboard',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { label: 'SDG Management',     href: '/Pages/dashboard/sdg-management',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { label: 'Partner Management', href: '/Pages/dashboard/partners',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Partnership Review', href: '/Pages/dashboard/partnership-review',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
    { label: 'Contact Centre',     href: '/Pages/dashboard/contact',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('stepup_admin_session')
    window.location.href = '/Pages/login'
  }

  const card = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 14,
    boxShadow: c.shadow,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: c.bg, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", transition: 'background .3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.6);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
        @keyframes spin-slow { to{ transform:rotate(360deg); } }
        .fade-up { animation: fadeUp .35s ease forwards; }
        .nav-item:hover { background: rgba(255,255,255,.08) !important; color: rgba(255,255,255,.9) !important; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(17,24,39,.12) !important; }
        .card-hover { transition: transform .2s, box-shadow .2s; }
        .btn-ghost:hover { opacity: .8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(128,128,128,.15); border-radius: 8px; }
        input::placeholder { color: ${c.textMuted}; }
      `}</style>

      {/* ── SIDEBAR ───────────────────────────────────── */}
      <aside style={{
        width: 248, position: 'fixed', height: '100vh', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        background: dark ? 'linear-gradient(175deg,#0d1117 0%,#1a2035 50%,#0f1729 100%)' : 'linear-gradient(175deg,#1e3a8a 0%,#1d4ed8 50%,#0ea5e9 100%)',
        borderRight: '1px solid rgba(255,255,255,.05)',
        boxShadow: '2px 0 20px rgba(0,0,0,.2)', zIndex: 100,
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
              <img src="/SDG_LOGO-removebg-preview.png" alt="SDG Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>StepUp SDG</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 3, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding: '20px 12px 8px' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,.2)', letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: 8, marginBottom: 8 }}>Menu</div>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link key={i} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                <div className="nav-item" style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9,
                  background: isActive ? 'rgba(59,110,246,.25)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,.45)',
                  transition: 'all .15s', cursor: 'pointer',
                  borderLeft: isActive ? '2px solid #7aa3fb' : '2px solid transparent',
                }}>
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                  {isActive && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#7aa3fb' }} />}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Spinning SDG image */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: 12 }}>
            <img src="/PPP SDG.png" alt="SDG" style={{ width: '100%', display: 'block', animation: 'spin-slow 12s linear infinite', transformOrigin: 'center center' }} />
          </div>
        </div>

        {/* User */}
        <div style={{ padding: '14px 16px 20px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#3b6ef6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#f0f2f8', lineHeight: 1 }}>Lasya</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 3 }}>Super Admin</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: '4px 8px', borderRadius: 6, transition: 'color .15s' }}>
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: 248, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <header style={{
          height: 62, background: c.surface, borderBottom: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', position: 'sticky', top: 0, zIndex: 90,
          boxShadow: c.shadow, transition: 'background .3s',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, lineHeight: 1 }}>Admin Dashboard</div>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 3 }}>Welcome back, Lasya</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: '7px 14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12.5, color: c.textSecond, width: 150, fontFamily: 'inherit' }} />
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowNotifs(n => !n); setShowSettings(false) }}
                style={{ position: 'relative', background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textSecond} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: c.red, border: `2px solid ${c.surface}`, animation: 'pulse 2s ease infinite' }} />
              </button>
              {showNotifs && (
                <div style={{ position: 'absolute', top: 46, right: 0, width: 310, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadowMd, zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: c.textPrimary }}>Notifications</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: c.red, borderRadius: 20, padding: '2px 9px' }}>3 new</span>
                  </div>
                  {[
                    { title: 'New partner application', desc: 'GreenEarth NGO submitted a request', time: '2h ago', unread: true },
                    { title: 'New School Enrolled', desc: 'Bright Futures Academy joined SDG 4', time: '5h ago', unread: true },
                    { title: 'Project Milestone', desc: 'Water Access Project reached 100%', time: 'Yesterday', unread: true },
                    { title: 'Report Submitted', desc: 'EcoSolutions uploaded Q3 impact report', time: '2d ago', unread: false },
                  ].map((n, i, arr) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', background: n.unread ? c.accentLight : 'transparent', cursor: 'pointer' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary }}>{n.title}</span>
                          {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 4 }} />}
                        </div>
                        <div style={{ fontSize: 11, color: c.textSecond, marginTop: 2 }}>{n.desc}</div>
                        <div style={{ fontSize: 10, color: c.textMuted, marginTop: 3 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '10px 18px', textAlign: 'center', borderTop: `1px solid ${c.border}` }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowSettings(s => !s); setShowNotifs(false) }}
                style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textSecond} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
              {showSettings && (
                <div style={{ position: 'absolute', top: 46, right: 0, width: 230, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadowMd, zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '13px 16px', borderBottom: `1px solid ${c.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>Settings</span>
                  </div>
                  {[
                    { icon: '🌗', label: 'Dark Mode', action: toggleDark, toggle: true, value: dark },
                    { icon: '🔔', label: 'Notifications', toggle: true, value: true },
                    { icon: '🔒', label: 'Security', toggle: false },
                    { icon: '📤', label: 'Export Data', toggle: false },
                  ].map((item, i, arr) => (
                    <div key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 14 }}>{item.icon}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: c.textPrimary }}>{item.label}</span>
                      </div>
                      {item.toggle ? (
                        <div style={{ width: 32, height: 18, borderRadius: 9, background: item.value ? c.accent : c.border, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: item.value ? 16 : 2, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                        </div>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dark toggle */}
            <button onClick={toggleDark} style={{
              width: 48, height: 26, borderRadius: 13, cursor: 'pointer', border: `1px solid ${c.border}`,
              background: dark ? '#2a2f42' : '#e8eaf0', position: 'relative', transition: 'background .3s',
            }}>
              <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 11, opacity: dark ? .25 : 1, transition: 'opacity .3s' }}>☀️</span>
              <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 11, opacity: dark ? 1 : .25, transition: 'opacity .3s' }}>🌙</span>
              <div style={{ width: 19, height: 19, borderRadius: '50%', background: dark ? c.accent : '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.2)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: dark ? 'calc(100% - 22px)' : '3px', transition: 'left .28s cubic-bezier(.4,0,.2,1)', zIndex: 1 }} />
            </button>

            <div style={{ width: 1, height: 26, background: c.border }} />

            {/* User avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, lineHeight: 1 }}>Lasya</div>
                <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 2 }}>Super Admin</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3b6ef6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>A</div>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main style={{ flex: 1, padding: '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Banner */}
          <div style={{ background: 'linear-gradient(120deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)', borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(37,99,235,.3)' }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', marginBottom: 4 }}>12 applications &amp; 4 reviews pending your approval</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Review partner requests and project submissions before the deadline.</div>
            </div>
            <button style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', borderRadius: 9, padding: '9px 20px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .15s' }}>
              Review Now →
            </button>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {[
              { label: 'Total Students',    value: '12,450', change: '+12% this month', up: true,  color: '#3b6ef6', bg: 'rgba(59,110,246,.08)' },
              { label: 'Schools Supported', value: '142',    change: '+5 new schools',  up: true,  color: '#8b5cf6', bg: 'rgba(139,92,246,.08)' },
              { label: 'Projects Completed',value: '89',     change: 'Stable trend',    up: null,  color: '#f59e0b', bg: 'rgba(245,158,11,.08)' },
              { label: 'Active Partners',   value: '56',     change: '+3 this week',    up: true,  color: '#10b981', bg: 'rgba(16,185,129,.08)' },
            ].map((s, i) => (
              <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
                  {s.up === true ? '↑ ' : ''}{s.change}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 16, alignItems: 'start' }}>

            {/* SDG Impact Points */}
            <div className="card-hover" style={card}>
              <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Impact Points Per Selected SDG</div>
                  <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Ranked by student volunteer contribution</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.accentText, cursor: 'pointer', background: c.accentLight, padding: '4px 12px', borderRadius: 20 }}>Rankings</span>
              </div>
              <div style={{ padding: '16px 22px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { num: 1,  label: 'No Poverty',                pts: 1420, color: '#e5243b', pct: 15 },
                    { num: 3,  label: 'Good Health and Well-being', pts: 3820, color: '#4c9f38', pct: 40 },
                    { num: 4,  label: 'Quality Education',          pts: 9500, color: '#c5192d', pct: 100 },
                    { num: 5,  label: 'Gender Equality',            pts: 2280, color: '#ff3a21', pct: 24 },
                    { num: 6,  label: 'Clean Water & Sanitation',   pts: 4500, color: '#26bde2', pct: 47 },
                    { num: 7,  label: 'Affordable & Clean Energy',  pts: 6280, color: '#fcc30b', pct: 66 },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary }}>SDG {s.num}: {s.label}</span>
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.textSecond, whiteSpace: 'nowrap', marginLeft: 12 }}>{s.pts.toLocaleString()} pts</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 4, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${c.border}`, textAlign: 'center' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>Explore all SDG statistics pages →</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-hover" style={card}>
              <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Recent Activity</div>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all</span>
              </div>
              <div style={{ padding: '4px 0' }}>
                {[
                  { tag: 'Partner',   title: 'New partner application',    desc: 'GreenEarth NGO submitted a request.',    time: '2h ago',    tagColor: '#3b6ef6', tagBg: 'rgba(59,110,246,.1)' },
                  { tag: 'School',    title: 'New School Enrolled',         desc: 'Bright Futures Academy joined SDG 4.',   time: '5h ago',    tagColor: '#06b6d4', tagBg: 'rgba(6,182,212,.1)' },
                  { tag: 'Milestone', title: 'Project Milestone Reached',   desc: 'Water Access Project reached 100%.',     time: 'Yesterday', tagColor: '#10b981', tagBg: 'rgba(16,185,129,.1)' },
                  { tag: 'Report',    title: 'Report Submitted',            desc: 'EcoSolutions uploaded Q3 impact report.', time: '2d ago',   tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,.1)' },
                ].map((a, i, arr) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: a.tagColor, background: a.tagBg, borderRadius: 5, padding: '3px 7px', letterSpacing: '.4px', textTransform: 'uppercase', height: 'fit-content', marginTop: 1, flexShrink: 0 }}>{a.tag}</span>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary, lineHeight: 1.3 }}>{a.title}</div>
                      <div style={{ fontSize: 11.5, color: c.textSecond, marginTop: 2 }}>{a.desc}</div>
                      <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row — charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

            {/* Student Growth */}
            <div className="card-hover" style={card}>
              <div style={{ padding: '20px 22px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Student Growth</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Monthly trend — last 6 months</div>
                <div style={{ height: 120 }}>
                  <Line
                    data={{
                      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
                      datasets: [{
                        data: [3000,3200,4000,5500,8500,12450],
                        borderColor: c.accent,
                        backgroundColor: (ctx: any) => {
                          const g = ctx.chart.ctx.createLinearGradient(0,0,0,120)
                          g.addColorStop(0, 'rgba(59,110,246,.15)')
                          g.addColorStop(1, 'rgba(59,110,246,0)')
                          return g
                        },
                        fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: c.accent, borderWidth: 2,
                      }]
                    }}
                    options={{
                      responsive: true, maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 9.5 }, color: c.textMuted } } },
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.green, marginTop: 12 }}>↗ 24.5% overall increase</div>
              </div>
            </div>

            {/* Partner Ecosystem */}
            <div className="card-hover" style={card}>
              <div style={{ padding: '20px 22px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Partner Ecosystem</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Distribution by type</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div style={{ width: 96, height: 96, position: 'relative', flexShrink: 0 }}>
                    <Doughnut
                      data={{ labels: ['Schools','NGOs','Companies'], datasets: [{ data: [45,35,20], backgroundColor: [c.accent,'#06b6d4','#8b5cf6'], borderWidth: 0, hoverOffset: 4 }] }}
                      options={{ responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: c.textPrimary, lineHeight: 1 }}>56</div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: c.textMuted, letterSpacing: '.5px', marginTop: 2 }}>TOTAL</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[['Schools','45%',c.accent],['NGOs','35%','#06b6d4'],['Companies','20%','#8b5cf6']].map(([lbl,pct,col],i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: col }} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: c.textPrimary }}>{lbl}</span>
                          </div>
                          <span style={{ fontSize: 11.5, color: c.textMuted }}>{pct}</span>
                        </div>
                        <div style={{ height: 4, borderRadius: 4, background: c.surfaceAlt, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: pct, background: col, borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Health */}
            <div className="card-hover" style={{ ...card, background: 'linear-gradient(145deg,#1e3a8a 0%,#1d4ed8 60%,#0ea5e9 100%)', border: 'none', boxShadow: '0 4px 20px rgba(37,99,235,.25)' }}>
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s ease infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>All Systems Operational</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Platform Health</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginBottom: 18 }}>Running at optimal performance. Security protocols are current.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {[['Uptime','99.9%','#4ade80'],['Security','Active','#67e8f9'],['Last Backup','12 Apr 2024','rgba(255,255,255,.5)']].map(([lbl,val,col],i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.35)', fontWeight: 500 }}>{lbl}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: col }}>{val}</span>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: 'auto', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', borderRadius: 9, padding: '9px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'background .15s' }}>
                  ↓ Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Active Platform Youth Initiatives */}
          <div className="card-hover" style={card}>
            <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Youth Initiatives</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Milestone percentage of approved community proposals</div>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 20, padding: '5px 14px' }}>4 Active</span>
            </div>
            <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { sdg: 13, color: '#3f7e44', title: 'Urban Reforestation & Heat Audits',      lead: 'Oakridge Science High',       pct: 84, students: 400 },
                { sdg: 4,  color: '#c5192d', title: 'Rural Digital Literacy Labs',             lead: 'Youth Empowerment Initiative', pct: 68, students: 130 },
                { sdg: 6,  color: '#26bde2', title: 'Clean Reservoir Bio-plastic Filters',     lead: 'Green Horizon Alliance',      pct: 41, students: 64  },
                { sdg: 7,  color: '#fcc30b', title: 'Solar Rechargeable Reading Luminaires',   lead: 'Solaris Global Renewables',   pct: 92, students: 200 },
              ].map((item, i) => (
                <div key={i} style={{ border: `1px solid ${c.border}`, borderRadius: 11, padding: '16px', background: c.surfaceAlt, transition: 'border-color .15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: c.textMuted }}>{item.students} Students</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 11.5, color: c.accentText, marginBottom: 14 }}>Lead: {item.lead}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 500 }}>Audit Phase</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: c.textPrimary }}>{item.pct}% completed</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Request  */}
          <div className="card-hover" style={card}>
            <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>Partnership Request</div>
                 <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Approval of entities</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.accentText, cursor: 'pointer', whiteSpace: 'nowrap' }}>Open Review Center &rsaquo;</span>
            </div>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 2fr 1.5fr', gap: 8, padding: '10px 22px', borderBottom: `1px solid ${c.border}`, background: c.surfaceAlt }}>
              {['Organization','Category','Registry Inquiry Date','Target SDGs','Actions'].map((h, i) => (
                <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: i === 4 ? 'right' : 'left' }}>{h}</div>
              ))}
            </div>
            {[
              { org: 'Apex Eco-Logistics Corp',       date: '2026-06-08', category: 'COMPANY', catColor: '#7c3aed', catBg: 'rgba(124,58,237,.1)',  sdgs: [{n:7,c:'#fcc30b'},{n:13,c:'#3f7e44'}] },
              { org: 'Riverdale Eco-Secondary School', date: '2026-06-10', category: 'SCHOOL',  catColor: '#d97706', catBg: 'rgba(217,119,6,.1)',   sdgs: [{n:4,c:'#c5192d'},{n:6,c:'#26bde2'},{n:13,c:'#3f7e44'},{n:15,c:'#56c02b'}] },
            ].map((row, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 2fr 1.5fr', gap: 8, padding: '15px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{row.org}</span>
                </div>
                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: c.textPrimary, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 6, padding: '4px 10px', letterSpacing: '.4px' }}>{row.category}</span>
                </div>
                <div style={{ fontSize: 12.5, color: c.textSecond, fontWeight: 500 }}>{row.date}</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {row.sdgs.map((s, j) => (
                    <span key={j} style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: s.c, borderRadius: 5, padding: '3px 8px' }}>SDG {s.n}</span>
                  ))}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, background: c.accentLight, border: `1px solid ${c.accent}30`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', transition: 'background .15s' }}>
                    Inspect Application
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${c.border}`, background: c.surface, padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: c.textPrimary }}>StepUp SDG Platform <span style={{ fontWeight: 400, color: c.textMuted }}>© 2026</span></div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: c.red }}>Restricted — Authorized Admins Only</div>

        </footer>

        {children}
      </div>
    </div>
  )
}
