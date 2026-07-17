"use client"

import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { School, ClipboardList, Users, MapPin } from "lucide-react";
import { Reveal } from "@/app/components/reveal";
import { useTheme } from "@/app/components/ThemeProvider";

const GEO_URL = "/india-states.geojson";

const markers = [
  { name: "Delhi", coordinates: [77.1025, 28.7041] as [number, number], schools: 120, students: "24,000+", ngos: 15, projects: 35 },
  { name: "Mumbai", coordinates: [72.8777, 19.076], schools: 95, students: "19,500+", ngos: 12, projects: 28 },
  { name: "Bengaluru", coordinates: [77.5946, 12.9716], schools: 80, students: "16,200+", ngos: 10, projects: 24 },
  { name: "Chennai", coordinates: [80.2707, 13.0827], schools: 65, students: "13,100+", ngos: 9, projects: 20 },
  { name: "Hyderabad", coordinates: [78.4867, 17.385], schools: 68, students: "13,600+", ngos: 7, projects: 20 },
];

export function LiveImpactMap() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [geoData, setGeoData] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(GEO_URL);
        if (!r.ok) throw new Error("GeoJSON fetch failed");
        const j = await r.json();
        setGeoData(j);
      } catch (err) {
        console.error("LiveImpactMap failed to load geojson:", err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const close = () => {
      setSelected(null);
      setTooltipPos(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function handleMarkerEnter(marker: any, e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSelected(marker);
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function handleMarkerMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function handleMarkerLeave() {
    setSelected(null);
    setTooltipPos(null);
  }

  const mapBg = isDark ? "#0b1121" : "#f1f5f9";

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
                <div className="flex min-h-[420px] items-center justify-center text-sm" style={{ color: "var(--muted-text)" }}>
                  Loading India map...
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden border-2" style={{
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.14)",
                  background: isDark ? "#111827" : "#f8fafc"
                }}>
                  <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1200, center: [83, 23] }} width={1000} height={900} style={{ width: "100%", height: "auto", display: "block" }}>
                    <Geographies geography={geoData}>
                      {({ geographies }) =>
                        geographies.map(geo => (
                          <Geography key={geo.rsmKey} geography={geo} fill={isDark ? "transparent" : "transparent"} stroke={isDark ? "#f8fafc" : "#0f172a"} />
                        ))
                      }
                    </Geographies>

                    {markers.map((m, i) => (
                      <Marker key={m.name} coordinates={m.coordinates as [number, number]}>
                        <g transform="translate(-12, -24) scale(0.9)" onMouseEnter={(e) => handleMarkerEnter(m, e as any)} onMouseMove={handleMarkerMove} onMouseLeave={handleMarkerLeave}>
                          <circle r={10} fill="#fff" stroke="#0ea5c9" strokeWidth={2} />
                        </g>
                      </Marker>
                    ))}
                  </ComposableMap>

                  {/* Tooltip */}
                  {selected && tooltipPos && (
                    <div style={{ position: "absolute", left: tooltipPos.x + 8, top: tooltipPos.y + 8, background: "rgba(0,0,0,0.8)", color: "#fff", padding: 10, borderRadius: 8, zIndex: 40 }}>
                      <div style={{ fontWeight: 700 }}>{selected.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.9 }}>Schools: {selected.schools}</div>
                      <div style={{ fontSize: 12, opacity: 0.9 }}>Students: {selected.students}</div>
                      <div style={{ fontSize: 12, opacity: 0.9 }}>Projects: {selected.projects}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NOTE: statistics/cards below the map intentionally removed per request. */}
      </section>
    </Reveal>
  );
}

export default LiveImpactMap;
