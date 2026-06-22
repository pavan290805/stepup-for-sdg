"use client"

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setLoading(false)
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-extrabold text-navy">Contact Us</h1>
          <p className="mt-2 text-sm text-muted-foreground">Get in touch to partner, register a school, or collaborate on projects.</p>

          {submitted && (
            <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-semibold text-green-800">Thank you! Your message has been received. We'll get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name" 
              className="rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground"
              required
            />
            <input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground"
              required
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message" 
              rows={6} 
              className="rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
