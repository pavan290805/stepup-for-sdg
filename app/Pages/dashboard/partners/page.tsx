'use client'

import { useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import { usePartners } from '../PartnersContext'

const SDG_COLORS: Record<string, string> = {
  'SDG 1': '#e5243b', 'SDG 2': '#dda63a', 'SDG 3': '#4c9f38', 'SDG 4': '#c5192d',
  'SDG 5': '#ff3a21', 'SDG 6': '#26bde2', 'SDG 7': '#fcc30b', 'SDG 8': '#a21942',
  'SDG 9': '#fd6925', 'SDG 10': '#dd1367', 'SDG 11': '#fd9d24', 'SDG 12': '#bf8b2e',
  'SDG 13': '#3f7e44', 'SDG 14': '#0a97d9', 'SDG 15': '#56c02b', 'SDG 16': '#00689d', 'SDG 17': '#19486a',
}

export default function PartnerManagementPage() {
  const { dark } = useDashboardTheme()
  const { partners, setPartners } = usePartners()
  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#eef0f2',
    textPrimary: dark ? '#f0f2f8' : '#1a1a2e',
    textSecond:  dark ? '#8891aa' : '#6b7888',
    textMuted:   dark ? '#4a5168' : '#9aa3ad',
    inputBg:     dark ? '#1f2335' : '#ffffff',
    inputBorder: dark ? 'rgba(255,255,255,.12)' : '#e0e0e0',
  }
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: `1px solid ${c.inputBorder}`, fontSize: 13, outline: 'none', boxSizing: 'border-box',
    background: c.inputBg, color: c.textPrimary
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11.5, fontWeight: 600, color: c.textSecond, marginBottom: 4, display: 'block'
  }
  const [view, setView] = useState<'table' | 'cards'>('cards')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [registry, setRegistry] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [partnerTab, setPartnerTab] = useState<'school' | 'company' | 'ngo' | 'volunteer'>('school')
  const [form, setForm] = useState({
    name: '', sector: 'SCHOOL', type: 'school', focus: '', location: '',
    email: '', phone: '', website: '', sdgs: '' as string, desc: '', img: '',
    // school-specific
    principalName: '', studentCount: '', gradeRange: '',
    // company-specific
    industry: '', companySize: '', csr: '',
    // ngo-specific
    regNumber: '', foundedYear: '', impactArea: '',
    // volunteer-specific
    volunteerName: '', skills: '', availability: ''
  })

  const filteredPartners = partners
    .map((p, realIdx) => ({ ...p, realIdx }))
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.focus.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || p.type === filter
      const matchesRegistry = registry === 'all' || (registry === 'pending' && !p.verified) || (registry === 'verified' && p.verified)
      return matchesSearch && matchesFilter && matchesRegistry
    })

  const toggleVisible = (realIdx: number) => setPartners(ps => ps.map((p, idx) => idx === realIdx ? { ...p, visible: !p.visible } : p))
  const toggleVerified = (realIdx: number) => setPartners(ps => ps.map((p, idx) => idx === realIdx ? { ...p, verified: !p.verified } : p))
  const deletePartner = (realIdx: number) => setPartners(ps => ps.filter((_, idx) => idx !== realIdx))

  const openEdit = (realIdx: number) => {
    const p = partners[realIdx]
    setForm({ name: p.name, sector: p.sector, type: p.type, focus: p.focus, location: p.location, email: p.email, phone: p.phone, website: (p as any).website || '', sdgs: p.sdgs.join(', '), desc: p.desc, img: p.img })
    setEditIdx(realIdx)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditIdx(null)
    setPartnerTab('school')
    setForm({ name: '', sector: 'SCHOOL', type: 'school', focus: '', location: '', email: '', phone: '', website: '', sdgs: '', desc: '', img: '', principalName: '', studentCount: '', gradeRange: '', industry: '', companySize: '', csr: '', regNumber: '', foundedYear: '', impactArea: '', volunteerName: '', skills: '', availability: '' })
  }

  const handleAdd = () => {
    if (!form.name.trim()) return
    const sdgs = form.sdgs.split(',').map(s => s.trim()).filter(Boolean)
    const img = form.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=0066cc&color=fff&size=80`
    if (editIdx !== null) {
      setPartners(ps => ps.map((p, idx) => idx === editIdx ? { ...p, ...form, sdgs, img } : p))
    } else {
      setPartners(ps => [...ps, { ...form, sdgs, verified: false, visible: true, img }])
    }
    closeModal()
  }

  return (
    <div style={{ minHeight: '100vh', background: c.bg }}>

      {/* Modal */}
      {showModal && (
        <div onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.surface, borderRadius: 16, padding: 28, width: 540, maxWidth: '95vw', boxShadow: '0 8px 40px rgba(0,0,0,.35)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, marginBottom: 16 }}>{editIdx !== null ? 'Edit Partner' : 'Register New Partner'}</div>

            {/* Tabs — only show when registering new */}
            {editIdx === null && (
              <div style={{ display: 'flex', gap: 4, background: c.surfaceAlt, borderRadius: 10, padding: 4, marginBottom: 20 }}>
                {([['school','School'],['company','Company'],['ngo','NGO'],['volunteer','Volunteer']] as const).map(([id, label]) => (
                  <button key={id} onClick={() => {
                    setPartnerTab(id)
                    setForm(f => ({ ...f, sector: id === 'school' ? 'SCHOOL' : id === 'company' ? 'COMPANY' : id === 'ngo' ? 'NGO' : 'VOLUNTEER', type: id }))
                  }} style={{ flex: 1, padding: '7px 4px', borderRadius: 7, border: 'none', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', background: partnerTab === id ? '#0066cc' : 'transparent', color: partnerTab === id ? 'white' : c.textMuted, transition: 'all .15s' }}>
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>

              {/* ── SCHOOL FORM ── */}
              {partnerTab === 'school' && editIdx === null && (
                <>
                  <div><label style={labelStyle}>School Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Oakridge Science High School" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Principal Name</label><input style={inputStyle} value={form.principalName} onChange={e => setForm({ ...form, principalName: e.target.value })} placeholder="Full name" /></div>
                    <div><label style={labelStyle}>Student Count</label><input style={inputStyle} value={form.studentCount} onChange={e => setForm({ ...form, studentCount: e.target.value })} placeholder="e.g. 1200" /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Grade Range</label><input style={inputStyle} value={form.gradeRange} onChange={e => setForm({ ...form, gradeRange: e.target.value })} placeholder="e.g. Grade 6–12" /></div>
                    <div><label style={labelStyle}>SDG Focus Area</label><input style={inputStyle} value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="e.g. Quality Education" /></div>
                  </div>
                  <div><label style={labelStyle}>Location</label><input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="school@edu.com" /></div>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0000" /></div>
                  </div>
                  <div><label style={labelStyle}>Website</label><input style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://school.edu" /></div>
                  <div><label style={labelStyle}>Aligned SDGs</label><input style={inputStyle} value={form.sdgs} onChange={e => setForm({ ...form, sdgs: e.target.value })} placeholder="SDG 4, SDG 13" /></div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Brief description" /></div>
                </>
              )}

              {/* ── COMPANY FORM ── */}
              {partnerTab === 'company' && editIdx === null && (
                <>
                  <div><label style={labelStyle}>Company Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Solaris Global Renewables" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Industry</label><input style={inputStyle} value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="e.g. Renewable Energy" /></div>
                    <div><label style={labelStyle}>Company Size</label>
                      <select style={inputStyle} value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })}>
                        <option value="">Select size</option>
                        <option>1–50</option><option>51–200</option><option>201–1000</option><option>1000+</option>
                      </select>
                    </div>
                  </div>
                  <div><label style={labelStyle}>CSR Focus</label><input style={inputStyle} value={form.csr} onChange={e => setForm({ ...form, csr: e.target.value })} placeholder="e.g. Clean Energy, Education" /></div>
                  <div><label style={labelStyle}>SDG Focus Area</label><input style={inputStyle} value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="e.g. Affordable Energy" /></div>
                  <div><label style={labelStyle}>Location</label><input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="contact@company.com" /></div>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0000" /></div>
                  </div>
                  <div><label style={labelStyle}>Website</label><input style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://company.com" /></div>
                  <div><label style={labelStyle}>Aligned SDGs</label><input style={inputStyle} value={form.sdgs} onChange={e => setForm({ ...form, sdgs: e.target.value })} placeholder="SDG 7, SDG 13" /></div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Brief description" /></div>
                </>
              )}

              {/* ── NGO FORM ── */}
              {partnerTab === 'ngo' && editIdx === null && (
                <>
                  <div><label style={labelStyle}>NGO Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Green Horizon Alliance" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Registration Number</label><input style={inputStyle} value={form.regNumber} onChange={e => setForm({ ...form, regNumber: e.target.value })} placeholder="e.g. NGO-2024-001" /></div>
                    <div><label style={labelStyle}>Founded Year</label><input style={inputStyle} value={form.foundedYear} onChange={e => setForm({ ...form, foundedYear: e.target.value })} placeholder="e.g. 2010" /></div>
                  </div>
                  <div><label style={labelStyle}>Impact Area</label><input style={inputStyle} value={form.impactArea} onChange={e => setForm({ ...form, impactArea: e.target.value })} placeholder="e.g. Climate, Water, Education" /></div>
                  <div><label style={labelStyle}>SDG Focus Area</label><input style={inputStyle} value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="e.g. Climate Action" /></div>
                  <div><label style={labelStyle}>Location</label><input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@ngo.org" /></div>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0000" /></div>
                  </div>
                  <div><label style={labelStyle}>Website</label><input style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://ngo.org" /></div>
                  <div><label style={labelStyle}>Aligned SDGs</label><input style={inputStyle} value={form.sdgs} onChange={e => setForm({ ...form, sdgs: e.target.value })} placeholder="SDG 6, SDG 13, SDG 15" /></div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Brief description" /></div>
                </>
              )}

              {/* ── VOLUNTEER FORM ── */}
              {partnerTab === 'volunteer' && editIdx === null && (
                <>
                  <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} value={form.volunteerName} onChange={e => setForm({ ...form, volunteerName: e.target.value, name: e.target.value })} placeholder="e.g. Jane Doe" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@email.com" /></div>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0000" /></div>
                  </div>
                  <div><label style={labelStyle}>Location</label><input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>
                  <div><label style={labelStyle}>Skills</label><input style={inputStyle} value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="e.g. Teaching, Data Analysis, Design" /></div>
                  <div><label style={labelStyle}>Availability</label>
                    <select style={inputStyle} value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })}>
                      <option value="">Select availability</option>
                      <option>Weekdays</option><option>Weekends</option><option>Both</option><option>Remote Only</option>
                    </select>
                  </div>
                  <div><label style={labelStyle}>SDG Interest Areas</label><input style={inputStyle} value={form.sdgs} onChange={e => setForm({ ...form, sdgs: e.target.value })} placeholder="SDG 4, SDG 13" /></div>
                  <div><label style={labelStyle}>About You</label><textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Brief bio or motivation" /></div>
                </>
              )}

              {/* Edit form (generic) */}
              {editIdx !== null && (
                <>
                  <div><label style={labelStyle}>Organization Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Sector</label>
                      <select style={inputStyle} value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value, type: e.target.value === 'SCHOOL' ? 'school' : e.target.value === 'COMPANY' ? 'company' : 'ngo' })}>
                        <option value="SCHOOL">School</option><option value="NGO">NGO</option><option value="COMPANY">Company</option>
                      </select>
                    </div>
                    <div><label style={labelStyle}>Focus Area</label><input style={inputStyle} value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} /></div>
                  </div>
                  <div><label style={labelStyle}>Location</label><input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                  </div>
                  <div><label style={labelStyle}>Website</label><input style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} /></div>
                  <div><label style={labelStyle}>Aligned SDGs</label><input style={inputStyle} value={form.sdgs} onChange={e => setForm({ ...form, sdgs: e.target.value })} /></div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></div>
                </>
              )}

            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ fontSize: 13, padding: '9px 20px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, color: c.textPrimary, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAdd} style={{ fontSize: 13, fontWeight: 600, padding: '9px 20px', borderRadius: 8, border: 'none', background: '#0066cc', color: 'white', cursor: 'pointer' }}>{editIdx !== null ? 'Save Changes' : 'Register Partner'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        height: 64, background: c.surface, borderBottom: `1px solid ${c.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 4px rgba(0,0,0,.04)'
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>Partner Management</div>
          <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>Manage NGOs, schools, and corporate partners</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setView(view === 'table' ? 'cards' : 'table')} style={{
            background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8,
            padding: '9px 14px', fontSize: 12, fontWeight: 600, color: c.textPrimary, cursor: 'pointer'
          }}>
            {view === 'table' ? '⊞ Card View' : '☰ Table View'}
          </button>
          <button onClick={() => setShowModal(true)} style={{
            background: '#0066cc', color: 'white', border: 'none',
            borderRadius: 8, padding: '9px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
          }}>
            + Register New Partner
          </button>
        </div>
      </header>

      <div style={{ padding: 24 }}>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 14px', flex: 1, maxWidth: 320 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa3ad" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search partners..." style={{ border: 'none', outline: 'none', fontSize: 13, color: c.textPrimary, width: '100%', background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', gap: 4, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: 4 }}>
              {[
                { id: 'all', label: 'All Sectors' },
                { id: 'school', label: 'Schools' },
                { id: 'ngo', label: 'NGOs' },
                { id: 'company', label: 'Companies' },
                { id: 'volunteer', label: 'Volunteers' },
              ].map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  padding: '7px 14px', borderRadius: 6, border: 'none',
                  background: filter === f.id ? '#0066cc' : 'transparent',
                  color: filter === f.id ? 'white' : c.textMuted,
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .15s'
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <select value={registry} onChange={e => setRegistry(e.target.value)} style={{ border: `1px solid ${c.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 12, color: c.textSecond, background: c.surface, cursor: 'pointer', outline: 'none' }}>
            <option value="all">All Registries</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending Audit</option>
          </select>
        </div>

        {/* Cards View */}
        {view === 'cards' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filteredPartners.map((p) => (
              <div key={p.realIdx} style={{ background: c.surface, borderRadius: 14, padding: '20px 20px 16px', border: `1px solid ${c.border}`, position: 'relative', boxShadow: '0 1px 6px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column', opacity: p.visible ? 1 : 0.5 }}>
                <button onClick={() => deletePartner(p.realIdx)} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', color: '#c0c7cd', fontSize: 16, padding: 4 }}>🗑</button>

                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <img src={p.img} alt={p.name} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0, border: '1px solid #eef0f2' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5,
                        background: p.sector === 'SCHOOL' ? '#fff3e0' : p.sector === 'COMPANY' ? '#f3e8ff' : '#e6f7ec',
                        color: p.sector === 'SCHOOL' ? '#f4b400' : p.sector === 'COMPANY' ? '#7b61ff' : '#00b050'
                      }}>{p.sector}</span>
                      {p.verified
                        ? <span style={{ fontSize: 10, fontWeight: 600, color: '#00b050' }}>✓ Verified Profile</span>
                        : <span style={{ fontSize: 10, fontWeight: 600, color: '#f4b400' }}>⏳ Awaiting Audit</span>
                      }
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, paddingRight: 24 }}>{p.name}</div>
                  </div>
                </div>

                <p style={{ fontSize: 12.5, color: c.textSecond, lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>

                <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, letterSpacing: '0.07em', marginBottom: 7 }}>ALIGNED ACTION GOALS</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
                  {p.sdgs.map((sdg, j) => (
                    <span key={j} style={{
                      fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 5,
                      background: SDG_COLORS[sdg] ?? '#333', color: 'white'
                    }}>{sdg}</span>
                  ))}
                </div>

                <div style={{ paddingTop: 14, borderTop: `1px solid ${c.border}`, marginTop: 'auto' }}>
                  {/* Website / Email row */}
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7888', marginBottom: 12 }}>
                    <a href={(p as any).website || '#'} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: c.textSecond, textDecoration: 'none' }}>🌐 Website</a>
                    <a href={`mailto:${p.email}`} style={{ cursor: 'pointer', color: c.textSecond, textDecoration: 'none' }}>✉ Email</a>
                  </div>
                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <button onClick={() => toggleVerified(p.realIdx)} title="Toggle Verify" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '5px 6px', borderRadius: 6, color: '#00b050', display: 'flex', alignItems: 'center' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </button>
                      <button onClick={() => toggleVisible(p.realIdx)} title="Toggle Visible" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '5px 6px', borderRadius: 6, color: c.textSecond, display: 'flex', alignItems: 'center' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button onClick={() => openEdit(p.realIdx)} title="Edit" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '5px 6px', borderRadius: 6, color: c.textSecond, display: 'flex', alignItems: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button onClick={() => deletePartner(p.realIdx)} title="Delete" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '5px 6px', borderRadius: 6, color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: c.surfaceAlt, borderBottom: `1px solid ${c.border}` }}>
                  {['Organization', 'Category', 'Contact', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: h === 'Actions' ? 'right' : 'left',
                      padding: '14px 20px', fontSize: 11.5, color: c.textMuted, fontWeight: 600, letterSpacing: '0.03em'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((p) => (
                  <tr key={p.realIdx} style={{ borderBottom: `1px solid ${c.border}` }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={p.img} alt={p.name} style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '1px solid #eef0f2' }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{p.name}</div>
                          <div style={{ fontSize: 11.5, color: c.textMuted }}>{p.focus} · {p.location}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: c.surfaceAlt, color: c.textSecond }}>{p.sector}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: c.textSecond }}>
                      <div>{p.email}</div>
                      <div style={{ marginTop: 2 }}>{p.phone}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 5, background: p.verified ? '#e6f7ec' : '#fff3e0', color: p.verified ? '#00b050' : '#f4b400', width: 'fit-content' }}>
                          {p.verified ? 'Verified' : 'Awaiting Audit'}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 5, background: c.surfaceAlt, color: c.textSecond, width: 'fit-content' }}>
                          {p.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button onClick={() => toggleVerified(p.realIdx)} title="Toggle Verify" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '6px 8px', borderRadius: 7, color: '#00b050', fontSize: 15, display: 'flex', alignItems: 'center' }}>✓</button>
                        <button onClick={() => toggleVisible(p.realIdx)} title="Toggle Visible" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '6px 8px', borderRadius: 7, color: c.textSecond, fontSize: 15, display: 'flex', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button onClick={() => openEdit(p.realIdx)} title="Edit" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '6px 8px', borderRadius: 7, color: c.textSecond, fontSize: 15, display: 'flex', alignItems: 'center' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => deletePartner(p.realIdx)} title="Delete" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '6px 8px', borderRadius: 7, color: '#ef4444', fontSize: 15, display: 'flex', alignItems: 'center' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredPartners.length === 0 && (
          <div style={{ background: c.surface, borderRadius: 14, padding: 60, textAlign: 'center', border: `1px solid ${c.border}`, marginTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 4 }}>No partners found</div>
            <div style={{ fontSize: 12, color: c.textMuted }}>Try adjusting your search or filter</div>
          </div>
        )}

      </div>
    </div>
  )
}
