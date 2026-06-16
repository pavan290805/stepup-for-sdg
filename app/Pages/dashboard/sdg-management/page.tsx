'use client'

import { useState } from 'react'

// Add new project-related SDGs here — they auto-appear everywhere
const sdgs = [
  { num: 4,  name: 'Quality Education',         color: '#c5192d', campaigns: 12 },
  { num: 13, name: 'Climate Action',            color: '#3f7e44', campaigns: 15 },
  { num: 7,  name: 'Affordable & Clean Energy', color: '#fcc30b', campaigns: 7  },
  { num: 6,  name: 'Clean Water & Sanitation',  color: '#26bde2', campaigns: 5  },
  { num: 3,  name: 'Good Health and Well-being',color: '#4c9f38', campaigns: 6  },
  { num: 5,  name: 'Gender Equality',           color: '#ff3a21', campaigns: 3  },
]

const detailData: Record<number, { desc: string, pts: string, youths: string, awareCampaigns: string, themeColor: string, cases: { id: string, title: string, desc: string, outcome: string }[], activities: { title: string, date: string, location: string, category: string, subscribers: number }[] }> = {
  14: {
    desc: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.',
    pts: '3,100 pts', youths: '198 youths', awareCampaigns: '2 active', themeColor: '#0a97d9',
    cases: [{ id: 'CASE #14-1 • COASTAL REEF BARRIER • 2024', title: 'Artificial Coral Reef Sinking Project', desc: 'Marine biology students assisted with remote underwater camera tracking and health charting.', outcome: 'Outcome Secured: Placed 30 bio-compatible structural dome clusters resulting in 200% increment of fish variety in 12 months.' }],
    activities: [{ title: 'Seashore Plastic Micro-audit', date: '2026-06-29', location: 'North Coast Marine Area', category: 'VOLUNTEER', subscribers: 48 }],
  },
}

function getDetail(num: number) {
  return detailData[num] ?? {
    desc: `Support and accelerate progress on SDG ${num} through youth-led initiatives and community campaigns.`,
    pts: '2,400 pts', youths: '120 youths', awareCampaigns: '3 active', themeColor: sdgs.find(s => s.num === num)?.color ?? '#333',
    cases: [{ id: `COMMUNITY PROJECT • 2026`, title: 'Community Impact Initiative', desc: 'Students collaborated on field research and data collection for measurable outcomes.', outcome: 'Outcome Secured: Successfully engaged 50+ volunteers with measurable community impact.' }],
    activities: [{ title: 'Community Awareness Drive', date: '2026-07-10', location: 'Local Community Center', category: 'VOLUNTEER', subscribers: 32 }],
  }
}

export default function SDGManagementPage() {
  const [activeTab, setActiveTab] = useState('info')
  const [selectedSDG, setSelectedSDG] = useState(4)

  const tabs = [
    { id: 'info', label: 'SDG Info Pages' },
    { id: 'impact', label: 'Impact Monitor' },
    { id: 'campaigns', label: 'Awareness Campaigns' },
  ]

  const sdg = sdgs.find(s => s.num === selectedSDG)!
  const detail = getDetail(selectedSDG)

  return (
    <div style={{ padding: 24 }}>

      {/* Page heading */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>SDG Management</h1>
        <p style={{ fontSize: 12, color: '#9aa3ad' }}>Configure goals, activities and impact</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, background: 'white', borderRadius: 12, padding: 6, border: '1px solid #eef0f2', marginBottom: 24, width: 'fit-content', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '9px 16px', borderRadius: 8, border: 'none',
            background: activeTab === tab.id ? '#0f3460' : 'transparent',
            color: activeTab === tab.id ? 'white' : '#6b7888',
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'info' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>UN SDG Directory</div>
            <div style={{ fontSize: 11.5, color: '#9aa3ad', marginBottom: 16, lineHeight: 1.5 }}>Select any active Global Goal to configure and manage registered youth campaigns.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sdgs.map(s => (
                <div key={s.num} onClick={() => setSelectedSDG(s.num)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                  background: selectedSDG === s.num ? s.color : 'transparent',
                  border: selectedSDG === s.num ? 'none' : '1px solid transparent',
                  transition: 'all 0.15s',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, backgroundColor: s.color, position: 'relative' }}>
                    <img
                      src={`/images/${['Screenshot 2026-06-11 115515.png','Screenshot 2026-06-11 115540.png','Screenshot 2026-06-11 115551.png','Screenshot 2026-06-11 115603.png','Screenshot 2026-06-11 115612.png','Screenshot 2026-06-11 115626.png','Screenshot 2026-06-11 115637.png','Screenshot 2026-06-11 115649.png','Screenshot 2026-06-11 115658.png','Screenshot 2026-06-11 115708.png','Screenshot 2026-06-11 115719.png','Screenshot 2026-06-11 115731.png','Screenshot 2026-06-11 115740.png','Screenshot 2026-06-11 115757.png','Screenshot 2026-06-11 115805.png','Screenshot 2026-06-11 115825.png','Screenshot 2026-06-11 115839.png'][s.num - 1]}`}
                      alt={`SDG ${s.num}`}
                      style={{ position: 'absolute', top: '-12%', left: '-12%', width: '124%', height: '124%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: selectedSDG === s.num ? 'rgba(255,255,255,.7)' : '#9aa3ad', letterSpacing: '0.5px' }}>SDG {s.num}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: selectedSDG === s.num ? '#fff' : '#1a1a2e' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: selectedSDG === s.num ? 'rgba(255,255,255,.6)' : '#9aa3ad' }}>{s.campaigns} active campaigns</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAIL PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Header card */}
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,.05)', borderTop: `4px solid ${sdg.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'white', background: sdg.color, borderRadius: 6, padding: '3px 10px' }}>SDG {sdg.num}</span>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{sdg.name} Configuration Area</h2>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#444', background: 'white', border: '1px solid #e0e0e0', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}>
                  ✏️ Configure Metadata
                </button>
              </div>
              <p style={{ fontSize: 13, color: '#6b7888', marginBottom: 20 }}>{detail.desc}</p>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'METRICS MANAGED', value: detail.pts },
                  { label: 'STUDENT FORCE', value: detail.youths },
                  { label: 'AWARENESS CAMPAIGNS', value: detail.awareCampaigns },
                ].map((stat, i) => (
                  <div key={i} style={{ border: '1px solid #eef0f2', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: '#9aa3ad', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Case Studies</div>
                  <div style={{ fontSize: 11.5, color: '#9aa3ad', marginTop: 3 }}>Public success stories showing measurable NGO performance.</div>
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: 'white', background: '#0f3460', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
                  + Sponsor Case Study
                </button>
              </div>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {detail.cases.map((c, i) => (
                  <div key={i} style={{ border: '1px solid #e0e9ff', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#0066cc', background: '#e6f0ff', borderRadius: 5, padding: '3px 8px', letterSpacing: '0.5px' }}>{c.id}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 10, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: '#6b7888', marginBottom: 10 }}>{c.desc}</div>
                    <div style={{ fontSize: 11.5, color: '#1a7a4a', background: '#e6f7ec', borderRadius: 7, padding: '8px 12px', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <span>{c.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Youth Contribution Activities & Campaigns</div>
                  <div style={{ fontSize: 11.5, color: '#9aa3ad', marginTop: 3 }}>Interactive ecological assignments open to schools and individuals.</div>
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: 'white', background: sdg.color, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
                  + Schedule Event
                </button>
              </div>
              {/* Table */}
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.5fr 1fr 1fr 0.5fr', gap: 8, padding: '8px 12px', background: '#f8f9fc', borderRadius: 8, marginBottom: 4 }}>
                  {['CAMPAIGN TITLE','SCHEDULING DATE','LOCATION VENUE','CATEGORY','SUBSCRIBERS','ACTION'].map((h, i) => (
                    <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#9aa3ad', letterSpacing: '0.5px' }}>{h}</div>
                  ))}
                </div>
                {detail.activities.map((a, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.5fr 1fr 1fr 0.5fr', gap: 8, padding: '12px 12px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.title}</span>
                    <span style={{ fontSize: 12, color: '#6b7888' }}>{a.date}</span>
                    <span style={{ fontSize: 12, color: '#6b7888' }}>{a.location}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0066cc', background: '#e6f0ff', borderRadius: 5, padding: '3px 8px', width: 'fit-content' }}>{a.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>👤</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{a.subscribers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: '#6b7888' }}>Organize SDG-aligned activities and upcoming events</p>
            <button style={{ background: '#0f3460', color: 'white', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ New Activity</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Beach Cleanup Drive', sdg: 'SDG 14', date: '22 Jun 2026', location: 'Visakhapatnam Coast', participants: 84, status: 'Upcoming' },
              { title: 'Tree Plantation Marathon', sdg: 'SDG 13', date: '15 Jun 2026', location: 'KL University Campus', participants: 210, status: 'Ongoing' },
              { title: 'Digital Literacy Workshop', sdg: 'SDG 4', date: '02 Jun 2026', location: 'Govt School, Vijayawada', participants: 56, status: 'Completed' },
            ].map((act, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: 18, border: '1px solid #eef0f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{act.title}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 600, padding: '3px 8px', borderRadius: 5, background: '#e6f0ff', color: '#0066cc' }}>{act.sdg}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: '#9aa3ad' }}>{act.date} · {act.location} · {act.participants} participants</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 6, background: act.status === 'Upcoming' ? '#fff3e0' : act.status === 'Ongoing' ? '#e6f7fb' : '#e6f7ec', color: act.status === 'Upcoming' ? '#f4b400' : act.status === 'Ongoing' ? '#00a8a8' : '#00b050' }}>{act.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cases' && <div style={{ color: '#9aa3ad', fontSize: 13 }}>Case Studies content</div>}
      {activeTab === 'opportunities' && <div style={{ color: '#9aa3ad', fontSize: 13 }}>Opportunities content</div>}
      {activeTab === 'impact' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>SDG Impact Monitor</div>
              <div style={{ fontSize: 12, color: '#9aa3ad', marginTop: 3 }}>Track real-time progress across all 17 goals</div>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Total Impact Points', value: '48,320', color: '#3b6ef6', sub: '+12% this month' },
              { label: 'Active Youth Volunteers', value: '2,140', color: '#10b981', sub: '+34 this week' },
              { label: 'Projects Completed', value: '89', color: '#f59e0b', sub: 'Across 17 SDGs' },
              { label: 'Schools Engaged', value: '142', color: '#8b5cf6', sub: '+5 new schools' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', borderTop: `3px solid ${s.color}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9aa3ad', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>↑ {s.sub}</div>
              </div>
            ))}
          </div>

          {/* Per-SDG Impact Table */}
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #eef0f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Impact Breakdown by SDG</div>
              <button style={{ fontSize: 12, fontWeight: 600, color: '#0f3460', background: '#e6f0ff', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}>↓ Export Report</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1.5fr', gap: 8, padding: '10px 22px', background: '#f8f9fc', borderBottom: '1px solid #eef0f2' }}>
              {['#', 'SDG GOAL', 'IMPACT PTS', 'VOLUNTEERS', 'PROJECTS', 'PROGRESS'].map((h, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#9aa3ad', letterSpacing: '0.5px' }}>{h}</div>
              ))}
            </div>
            {[
              { num: 4,  name: 'Quality Education',         color: '#c5192d', pts: 9500,  volunteers: 420, projects: 18, pct: 100 },
              { num: 13, name: 'Climate Action',            color: '#3f7e44', pts: 7200,  volunteers: 380, projects: 15, pct: 76  },
              { num: 7,  name: 'Affordable & Clean Energy', color: '#fcc30b', pts: 6280,  volunteers: 210, projects: 12, pct: 66  },
              { num: 6,  name: 'Clean Water & Sanitation',  color: '#26bde2', pts: 4500,  volunteers: 160, projects: 9,  pct: 47  },
              { num: 3,  name: 'Good Health & Well-being',  color: '#4c9f38', pts: 3820,  volunteers: 198, projects: 7,  pct: 40  },
              { num: 5,  name: 'Gender Equality',           color: '#ff3a21', pts: 2280,  volunteers: 95,  projects: 5,  pct: 24  },
              { num: 1,  name: 'No Poverty',                color: '#e5243b', pts: 1420,  volunteers: 74,  projects: 4,  pct: 15  },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1.5fr', gap: 8, padding: '14px 22px', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: row.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>{row.num}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{row.pts.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: '#6b7888' }}>{row.volunteers}</span>
                <span style={{ fontSize: 13, color: '#6b7888' }}>{row.projects}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 4, background: '#f0f0f0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#111827', minWidth: 32 }}>{row.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Awareness Campaigns</div>
              <div style={{ fontSize: 12, color: '#9aa3ad', marginTop: 3 }}>Manage and track all SDG awareness drives across schools and communities</div>
            </div>
            <button style={{ fontSize: 12, fontWeight: 600, color: 'white', background: '#0f3460', border: 'none', borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>+ New Campaign</button>
          </div>

          {/* Campaign Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Total Campaigns', value: '24', sub: '8 active now', color: '#3b6ef6' },
              { label: 'Total Reach', value: '18,400', sub: 'Students & volunteers', color: '#10b981' },
              { label: 'Completion Rate', value: '73%', sub: 'Of scheduled campaigns', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#9aa3ad', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#6b7888' }}>{s.sub}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {''}
                </div>
              </div>
            ))}
          </div>

          {/* Campaigns Table */}
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: 8, padding: '10px 22px', background: '#f8f9fc', borderBottom: '1px solid #eef0f2' }}>
              {['CAMPAIGN', 'SDG', 'TYPE', 'REACH', 'STATUS', 'ACTION'].map((h, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#9aa3ad', letterSpacing: '0.5px' }}>{h}</div>
              ))}
            </div>
            {[
              { name: 'Clean Ocean Awareness Week',     sdg: 14, color: '#0a97d9', type: 'Social Media',  reach: 3200, status: 'Active'    },
              { name: 'Zero Hunger School Drive',       sdg: 2,  color: '#dda63a', type: 'On-Ground',     reach: 1800, status: 'Active'    },
              { name: 'Climate Change Youth Summit',    sdg: 13, color: '#3f7e44', type: 'Event',         reach: 5400, status: 'Upcoming'  },
              { name: 'Girls in STEM Initiative',       sdg: 5,  color: '#ff3a21', type: 'Workshop',      reach: 920,  status: 'Active'    },
              { name: 'Green Energy Poster Contest',    sdg: 7,  color: '#fcc30b', type: 'Social Media',  reach: 2100, status: 'Completed' },
              { name: 'Clean Water Village Project',    sdg: 6,  color: '#26bde2', type: 'On-Ground',     reach: 640,  status: 'Upcoming'  },
              { name: 'Digital Literacy for All',       sdg: 4,  color: '#c5192d', type: 'Workshop',      reach: 4300, status: 'Completed' },
            ].map((row, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: 8, padding: '14px 22px', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'white', background: row.color, borderRadius: 5, padding: '3px 8px', width: 'fit-content' }}>SDG {row.sdg}</span>
                <span style={{ fontSize: 12, color: '#6b7888' }}>{row.type}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.reach.toLocaleString()}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, width: 'fit-content',
                  background: row.status === 'Active' ? '#e6f7ec' : row.status === 'Upcoming' ? '#fff3e0' : '#f0f0f0',
                  color: row.status === 'Active' ? '#00b050' : row.status === 'Upcoming' ? '#f4b400' : '#888'
                }}>{row.status}</span>
                <button style={{ fontSize: 11, fontWeight: 600, color: '#0f3460', background: '#e6f0ff', border: 'none', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}>View</button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
