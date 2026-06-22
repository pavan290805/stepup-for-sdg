"use client"

import React, { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { Search, School, ClipboardList, Users, X } from "lucide-react"
import { Reveal } from "@/components/reveal"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

type Region = {
  level: "high" | "medium" | "low" | "nodata"
  schools: number
  projects: number
  students: string
  ngos?: number
}

const regionData: Record<string, Region> = {
  "356": { level: "high", schools: 420, projects: 120, students: "85,000+", ngos: 35 }, // India
  "840": { level: "low", schools: 80, projects: 25, students: "12,000+", ngos: 10 }, // United States
  "404": { level: "medium", schools: 150, projects: 45, students: "25,000+", ngos: 18 }, // Kenya
  "524": { level: "medium", schools: 95, projects: 30, students: "14,000+", ngos: 12 }, // Nepal
}

const countryNames: Record<string, string> = {
  "356": "India",
  "840": "United States",
  "404": "Kenya",
  "524": "Nepal",
}

// Premium dark dashboard colors
const levelColors: Record<Region["level"], string> = {
  high: "#06B6D4", // Bright Teal
  medium: "#22C55E", // Green
  low: "#F97316", // Orange
  nodata: "#374151", // Dark Gray
}

const glowColors: Record<Region["level"], string> = {
  high: "rgba(6, 182, 212, 0.3)",
  medium: "rgba(34, 197, 94, 0.3)",
  low: "rgba(249, 115, 22, 0.3)",
  nodata: "rgba(55, 65, 81, 0.1)",
}

// Small legend used below cards (High / Medium / Low)

export default function ImpactMap() {
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const countryList = Object.entries(countryNames).map(([id, name]) => ({ id, name }))

  const onSearchChange = (value: string) => {
    setSearch(value)
    if (!value) return setSuggestions([])
    const q = value.toLowerCase()
    const matches = countryList.filter((c) => c.name.toLowerCase().includes(q))
    setSuggestions(matches.slice(0, 6))
  }

  const clearAll = () => {
    setSelected(null)
    setSearch("")
    setSuggestions([])
    setHoveredCountry(null)
  }

  const selectedData = selected ? regionData[selected] : null
  const selectedCountry = selected ? countryNames[selected] : null

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Live Impact Count
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Track education impact across schools, NGOs and partner regions.
          </p>
        </div>

        {/* Search Bar (centered) */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search country or region..."
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-1 focus:ring-slate-300"
            />

            {(search || selected) && (
              <button
                onClick={clearAll}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelected(s.id)
                      setSearch(s.name)
                      setSuggestions([])
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b last:border-b-0"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected country info (small card) */}
        {selected && (
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{countryNames[selected] || selected}</div>
                {selectedData ? (
                  <div className="mt-1 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Schools Supported: <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedData.schools}</span></div>
                    <div>Projects Completed: <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedData.projects}</span></div>
                    <div>Students Enrolled: <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedData.students}</span></div>
                    <div>NGO Partners: <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedData.ngos ?? '—'}</span></div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-400">No impact data available yet for this country.</div>
                )}
              </div>
              <div>
                <button onClick={clearAll} className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800">Clear</button>
              </div>
            </div>
          </div>
        )}

          {/* Map Card */}
          <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-6 overflow-hidden">
            {/* Map container */}
            <div className="rounded-3xl bg-slate-50 dark:bg-slate-800 overflow-hidden flex items-center justify-center w-full h-[260px] md:h-[320px] lg:h-[360px]">
              <div className="w-full h-full">
              <ComposableMap projectionConfig={{ scale: 125 }} width={1000} height={600} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) => (
                      geographies.map((geo) => {
                        const id = String(geo.id)
                        const data = regionData[id]

                        const isSelected = selected === id
                        const hasData = Boolean(data)
                        const isHovered = hoveredCountry === id

                        // Fill logic per requirements
                        const fill = isSelected
                          ? "#0CC0DF"
                          : selected
                            ? "#CBD5E1"
                            : hasData
                              ? levelColors[data!.level]
                              : "#E2E8F0"

                        const opacity = selected && !isSelected ? 0.25 : 1

                        const stroke = isSelected ? "#0F172A" : "#94A3B8"
                        const strokeWidth = isSelected ? 1.2 : 0.3

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => setHoveredCountry(id)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            onClick={() => {
                              console.log("Clicked country id:", id)
                              setSelected(id)
                              setSearch(countryNames[id] || "")
                              setSuggestions([])
                            }}
                            style={{
                              default: {
                                fill,
                                stroke,
                                strokeWidth,
                                outline: "none",
                                transition: "all 0.12s ease",
                                opacity,
                                filter: isSelected
                                  ? "drop-shadow(0 8px 18px rgba(6,182,212,0.18))"
                                  : isHovered
                                    ? "brightness(1.06)"
                                    : "none",
                              },
                              hover: {
                                fill: "#00A8A8",
                                outline: "none",
                                opacity: 1,
                                cursor: "pointer",
                                filter: "none",
                              },
                              pressed: { outline: "none" },
                            }}
                          />
                        )
                      })
                    )}
                  </Geographies>
                </ComposableMap>
              </div>
            </div>
          </div>

          {/* Selected country summary (above cards) */}
          {selectedCountry && (
            <div className="max-w-4xl mx-auto mt-5 text-center">
              {selectedData ? (
                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedCountry}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{selectedData.level} impact</div>
                </div>
              ) : (
                <div className="inline-block px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                  No impact data available yet for this country.
                </div>
              )}
            </div>
          )}

          {/* Impact Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <School className="w-5 h-5 text-slate-700 dark:text-slate-100" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">1,240+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Schools Supported</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <ClipboardList className="w-5 h-5 text-slate-700 dark:text-slate-100" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">560+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Projects Completed</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-100" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">380K+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Students Enrolled</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-100" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">320+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">NGO Partners</div>
              </div>
            </div>
          </div>

          {/* Small horizontal legend (below cards) */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: levelColors.high }} />
              <span className="text-slate-700 dark:text-slate-300">High Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: levelColors.medium }} />
              <span className="text-slate-700 dark:text-slate-300">Medium Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: levelColors.low }} />
              <span className="text-slate-700 dark:text-slate-300">Low Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: levelColors.nodata }} />
              <span className="text-slate-700 dark:text-slate-300">No Data</span>
            </div>
          </div>
      </section>
    </Reveal>
  )
}
