'use client'

import { useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import { usePartners } from '../PartnersContext'

const applications = [
  {
    initials: 'MS', color: '#10b981', name: 'Sunrise Cooperative', contact: 'Maria Rodriguez',
    date: '2024-09-21', status: 'pending', sdgFocus: 'Zero Hunger',
    docs: ['application-doc-1.pdf', 'application-doc-2.pdf', 'application-doc-3.pdf'],
    remarks: [{ author: 'Marcus Thorne', text: 'Documents verified. Awaiting board sign-off.', time: 'Yesterday' }],
  },
  {
    initials: 'DP', color: '#3b6ef6', name: 'OceanGuard Initiative', contact: 'Daniel Park',
    date: '2024-09-18', status: 'pending', sdgFocus: 'Life Below Water',
    docs: ['oceanguard-application.pdf', 'org-profile.pdf'],
    remarks: [],
  },
  {
    initials: 'AB', color: '#f59e0b', name: 'Lagos Youth Lab', contact: 'Aisha Bello',
    date: '2024-09-12', status: 'pending', sdgFocus: 'Quality Education',
    docs: ['lagos-docs.pdf'],
    remarks: [{ author: 'Sarah Kim', text: 'Initial review done. Need more financial documents.', time: '2 days ago' }],
  },
  {
    initials: 'LO', color: '#10b981', name: 'Rewild Europe', contact: "Liam O'Brien",
    date: '2024-09-04', status: 'verified', sdgFocus: 'Life on Land',
    docs: ['rewild-application.pdf', 'rewild-financials.pdf'],
    remarks: [{ author: 'Marcus Thorne', text: 'All documents cleared. Approved by board.', time: '3 days ago' }],
  },
]

export default function PartnershipReviewPage() {
  const { dark } = useDashboardTheme()
  const { addPartnerFromApplication } = usePartners()
  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f9fafb',
    border:      dark ? 'rgba(255,255,255,.07)' : '#eef0f2',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7888',
    textMuted:   dark ? '#4a5168' : '#9aa3ad',
  }
  const [selected, setSelected] = useState(0)
  const [statuses, setStatuses] = useState(applications.map(a => a.status))
  const [remarks, setRemarks] = useState(applications.map(a => [...a.remarks]))
  const [previewDoc, setPreviewDoc] = useState<string | null>(null)

  const [remark, setRemark] = useState('')

  const app = applications[selected]

  const addRemark = () => {
    if (!remark.trim()) return
    const updated = remarks.map((r, i) => i === selected ? [...r, { author: 'You', text: remark, time: 'Just now' }] : r)
    setRemarks(updated)
    setRemark('')
  }

  const setStatus = (s: string) => setStatuses(prev => prev.map((v, i) => i === selected ? s : v))

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: c.bg }}>

      {/* Doc Preview Modal */}
      {previewDoc && (
        <div onClick={() => setPreviewDoc(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.surface, borderRadius: 14, width: 600, maxWidth: '95vw', maxHeight: '80vh', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{previewDoc}</span>
              </div>
              <button onClick={() => setPreviewDoc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: c.textMuted }}>✕</button>
            </div>
            <div style={{ padding: 40, textAlign: 'center', background: c.surface }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.border} strokeWidth="1.2" style={{ marginBottom: 16 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>{previewDoc}</div>
              <div style={{ fontSize: 12, color: c.textMuted }}>Document preview not available in demo mode.</div>
            </div>
          </div>
        </div>
      )}
      <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary, marginBottom: 22 }}>Partnership Review Center</div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Left — Pending Queue */}
        <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '16px 12px', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: c.textPrimary, marginBottom: 14, paddingLeft: 4 }}>Pending Queue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {applications.map((a, i) => (
              <div key={i} onClick={() => setSelected(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px',
                borderRadius: 10, cursor: 'pointer',
                background: selected === i ? (dark ? '#1e2a4a' : '#f0f4ff') : 'transparent',
                border: selected === i ? `1px solid ${dark ? '#3b6ef6' : '#d0dcff'}` : '1px solid transparent',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', background: a.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11.5, fontWeight: 700, flexShrink: 0
                }}>{a.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 1 }}>{a.contact}</div>
                  <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 2 }}>⏱ {a.date}</div>
                </div>
                <span style={{
                  fontSize: 9.5, fontWeight: 700, padding: '3px 7px', borderRadius: 5, flexShrink: 0,
                  background: statuses[i] === 'verified' ? '#e6f7ec' : statuses[i] === 'rejected' ? '#fee2e2' : statuses[i] === 'info-requested' ? '#eff6ff' : '#f3f4f6',
                  color: statuses[i] === 'verified' ? '#10b981' : statuses[i] === 'rejected' ? '#ef4444' : statuses[i] === 'info-requested' ? '#3b6ef6' : '#6b7280',
                }}>
                  {statuses[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Detail Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Header card */}
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary }}>{app.name}</div>
                <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>Submitted by {app.contact} · {app.date}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#10b981', cursor: 'pointer' }}>{app.sdgFocus}</span>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: `1px solid ${c.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {[
                { label: 'DOCUMENTS', value: `${app.docs.length} Files` },
                { label: 'STATUS', value: statuses[selected].charAt(0).toUpperCase() + statuses[selected].slice(1) },
                { label: 'SDG FOCUS', value: app.sdgFocus },
              ].map((s, i) => (
                <div key={i} style={{ padding: '14px 18px', borderRight: i < 2 ? `1px solid ${c.border}` : 'none', background: c.surfaceAlt }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Uploaded documents</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {app.docs.map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', border: `1px solid ${c.border}`, borderRadius: 9, background: c.surfaceAlt }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa3ad" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <span style={{ fontSize: 12.5, color: c.textPrimary }}>{doc}</span>
                    </div>
                    <button onClick={() => setPreviewDoc(doc)} style={{ fontSize: 12, fontWeight: 600, color: '#3b6ef6', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => { setStatus('verified'); addPartnerFromApplication(app) }} style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
                padding: '9px 20px', borderRadius: 8, border: 'none',
                background: '#10b981', color: 'white', cursor: 'pointer'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Approve
              </button>
              <button onClick={() => { setStatus('info-requested'); setRemarks(r => r.map((rm, i) => i === selected ? [...rm, { author: 'You', text: 'Additional information has been requested from the applicant.', time: 'Just now' }] : rm)) }} style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
                padding: '9px 20px', borderRadius: 8, border: `1px solid ${c.border}`,
                background: c.surface, color: c.textPrimary, cursor: 'pointer'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Request Info
              </button>
              <button onClick={() => setStatus('rejected')} style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
                padding: '9px 20px', borderRadius: 8, border: 'none',
                background: '#ef4444', color: 'white', cursor: 'pointer'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Reject
              </button>
            </div>
          </div>

          {/* Review Remarks */}
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 16 }}>Review remarks</div>

            {remarks[selected].length === 0 && (
              <div style={{ fontSize: 12.5, color: c.textMuted, marginBottom: 14 }}>No remarks yet.</div>
            )}

            {remarks[selected].map((r, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary }}>{r.author}</span>
                  <span style={{ fontSize: 11, color: c.textMuted }}>{r.time}</span>
                </div>
                <div style={{ fontSize: 12.5, color: '#10b981' }}>{r.text}</div>
              </div>
            ))}

            <textarea
              value={remark}
              onChange={e => setRemark(e.target.value)}
              placeholder="Add a review remark..."
              style={{ width: '100%', border: `1px solid ${c.border}`, borderRadius: 9, padding: '10px 12px', fontSize: 13, resize: 'vertical', minHeight: 80, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: c.textPrimary, background: c.surfaceAlt }}
            />
            <button onClick={addRemark} style={{
              marginTop: 10, fontSize: 13, fontWeight: 600, padding: '9px 20px',
              borderRadius: 8, border: 'none', background: '#10b981', color: 'white', cursor: 'pointer'
            }}>
              Add remark
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
