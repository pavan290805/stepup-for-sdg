'use client'

import { useState } from 'react'

export default function SDGManagementPage() {
  const [activeTab, setActiveTab] = useState('info')

  const tabs = [
    { id: 'info', label: 'SDG Info Pages' },
    { id: 'activities', label: 'Activities & Events' },
    { id: 'cases', label: 'Case Studies' },
    { id: 'opportunities', label: 'Contribution Opportunities' },
    { id: 'impact', label: 'Impact Monitor' },
    { id: 'campaigns', label: 'Awareness Campaigns' },
  ]

  return (
    <div>
      {/* Topbar matching your dashboard style */}
      <header style={{
        height: 64, background: 'white', borderBottom: '1px solid #eef0f2',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', position: 'sticky', top: 0, zIndex: 50
      }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e' }}>SDG Management</h1>
          <p style={{ fontSize: 12, color: '#9aa3ad', marginTop: 1 }}>Configure goals, activities and impact</p>
        </div>
      </header>

      <div style={{ padding: 24 }}>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex', gap: 4, background: 'white',
          borderRadius: 12, padding: 6, border: '1px solid #eef0f2',
          marginBottom: 24, width: 'fit-content', overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '9px 16px', borderRadius: 8, border: 'none',
                background: activeTab === tab.id ? '#0f3460' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7888',
                fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content area - filled in next commits */}
        <div>
          {activeTab === 'info' && <div>SDG Info Pages content</div>}
          {activeTab === 'activities' && <div>Activities content</div>}
          {activeTab === 'cases' && <div>Case Studies content</div>}
          {activeTab === 'opportunities' && <div>Opportunities content</div>}
          {activeTab === 'impact' && <div>Impact content</div>}
          {activeTab === 'campaigns' && <div>Campaigns content</div>}
        </div>

      </div>
    </div>
  )
}