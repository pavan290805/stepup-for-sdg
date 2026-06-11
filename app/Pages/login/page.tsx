'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [daysLeft] = useState(() => {
    const diff = Math.ceil(
      (new Date('2030-01-01').getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    return diff.toLocaleString()
  })

  return (
    <>

      <style>{`
        .login-page {
         min-height:100vh; 
         display:flex; 
         align-items:center;
          justify-content:center; 
          background:#f0f4f8;
           padding:16px;
            }
        .card { 
        display:flex; 
        width:100%; 
        max-width:900px;
         min-height:560px; 
         border-radius:20px; 
         overflow:hidden; 
         box-shadow:0 25px 60px rgba(0,0,0,0.15);
          }
        .left-panel { 
        flex:1.1; 
        background:#0d1117;
         position:relative; 
         overflow:hidden; 
         display:flex;
          flex-direction:column; 
          align-items:center; 
          justify-content:center; 
          }
        .right-panel { 
        flex:1; 
        background:white; 
        display:flex; 
        flex-direction:column;
         justify-content:center; 
         padding:48px 40px; 
         min-width:320px; 
         }
      `}</style>

      <div className="login-page">
        <div className="card">
          <div className="left-panel">
            <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'#0066cc', opacity:0.08, top:-60, left:-80 }} />
            <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'#00b050', opacity:0.08, bottom:-40, right:-40 }} />
            <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 32px' }}>
              <img src="/sdg-logo.png" alt="StepUp for SDG" style={{ width:64, height:64, borderRadius:16, objectFit:'cover', margin:'0 auto 16px', display:'block' }} />
              <h1 style={{ color:'white', fontSize:20, fontWeight:600, marginBottom:6 }}>StepUp for SDG</h1>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:12, lineHeight:1.7 }}>
                Tracking India&apos;s progress<br/>toward 2030 Global Goals
              </p>
               <div style={{ background:'rgba(255,255,255,0.07)', borderRadius:12, padding:'12px 24px' }}>
                <div style={{ color:'#f4b400', fontSize:22, fontWeight:600 }}>{daysLeft}</div>
                <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginTop:4 }}>days to 2030</div>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <h2 style={{ fontSize:24, fontWeight:600, color:'#000' }}>Welcome back 👋</h2>
            <p style={{ fontSize:13, color:'#545454', marginTop:4 }}>Sign in to manage your SDG impact dashboard</p>
          </div>
        </div>
      </div>
    </>
  )
}