"use client"

import { memo, useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import { ComposableMap, Geographies, Geography, Sphere } from "react-simple-maps"
import { motion } from "framer-motion"
import { School, ClipboardList, Users, MapPin } from "lucide-react"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"

const GEO_URL = "/india-states.geojson"
const stats = [
  { icon: School, value: "1,240+", label: "Schools Supported", accent: "#06B6D4" }, { icon: ClipboardList, value: "560+", label: "Projects Completed", accent: "#22C55E" }, { icon: Users, value: "380K+", label: "Students Enrolled", accent: "#F97316" }, { icon: MapPin, value: "320+", label: "NGO Partners", accent: "#A78BFA" },
]
type Impact = { schools?: number; students?: string; ngos?: number; projects?: number }
type TooltipInfo = { name: string; impact: Impact | null }
type GeoFeature = { rsmKey: string; properties: { STNAME?: string; STCODE11?: string } }
const knownStateImpact: Record<string, Impact> = { DELHI: { schools: 120, students: "24,000+", ngos: 15, projects: 35 }, MAHARASHTRA: { schools: 135, students: "28,000+", ngos: 17, projects: 40 }, KARNATAKA: { schools: 80, students: "16,200+", ngos: 10, projects: 24 }, "TAMIL NADU": { schools: 65, students: "13,100+", ngos: 9, projects: 20 }, TELANGANA: { schools: 68, students: "13,600+", ngos: 7, projects: 20 }, "WEST BENGAL": { schools: 58, students: "11,700+", ngos: 7, projects: 17 }, GUJARAT: { schools: 43, students: "8,800+", ngos: 6, projects: 13 }, RAJASTHAN: { schools: 38, students: "7,700+", ngos: 5, projects: 11 }, "UTTAR PRADESH": { schools: 35, students: "7,100+", ngos: 5, projects: 10 }, BIHAR: { schools: 28, students: "5,700+", ngos: 3, projects: 7 }, "JAMMU & KASHMIR": { schools: 19, students: "4,150+", ngos: 3, projects: 5 } }
const impactFields = [
  { key: "schools", label: "Schools", icon: "🏫" },
  { key: "students", label: "Students", icon: "👨‍🎓" },
  { key: "ngos", label: "NGOs", icon: "🤝" },
  { key: "projects", label: "Projects", icon: "📋" },
] as const

function stateImpact(name: string): Impact | null {
  return knownStateImpact[name] ?? null
}

function formatImpactValue(value: string | number) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : value
}

type GeoShapeProps = { geo: GeoFeature; isDark: boolean; onTooltipEnter: (event: MouseEvent<SVGPathElement>, info: TooltipInfo) => void; onTooltipMove: (event: MouseEvent<SVGPathElement>) => void; onTooltipLeave: () => void }
const GeoShape = memo(function GeoShape({ geo, isDark, onTooltipEnter, onTooltipMove, onTooltipLeave }: GeoShapeProps) {
  const stName = String(geo.properties.STNAME ?? "").trim() || "State"
  const impact = stateImpact(stName)
  const showTooltip = (event: MouseEvent<SVGPathElement>) => {
    event.currentTarget.parentElement?.appendChild(event.currentTarget)
    onTooltipEnter(event, { name: stName, impact })
  }

  return <Geography geography={geo} className="rsm-geography"
    role="button"
    tabIndex={0}
    aria-label={`${stName} impact data`}
    onMouseEnter={showTooltip}
    onMouseMove={onTooltipMove}
    onMouseLeave={onTooltipLeave}
    style={{ default: { fill: "rgba(0,0,0,0.001)", stroke: isDark ? "#f8fafc" : "#0f172a", strokeWidth: 2.3, outline: "none" }, hover: { fill: "rgba(0,0,0,0.001)", stroke: isDark ? "#f8fafc" : "#0f172a", strokeWidth: 2.3, outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }} />
})

type MapCanvasProps = { geoData: unknown; isDark: boolean; onTooltipEnter: GeoShapeProps["onTooltipEnter"]; onTooltipMove: GeoShapeProps["onTooltipMove"]; onTooltipLeave: GeoShapeProps["onTooltipLeave"] }
const MapCanvas = memo(function MapCanvas({ geoData, isDark, onTooltipEnter, onTooltipMove, onTooltipLeave }: MapCanvasProps) {
  return <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1200, center: [83, 23] }} width={1000} height={900} style={{ width: "100%", height: "auto", display: "block" }}><Sphere id="rsm-sphere" fill="transparent" stroke="transparent" strokeWidth={0} /><Geographies geography={geoData}>{({ geographies }: { geographies: GeoFeature[] }) => {
    return geographies.map((geo) => <GeoShape key={geo.rsmKey} geo={geo} isDark={isDark} onTooltipEnter={onTooltipEnter} onTooltipMove={onTooltipMove} onTooltipLeave={onTooltipLeave} />)
  }}</Geographies></ComposableMap>
})

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipFrameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [geoData, setGeoData] = useState<unknown>(null)
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null)

  useEffect(() => { fetch(GEO_URL).then((response) => response.json()).then(setGeoData).catch((error) => console.error("Map data failed to load:", error)) }, [])

  const moveTooltipToPointer = useCallback(() => {
    const tooltipEl = tooltipRef.current
    if (!tooltipEl) return

    const offset = 16
    const gap = 8
    const width = tooltipEl.offsetWidth || 240
    const height = tooltipEl.offsetHeight || 172
    const { x, y } = pointerRef.current
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const left = x + offset + width > viewportWidth - gap ? x - width - offset : x + offset
    const top = y + offset + height > viewportHeight - gap ? y - height - offset : y + offset

    tooltipEl.style.left = `${Math.max(gap, Math.min(left, viewportWidth - width - gap))}px`
    tooltipEl.style.top = `${Math.max(gap, Math.min(top, viewportHeight - height - gap))}px`
  }, [])

  const scheduleTooltipMove = useCallback((event: MouseEvent<SVGPathElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (tooltipFrameRef.current !== null) return
    tooltipFrameRef.current = window.requestAnimationFrame(() => {
      tooltipFrameRef.current = null
      moveTooltipToPointer()
    })
  }, [moveTooltipToPointer])

  const showTooltip = useCallback((event: MouseEvent<SVGPathElement>, info: TooltipInfo) => {
    setTooltipInfo(info)
    scheduleTooltipMove(event)
  }, [scheduleTooltipMove])

  const hideTooltip = useCallback(() => {
    if (tooltipFrameRef.current !== null) {
      window.cancelAnimationFrame(tooltipFrameRef.current)
      tooltipFrameRef.current = null
    }
    setTooltipInfo(null)
  }, [])

  useEffect(() => () => {
    if (tooltipFrameRef.current !== null) window.cancelAnimationFrame(tooltipFrameRef.current)
  }, [])

  const tooltipRows = tooltipInfo?.impact ? impactFields.flatMap(({ key, label, icon }) => {
    const value = tooltipInfo.impact?.[key]
    return value === undefined || value === null || value === "" ? [] : [{ key, label, icon, value }]
  }) : []

  return <Reveal><section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="text-center mb-6"><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>Impact across country</h2><p className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>Hover over a state to see its education impact.</p></div>
    <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)" }}><div className="relative w-full py-4" style={{ background: isDark ? "#0b1121" : "#f1f5f9" }}>
      <div className="mx-auto max-w-6xl px-4 py-6">{!geoData ? <div className="flex min-h-[680px] items-center justify-center text-sm" style={{ color: "var(--muted-text)" }}>Loading India map...</div> : <div className="relative rounded-3xl overflow-hidden border-2" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.14)", background: isDark ? "#111827" : "#f8fafc" }}><style>{`
  .impact-map-surface .rsm-geography {
    cursor: pointer;
    transform-box: fill-box;
    transform-origin: center;
    transition: transform 200ms ease-out, filter 200ms ease-out, fill 200ms ease-out;
    will-change: transform, filter;
  }
  .impact-map-surface .rsm-geography:hover,
  .impact-map-surface .rsm-geography:focus-visible {
    fill: rgba(249,115,22,0.08) !important;
    filter: brightness(1.1) drop-shadow(0 10px 14px rgba(15,23,42,0.20)) drop-shadow(0 0 10px rgba(249,115,22,0.28));
    transform: translateY(-4px) scale(1.1);
    z-index: 2;
  }
  .rsm-svg, .rsm-svg rect, .rsm-svg path.rsm-sphere { fill: transparent !important; background: transparent !important; }
`}</style>
<div className="impact-map-surface"><MapCanvas geoData={geoData} isDark={isDark} onTooltipEnter={showTooltip} onTooltipMove={scheduleTooltipMove} onTooltipLeave={hideTooltip} /></div></div>}</div>
      <motion.div ref={tooltipRef} className="pointer-events-none fixed left-2 top-2 z-30 w-60 max-w-[calc(100vw-16px)] rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl" initial={false} animate={tooltipInfo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }} transition={{ duration: 0.15, ease: "easeOut" }} style={{ background: isDark ? "rgba(15,23,42,0.76)" : "rgba(255,255,255,0.78)", border: isDark ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(15,23,42,0.12)", color: "var(--foreground)", boxShadow: isDark ? "0 18px 42px rgba(0,0,0,0.42), 0 0 24px rgba(249,115,22,0.14)" : "0 18px 42px rgba(15,23,42,0.16), 0 0 24px rgba(249,115,22,0.12)", WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)" }}><div className="mb-2 text-sm font-bold" style={{ color: "var(--foreground)" }}>{tooltipInfo?.name}</div>{tooltipRows.length > 0 ? tooltipRows.map(({ key, label, icon, value }) => <div key={key} className="flex items-center justify-between gap-4 py-1 text-xs"><span style={{ color: "var(--muted-text)" }}>{icon} {label}</span><span className="font-semibold" style={{ color: "var(--foreground)" }}>{formatImpactValue(value)}</span></div>) : <div className="text-xs" style={{ color: "var(--muted-text)" }}>No data available.</div>}</motion.div>
    </div><div className="px-4 py-3 text-center text-xs" style={{ color: "var(--muted-text)" }}>Hover over any state to view its impact.</div></div>
    <div className="mt-6 rounded-3xl p-4 sm:p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}><div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{stats.map(({ icon: Icon, value, label, accent }) => <div key={label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "color-mix(in srgb, var(--background) 72%, transparent)", border: "1px solid var(--border)" }}><div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}18` }}><Icon className="w-5 h-5" style={{ color: accent }} /></div><div><div className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>{value}</div><div className="text-xs mt-1" style={{ color: "var(--muted-text)" }}>{label}</div></div></div>)}</div></div>
  </section></Reveal>
}

export default LiveImpactMap
