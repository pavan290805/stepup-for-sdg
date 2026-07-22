"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { ComposableMap, Geographies, Geography, Sphere } from "react-simple-maps"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"

const GEO_URL = "/india-states.geojson"
type Impact = { schools: number; students: string; ngos: number; projects: number }
type Tooltip = { name: string; impact: Impact; x: number; y: number; maxX: number }
const knownStateImpact: Record<string, Impact> = { DELHI: { schools: 120, students: "24,000+", ngos: 15, projects: 35 }, MAHARASHTRA: { schools: 135, students: "28,000+", ngos: 17, projects: 40 }, KARNATAKA: { schools: 80, students: "16,200+", ngos: 10, projects: 24 }, "TAMIL NADU": { schools: 65, students: "13,100+", ngos: 9, projects: 20 }, TELANGANA: { schools: 68, students: "13,600+", ngos: 7, projects: 20 }, "WEST BENGAL": { schools: 58, students: "11,700+", ngos: 7, projects: 17 }, GUJARAT: { schools: 43, students: "8,800+", ngos: 6, projects: 13 }, RAJASTHAN: { schools: 38, students: "7,700+", ngos: 5, projects: 11 }, "UTTAR PRADESH": { schools: 35, students: "7,100+", ngos: 5, projects: 10 }, BIHAR: { schools: 28, students: "5,700+", ngos: 3, projects: 7 }, "JAMMU & KASHMIR": { schools: 19, students: "4,150+", ngos: 3, projects: 5 } }

function stateImpact(name: string, code: string): Impact {
  if (knownStateImpact[name]) return knownStateImpact[name]
  const seed = Number.parseInt(code, 10) || 1
  return { schools: 12 + (seed * 7) % 32, students: `${(3000 + (seed * 1150) % 5000).toLocaleString()}+`, ngos: 2 + seed % 5, projects: 4 + seed % 10 }
}

type GeoShapeProps = { geo: { rsmKey: string; properties: { STNAME?: string; STCODE11?: string } }; isDark: boolean; cursorPosition: (e: MouseEvent) => { x: number; y: number; maxX: number }; setTooltip: (t: Tooltip | null | ((current: Tooltip | null) => Tooltip | null)) => void }
function GeoShape({ geo, isDark, cursorPosition, setTooltip }: GeoShapeProps) {
  const stName = String(geo.properties.STNAME ?? "").trim() || "State"
  const stCode = String(geo.properties.STCODE11 ?? "1").trim()
  const impact = stateImpact(stName, stCode)
  const showTooltip = (event: MouseEvent) => setTooltip({ name: stName, impact, ...cursorPosition(event) })
  return <Geography geography={geo} className="rsm-geography"
    onMouseEnter={showTooltip}
    onMouseMove={showTooltip}
    onMouseLeave={() => setTooltip(null)}
    style={{ default: { fill: "rgba(0,0,0,0.001)", stroke: isDark ? "#f8fafc" : "#0f172a", strokeWidth: 2.3, outline: "none" }, hover: { fill: "rgba(249,115,22,0.08)", stroke: isDark ? "#f8fafc" : "#0f172a", strokeWidth: 2.3, outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }} />
}

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)
  const [geoData, setGeoData] = useState<unknown>(null)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)

  useEffect(() => { fetch(GEO_URL).then((response) => response.json()).then(setGeoData).catch((error) => console.error("Map data failed to load:", error)) }, [])
  function cursorPosition(event: MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect()
    return rect ? { x: event.clientX - rect.left, y: event.clientY - rect.top, maxX: rect.width - 210 } : { x: 0, y: 0, maxX: 190 }
  }

  return <Reveal><section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="text-center mb-6"><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>Impact across country</h2><p className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>Hover over a state to see its education impact.</p></div>
    <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)" }}><div ref={containerRef} className="relative w-full py-4" style={{ background: isDark ? "#0b1121" : "#f1f5f9" }}>
      <div className="mx-auto max-w-6xl px-4 py-6">{!geoData ? <div className="flex min-h-[680px] items-center justify-center text-sm" style={{ color: "var(--muted-text)" }}>Loading India map...</div> : <div className="relative rounded-3xl overflow-hidden border-2" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.14)", background: isDark ? "#111827" : "#f8fafc" }}><style>{`
  .rsm-geography { transition: none; }
  .rsm-svg, .rsm-svg rect, .rsm-svg path.rsm-sphere { fill: transparent !important; background: transparent !important; }
`}</style>
<ComposableMap projection="geoMercator" projectionConfig={{ scale: 1200, center: [83, 23] }} width={1000} height={900} style={{ width: "100%", height: "auto", display: "block" }}><Sphere id="rsm-sphere" fill="transparent" stroke="transparent" strokeWidth={0} /><Geographies geography={geoData}>{({ geographies }: { geographies: Array<{ rsmKey: string; properties: { STNAME?: string; STCODE11?: string } }> }) => {
  return geographies.map((geo, i) => <GeoShape key={i} geo={geo} isDark={isDark} cursorPosition={cursorPosition} setTooltip={setTooltip} />)
}}</Geographies></ComposableMap></div>}</div>
      {tooltip && <div className="pointer-events-none absolute z-30 w-48 rounded-xl p-3 shadow-2xl" style={{ left: Math.min(tooltip.x + 16, tooltip.maxX), top: Math.max(tooltip.y - 116, 8), background: "rgba(15,23,42,0.96)", border: "1px solid rgba(255,255,255,0.12)" }}><div className="mb-2 text-xs font-bold uppercase tracking-wide text-orange-400">{tooltip.name}</div>{[["Schools", tooltip.impact.schools], ["Students", tooltip.impact.students], ["NGOs", tooltip.impact.ngos], ["Projects", tooltip.impact.projects]].map(([label, value]) => <div key={String(label)} className="flex justify-between py-0.5 text-[11px]"><span className="text-slate-400">{label}</span><span className="font-semibold text-slate-100">{value}</span></div>)}</div>}
    </div><div className="px-4 py-3 text-center text-xs" style={{ color: "var(--muted-text)" }}></div></div>
  </section></Reveal>
}

export default LiveImpactMap