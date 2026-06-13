'use client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      <aside style={{ width: 260, background: '#0d1117' }}>
        Sidebar
      </aside>
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}