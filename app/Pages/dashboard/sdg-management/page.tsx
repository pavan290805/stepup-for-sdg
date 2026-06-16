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
    <div style={{ padding: 24 }}>

      {/* Page heading */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>SDG Management</h1>
        <p style={{ fontSize: 12, color: '#9aa3ad' }}>Configure goals, activities and impact</p>
      </div>

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

      {/* Content */}
      <div>
        {activeTab === 'info' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#6b7888' }}>Manage the 17 SDG information pages shown to visitors</p>
              <button style={{
                background: '#0f3460', color: 'white', border: 'none',
                borderRadius: 8, padding: '9px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
              }}>
                + Add Page Content
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { num: 1, name: 'No Poverty', color: '#e5243b', status: 'Published' },
                { num: 2, name: 'Zero Hunger', color: '#dda63a', status: 'Published' },
                { num: 3, name: 'Good Health', color: '#4c9f38', status: 'Published' },
                { num: 4, name: 'Quality Education', color: '#c5192d', status: 'Published' },
                { num: 5, name: 'Gender Equality', color: '#ff3a21', status: 'Draft' },
                { num: 6, name: 'Clean Water', color: '#26bde2', status: 'Published' },
                { num: 7, name: 'Clean Energy', color: '#fcc30b', status: 'Published' },
                { num: 8, name: 'Decent Work', color: '#a21942', status: 'Draft' },
                { num: 9, name: 'Industry & Innovation', color: '#fd6925', status: 'Published' },
                { num: 10, name: 'Reduced Inequality', color: '#dd1367', status: 'Published' },
                { num: 11, name: 'Sustainable Cities', color: '#fd9d24', status: 'Draft' },
                { num: 12, name: 'Responsible Consumption', color: '#bf8b2e', status: 'Published' },
                { num: 13, name: 'Climate Action', color: '#3f7e44', status: 'Published' },
                { num: 14, name: 'Life Below Water', color: '#0a97d9', status: 'Draft' },
                { num: 15, name: 'Life on Land', color: '#56c02b', status: 'Published' },
                { num: 16, name: 'Peace & Justice', color: '#00689d', status: 'Published' },
                { num: 17, name: 'Partnerships', color: '#19486a', status: 'Published' },
              ].map((sdg) => (
                <div key={sdg.num} style={{
                  background: 'white', borderRadius: 12, padding: 16,
                  border: '1px solid #eef0f2', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: sdg.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 13, fontWeight: 700
                    }}>
                      {sdg.num}
                    </div>
                    <span style={{
                      fontSize: 9.5, fontWeight: 600, padding: '3px 8px', borderRadius: 5,
                      background: sdg.status === 'Published' ? '#e6f7ec' : '#fff3e0',
                      color: sdg.status === 'Published' ? '#00b050' : '#f4b400'
                    }}>
                      {sdg.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', marginBottom: 2 }}>{sdg.name}</div>
                  <div style={{ fontSize: 11, color: '#9aa3ad' }}>SDG {sdg.num}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'activities' && <div>Activities content</div>}
        {activeTab === 'cases' && <div>Case Studies content</div>}
        {activeTab === 'opportunities' && <div>Opportunities content</div>}
        {activeTab === 'impact' && <div>Impact content</div>}
        {activeTab === 'campaigns' && <div>Campaigns content</div>}
      </div>

    </div>
  )
}
