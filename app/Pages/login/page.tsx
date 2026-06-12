'use client'

import { useState, useRef, useEffect } from "react"

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

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <h1 className="relative z-10 text-white">Login Page</h1>
    </div>
  )
}