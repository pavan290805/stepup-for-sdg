"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Aarav Mehta",
    role: "Founder & Director",
    bio: "Aarav founded StepUp for SDG with a vision to bridge the gap between corporate resources and grassroots education needs. With 12 years in social impact, he has led programmes touching 200,000+ students.",
    email: "aarav@stepupforsdg.org",
  },
  {
    name: "Priya Nair",
    role: "Head of Partnerships",
    bio: "Priya builds and manages relationships with corporate partners and NGOs. She has structured over 40 CSR partnerships and is a recognised voice in impact investment circles.",
    email: "priya@stepupforsdg.org",
  },
  {
    name: "Rahul Verma",
    role: "Programs Lead",
    bio: "Rahul oversees programme design and field delivery across 18 regions. A former teacher himself, he ensures every initiative stays rooted in real classroom needs.",
    email: "rahul@stepupforsdg.org",
  },
  {
    name: "Sara Khan",
    role: "Impact & Research",
    bio: "Sara leads our impact measurement framework, turning field data into compelling evidence. She holds an MSc in Development Economics from LSE.",
    email: "sara@stepupforsdg.org",
  },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("");
}

function FlipCard({ member }: { member: typeof team[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px", height: 280 }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-electric to-cyan-glow grid place-items-center text-white text-2xl font-bold select-none">
            {initials(member.name)}
          </div>
          <h4 className="mt-4 font-semibold">{member.name}</h4>
          <p className="text-sm text-muted-text">{member.role}</p>
          <p className="mt-3 text-[11px] text-muted-text opacity-60">Click to learn more</p>
        </div>

        {/* Back */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg,#0D1B6E,#155DFC)",
          }}
        >
          <div className="flex-1 min-h-0">
            <h4 className="font-semibold text-white text-sm">{member.name}</h4>
            <p className="text-[11px] text-white/70 mb-2">{member.role}</p>
            <p className="text-[12px] text-white/85 leading-5 line-clamp-6">{member.bio}</p>
          </div>
          <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()}
            className="mt-3 flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition truncate">
            <Mail className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function TeamCards() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m) => (
        <FlipCard key={m.name} member={m} />
      ))}
    </div>
  );
}
