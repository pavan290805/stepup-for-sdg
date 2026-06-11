export default function LoginPage() {
  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f4f8;
          padding: 16px;
        }
        .card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 560px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
        }
        .left-panel {
          flex: 1.1;
          background: #0d1117;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .right-panel {
          flex: 1;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 40px;
          min-width: 320px;
        }
      `}</style>

      <div className="login-page">
        <div className="card">
          <div className="left-panel">
            <h1 style={{ color:'white' }}>StepUp for SDG</h1>
          </div>
          <div className="right-panel">
            <h2>Welcome back</h2>
          </div>
        </div>
      </div>
    </>
  )
}