'use client'

import { useState } from 'react'

export default function FundsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const presetAmounts = [500, 1000, 2500, 5000]
  const finalAmount = customAmount || amount

  const [showPayModal, setShowPayModal] = useState(false)
  const [payTab, setPayTab] = useState<'upi'|'card'|'netbanking'>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [paying, setPaying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!finalAmount) return
    setShowPayModal(true)
  }

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => { setPaying(false); setShowPayModal(false); setSubmitted(true) }, 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid rgba(170,182,200,0.2)', borderRadius: 10,
    padding: '12px 14px', fontSize: 13.5, outline: 'none',
    color: '#ffffff', background: 'rgba(255,255,255,0.06)', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11.5, fontWeight: 700,
    color: '#AAB6C8', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: 8,
  }

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f3460 0%, #00b8d4 100%)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: 'Inter, sans-serif',
        padding: 20,
      }}>
        <div style={{
          background: 'white', borderRadius: 24, padding: '52px 44px',
          textAlign: 'center', maxWidth: 460, width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: 30, color: 'white',
            boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
          }}>
            ✓
          </div>
          <div style={{
            display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 20, padding: '4px 14px', fontSize: 11.5,
            color: '#16a34a', fontWeight: 700, marginBottom: 16, letterSpacing: '0.04em',
          }}>
            DONATION SUCCESSFUL
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Thank You, {name}!
          </h2>
          <div style={{
            fontSize: 32, fontWeight: 800, color: '#0f3460',
            marginBottom: 12, letterSpacing: '-0.5px',
          }}>
            ₹{Number(finalAmount).toLocaleString()}
          </div>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 28 }}>
            Your donation has been received. A confirmation will be sent to{' '}
            <strong style={{ color: '#0f3460' }}>{email}</strong>.
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setName(''); setEmail(''); setPhone('')
              setAmount(''); setCustomAmount(''); setMessage('')
            }}
            style={{
              background: 'linear-gradient(135deg, #0f3460, #00b8d4)',
              color: 'white', border: 'none', borderRadius: 12,
              padding: '13px 32px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(15,52,96,0.3)',
            }}
          >
            Make Another Donation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: 'linear-gradient(180deg, #050B18 0%, #07101F 50%, #050B18 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,93,252,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,255,0.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(21,93,252,0.35) 0%, rgba(0,194,255,0.18) 60%, rgba(0,168,168,0.15) 100%)',
        borderBottom: '1px solid rgba(0,194,255,0.15)',
        padding: '64px 28px 52px', textAlign: 'center', position: 'relative', overflow: 'hidden', zIndex: 1,
      }}>
        {/* decorative circles */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 220, height: 220,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 16px',
          fontSize: 12, color: 'white', fontWeight: 700, marginBottom: 18,
          border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
        }}>
          🌍 Support the 2030 SDG Mission
        </div>

        <h1 style={{
          fontSize: 38, fontWeight: 800, color: 'white',
          marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.5px',
        }}>
          Fund the Change<br />You Want to See
        </h1>
        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.72)',
          maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75,
        }}>
          Your contribution directly supports SDG-aligned student projects,
          events, and community initiatives across India.
        </p>


      </div>

      {/* Form */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(16,29,51,0.85), rgba(11,20,38,0.9))',
          backdropFilter: 'blur(16px)',
          borderRadius: 22,
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,194,255,0.12)',
          overflow: 'hidden', border: '1px solid rgba(0,194,255,0.18)',
        }}>

          {/* Form Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f3460 0%, #0e6fa3 60%, #00b8d4 100%)',
            padding: '28px 32px', position: 'relative', overflow: 'hidden',
          }}>
            {/* decorative blobs */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -20, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
              <div>
                <div style={{ color: 'white', fontSize: 20, fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1.2 }}>Make a Donation</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12.5, marginTop: 4 }}>100% goes directly to SDG projects</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Secured by</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', letterSpacing: '-0.2px' }}>Razorpay</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '28px 28px 24px', background: 'transparent' }}>

            {/* Personal Info */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Your Details</label>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <input
                  required value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full Name"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.borderColor = '#00C2FF'}
                  onBlur={e => e.target.style.borderColor = 'rgba(170,182,200,0.2)'}
                />
                <input
                  required value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  type="tel"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.borderColor = '#00C2FF'}
                  onBlur={e => e.target.style.borderColor = 'rgba(170,182,200,0.2)'}
                />
              </div>
              <input
                required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#00C2FF'}
                onBlur={e => e.target.style.borderColor = 'rgba(170,182,200,0.2)'}
              />
            </div>

            {/* Amount */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Donation Amount (₹)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
                {presetAmounts.map(a => (
                  <div key={a} style={{ position: 'relative' }}>
                    {a === 1000 && (
                      <div style={{
                        position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
                        background: '#0f3460', color: 'white', fontSize: 9, fontWeight: 700,
                        borderRadius: 6, padding: '2px 7px', whiteSpace: 'nowrap', zIndex: 1,
                        letterSpacing: '0.03em',
                      }}>
                        POPULAR
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => { setAmount(String(a)); setCustomAmount('') }}
                      style={{
                        width: '100%', padding: '12px 0', borderRadius: 10,
                        border: amount === String(a) && !customAmount
                          ? '2px solid #00C2FF' : '1.5px solid rgba(170,182,200,0.2)',
                        background: amount === String(a) && !customAmount
                          ? 'linear-gradient(135deg, #155DFC, #00C2FF)' : 'rgba(255,255,255,0.05)',
                        color: amount === String(a) && !customAmount ? 'white' : '#AAB6C8',
                        fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: amount === String(a) && !customAmount
                          ? '0 4px 12px rgba(0,194,255,0.3)' : 'none',
                      }}
                    >
                      ₹{a.toLocaleString()}
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 14, fontWeight: 700, color: '#94a3b8', pointerEvents: 'none',
                }}>₹</span>
                <input
                  value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
                  placeholder="Enter custom amount"
                  type="number"
                  min="1"
                  style={{ ...inputStyle, paddingLeft: 28 }}
                  onFocus={e => e.target.style.borderColor = '#00C2FF'}
                  onBlur={e => e.target.style.borderColor = 'rgba(170,182,200,0.2)'}
                />
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Message <span style={{ color: '#cbd5e1', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Why are you donating? Leave a message of support..."
                rows={3}
                style={{
                  ...inputStyle, resize: 'none',
                  fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
                }}
                onFocus={e => e.target.style.borderColor = '#00C2FF'}
                onBlur={e => e.target.style.borderColor = 'rgba(170,182,200,0.2)'}
              />
            </div>

            {/* Summary */}
            {finalAmount && (
              <div style={{
                background: 'rgba(0,176,80,0.12)',
                border: '1.5px solid rgba(0,176,80,0.4)',
                borderRadius: 12, padding: '14px 18px', marginBottom: 22,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: '#16a34a', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, flexShrink: 0,
                }}>✓</span>
                <p style={{ fontSize: 13, color: '#4ade80', fontWeight: 600, margin: 0 }}>
                  You are donating{' '}
                  <span style={{ fontSize: 15, fontWeight: 800 }}>₹{Number(finalAmount).toLocaleString()}</span>
                  {' '}to SDG projects
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!finalAmount || !name || !email || !phone}
              style={{
                width: '100%', border: 'none', borderRadius: 12,
                padding: '15px', fontSize: 14.5, fontWeight: 800,
                color: 'white', cursor: !finalAmount || !name || !email || !phone ? 'not-allowed' : 'pointer',
                background: 'linear-gradient(135deg, #155DFC, #00C2FF)',
                opacity: (!finalAmount || !name || !email || !phone) ? 0.45 : 1,
                transition: 'opacity 0.2s',
                boxShadow: (!finalAmount || !name || !email || !phone) ? 'none' : '0 6px 20px rgba(0,194,255,0.35)',
                letterSpacing: '0.02em',
              }}
            >
              {`Donate ₹${finalAmount ? Number(finalAmount).toLocaleString() : '—'} via Razorpay →`}
            </button>

          </form>
        </div>
      </div>

      {/* Razorpay-style Payment Modal */}
      {showPayModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: 'white', borderRadius: 16, width: '100%', maxWidth: 420,
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)', overflow: 'hidden',
            fontFamily: 'Inter, sans-serif',
          }}>

            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0f3460, #0e6fa3)',
              padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, background: 'rgba(255,255,255,0.15)',
                  borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>💙</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>StepUp for SDG</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Amount: ₹{Number(finalAmount).toLocaleString()}</div>
                </div>
              </div>
              <button onClick={() => setShowPayModal(false)} style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white',
                width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
                fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              {([['upi', '📱 UPI'], ['card', '💳 Card'], ['netbanking', '🏦 Net Banking']] as const).map(([id, label]) => (
                <button key={id} type="button" onClick={() => setPayTab(id)} style={{
                  flex: 1, padding: '12px 8px', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 700,
                  background: payTab === id ? 'white' : '#f8fafc',
                  color: payTab === id ? '#0f3460' : '#94a3b8',
                  borderBottom: payTab === id ? '2.5px solid #0f3460' : '2.5px solid transparent',
                  transition: 'all 0.2s',
                }}>{label}</button>
              ))}
            </div>

            <div style={{ padding: '20px' }}>

              {/* UPI Tab */}
              {payTab === 'upi' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ textAlign: 'center', marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f3460', marginBottom: 2 }}>Scan QR Code</div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8' }}>Use any UPI app to scan and pay</div>
                  </div>
                  {/* QR */}
                  <div style={{
                    width: 150, height: 150, margin: '0 auto',
                    background: 'white', borderRadius: 10, padding: 8,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <rect x="4" y="4" width="34" height="34" rx="3" fill="#0f3460"/>
                      <rect x="11" y="11" width="20" height="20" rx="1.5" fill="white"/>
                      <rect x="15" y="15" width="12" height="12" rx="1" fill="#0f3460"/>
                      <rect x="82" y="4" width="34" height="34" rx="3" fill="#0f3460"/>
                      <rect x="89" y="11" width="20" height="20" rx="1.5" fill="white"/>
                      <rect x="93" y="15" width="12" height="12" rx="1" fill="#0f3460"/>
                      <rect x="4" y="82" width="34" height="34" rx="3" fill="#0f3460"/>
                      <rect x="11" y="89" width="20" height="20" rx="1.5" fill="white"/>
                      <rect x="15" y="93" width="12" height="12" rx="1" fill="#0f3460"/>
                      {[46,54,62,70,46,62,70,50,58,66,50,66].map((x,i)=>(
                        <rect key={i} x={x} y={[4,4,4,4,14,14,14,24,24,24,34,34][i]} width="6" height="6" rx="1" fill="#0f3460"/>
                      ))}
                      {[46,54,62,70,46,54,62,70,46,54,62,70].map((x,i)=>(
                        <rect key={i+20} x={x} y={[46,46,46,46,56,56,56,56,66,66,66,66][i]} width="6" height="6" rx="1" fill="#0f3460"/>
                      ))}
                      {[82,90,98,106,82,98,106,86,94,102].map((x,i)=>(
                        <rect key={i+40} x={x} y={[46,46,46,46,56,56,56,66,66,66][i]} width="6" height="6" rx="1" fill="#0f3460"/>
                      ))}
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f3460' }}>stepupsdg@upi</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>or enter UPI ID below</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      value={upiId} onChange={e => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      style={{ ...inputStyle, flex: 1, fontSize: 13 }}
                      onFocus={e => e.target.style.borderColor = '#0f3460'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <button type="button" onClick={handlePay} style={{
                      background: '#0f3460', color: 'white', border: 'none',
                      borderRadius: 10, padding: '0 16px', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                    }}>Verify</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                      <button key={app} type="button" onClick={handlePay} style={{
                        fontSize: 11, fontWeight: 700, color: '#0f3460',
                        background: '#eef2ff', border: '1px solid #c7d7fc',
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                      }}>{app}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {payTab === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input value={cardName} onChange={e => setCardName(e.target.value)}
                    placeholder="Name on Card"
                    style={{ ...inputStyle, fontSize: 13 }}
                    onFocus={e => e.target.style.borderColor = '#0f3460'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input value={cardNo} onChange={e => setCardNo(e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim())}
                    placeholder="Card Number"
                    style={{ ...inputStyle, fontSize: 13, letterSpacing: '0.08em' }}
                    onFocus={e => e.target.style.borderColor = '#0f3460'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input value={cardExp} onChange={e => setCardExp(e.target.value)}
                      placeholder="MM / YY"
                      style={{ ...inputStyle, flex: 1, fontSize: 13 }}
                      onFocus={e => e.target.style.borderColor = '#0f3460'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <input value={cardCvv} onChange={e => setCardCvv(e.target.value.slice(0,3))}
                      placeholder="CVV" type="password"
                      style={{ ...inputStyle, flex: 1, fontSize: 13 }}
                      onFocus={e => e.target.style.borderColor = '#0f3460'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>
              )}

              {/* Net Banking Tab */}
              {payTab === 'netbanking' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { name: 'SBI',   color: '#1a3a8f' },
                    { name: 'HDFC',  color: '#004c8f' },
                    { name: 'ICICI', color: '#b5261e' },
                    { name: 'Axis',  color: '#97144d' },
                    { name: 'Kotak', color: '#e8222b' },
                    { name: 'Others',color: '#475569' },
                  ].map(b => (
                    <button key={b.name} type="button"
                      onClick={() => setSelectedBank(b.name)}
                      style={{
                        padding: '14px 8px', borderRadius: 10, cursor: 'pointer',
                        border: selectedBank === b.name ? `2px solid ${b.color}` : `1.5px solid ${b.color}30`,
                        background: selectedBank === b.name ? `${b.color}15` : `${b.color}08`,
                        color: b.color, fontWeight: 700, fontSize: 13, transition: 'all 0.2s',
                      }}
                    >{b.name}</button>
                  ))}
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                style={{
                  width: '100%', marginTop: 18, border: 'none', borderRadius: 12,
                  padding: '14px', fontSize: 14, fontWeight: 800, color: 'white',
                  background: 'linear-gradient(135deg, #0f3460, #00b8d4)',
                  cursor: paying ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(15,52,96,0.3)',
                  opacity: paying ? 0.7 : 1,
                }}
              >
                {paying ? '⏳ Processing...' : `Pay ₹${Number(finalAmount).toLocaleString()}`}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>🔒 Secured by </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0f3460' }}>Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
