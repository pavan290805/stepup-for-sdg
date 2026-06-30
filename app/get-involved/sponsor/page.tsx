"use client";
import { useState } from "react";
import { BadgeDollarSign, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SponsorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company: "", contact: "", email: "", phone: "", website: "", tier: "", amount: "", sdg: "", message: "" });
  const accent = "#eab308";

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setSubmitted(true); }
  function update(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#050B18]/80" />
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-cyan-glow transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="glass rounded-3xl p-8 border border-border">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <CheckCircle className="h-16 w-16" style={{ color: accent }} />
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Sponsorship Request Received!</h2>
              <p className="text-sm" style={{ color: "var(--muted-text)" }}>Thank you for your generous interest! Our CSR team will get in touch within 2–3 business days.</p>
              <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>Back to Home</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#713f12,#eab308,#fde047)" }}>
                  <BadgeDollarSign className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Sponsor Education Impact</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>Fund transparent, measurable CSR education programs</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "company", label: "Company / Organization Name", type: "text", placeholder: "Your company name" },
                  { key: "contact", label: "Contact Person", type: "text", placeholder: "Full name" },
                  { key: "email", label: "Official Email", type: "email", placeholder: "csr@company.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "website", label: "Website (optional)", type: "url", placeholder: "https://yourcompany.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                    <input type={type} required={key !== "website"} placeholder={placeholder} value={form[key as keyof typeof form]}
                      onChange={(e) => update(key, e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Sponsorship Tier</label>
                  <select required value={form.tier} onChange={(e) => update("tier", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select tier</option>
                    <option>Bronze – ₹50,000</option>
                    <option>Silver – ₹1,00,000</option>
                    <option>Gold – ₹2,50,000</option>
                    <option>Platinum – ₹5,00,000+</option>
                    <option>Custom Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Preferred SDG Focus</label>
                  <select required value={form.sdg} onChange={(e) => update("sdg", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select SDG</option>
                    <option>SDG 4 – Quality Education</option>
                    <option>SDG 5 – Gender Equality</option>
                    <option>SDG 10 – Reduced Inequalities</option>
                    <option>SDG 17 – Partnerships for Goals</option>
                    <option>No Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Additional Message</label>
                  <textarea rows={3} placeholder="Any specific goals or expectations for this sponsorship..." value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}>
                  Sponsor a Program
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
