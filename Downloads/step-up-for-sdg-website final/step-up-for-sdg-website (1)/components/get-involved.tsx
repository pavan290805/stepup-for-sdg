"use client"

import React, { useState, useRef, useEffect } from "react"
import { Briefcase, Building2, Users, X } from "lucide-react"
import { Reveal } from "@/components/reveal"

function Modal({ open, onClose, title, children }: any) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-900/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function GetInvolved() {
  const [openModal, setOpenModal] = useState<null | "company" | "school" | "ngo">(null)

  const emptyCompany = { companyName: "", contact: "", email: "", phone: "", interest: "Classroom Infrastructure", message: "" }
  const emptySchool = { schoolName: "", location: "", principal: "", email: "", phone: "", support: "Infrastructure Support", message: "" }
  const emptyNgo = { ngoName: "", contact: "", email: "", phone: "", workArea: "Education", message: "" }

  const [company, setCompany] = useState(emptyCompany)
  const [school, setSchool] = useState(emptySchool)
  const [ngo, setNgo] = useState(emptyNgo)

  const [companySuccess, setCompanySuccess] = useState("")
  const [schoolSuccess, setSchoolSuccess] = useState("")
  const [ngoSuccess, setNgoSuccess] = useState("")

  function handleSubmit(e: React.FormEvent, type: string) {
    e.preventDefault()
    if (type === "company") {
      setCompanySuccess("Thank you! Your request has been submitted.")
      setCompany(emptyCompany)
    }
    if (type === "school") {
      setSchoolSuccess("Thank you! Your request has been submitted.")
      setSchool(emptySchool)
    }
    if (type === "ngo") {
      setNgoSuccess("Thank you! Your request has been submitted.")
      setNgo(emptyNgo)
    }
  }

  return (
    <section id="get-involved" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-400">
          Get Involved
        </p>
        <h2 className="mb-2 text-center font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
          Get Involved
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">
          Choose how you want to create impact through SDG 4 education partnerships.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        <Reveal>
          <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 p-6 backdrop-blur-md shadow-md transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-cyan-500 dark:to-blue-500 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Partner With Us</h3>
            </div>
            <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">
              Companies can support education projects through CSR funding, employee volunteering and measurable impact reports.
            </p>
            <div className="mt-6">
              <button
                onClick={() => { setOpenModal("company") }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 p-6 backdrop-blur-md shadow-md transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-400 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Join the School</h3>
            </div>
            <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">
              Schools can register to receive infrastructure support, learning resources, teacher training and digital education access.
            </p>
            <div className="mt-6">
              <button
                onClick={() => { setOpenModal("school") }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors"
              >
                Register School
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 p-6 backdrop-blur-md shadow-md transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-400 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">NGO Collaboration</h3>
            </div>
            <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">
              NGOs can collaborate with schools and companies to deliver education programs and community impact.
            </p>
            <div className="mt-6">
              <button
                onClick={() => { setOpenModal("ngo") }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors"
              >
                Collaborate Now
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Modal open={openModal === "company"} onClose={() => { setOpenModal(null); setCompanySuccess("") }} title="Company / CSR Partner">
        {companySuccess ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{companySuccess}</p>
            <div className="flex justify-end">
              <button onClick={() => setOpenModal(null)} className="rounded-lg bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, "company")} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} placeholder="Company Name" className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 p-2" required />
              <input value={company.contact} onChange={(e) => setCompany({ ...company, contact: e.target.value })} placeholder="Contact Person" className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 p-2" required />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} placeholder="Email" className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 p-2" required />
              <input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} placeholder="Phone" className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 p-2" required />
            </div>
            <select value={company.interest} onChange={(e) => setCompany({ ...company, interest: e.target.value })} className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2">
              <option>Classroom Infrastructure</option>
              <option>Digital Learning</option>
              <option>Student Scholarships</option>
              <option>Volunteer Programs</option>
            </select>
            <textarea value={company.message} onChange={(e) => setCompany({ ...company, message: e.target.value })} placeholder="Message" className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 p-2" rows={4} />
            <div className="flex justify-end">
              <button type="submit" className="rounded-lg bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors">Submit</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={openModal === "school"} onClose={() => { setOpenModal(null); setSchoolSuccess("") }} title="School Registration">
        {schoolSuccess ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{schoolSuccess}</p>
            <div className="flex justify-end">
              <button onClick={() => setOpenModal(null)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, "school")} className="space-y-4">
            <input value={school.schoolName} onChange={(e) => setSchool({ ...school, schoolName: e.target.value })} placeholder="School Name" className="w-full rounded-md border border-border p-2" required />
            <input value={school.location} onChange={(e) => setSchool({ ...school, location: e.target.value })} placeholder="School Location" className="w-full rounded-md border border-border p-2" required />
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={school.principal} onChange={(e) => setSchool({ ...school, principal: e.target.value })} placeholder="Principal / Coordinator Name" className="rounded-md border border-border p-2" required />
              <input type="email" value={school.email} onChange={(e) => setSchool({ ...school, email: e.target.value })} placeholder="Email" className="rounded-md border border-border p-2" required />
            </div>
            <input value={school.phone} onChange={(e) => setSchool({ ...school, phone: e.target.value })} placeholder="Phone" className="w-full rounded-md border border-border p-2" required />
            <select value={school.support} onChange={(e) => setSchool({ ...school, support: e.target.value })} className="w-full rounded-md border border-border p-2">
              <option>Infrastructure Support</option>
              <option>Digital Classroom</option>
              <option>Learning Materials</option>
              <option>Teacher Training</option>
            </select>
            <textarea value={school.message} onChange={(e) => setSchool({ ...school, message: e.target.value })} placeholder="Message" className="w-full rounded-md border border-border p-2" rows={4} />
            <div className="flex justify-end">
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Submit</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={openModal === "ngo"} onClose={() => { setOpenModal(null); setNgoSuccess("") }} title="NGO Collaboration">
        {ngoSuccess ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{ngoSuccess}</p>
            <div className="flex justify-end">
              <button onClick={() => setOpenModal(null)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, "ngo")} className="space-y-4">
            <input value={ngo.ngoName} onChange={(e) => setNgo({ ...ngo, ngoName: e.target.value })} placeholder="NGO Name" className="w-full rounded-md border border-border p-2" required />
            <input value={ngo.contact} onChange={(e) => setNgo({ ...ngo, contact: e.target.value })} placeholder="Contact Person" className="w-full rounded-md border border-border p-2" required />
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="email" value={ngo.email} onChange={(e) => setNgo({ ...ngo, email: e.target.value })} placeholder="Email" className="rounded-md border border-border p-2" required />
              <input value={ngo.phone} onChange={(e) => setNgo({ ...ngo, phone: e.target.value })} placeholder="Phone" className="rounded-md border border-border p-2" required />
            </div>
            <select value={ngo.workArea} onChange={(e) => setNgo({ ...ngo, workArea: e.target.value })} className="w-full rounded-md border border-border p-2">
              <option>Education</option>
              <option>Community Development</option>
              <option>Skill Training</option>
              <option>Child Welfare</option>
            </select>
            <textarea value={ngo.message} onChange={(e) => setNgo({ ...ngo, message: e.target.value })} placeholder="Message" className="w-full rounded-md border border-border p-2" rows={4} />
            <div className="flex justify-end">
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Submit</button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  )
}
