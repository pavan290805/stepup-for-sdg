"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const team = [
  {
    name: "Eswar Vardhan",
    role: "Co-Founder & Head of Operations",
    src: "/team/eswar.png",
    bio: "Building sustainable educational programs through strategic operations, efficient execution, and strong collaboration with schools, NGOs, and partners.",
    tags: ["Operations • Leadership", "Partnerships • Execution"],
    linkedin: "https://www.linkedin.com/in/eswarvardhan/",
  },
  {
    name: "Vijay Vedantam",
    role: "Financial Advisor & Strategic Advisor",
    src: "/team/vijay.png",
    bio: "Guiding the organization's long-term vision through strategic planning, innovation, and partnerships that strengthen educational impact and sustainable growth.",
    tags: ["Strategy • Innovation", "Mentorship • Partnerships"],
    linkedin: "https://www.linkedin.com/in/vijayvedantam/",
  },
  {
    name: "Pavan Tarak",
    role: "Co-Founder & Head of Execution",
    src: "/team/pavan.png",
    bio: "Driving project execution by transforming ideas into impactful educational initiatives through teamwork, coordination, and community engagement.",
    tags: ["Execution • Leadership", "Projects • Community Impact"],
    linkedin: "https://www.linkedin.com/in/pavantarak/",
  },
];

type Member = (typeof team)[number];

function FlipCard({ member }: { member: Member }) {
  const [flipped, setFlipped] = useState(false);
  const [supportsHover, setSupportsHover] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      setSupportsHover(mediaQuery.matches);
    }
  }, []);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px", height: "280px" }}
      onClick={() => {
        if (!supportsHover) setFlipped((prev) => !prev);
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center text-center p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="w-40 h-40 rounded-full overflow-hidden border-2 border-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              window.open(member.linkedin, "_blank", "noopener,noreferrer");
            }}
          >
            <Image
              src={member.src}
              alt={member.name}
              width={160}
              height={160}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h4 className="mt-4 text-lg font-semibold">{member.name}</h4>
          <p className="text-sm text-muted-text">{member.role}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg,#0D1B6E 0%,#155DFC 100%)",
          }}
        >
          <div>
            <h4 className="text-white font-semibold">{member.name}</h4>
            <p className="text-white/80 text-sm mb-3">{member.role}</p>
            <p className="text-white/90 text-sm">{member.bio}</p>
          </div>

          <div className="border-t border-white/20 pt-3 flex items-center justify-between">
            <div>
              {member.tags.map((tag) => (
                <p key={tag} className="text-xs text-white/80">
                  {tag}
                </p>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(member.linkedin, "_blank", "noopener,noreferrer");
              }}
              className="ml-3 flex-shrink-0 bg-white/20 hover:bg-white/40 transition rounded-full p-2"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.864-3.059-1.865 0-2.151 1.457-2.151 2.962v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamCards() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {team.map((member) => (
        <FlipCard key={member.name} member={member} />
      ))}
    </div>
  );
}