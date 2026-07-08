"use client"

import React, { useRef, useState } from "react"
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

  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const mapBg       = isDark ? "#0B1120" : "#EEF2FF"
  const defaultFill = isDark ? "#1E2A45" : "#C7D2F0"
  const dimFill     = isDark ? "#111827" : "#D9E0F5"
  const strokeColor = isDark ? "#2D3F60" : "#A8B8E8"
  const tooltipBg   = isDark ? "#0f172a" : "#1e293b"

  const getStateName = (geo: any): string =>
    geo.properties?.NAME_1 || geo.properties?.name || geo.properties?.ST_NM || geo.properties?.state || ""

  const getCentroid = (coordinates: any): [number, number] | null => {
    const points: Array<[number, number]> = []

    const collect = (value: any) => {
      if (Array.isArray(value)) {
        if (value.length >= 2 && typeof value[0] === "number" && typeof value[1] === "number") {
          points.push([value[0], value[1]])
        } else {
          value.forEach(collect)
        }
      }
    }

    collect(coordinates)

    if (!points.length) return null

    const total = points.reduce(
      (acc, [lng, lat]) => {
        acc[0] += lng
        acc[1] += lat
        return acc
      },
      [0, 0] as [number, number],
    )

    return [total[0] / points.length, total[1] / points.length]
  }

  const updateTooltipPosition = (event: React.MouseEvent<SVGGElement>) => {
    const rect = mapContainerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = Math.min(Math.max(event.clientX - rect.left + 12, 12), rect.width - 176)
    const y = Math.min(Math.max(event.clientY - rect.top - 56, 12), rect.height - 70)
    setTooltipPosition({ x, y })
  }

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <div className="text-center mb-6">
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
          <div ref={mapContainerRef} className="relative w-full h-[420px] md:h-[580px] lg:h-[680px]" style={{ background: mapBg }}>
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
                      const data = stateData[stateName]
                      const fill = data ? levelMeta[data.level].color : defaultFill
                      const centroid = getCentroid(geo.geometry?.coordinates)

                      return (
                        <React.Fragment key={geo.rsmKey}>
                          <Geography
                            geography={geo}
                            onMouseEnter={(event: React.MouseEvent<SVGGElement>) => {
                              if (!data) return
                              setHoveredState(stateName)
                              updateTooltipPosition(event)
                            }}
                            onMouseMove={(event: React.MouseEvent<SVGGElement>) => {
                              if (!data) return
                              setHoveredState(stateName)
                              updateTooltipPosition(event)
                            }}
                            onMouseLeave={() => {
                              setHoveredState(null)
                              setTooltipPosition(null)
                            }}
                            style={{
                              default: {
                                fill, stroke: strokeColor, strokeWidth: 0.4,
                                outline: "none", transition: "fill 0.15s ease",
                                opacity: 1,
                              },
                              hover: { fill, outline: "none", cursor: "pointer" },
                              pressed: { outline: "none" },
                            }}
                          />
                          {data && centroid && (
                            <Marker coordinates={[centroid[0], centroid[1]]}>
                              <circle r={4.2} fill="#F59E0B" stroke="#fff" strokeWidth={1.1} />
                            </Marker>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </>
                )}
              </Geographies>
            </ComposableMap>

            {hoveredState && tooltipPosition && stateData[hoveredState] && (
              <div
                className="pointer-events-none absolute z-20 rounded-xl px-3 py-2 shadow-lg"
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  width: 168,
                  background: tooltipBg,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)"}`,
                }}
              >
                <div className="text-[11px] font-semibold" style={{ color: "#fbbf24" }}>{stateData[hoveredState].display}</div>
                <div className="mt-1 text-[11px]" style={{ color: "#e2e8f0" }}>{stateData[hoveredState].schools} Schools</div>
                <div className="text-[11px]" style={{ color: "#cbd5e1" }}>{stateData[hoveredState].students} Students</div>
              </div>
            )}
          </div>
        </div>

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
