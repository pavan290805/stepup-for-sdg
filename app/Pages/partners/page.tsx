"use client";
import { useState } from "react";

const partners = [
  { id: 1, name: "Delhi Public School", type: "School", city: "New Delhi", initials: "DPS", color: "bg-emerald-800" },
  { id: 2, name: "GreenEarth Initiative", type: "NGO", city: "Hyderabad", initials: "GE", color: "bg-cyan-500" },
  { id: 3, name: "TechCorp India", type: "Company", city: "Bangalore", initials: "TC", color: "bg-red-600", funds: "₹50L", tier: "Gold" },
  { id: 4, name: "IIT Hyderabad", type: "University", city: "Hyderabad", initials: "IIT", color: "bg-violet-600" },
  { id: 5, name: "Bright Futures Academy", type: "School", city: "Mumbai", initials: "BF", color: "bg-emerald-800" },
  { id: 6, name: "EcoVolt Energy", type: "Company", city: "Chennai", initials: "EV", color: "bg-red-600", funds: "₹20L", tier: "Silver" },
  { id: 7, name: "Hope NGO", type: "NGO", city: "Delhi", initials: "HN", color: "bg-cyan-500" },
  { id: 8, name: "Woxsen University", type: "University", city: "Hyderabad", initials: "WU", color: "bg-violet-600" },
  { id: 9, name: "InfraBuild Corp", type: "Company", city: "Mumbai", initials: "IB", color: "bg-red-600", funds: "₹30L", tier: "Silver" },
];

const tabs = ["All", "Schools", "NGOs", "Companies", "Universities"];

type Partner = typeof partners[0] & { funds?: string; tier?: string };

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = partners.filter(p => {
    const matchesTab = activeTab === "All" || p.type === activeTab.slice(0, -1) || (activeTab === "NGOs" && p.type === "NGO") || (activeTab === "Universities" && p.type === "University") || (activeTab === "Schools" && p.type === "School") || (activeTab === "Companies" && p.type === "Company");
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f1923] text-white font-sans">

      {/* NAVBAR */}
      <nav className="bg-[#0f1923] border-b border-[#1e2d3d] px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="StepUp SDG" className="w-12 h-12 object-contain" />
          <div>
            <span className="text-[#0cc0df] font-bold text-lg">STEPUP</span>
            <span className="text-[#c03538] font-bold text-lg"> FOR SDG</span>
          </div>
        </div>
        <div className="flex gap-8">
          {["Home", "About Us", "SDG Goals", "Partners", "Contact"].map(link => (
            <a key={link} href="#"
              className={`text-sm transition-colors duration-200 ${link === "Partners" ? "text-[#0cc0df]" : "text-[#8899aa] hover:text-white"}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          {["EN", "తె", "हि"].map(lang => (
            <button key={lang}
              className="text-xs px-3 py-1 border border-[#1e2d3d] text-[#8899aa] rounded hover:border-[#0cc0df] hover:text-[#0cc0df] transition-all duration-200">
              {lang}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div className="px-10 pt-10 pb-6">
        <h1 className="text-4xl font-bold mb-2">Our Partners</h1>
        <p className="text-[#8899aa] mb-8">Schools, NGOs, universities and companies working together for the 17 SDGs</p>
        <div className="flex gap-12">
          {[["142", "Schools"], ["38", "NGOs"], ["56", "Companies"], ["24", "Universities"], ["12,450", "Students reached"]].map(([num, label]) => (
            <div key={label} className="group cursor-default">
              <div className="text-3xl font-bold text-[#0cc0df] group-hover:scale-110 transition-transform duration-200">{num}</div>
              <div className="text-sm text-[#8899aa]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH + TABS */}
      <div className="px-10 py-4 flex flex-col gap-4">
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search partners by name or city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-[#131f2e] border border-[#1e2d3d] rounded-xl text-white text-sm placeholder-[#8899aa] focus:outline-none focus:border-[#0cc0df] transition-colors duration-200"
        />
        {/* TABS */}
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${activeTab === tab ? "bg-[#0cc0df] text-[#0f1923] border-[#0cc0df] font-bold" : "bg-transparent text-[#8899aa] border-[#1e2d3d] hover:border-[#0cc0df] hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* PARTNER LOGOS GRID */}
      <div className="px-10 pb-10 grid grid-cols-6 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-6 text-center text-[#8899aa] py-20 text-lg">
            No partners found for "{searchQuery}"
          </div>
        ) : (
          filtered.map(partner => (
            <div key={partner.id}
              onClick={() => setSelectedPartner(partner as Partner)}
              className="bg-[#131f2e] border border-[#1e2d3d] rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center gap-3 hover:border-[#0cc0df] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0cc0df22] transition-all duration-200 group">
              <div className={`w-14 h-14 ${partner.color} rounded-xl flex items-center justify-center font-bold text-lg text-white group-hover:scale-110 transition-transform duration-200`}>
                {partner.initials}
              </div>
              <div className="text-xs text-[#8899aa] text-center leading-tight">{partner.name}</div>
            </div>
          ))
        )}
      </div>

      {/* PUBLIC DASHBOARD MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPartner(null)}>
          <div className="bg-[#131f2e] border border-[#1e2d3d] rounded-2xl p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>

            {/* MODAL HEADER */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${selectedPartner.color} rounded-xl flex items-center justify-center font-bold text-2xl text-white`}>
                  {selectedPartner.initials}
                </div>
                <div>
                  <div className="font-bold text-xl">{selectedPartner.name}</div>
                  <div className="text-[#8899aa] text-sm">{selectedPartner.city}</div>
                  <span className={`text-xs px-3 py-1 rounded-full mt-1 inline-block ${
                    selectedPartner.type === "Company" ? "bg-red-900/30 text-red-400" :
                    selectedPartner.type === "School" ? "bg-emerald-900/30 text-emerald-400" :
                    selectedPartner.type === "NGO" ? "bg-cyan-900/30 text-cyan-400" :
                    "bg-violet-900/30 text-violet-400"}`}>
                    {selectedPartner.type}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedPartner(null)}
                className="text-[#8899aa] hover:text-white text-3xl leading-none transition-colors duration-200">×</button>
            </div>

            {/* VERIFIED BADGE */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-emerald-900/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-emerald-400 text-sm font-bold">Verified Partner</span>
            </div>

            {/* COMPANY METRICS */}
            {selectedPartner.type === "Company" && (
              <>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[["₹50L", "Total contributed"], ["₹38L", "Funds utilized"], ["₹12L", "Remaining"], ["620", "Students reached"], ["12", "Schools helped"], ["8", "Workshops done"]].map(([val, label]) => (
                    <div key={label} className="bg-[#0f1923] rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-[#0cc0df]">{val}</div>
                      <div className="text-xs text-[#8899aa] mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="font-bold mb-3 text-base">Projects Funded</div>
                {[["SDG Workshop — Hyderabad", "₹15L", "Completed", true],
                  ["AI Bootcamp", "₹12L", "Ongoing", false],
                  ["Climate Camp", "₹11L", "Completed", true]].map(([name, amt, status, verified]) => (
                  <div key={name as string} className="bg-[#0f1923] rounded-lg p-4 mb-2 flex justify-between items-center">
                    <div className="font-bold text-sm">{name as string}</div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#0cc0df] font-bold text-sm">{amt as string}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${status === "Completed" ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"}`}>{status as string}</span>
                      {verified && <span className="text-xs px-2 py-1 rounded-full bg-cyan-900/30 text-cyan-400">Verified ✓</span>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SCHOOL METRICS */}
            {selectedPartner.type === "School" && (
              <div className="grid grid-cols-3 gap-3">
                {[["320", "Students"], ["8", "Workshops"], ["3", "SDG Goals"], ["2", "Years active"], ["4", "Events held"], ["95%", "Satisfaction"]].map(([val, label]) => (
                  <div key={label} className="bg-[#0f1923] rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-emerald-400">{val}</div>
                    <div className="text-xs text-[#8899aa] mt-1">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* NGO METRICS */}
            {selectedPartner.type === "NGO" && (
              <div className="grid grid-cols-3 gap-3">
                {[["12", "Projects"], ["4", "Cities"], ["5", "SDG Goals"], ["840", "Beneficiaries"], ["3", "Years active"], ["6", "Partners"]].map(([val, label]) => (
                  <div key={label} className="bg-[#0f1923] rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-cyan-400">{val}</div>
                    <div className="text-xs text-[#8899aa] mt-1">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* UNIVERSITY METRICS */}
            {selectedPartner.type === "University" && (
              <div className="grid grid-cols-3 gap-3">
                {[["420", "Volunteers"], ["6", "Events"], ["5", "SDG Goals"], ["200", "Students active"], ["4", "Departments"], ["2", "Years active"]].map(([val, label]) => (
                  <div key={label} className="bg-[#0f1923] rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-violet-400">{val}</div>
                    <div className="text-xs text-[#8899aa] mt-1">{label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARTNER WITH US */}
      <div className="px-10 py-16 bg-[#0a1520]">
        <h2 className="text-3xl font-bold text-center mb-2">Partner With Us</h2>
        <p className="text-[#8899aa] text-center mb-12">Join our mission to educate students on the 17 UN SDGs</p>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { emoji: "🏢", title: "For Companies (CSR)", color: "text-red-400", bg: "bg-red-900/20", benefits: ["Brand visibility", "CSR fulfillment", "Impact reports"] },
            { emoji: "🏫", title: "For Schools", color: "text-emerald-400", bg: "bg-emerald-900/20", benefits: ["SDG curriculum", "Workshops", "Student engagement"] },
            { emoji: "🤝", title: "For NGOs", color: "text-cyan-400", bg: "bg-cyan-900/20", benefits: ["Collaboration", "Wider reach", "Joint initiatives"] },
          ].map(card => (
            <div key={card.title} className="bg-[#131f2e] border border-[#1e2d3d] rounded-xl p-7 hover:border-[#0cc0df] transition-all duration-200">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>{card.emoji}</div>
              <h3 className={`text-lg font-bold mb-2 ${card.color}`}>{card.title}</h3>
              <ul className="space-y-0">
                {card.benefits.map(b => (
                  <li key={b} className="text-[#8899aa] text-sm py-2 border-b border-[#1e2d3d] flex items-center gap-2">
                    <span className="text-[#0cc0df]">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PARTNERSHIP MODELS */}
        <div className="bg-[#131f2e] border border-[#1e2d3d] rounded-xl p-7 mb-12">
          <h3 className="text-lg font-bold mb-5">Partnership Models</h3>
          <div className="grid grid-cols-3 gap-4">
            {[["💰", "Sponsorship", "Fund SDG workshops and events directly"],
              ["🎯", "Co-hosted Programs", "Run joint programs with StepUp SDG"],
              ["📢", "Educational Campaigns", "Create awareness campaigns in schools"]].map(([icon, title, desc]) => (
              <div key={title as string} className="bg-[#0f1923] rounded-lg p-5 text-center hover:bg-[#1e2d3d] transition-colors duration-200">
                <div className="text-3xl mb-2">{icon as string}</div>
                <div className="font-bold text-sm mb-1">{title as string}</div>
                <div className="text-[#8899aa] text-xs">{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FORM */}
        <div className="bg-[#131f2e] border border-[#0cc0df] rounded-xl p-9 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-2">Apply for Partnership</h3>
          <p className="text-[#8899aa] text-center text-sm mb-7">Fill in your details and we will get back to you</p>
          <div className="flex flex-col gap-4">
            {[["Full Name", "text", "Enter your name"], ["Organization", "text", "Enter your organization name"], ["Email", "email", "Enter your email"]].map(([label, type, placeholder]) => (
              <div key={label}>
                <label className="text-xs text-[#8899aa] block mb-2">{label}</label>
                <input type={type} placeholder={placeholder}
                  className="w-full px-4 py-3 bg-[#0f1923] border border-[#1e2d3d] rounded-lg text-white text-sm placeholder-[#8899aa] focus:outline-none focus:border-[#0cc0df] transition-colors duration-200" />
              </div>
            ))}
            <div>
              <label className="text-xs text-[#8899aa] block mb-2">Type</label>
              <select className="w-full px-4 py-3 bg-[#0f1923] border border-[#1e2d3d] rounded-lg text-white text-sm focus:outline-none focus:border-[#0cc0df] transition-colors duration-200">
                <option value="">Select type</option>
                <option value="Company">Company</option>
                <option value="School">School</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#8899aa] block mb-2">Message</label>
              <textarea placeholder="Tell us about your organization and how you want to collaborate" rows={4}
                className="w-full px-4 py-3 bg-[#0f1923] border border-[#1e2d3d] rounded-lg text-white text-sm placeholder-[#8899aa] focus:outline-none focus:border-[#0cc0df] transition-colors duration-200 resize-none" />
            </div>
            <button className="w-full py-4 bg-[#0cc0df] text-[#0f1923] font-bold text-base rounded-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-200">
              Apply for Partnership →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0a1520] border-t border-[#1e2d3d] px-10 py-10">
        <div className="grid grid-cols-4 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="StepUp SDG" className="w-9 h-9 object-contain" />
              <div>
                <span className="text-[#0cc0df] font-bold text-base">STEPUP</span>
                <span className="text-[#c03538] font-bold text-base"> FOR SDG</span>
              </div>
            </div>
            <p className="text-[#8899aa] text-sm leading-relaxed">Educating students on UN SDG goals. Connecting schools, NGOs and companies for real impact.</p>
            <div className="flex gap-3 mt-4">
              {["in", "ig", "tw"].map(s => (
                <div key={s} className="w-8 h-8 bg-[#1e2d3d] rounded-lg flex items-center justify-center text-xs text-[#8899aa] cursor-pointer hover:bg-[#0cc0df] hover:text-[#0f1923] transition-all duration-200">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-4 text-xs uppercase tracking-widest">Pages</div>
            {["Home", "About Us", "SDG Goals", "Partners", "Contact"].map(l => (
              <a key={l} href="#" className="block text-[#8899aa] text-sm mb-2 hover:text-white transition-colors duration-200">{l}</a>
            ))}
          </div>
          <div>
            <div className="font-bold mb-4 text-xs uppercase tracking-widest">Partners</div>
            {["Schools", "NGOs", "Companies", "Universities", "Become a partner"].map(l => (
              <a key={l} href="#" className="block text-[#8899aa] text-sm mb-2 hover:text-white transition-colors duration-200">{l}</a>
            ))}
          </div>
          <div>
            <div className="font-bold mb-4 text-xs uppercase tracking-widest">Contact</div>
            {["hello@stepupsdg.in", "+91 98765 43210", "Hyderabad, Telangana"].map(l => (
              <div key={l} className="text-[#8899aa] text-sm mb-2">{l}</div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#1e2d3d] pt-6 flex justify-between items-center">
          <span className="text-[#8899aa] text-xs">© 2026 StepUp for SDG. All rights reserved.</span>
          <div className="flex gap-2">
            {["English", "తెలుగు", "हिंदी"].map(lang => (
              <button key={lang} className="text-xs px-3 py-1 border border-[#1e2d3d] text-[#8899aa] rounded hover:border-[#0cc0df] hover:text-[#0cc0df] transition-all duration-200">{lang}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}