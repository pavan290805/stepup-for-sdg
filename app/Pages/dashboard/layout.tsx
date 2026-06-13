'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Target, Users, FileCheck, Phone, LogOut } from 'lucide-react'

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
      <aside style={{ width: 220, background: '#0f3460', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        
        {/* Logo */}
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: '#00b8d4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
            S
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>SDG Platform</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 12px' }}>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 8,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                  background: isActive ? '#00b8d4' : 'transparent',
                  fontSize: 13, fontWeight: 500, marginBottom: 2, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <item.icon size={17} />
                  {item.label}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 8,
            color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 500, cursor: 'pointer'
          }}>
            <LogOut size={17} />
            Logout
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1, marginLeft: 220 }}>
        {children}
      </div>
    </div>
  )
}