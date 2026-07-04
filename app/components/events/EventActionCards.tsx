"use client";

import { CalendarPlus, HandHeart, Building2, BadgeDollarSign, GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { addPartnershipSubmission } from "@/app/lib/adminStore";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "@/app/components/site/FadeUp";

type Action = {
  Icon: LucideIcon;
  title: string;
  text: string;
  link: string;
  href: string | null;
  gradient: string;
};

const actions: Action[] = [
  {
    Icon: CalendarPlus,
    title: "Host an SDG Event",
    text: "Bring an education drive or workshop to your school or community.",
    link: "Start hosting",
    href: "/get-involved/host-event",
    gradient: "linear-gradient(135deg,#1f3a5f,#0066cc,#00a8a8)",
  },
  {
    Icon: HandHeart,
    title: "Volunteer With Us",
    text: "Mentor students and support learning sessions on the ground.",
    link: "Join as volunteer",
    href: "/get-involved/volunteer",
    gradient: "linear-gradient(135deg,#00a8a8,#00b050,#8cc63f)",
  },
  {
    Icon: Building2,
    title: "Partner as NGO",
    text: "Collaborate, share resources, and scale rural school support.",
    link: "Become a partner",
    href: "/get-involved/ngo-partner",
    gradient: "linear-gradient(135deg,#00b050,#0066cc,#7b61ff)",
  },
  {
    Icon: BadgeDollarSign,
    title: "Corporate CSR Funds",
    text: "Fund transparent, measurable CSR education programs.",
    link: "Apply for CSR Funds",
    href: "/get-involved/sponsor",
    gradient: "linear-gradient(135deg,#7b61ff,#0066cc,#f4b400)",
  },
  {
    Icon: GraduationCap,
    title: "School / College / University",
    text: "Access SDG curriculum, funded workshops, and student leadership opportunities.",
    link: "Register your institution",
    href: null,
    gradient: "linear-gradient(135deg,#0f4c81,#1a7abf,#00c2ff)",
  },
] as const;

function SchoolModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ schoolName: "", type: "", board: "", contact: "", designation: "", email: "", phone: "", city: "", state: "", students: "", support: "", message: "" });
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const modalAccent = "#00C2FF";
  const inputStyle = { background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addPartnershipSubmission({ fullName: form.contact, organization: form.schoolName, email: form.email, type: "SCHOOL", message: `Type: ${form.type} | Board: ${form.board} | Students: ${form.students} | Support: ${form.support} | ${form.message}` });
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-20">
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#050B18]/85" />

      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Back button */}
        <button onClick={onClose} className="inline-flex items-center gap-2 text-sm mb-8 hover:text-cyan-glow transition" style={{ color: "var(--muted-text)" }}>
          <ArrowRight className="h-4 w-4 rotate-180" /> Back
        </button>

        <div className="glass rounded-3xl p-8 border border-border">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <CheckCircle className="h-16 w-16" style={{ color: modalAccent }} />
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Registration Received!</h2>
              <p className="text-sm max-w-sm" style={{ color: "var(--muted-text)" }}>Our team will review your registration and get in touch within 3–5 business days.</p>
              <button onClick={onClose} className="mt-4 rounded-full px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition" style={{ backgroundColor: modalAccent }}>Back</button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#0f4c81,#1a7abf,#00c2ff)" }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>School / College / University</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>Register your institution to access SDG programs</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Institution Info */}
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: modalAccent }}>Institution Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Institution Name</label>
                    <input required placeholder="Full institution name" value={form.schoolName} onChange={e => update("schoolName", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} onFocus={e => (e.target.style.borderColor = modalAccent)} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Institution Type</label>
                    <select required value={form.type} onChange={e => update("type", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select type</option>
                      <option>Primary School</option><option>Secondary School</option><option>Higher Secondary</option><option>College</option><option>University</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Board / Affiliation</label>
                    <select required value={form.board} onChange={e => update("board", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select board</option>
                      <option>CBSE</option><option>ICSE</option><option>State Board</option><option>IB</option><option>University Affiliated</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>City</label>
                    <input required placeholder="City" value={form.city} onChange={e => update("city", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} onFocus={e => (e.target.style.borderColor = modalAccent)} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>State</label>
                    <input required placeholder="State" value={form.state} onChange={e => update("state", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} onFocus={e => (e.target.style.borderColor = modalAccent)} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Total Students</label>
                    <select required value={form.students} onChange={e => update("students", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select range</option>
                      <option>Less than 200</option><option>200 – 500</option><option>500 – 1,000</option><option>1,000 – 5,000</option><option>5,000+</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: modalAccent }}>Contact Person</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([{k:"contact",l:"Full Name",t:"text",p:"Full name"},{k:"designation",l:"Designation",t:"text",p:"e.g. Principal, Dean"},{k:"email",l:"Official Email",t:"email",p:"principal@school.edu"},{k:"phone",l:"Phone Number",t:"tel",p:"+91 XXXXX XXXXX"}] as const).map(({k,l,t,p}) => (
                    <div key={k}>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{l}</label>
                      <input type={t} required placeholder={p} value={form[k]} onChange={e => update(k, e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} onFocus={e => (e.target.style.borderColor = modalAccent)} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                    </div>
                  ))}
                </div>

                {/* Support Needed */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: modalAccent }}>Support Needed</p>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>What support are you looking for?</label>
                  <select required value={form.support} onChange={e => update("support", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                    <option value="">Select support type</option>
                    <option>Digital Tools & Technology</option><option>Infrastructure Support</option><option>Teacher Training</option><option>Learning Materials</option><option>SDG Curriculum Integration</option><option>Funding / Scholarships</option><option>All of the above</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Additional Message</label>
                  <textarea rows={3} placeholder="Tell us more about your institution's needs and goals..." value={form.message} onChange={e => update("message", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none" style={inputStyle} onFocus={e => (e.target.style.borderColor = modalAccent)} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition" style={{ backgroundColor: modalAccent, boxShadow: `0 0 24px ${modalAccent}66` }}>
                  Submit Registration
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function EventActionCards() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="host" className="scroll-mt-20 px-6 py-20 bg-deep-blue/40">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">Get Involved</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Create impact <span className="grad-text">your way</span>
            </h2>
          </div>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((a, i) => (
            <FadeUp key={a.title} delay={i * 80} className="h-full">
              {a.href === null ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="evt-tilt evt-grad-move group flex h-full w-full flex-col rounded-3xl border border-white/15 p-7 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] text-left"
                  style={{ backgroundImage: a.gradient }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
                    <a.Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-white/85">{a.text}</p>
                  <span className="btn-arrow mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    <span className="border-b border-white/60 pb-0.5 group-hover:border-white">{a.link}</span>
                    <ArrowRight className="arr h-4 w-4" />
                  </span>
                </button>
              ) : (
                <Link
                  href={a.href}
                  className="evt-tilt evt-grad-move group flex h-full flex-col rounded-3xl border border-white/15 p-7 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
                  style={{ backgroundImage: a.gradient }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
                    <a.Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-white/85">{a.text}</p>
                  <span className="btn-arrow mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    <span className="border-b border-white/60 pb-0.5 group-hover:border-white">{a.link}</span>
                    <ArrowRight className="arr h-4 w-4" />
                  </span>
                </Link>
              )}
            </FadeUp>
          ))}
        </div>
      </div>

      {showModal && <SchoolModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
