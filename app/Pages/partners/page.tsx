"use client";
import { useState } from "react";

const partners = [
  { id: 1, name: "Delhi Public School", type: "School", city: "New Delhi", initials: "DPS", color: "#1d5948", funds: "", tier: "" },
  { id: 2, name: "GreenEarth Initiative", type: "NGO", city: "Hyderabad", initials: "GE", color: "#0cc0df", funds: "", tier: "" },
  { id: 3, name: "TechCorp India", type: "Company", city: "Bangalore", initials: "TC", color: "#c03538", funds: "₹50L", tier: "Gold" },
  { id: 4, name: "IIT Hyderabad", type: "University", city: "Hyderabad", initials: "IIT", color: "#7b61ff", funds: "", tier: "" },
  { id: 5, name: "Bright Futures Academy", type: "School", city: "Mumbai", initials: "BF", color: "#1d5948", funds: "", tier: "" },
  { id: 6, name: "EcoVolt Energy", type: "Company", city: "Chennai", initials: "EV", color: "#c03538", funds: "₹20L", tier: "Silver" },
  { id: 7, name: "Hope NGO", type: "NGO", city: "Delhi", initials: "HN", color: "#0cc0df", funds: "", tier: "" },
  { id: 8, name: "Woxsen University", type: "University", city: "Hyderabad", initials: "WU", color: "#7b61ff", funds: "", tier: "" },
  { id: 9, name: "InfraBuild Corp", type: "Company", city: "Mumbai", initials: "IB", color: "#c03538", funds: "₹30L", tier: "Silver" },
];

const tabs = ["All", "Schools", "NGOs", "Companies", "Universities"];

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null);

  const filtered = activeTab === "All" ? partners : partners.filter(p =>
    activeTab === "Schools" ? p.type === "School" :
    activeTab === "NGOs" ? p.type === "NGO" :
    activeTab === "Companies" ? p.type === "Company" :
    p.type === "University"
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0f1923", minHeight: "100vh", color: "white" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#0f1923", borderBottom: "1px solid #1e2d3d", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/logo.png" alt="StepUp SDG" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          <div>
            <span style={{ color: "#0cc0df", fontWeight: "bold", fontSize: "16px" }}>STEPUP</span>
            <span style={{ color: "#c03538", fontWeight: "bold", fontSize: "16px" }}> FOR SDG</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Home", "About Us", "SDG Goals", "Partners", "Contact"].map(link => (
            <a key={link} href="#" style={{ color: link === "Partners" ? "#0cc0df" : "#8899aa", textDecoration: "none", fontSize: "14px" }}>{link}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["EN", "తె", "हि"].map(lang => (
            <button key={lang} style={{ background: "transparent", border: "1px solid #1e2d3d", color: "#8899aa", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>{lang}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "40px 40px 20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>Our Partners</h1>
        <p style={{ color: "#8899aa", margin: "0 0 32px" }}>Schools, NGOs, universities and companies working together for the 17 SDGs</p>
        <div style={{ display: "flex", gap: "48px" }}>
          {[["142", "Schools"], ["38", "NGOs"], ["56", "Companies"], ["24", "Universities"], ["12,450", "Students reached"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0cc0df" }}>{num}</div>
              <div style={{ fontSize: "13px", color: "#8899aa" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ padding: "24px 40px 16px", display: "flex", gap: "8px" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: "8px 20px", borderRadius: "6px", border: "1px solid", cursor: "pointer", fontSize: "14px", fontWeight: activeTab === tab ? "bold" : "normal", background: activeTab === tab ? "#0cc0df" : "transparent", color: activeTab === tab ? "#0f1923" : "#8899aa", borderColor: activeTab === tab ? "#0cc0df" : "#1e2d3d" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* JUST LOGOS GRID */}
      <div style={{ padding: "16px 40px 40px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
        {filtered.map(partner => (
          <div key={partner.id}
            onClick={() => setSelectedPartner(partner)}
            title={partner.name}
            style={{ background: "#131f2e", border: "1px solid #1e2d3d", borderRadius: "12px", padding: "24px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0cc0df"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d3d"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: "56px", height: "56px", background: partner.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px", color: "white" }}>
              {partner.initials}
            </div>
            <div style={{ fontSize: "11px", color: "#8899aa", textAlign: "center", lineHeight: "1.3" }}>{partner.name}</div>
          </div>
        ))}
      </div>

      {/* PUBLIC DASHBOARD MODAL */}
      {selectedPartner && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          onClick={() => setSelectedPartner(null)}>
          <div style={{ background: "#131f2e", border: "1px solid #1e2d3d", borderRadius: "16px", padding: "32px", width: "620px", maxHeight: "85vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "60px", height: "60px", background: selectedPartner.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" }}>
                  {selectedPartner.initials}
                </div>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>{selectedPartner.name}</div>
                  <div style={{ color: "#8899aa", fontSize: "13px" }}>{selectedPartner.city}</div>
                  <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "999px", marginTop: "6px", display: "inline-block", background: selectedPartner.type === "Company" ? "#c0353822" : selectedPartner.type === "School" ? "#1d594822" : selectedPartner.type === "NGO" ? "#0cc0df22" : "#7b61ff22", color: selectedPartner.type === "Company" ? "#c03538" : selectedPartner.type === "School" ? "#7fffd4" : selectedPartner.type === "NGO" ? "#0cc0df" : "#7b61ff" }}>
                    {selectedPartner.type}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedPartner(null)} style={{ background: "transparent", border: "none", color: "#8899aa", fontSize: "28px", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>

            {/* VERIFIED */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", padding: "12px", background: "#1d594822", borderRadius: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#7fffd4" }}></div>
              <span style={{ color: "#7fffd4", fontSize: "13px", fontWeight: "bold" }}>Verified Partner</span>
            </div>

            {/* COMPANY METRICS */}
            {selectedPartner.type === "Company" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
                  {[["₹50L", "Total contributed"], ["₹38L", "Funds utilized"], ["₹12L", "Remaining"], ["620", "Students reached"], ["12", "Schools helped"], ["8", "Workshops done"]].map(([val, label]) => (
                    <div key={label} style={{ background: "#0f1923", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0cc0df" }}>{val}</div>
                      <div style={{ fontSize: "11px", color: "#8899aa", marginTop: "4px" }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "15px" }}>Projects Funded</div>
                {[["SDG Workshop — Hyderabad", "₹15L", "Completed", true],
                  ["AI Bootcamp", "₹12L", "Ongoing", false],
                  ["Climate Camp", "₹11L", "Completed", true]].map(([name, amt, status, verified]) => (
                  <div key={name as string} style={{ background: "#0f1923", borderRadius: "8px", padding: "14px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{name as string}</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ color: "#0cc0df", fontWeight: "bold" }}>{amt as string}</span>
                      <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "999px", background: status === "Completed" ? "#1d594822" : "#c0353822", color: status === "Completed" ? "#7fffd4" : "#c03538" }}>{status as string}</span>
                      {verified && <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "999px", background: "#0cc0df22", color: "#0cc0df" }}>Verified ✓</span>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SCHOOL METRICS */}
            {selectedPartner.type === "School" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[["320", "Students"], ["8", "Workshops"], ["3", "SDG Goals"], ["2", "Years active"], ["4", "Events held"], ["95%", "Satisfaction"]].map(([val, label]) => (
                  <div key={label} style={{ background: "#0f1923", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#7fffd4" }}>{val}</div>
                    <div style={{ fontSize: "11px", color: "#8899aa", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* NGO METRICS */}
            {selectedPartner.type === "NGO" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[["12", "Projects"], ["4", "Cities"], ["5", "SDG Goals"], ["840", "Beneficiaries"], ["3", "Years active"], ["6", "Partners"]].map(([val, label]) => (
                  <div key={label} style={{ background: "#0f1923", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0cc0df" }}>{val}</div>
                    <div style={{ fontSize: "11px", color: "#8899aa", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* UNIVERSITY METRICS */}
            {selectedPartner.type === "University" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[["420", "Volunteers"], ["6", "Events"], ["5", "SDG Goals"], ["200", "Students active"], ["4", "Departments"], ["2", "Years active"]].map(([val, label]) => (
                  <div key={label} style={{ background: "#0f1923", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#7b61ff" }}>{val}</div>
                    <div style={{ fontSize: "11px", color: "#8899aa", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARTNER WITH US SECTION */}
      <div style={{ padding: "60px 40px", background: "#0a1520" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" }}>Partner With Us</h2>
        <p style={{ color: "#8899aa", textAlign: "center", marginBottom: "48px" }}>Join our mission to educate students on the 17 UN Sustainable Development Goals</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "48px" }}>
          {[
            { emoji: "🏢", title: "For Companies (CSR)", color: "#c03538", bg: "#c0353822", benefits: ["Brand visibility", "CSR fulfillment", "Impact reports"] },
            { emoji: "🏫", title: "For Schools", color: "#7fffd4", bg: "#1d594822", benefits: ["SDG curriculum", "Workshops", "Student engagement"] },
            { emoji: "🤝", title: "For NGOs", color: "#0cc0df", bg: "#0cc0df22", benefits: ["Collaboration", "Wider reach", "Joint initiatives"] },
          ].map(card => (
            <div key={card.title} style={{ background: "#131f2e", border: "1px solid #1e2d3d", borderRadius: "12px", padding: "28px" }}>
              <div style={{ width: "48px", height: "48px", background: card.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "16px" }}>{card.emoji}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", color: card.color }}>{card.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {card.benefits.map(b => (
                  <li key={b} style={{ color: "#8899aa", fontSize: "13px", padding: "8px 0", borderBottom: "1px solid #1e2d3d", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#0cc0df" }}>✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PARTNERSHIP MODELS */}
        <div style={{ background: "#131f2e", border: "1px solid #1e2d3d", borderRadius: "12px", padding: "28px", marginBottom: "48px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>Partnership Models</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[["💰", "Sponsorship", "Fund SDG workshops and events directly"],
              ["🎯", "Co-hosted Programs", "Run joint programs with StepUp SDG"],
              ["📢", "Educational Campaigns", "Create awareness campaigns in schools"]].map(([icon, title, desc]) => (
              <div key={title as string} style={{ background: "#0f1923", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon as string}</div>
                <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "6px" }}>{title as string}</div>
                <div style={{ color: "#8899aa", fontSize: "12px" }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FORM */}
        <div style={{ background: "#131f2e", border: "1px solid #0cc0df", borderRadius: "12px", padding: "36px", maxWidth: "600px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" }}>Apply for Partnership</h3>
          <p style={{ color: "#8899aa", textAlign: "center", marginBottom: "28px", fontSize: "13px" }}>Fill in your details and we will get back to you</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", color: "#8899aa", display: "block", marginBottom: "6px" }}>Full Name</label>
              <input type="text" placeholder="Enter your name"
                style={{ width: "100%", padding: "12px", background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: "8px", color: "white", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#8899aa", display: "block", marginBottom: "6px" }}>Organization</label>
              <input type="text" placeholder="Enter your organization name"
                style={{ width: "100%", padding: "12px", background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: "8px", color: "white", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#8899aa", display: "block", marginBottom: "6px" }}>Type</label>
              <select style={{ width: "100%", padding: "12px", background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: "8px", color: "white", fontSize: "14px", outline: "none" }}>
                <option value="">Select type</option>
                <option value="Company">Company</option>
                <option value="School">School</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#8899aa", display: "block", marginBottom: "6px" }}>Message</label>
              <textarea placeholder="Tell us about your organization and how you want to collaborate"
                rows={4}
                style={{ width: "100%", padding: "12px", background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: "8px", color: "white", fontSize: "14px", outline: "none", resize: "none" }} />
            </div>
            <button style={{ width: "100%", padding: "14px", background: "#0cc0df", border: "none", borderRadius: "8px", color: "#0f1923", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
              Apply for Partnership →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0a1520", borderTop: "1px solid #1e2d3d", padding: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <img src="/logo.png" alt="StepUp SDG" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
              <div>
                <span style={{ color: "#0cc0df", fontWeight: "bold", fontSize: "16px" }}>STEPUP</span>
                <span style={{ color: "#c03538", fontWeight: "bold", fontSize: "16px" }}> FOR SDG</span>
              </div>
            </div>
            <p style={{ color: "#8899aa", fontSize: "13px", lineHeight: "1.6" }}>Educating students on UN SDG goals. Connecting schools, NGOs and companies for real impact.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {["in", "ig", "tw"].map(s => (
                <div key={s} style={{ width: "32px", height: "32px", background: "#1e2d3d", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#8899aa", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>Pages</div>
            {["Home", "About Us", "SDG Goals", "Partners", "Contact"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#8899aa", fontSize: "13px", marginBottom: "8px", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>Partners</div>
            {["Schools", "NGOs", "Companies", "Universities", "Become a partner"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#8899aa", fontSize: "13px", marginBottom: "8px", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>Contact</div>
            {["hello@stepupsdg.in", "+91 98765 43210", "Hyderabad, Telangana"].map(l => (
              <div key={l} style={{ color: "#8899aa", fontSize: "13px", marginBottom: "8px" }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e2d3d", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#8899aa", fontSize: "12px" }}>© 2026 StepUp for SDG. All rights reserved.</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["English", "తెలుగు", "हिंदी"].map(lang => (
              <button key={lang} style={{ background: "transparent", border: "1px solid #1e2d3d", color: "#8899aa", padding: "4px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>{lang}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}