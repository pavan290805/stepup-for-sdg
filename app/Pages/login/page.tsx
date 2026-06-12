'use client'

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@stepup.org")
  const [password, setPassword] = useState("admin1234")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans">
      <h1>Login Page</h1>
    </div>
  )
}