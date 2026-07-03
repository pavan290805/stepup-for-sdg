"use client"

import React, { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { School, ClipboardList, Users, MapPin } from "lucide-react"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"

const GEO_URL = "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"

type ProjectDot = { name: string; lat: number; lng: number; schools: number; students: string }

const projectDots: ProjectDot[] = [
  { name: "Delhi",      lat: 28.61, lng: 77.21, schools: 120, students: "24,000+" },
  { name: "Mumbai",     lat: 19.08, lng: 72.88, schools: 95,  students: "19,500+" },
  { name: "Bengaluru",  lat: 12.97, lng: 77.59, schools: 80,  students: "16,200+" },
  { name: "Hyderabad",  lat: 17.38, lng: 78.49, schools: 72,  students: "14,800+" },
  { name: "Chennai",    lat: 13.08, lng: 80.27, schools: 65,  students: "13,100+" },
  { name: "Kolkata",    lat: 22.57, lng: 88.36, schools: 58,  students: "11,700+" },
  { name: "Pune",       lat: 18.52, lng: 73.86, schools: 47,  students: "9,600+"  },
  { name: "Ahmedabad",  lat: 23.03, lng: 72.59, schools: 43,  students: "8,800+"  },
  { name: "Jaipur",     lat: 26.91, lng: 75.79, schools: 38,  students: "7,700+"  },
  { name: "Lucknow",    lat: 26.85, lng: 80.95, schools: 35,  students: "7,100+"  },
  { name: "Bhopal",     lat: 23.26, lng: 77.41, schools: 30,  students: "6,200+"  },
  { name: "Patna",      lat: 25.59, lng: 85.14, schools: 28,  students: "5,700+"  },
]

type Region = { level: "high" | "medium" | "low"; schools: number; projects: number; students: string; ngos?: number }

const stateData: Record<string, Region & { display: string }> = {
  "Maharashtra":    { display: "Maharashtra",    level: "high",   schools: 95,  projects: 28, students: "19,500+", ngos: 12 },
  "Karnataka":      { display: "Karnataka",      level: "high",   schools: 80,  projects: 24, students: "16,200+", ngos: 10 },
  "Tamil Nadu":     { display: "Tamil Nadu",     level: "high",   schools: 65,  projects: 20, students: "13,100+", ngos: 9  },
  "Andhra Pradesh": { display: "Andhra Pradesh", level: "high",   schools: 72,  projects: 22, students: "14,800+", ngos: 8  },
  "Delhi":          { display: "Delhi",          level: "high",   schools: 120, projects: 35, students: "24,000+", ngos: 15 },
  "West Bengal":    { display: "West Bengal",    level: "medium", schools: 58,  projects: 17, students: "11,700+", ngos: 7  },
  "Uttar Pradesh":  { display: "Uttar Pradesh",  level: "medium", schools: 35,  projects: 10, students: "7,100+",  ngos: 5  },
  "Rajasthan":      { display: "Rajasthan",      level: "medium", schools: 38,  projects: 11, students: "7,700+",  ngos: 5  },
  "Gujarat":        { display: "Gujarat",        level: "medium", schools: 43,  projects: 13, students: "8,800+",  ngos: 6  },
  "Madhya Pradesh": { display: "Madhya Pradesh", level: "low",    schools: 30,  projects: 8,  students: "6,200+",  ngos: 4  },
  "Bihar":          { display: "Bihar",          level: "low",    schools: 28,  projects: 7,  students: "5,700+",  ngos: 3  },
  "Punjab":         { display: "Punjab",         level: "low",    schools: 22,  projects: 6,  students: "4,500+",  ngos: 3  },
}

const levelMeta = {
  high:   { color: "#06B6D4", label: "High Impact"   },
  medium: { color: "#22C55E", label: "Medium Impact" },
  low:    { color: "#F97316", label: "Low Impact"    },
}

const stats = [
  { icon: School,        value: "1,240+", label: "Schools Supported",  accent: "#06B6D4" },
  { icon: ClipboardList, value: "560+",   label: "Projects Completed", accent: "#22C55E" },
  { icon: Users,         value: "380K+",  label: "Students Enrolled",  accent: "#F97316" },
  { icon: MapPin,        value: "320+",   label: "NGO Partners",       accent: "#A78BFA" },
]

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [hoveredDot, setHoveredDot] = useState<ProjectDot | null>(null)
  const [selected, setSelected]     = useState<string | null>(null)

  const selectedData = selected ? stateData[selected] : null

  const mapBg       = isDark ? "#0B1120" : "#EEF2FF"
  const defaultFill = isDark ? "#1E2A45" : "#C7D2F0"
  const dimFill     = isDark ? "#111827" : "#D9E0F5"
  const strokeColor = isDark ? "#2D3F60" : "#A8B8E8"
  const tooltipBg   = isDark ? "#0f172a" : "#1e293b"

  const getStateName = (geo: any): string =>
    geo.properties?.NAME_1 || geo.properties?.name || geo.properties?.ST_NM || geo.properties?.state || ""

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Impact across country
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>
            Track education impact across schools, NGOs and partner states.
          </p>
        </div>

        {/* Main map card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          {/* Map */}
          <div className="relative w-full h-[420px] md:h-[580px] lg:h-[680px]" style={{ background: mapBg }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1000, center: [82.5, 22.5] }}
              width={800} height={600}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) => (
                  <>
                    {geographies.map((geo) => {
                      const stateName = getStateName(geo)
                      const data      = stateData[stateName]
                      const isSel     = selected === stateName
                      const fill = isSel
                        ? "#06B6D4"
                        : selected
                          ? dimFill
                          : data
                            ? levelMeta[data.level].color
                            : defaultFill
                      return (
                        <Geography key={geo.rsmKey} geography={geo}
                          onClick={() => setSelected(isSel ? null : stateName)}
                          style={{
                            default: {
                              fill, stroke: strokeColor, strokeWidth: isSel ? 1.0 : 0.4,
                              outline: "none", transition: "fill 0.15s ease",
                              opacity: selected && !isSel ? 0.4 : 1,
                            },
                            hover:   { fill: "#0EA5E9", outline: "none", cursor: "pointer" },
                            pressed: { outline: "none" },
                          }}
                        />
                      )
                    })}
                    {projectDots.map((dot) => (
                      <Marker key={dot.name} coordinates={[dot.lng, dot.lat]}
                        onMouseEnter={() => setHoveredDot(dot)}
                        onMouseLeave={() => setHoveredDot(null)}>
                        <circle r={9} fill="#F59E0B" opacity={0.15}>
                          <animate attributeName="r" values="5;13" dur="1.8s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                        <circle r={4} fill="#F59E0B" stroke="#fff" strokeWidth={1.5} style={{ cursor: "pointer" }} />
                        {hoveredDot?.name === dot.name && (
                          <g transform="translate(7, -44)">
                            <rect rx={6} ry={6} width={162} height={38} fill={tooltipBg} opacity={0.96} />
                            <text x={9} y={15} fill="#fbbf24" fontSize={9} fontWeight={700}>{dot.name}</text>
                            <text x={9} y={28} fill="#94a3b8" fontSize={7.5}>{dot.schools} schools · {dot.students} students</text>
                          </g>
                        )}
                      </Marker>
                    ))}
                  </>
                )}
              </Geographies>
            </ComposableMap>

            {/* Click hint */}
            {!selected && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] pointer-events-none"
                style={{ background: isDark ? "rgba(15,23,42,0.8)" : "rgba(30,41,59,0.75)", color: "#94a3b8" }}>
                Click a state to see details
              </div>
            )}
          </div>
        </div>

        {/* Selected state detail */}
        {selected && selectedData && (
          <div className="mt-4 rounded-xl p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{selectedData.display}</span>
              <button onClick={() => setSelected(null)}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "var(--border)", color: "var(--muted-text)" }}>
                Clear
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Schools",  value: String(selectedData.schools)  },
                { label: "Projects", value: String(selectedData.projects) },
                { label: "Students", value: selectedData.students         },
                { label: "NGOs",     value: String(selectedData.ngos ?? "—") },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-lg font-bold" style={{ color: "#06B6D4" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selected && !selectedData && (
          <div className="mt-4 rounded-xl p-3 text-sm text-center"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-text)" }}>
            No impact data available yet for {selected}.
            <button onClick={() => setSelected(null)} className="ml-2 underline text-xs">Clear</button>
          </div>
        )}

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, accent }) => (
            <div key={label} className="rounded-xl p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <div>
                <div className="text-xl font-bold leading-tight" style={{ color: "var(--foreground)" }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </Reveal>
  )
}
