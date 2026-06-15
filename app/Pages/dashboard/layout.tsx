'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Target, Users, FileCheck, Phone, LogOut, Moon, Bell, Settings, AlertCircle, GraduationCap, School, CheckCircle, Heart } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const session = localStorage.getItem('stepup_admin_session')
    if (!session) router.push('/Pages/login')
  }, [])

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/Pages/dashboard' },
    { icon: Target, label: 'SDG Management', href: '/Pages/dashboard/sdg-management' },
    { icon: Users, label: 'Partner Management', href: '/Pages/dashboard/partners' },
    { icon: FileCheck, label: 'Partnership Review', href: '/Pages/dashboard/partnership-review' },
    { icon: Phone, label: 'Contact Centre', href: '/Pages/dashboard/contact' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('stepup_admin_session')
    window.location.href = '/Pages/login'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: 240, display: 'flex', flexDirection: 'column',
        position: 'fixed', height: '100vh',
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
      }}>

        {/* Brand */}
        <div style={{ padding: '28px 24px 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>StepUp</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>SDG Platform</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '4px 14px' }}>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 14px', borderRadius: 12, marginBottom: 4,
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  backdropFilter: isActive ? 'blur(8px)' : 'none',
                  cursor: 'pointer', transition: 'all 0.18s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <item.icon size={16} strokeWidth={1.8} color={isActive ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                    <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)' }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Illustration */}
        <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'center' }}>
          <style>{`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <img
            src="/PPP SDG.png"
            alt="SDG"
            style={{ width: '100%', borderRadius: 16, opacity: 0.9, objectFit: 'contain', animation: 'spin-slow 20s linear infinite' }}
          />
        </div>

        {/* User + logout */}
        <div style={{ padding: '12px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00b8d4, #7b61ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 13, fontWeight: 700
              }}>A</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>Alex Rivera</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Super Admin</div>
              </div>
            </div>
            <div onClick={handleLogout} style={{ cursor: 'pointer', padding: 6 }}>
              <LogOut size={14} color="rgba(255,255,255,0.35)" strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1, marginLeft: 240 }}>
        {/* Topbar */}
        <header style={{
          height: 64, background: 'white', borderBottom: '1px solid #eef0f2',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px'
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#9aa3ad' }}>Admin Dashboard</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Moon size={18} color="#9aa3ad" style={{ cursor: 'pointer' }} />
            <div style={{ position: 'relative' }}>
              <Bell size={18} color="#9aa3ad" style={{ cursor: 'pointer' }} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: '#00b8d4' }} />
            </div>
            <Settings size={18} color="#9aa3ad" style={{ cursor: 'pointer' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', textAlign: 'right' }}>Alex Rivera</div>
                <div style={{ fontSize: 10, color: '#9aa3ad', textAlign: 'right' }}>Super Admin</div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00b8d4, #0f3460)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14, fontWeight: 600
              }}>
                A
              </div>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div style={{
          background: '#e6f7fb', border: '1px solid #b3e8f2',
          borderRadius: 14, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24, margin: '24px 28px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertCircle size={20} color="#00b8d4" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f3460' }}>Awaiting Your Action</div>
              <div style={{ fontSize: 12, color: '#6b7888', marginTop: 2 }}>
                There are 12 new partner applications and 4 project reviews pending.
              </div>
            </div>
          </div>
          <button style={{
            background: '#0f3460', color: 'white', border: 'none',
            borderRadius: 8, padding: '10px 18px', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            Review Now →
          </button>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '24px 28px 0' }}>
          {[
            { icon: GraduationCap, label: 'TOTAL STUDENTS', value: '12,450', tag: '+12%', tagColor: '#00b050', iconBg: '#e6f7fb', iconColor: '#00b8d4' },
            { icon: School, label: 'SCHOOLS SUPPORTED', value: '142', tag: '+5', tagColor: '#00b050', iconBg: '#e6f7fb', iconColor: '#00b8d4' },
            { icon: CheckCircle, label: 'PROJECTS COMPLETED', value: '89', tag: 'Stable', tagColor: '#9aa3ad', iconBg: '#fff3e0', iconColor: '#f4b400' },
            { icon: Heart, label: 'ACTIVE PARTNERS', value: '56', tag: '+3', tagColor: '#00b050', iconBg: '#fde8ec', iconColor: '#ff5e5b' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid #eef0f2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: stat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <stat.icon size={18} color={stat.iconColor} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: stat.tagColor }}>{stat.tag}</span>
              </div>
              <div style={{ fontSize: 11, color: '#9aa3ad', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Impact Across 17 SDGs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, margin: '24px 28px 0' }}>
          <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #eef0f2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>Impact Across 17 SDGs</h3>
              <span style={{ fontSize: 11, background: '#f5f7fa', color: '#9aa3ad', padding: '4px 10px', borderRadius: 6 }}>Year 2024</span>
            </div>
            <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4, padding: '0 4px' }}>
              {Array.from({ length: 17 }, (_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: '60%', height: `${30 + Math.random() * 130}px`,
                    background: ['#c03538','#d63384','#00b050','#0066cc','#ff7a00','#00a8a8','#f4b400','#8cc63f','#ff5e5b','#7b61ff','#0cc0df','#1d5948','#c03538','#0066cc','#00a8a8','#f4b400','#7b61ff'][i],
                    borderRadius: '4px 4px 0 0', opacity: 0.85
                  }} />
                  <span style={{ fontSize: 9, color: '#9aa3ad', marginTop: 4 }}>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity placeholder for commit 6 */}
          <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #eef0f2' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>Recent Activity</h3>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}