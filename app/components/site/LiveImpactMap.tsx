"use client"

import React, { useEffect, useRef, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { School, ClipboardList, Users, MapPin } from "lucide-react"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"

const GEO_URL = "/india-states.geojson"

const markers = [
  { name: "Delhi",                coordinates: [77.1025, 28.7041] as [number, number], schools: 120, students: "24,000+", ngos: 15, projects: 35 },
  { name: "Mumbai",               coordinates: [72.8777, 19.0760] as [number, number], schools: 95,  students: "19,500+", ngos: 12, projects: 28 },
  { name: "Bengaluru",            coordinates: [77.5946, 12.9716] as [number, number], schools: 80,  students: "16,200+", ngos: 10, projects: 24 },
  { name: "Chennai",              coordinates: [80.2707, 13.0827] as [number, number], schools: 65,  students: "13,100+", ngos: 9,  projects: 20 },
  { name: "Hyderabad",            coordinates: [78.4867, 17.3850] as [number, number], schools: 68,  students: "13,600+", ngos: 7,  projects: 20 },
  { name: "Kolkata",              coordinates: [88.3639, 22.5726] as [number, number], schools: 58,  students: "11,700+", ngos: 7,  projects: 17 },
  { name: "Ahmedabad",            coordinates: [72.5714, 23.0225] as [number, number], schools: 43,  students: "8,800+",  ngos: 6,  projects: 13 },
  { name: "Jaipur",               coordinates: [75.7873, 26.9124] as [number, number], schools: 38,  students: "7,700+",  ngos: 5,  projects: 11 },
  { name: "Lucknow",              coordinates: [80.9462, 26.8467] as [number, number], schools: 35,  students: "7,100+",  ngos: 5,  projects: 10 },
  { name: "Patna",                coordinates: [85.1376, 25.5941] as [number, number], schools: 28,  students: "5,700+",  ngos: 3,  projects: 7  },
  { name: "Bhopal",               coordinates: [77.4126, 23.2599] as [number, number], schools: 30,  students: "6,200+",  ngos: 4,  projects: 8  },
  { name: "Guwahati",             coordinates: [91.7362, 26.1445] as [number, number], schools: 25,  students: "5,000+",  ngos: 3,  projects: 7  },
  { name: "Thiruvananthapuram",   coordinates: [76.9366, 8.5241]  as [number, number], schools: 18,  students: "4,300+",  ngos: 2,  projects: 5  },
  { name: "Bhubaneswar",          coordinates: [85.8245, 20.2961] as [number, number], schools: 22,  students: "5,600+",  ngos: 4,  projects: 6  },
  { name: "Pune",                 coordinates: [73.8567, 18.5204] as [number, number], schools: 40,  students: "8,500+",  ngos: 5,  projects: 12 },
]

const stats = [
  { icon: School,        value: "1,240+", label: "Schools Supported",  accent: "#06B6D4" },
  { icon: ClipboardList, value: "560+",   label: "Projects Completed", accent: "#22C55E" },
  { icon: Users,         value: "380K+",  label: "Students Enrolled",  accent: "#F97316" },
  { icon: MapPin,        value: "320+",   label: "NGO Partners",       accent: "#A78BFA" },
]

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [geoData, setGeoData] = useState<any | null>(null)
  const [selected, setSelected] = useState<typeof markers[0] | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mapBg = isDark ? "#0b1121" : "#f1f5f9"
  const stateFill = isDark ? "transparent" : "transparent"
  const stateHover = isDark ? "#f8fafc" : "#0f172a"
  const strokeColor = isDark ? "#f8fafc" : "#0f172a"

  useEffect(() => {
    const loadGeoData = async () => {
      try {
        const response = await fetch(GEO_URL)
        if (!response.ok) throw new Error("GeoJSON fetch failed")
        const json = await response.json()
        setGeoData(json)
      } catch (error) {
        console.error("LiveImpactMap failed to load geojson:", error)
      }
    }

    loadGeoData()
  }, [])

  useEffect(() => {
    const close = () => {
      setSelected(null)
      setTooltipPos(null)
    }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  function handleMarkerEnter(marker: typeof markers[0], e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setSelected(marker)
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  function handleMarkerMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  function handleMarkerLeave() {
    setSelected(null)
    setTooltipPos(null)
  }

  return (
    <Reveal>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Impact across country
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>
            Track education impact across schools, NGOs and partner states.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)" }}>
          <div ref={containerRef} className="relative w-full py-4" style={{ background: mapBg }}>
            <div className="mx-auto max-w-6xl px-4 py-6">
              {!geoData ? (
                <div className="flex min-h-[680px] items-center justify-center text-sm" style={{ color: "var(--muted-text)" }}>
                  Loading India map...
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden border-2" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.14)", background: isDark ? "#111827" : "#f8fafc" }}>
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 1200, center: [83, 23] }}
                    width={1000}
                    height={900}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  >
                    <Geographies geography={geoData}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: { fill: stateFill, stroke: strokeColor, strokeWidth: 3, outline: "none", fillOpacity: 0 },
                              hover:   { fill: stateFill, stroke: strokeColor, strokeWidth: 3, outline: "none", fillOpacity: 0, cursor: "default" },
                              pressed: { outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>

                    {markers.map((marker) => (
                      <Marker key={marker.name} coordinates={marker.coordinates}>
                        <circle r={14} fill="#F97316" fillOpacity={0.15} style={{ pointerEvents: "none" }} />
                        <circle
                          r={6}
                          fill="#F97316"
                          stroke="#ffffff"
                          strokeWidth={1.5}
                          style={{ cursor: "pointer", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))" }}
                          onMouseEnter={(e) => handleMarkerEnter(marker, e as unknown as React.MouseEvent)}
                          onMouseMove={(e) => handleMarkerMove(e as unknown as React.MouseEvent)}
                          onMouseLeave={handleMarkerLeave}
                        />
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>
              )}
            </div>

            {selected && tooltipPos && (
              <div
                className="pointer-events-none absolute z-30 rounded-xl shadow-2xl"
                style={{
                  left: Math.min(tooltipPos.x + 14, (containerRef.current?.offsetWidth ?? 400) - 185),
                  top: Math.max(tooltipPos.y - 100, 8),
                  width: 172,
                  background: "rgba(15,23,42,0.96)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fb923c", marginBottom: 8, letterSpacing: "0.04em" }}>
                  {selected.name}
                </div>
                {[
                  { label: "Schools",  value: selected.schools },
                  { label: "Students", value: selected.students },
                  { label: "NGOs",     value: selected.ngos },
                  { label: "Projects", value: selected.projects },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#f1f5f9" }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#F97316" }} />
              <span className="text-xs" style={{ color: "var(--muted-text)" }}>Hover over dots to see impact data</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, accent }) => (
            <div
              key={label}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <div>
                <div className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                  {value}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--muted-text)" }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
