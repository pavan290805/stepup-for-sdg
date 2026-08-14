"use client";

import { useState } from "react";
import { Mail, Phone, Send, User, MessageCircle, CheckCircle } from "lucide-react";
import { addContactMessage } from "@/app/lib/adminStore";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", regarding: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addContactMessage({
      from: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.regarding ? `Regarding: ${form.regarding}` : "General Enquiry",
      body: form.message,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: "Today",
      tag: "Contact",
    });
    setSubmitted(true);
  }

  return (
    <main
      className="relative min-h-fit overflow-hidden bg-[#F8FAFC] flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.98) 100%)",
      }}
    >
      <div
  className="absolute inset-0 bg-cover bg-center opacity-50"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80')",
  }}
/>
      <div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at top, rgba(219,234,254,0.10), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(248,250,252,0.25) 100%)",
  }}
/>

      <div className="relative z-10 flex flex-1 min-h-fit items-center justify-center px-6 py-10 gap-8 md:gap-12 max-w-7xl mx-auto w-full">

        {/* LEFT — branding */}
        <div className="hidden lg:flex flex-col max-w-sm shrink-0">
          <p className="mb-2 text-sm font-bold uppercase tracking-[4px] text-blue-600">CONTACT US</p>
          <div className="mb-4 h-1 w-20 rounded bg-blue-600" />
          <h1 className="text-5xl font-extrabold leading-tight text-[#0F172A]">
            Let&apos;s Build a<br />Better Future
          </h1>
          <p className="mt-5 text-base leading-7 text-[#475569]">
            We&apos;d love to hear from you. Reach out to us for collaborations, questions, or just to say hello!
          </p>
          <div className="mt-6 text-4xl">🌿</div>

          <div className="mt-8 flex flex-col gap-3">
            {[
              { label: "General Enquiry", email: "contact@stepupforsdg.org" },
              { label: "Information", email: "info@stepupforsdg.org" },
              { label: "Partnerships", email: "partner@stepupforsdg.org" },
            ].map(({ label, email }) => (
              <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 group-hover:bg-blue-600 transition">
                  <Mail size={16} className="text-blue-600 group-hover:text-white transition" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition">{email}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="w-full max-w-lg">
          <div className="text-center mb-4 lg:hidden">
            <p className="text-sm font-bold uppercase tracking-[4px] text-blue-600">CONTACT US</p>
            <h1 className="text-3xl font-extrabold text-[#0F172A] mt-1">Let&apos;s Build a Better Future</h1>
          </div>

          <div className="rounded-[24px] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-[#E2E8F0]">
            <h2 className="text-xl font-bold text-[#0F172A] mb-1">Get In Touch</h2>
            <div className="h-1 w-16 rounded bg-blue-600 mb-5" />

            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <CheckCircle className="h-16 w-16 text-blue-600" />
                <h2 className="text-xl font-bold text-[#0F172A]">Message Sent!</h2>
                <p className="text-sm text-[#475569]">Thank you! We&apos;ll get back to you within 3–5 business days.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", regarding: "", message: "" }); }}
                  className="mt-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-blue-600"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <User className="text-blue-600 shrink-0" size={20} />
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-transparent outline-none text-sm text-[#0F172A] placeholder:text-[#94A3B8]" required />
                </div>

                <div className="mb-4 flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <Phone className="text-blue-600 shrink-0" size={20} />
                  <input type="tel" placeholder="Your Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-transparent outline-none text-sm text-[#0F172A] placeholder:text-[#94A3B8]" required />
                </div>

                <div className="mb-4 flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <Mail className="text-blue-600 shrink-0" size={20} />
                  <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-transparent outline-none text-sm text-[#0F172A] placeholder:text-[#94A3B8]" required />
                </div>

                <div className="mb-4 flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4" style={{ background: "#FFFFFF" }}>
                  <MessageCircle className="text-blue-600 shrink-0" size={20} />
                  <select required value={form.regarding} onChange={e => setForm(f => ({ ...f, regarding: e.target.value }))} className="w-full outline-none text-sm bg-transparent text-[#0F172A] placeholder:text-[#94A3B8]" style={{ color: form.regarding ? "#0F172A" : "#94A3B8", colorScheme: "light" }}>
                    <option value="" disabled style={{ background: "#FFFFFF", color: "#94A3B8" }}>Contacting us regarding...</option>
                    <option style={{ background: "#FFFFFF", color: "#0F172A" }}>NGO</option>
                    <option style={{ background: "#FFFFFF", color: "#0F172A" }}>Volunteer</option>
                    <option style={{ background: "#FFFFFF", color: "#0F172A" }}>School/University/College</option>
                    <option style={{ background: "#FFFFFF", color: "#0F172A" }}>CSR Funds</option>
                  </select>
                </div>

                <div className="mb-5 flex items-start gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <MessageCircle className="mt-1 text-blue-600 shrink-0" size={20} />
                  <textarea
                    rows={4}
                    placeholder="Reason to Message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full resize-none bg-transparent outline-none text-sm text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send size={18} />
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-slate-500 mt-3">© 2026 Pavdhan Foundation • Empowering Students through the Sustainable Development Goals</p>
        </div>

      </div>
    </main>
  );
}
