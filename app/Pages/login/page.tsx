'use client'

import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
export default function LoginPage() {
  const [email, setEmail] = useState("admin@stepup.org")
  const [password, setPassword] = useState("admin1234")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const colors = [
      "#0066cc", "#00a8a8", "#00b050", "#8cc63f", "#f4b400",
      "#ff7a00", "#ff5e5b", "#d63384", "#7b61ff", "#0cc0df"
    ]

    interface Particle {
      x: number; y: number; vx: number; vy: number
      radius: number; color: string; alpha: number; angle: number
    }

    const particles: Particle[] = []
    const particleCount = Math.min(60, Math.floor((width * height) / 18000))

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        angle: Math.random() * Math.PI * 2,
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#080b11")
      gradient.addColorStop(0.5, "#0f172a")
      gradient.addColorStop(1, "#03060a")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        p.angle += 0.015
        p.y += Math.sin(p.angle) * 0.1

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 130) {
            ctx.strokeStyle = p.color
            ctx.globalAlpha = ((130 - dist) / 130) * 0.2
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) return
    setError(null)
    setLoading(true)

    setTimeout(() => {
      if (!email.trim() || !password.trim()) {
        setError("Please fill in both email and password fields.")
        setLoading(false)
        return
      }
      if (email === "admin@stepup.org" && password === "admin1234") {
        if (rememberMe) localStorage.setItem("stepup_admin_session", email)
        window.location.href = "/Pages/dashboard"
      } else {
        setError("Invalid email or password. Try admin@stepup.org / admin1234")
        setLoading(false)
      }
    }, 750)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      <div className="container relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 grid md:grid-cols-12 min-h-120">

          {/* LEFT PANEL */}
          <div
            className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-r border-white/20"
            style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a8a8 50%, #1d5948 100%)' }}
          >
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/20 border border-white/30 text-white font-semibold text-xs">
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span>UN-SDG Monitoring Hub</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp for SDG" className="w-20 h-20 object-contain shrink-0" />
                  <h1 className="text-2xl font-bold text-white">StepUp SDG</h1>
                </div>
                <p className="text-white/80 text-xs leading-relaxed max-w-sm">
                  Tracking and aligning local actions to the UN Sustainable Development Goals.
                </p>
                <div className="mt-3 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src="/sdg_illustration_1781192627956.jpg" alt="SDG Illustration" className="w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/20">
              <p className="text-[11px] text-white/60 text-center font-semibold tracking-widest uppercase">
                Empowering Change · SDG 2030
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center"
            style={{ background: 'linear-gradient(160deg, #fefefe 0%, #f0fdf4 40%, #eff6ff 100%)' }}
          >
            <div className="w-full max-w-sm mx-auto space-y-4">
              <AnimatePresence mode="wait">
                {!isSignUp ? (
                  <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-4">
                    <div className="space-y-1">
                      <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp for SDG" className="w-14 h-14 object-contain" />
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sign in to Administrator Portal</h2>
                      <p className="text-xs text-slate-500 font-medium">Track global goals. Drive local change.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@stepup.org" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 pr-10 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 bg-transparent border-0 cursor-pointer">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-semibold">
                          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded text-blue-600 border-slate-300 w-4 h-4" />
                          Save my sign-in session
                        </label>
                      </div>
                      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}
                      <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                        {loading ? "Signing in..." : "Sign In"}
                      </button>
                      <div className="text-center pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                        New to StepUp SDG?{" "}
                        <button type="button" onClick={() => { setIsSignUp(true); setEmail(""); setPassword(""); setError(null) }} className="text-emerald-600 hover:text-emerald-700 hover:underline font-bold ml-1 bg-transparent border-0 cursor-pointer">
                          Register Account
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-4">
                    <div className="space-y-1">
                      <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp for SDG" className="w-14 h-14 object-contain" />
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create an Account</h2>
                      <p className="text-xs text-slate-500 font-medium">Join the SDG movement today.</p>
                    </div>
                    <form className="space-y-3 pt-2" onSubmit={(e) => { e.preventDefault(); alert("Account created! Please sign in."); setIsSignUp(false); setEmail("admin@stepup.org"); setPassword("admin1234") }}>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                        <input type="text" required placeholder="Your full name" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</label>
                        <input type="email" required placeholder="you@example.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Confirm Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                      </div>
                      <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex justify-center items-center gap-2">
                        Register
                      </button>
                      <div className="text-center pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                        Already have an account?{" "}
                        <button type="button" onClick={() => { setIsSignUp(false); setEmail("admin@stepup.org"); setPassword("admin1234"); setError(null) }} className="text-blue-600 hover:text-blue-700 hover:underline font-bold ml-1 bg-transparent border-0 cursor-pointer">
                          Sign In
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}