"use client";

import { Mail, Phone, Send, User, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-[#050B18]/80" />

      <div className="relative z-10 flex flex-1 min-h-[calc(100vh-80px)] items-center justify-center px-8 gap-16 max-w-7xl mx-auto w-full">

        {/* LEFT — branding */}
        <div className="hidden lg:flex flex-col max-w-sm shrink-0">
          <p className="mb-2 text-sm font-bold uppercase tracking-[4px] text-blue-600 dark:text-cyan-400">CONTACT US</p>
          <div className="mb-4 h-1 w-20 rounded bg-blue-600 dark:bg-cyan-400" />
          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Let&apos;s Build a<br />Better Future
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-700 dark:text-slate-300">
            We&apos;d love to hear from you. Reach out to us for collaborations, questions, or just to say hello!
          </p>
          <div className="mt-6 text-4xl">🌿</div>

          {/* Email contacts */}
          <div className="mt-8 flex flex-col gap-3">
            <a href="mailto:contact@stepupforsdg.org" className="flex items-center gap-3 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-600 transition">
                <Mail size={16} className="text-blue-600 dark:text-cyan-400 group-hover:text-white transition" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">General Enquiry</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">contact@stepupforsdg.org</p>
              </div>
            </a>
            <a href="mailto:info@stepupforsdg.org" className="flex items-center gap-3 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-600 transition">
                <Mail size={16} className="text-blue-600 dark:text-cyan-400 group-hover:text-white transition" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Information</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">info@stepupforsdg.org</p>
              </div>
            </a>
            <a href="mailto:partner@stepupforsdg.org" className="flex items-center gap-3 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-600 transition">
                <Mail size={16} className="text-blue-600 dark:text-cyan-400 group-hover:text-white transition" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Partnerships</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">partner@stepupforsdg.org</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="w-full max-w-lg">
          <div className="text-center mb-4 lg:hidden">
            <p className="text-sm font-bold uppercase tracking-[4px] text-blue-600 dark:text-cyan-400">CONTACT US</p>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Let&apos;s Build a Better Future</h1>
          </div>

          <div className="rounded-3xl bg-white dark:bg-[#0B1426] p-7 shadow-2xl border border-transparent dark:border-white/10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Get In Touch</h2>
            <div className="h-1 w-16 rounded bg-blue-600 dark:bg-cyan-400 mb-5" />

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                <User className="text-blue-600 dark:text-cyan-400 shrink-0" size={20} />
                <input type="text" placeholder="Your Name" className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" required />
              </div>

              <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                <Phone className="text-blue-600 dark:text-cyan-400 shrink-0" size={20} />
                <input type="tel" placeholder="Your Number" className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" required />
              </div>

              <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                <Mail className="text-blue-600 dark:text-cyan-400 shrink-0" size={20} />
                <input type="email" placeholder="Your Email" className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" required />
              </div>

              <div className="mb-5 flex items-start gap-4 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                <MessageCircle className="mt-1 text-blue-600 dark:text-cyan-400 shrink-0" size={20} />
                <textarea
                  rows={4}
                  placeholder="Reason to Message"
                  className="w-full resize-none bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
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
          </div>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">© 2026 Pavdhan Organization • Together for a Sustainable Future</p>
        </div>

      </div>
    </main>
  );
}
