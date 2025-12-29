"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Info, AlertTriangle, Layers } from "lucide-react"

// Mock data for Sri Lanka districts and risk levels
const districtRisks = [
  { name: "Colombo", risk: "High", level: 85, trend: "up" },
  { name: "Gampaha", risk: "Moderate", level: 60, trend: "stable" },
  { name: "Kandy", risk: "Moderate", level: 55, trend: "down" },
  { name: "Galle", risk: "Low", level: 25, trend: "stable" },
  { name: "Jaffna", risk: "Low", level: 20, trend: "down" },
  { name: "Kalutara", risk: "Moderate", level: 50, trend: "up" },
  { name: "Anuradhapura", risk: "Low", level: 15, trend: "stable" },
]

export default function GeoMapPage() {
  const [selectedDisease, setSelectedDisease] = useState("common-cold")

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Geo-Health Risk Mapping</h1>
            <p className="text-muted-foreground">District-level community health trends and risk visualization.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="common-cold" onValueChange={setSelectedDisease}>
              <SelectTrigger className="w-[200px]">
                <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select Disease" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="common-cold">Common Cold</SelectItem>
                <SelectItem value="influenza">Influenza (Flu)</SelectItem>
                <SelectItem value="dengue">Dengue Fever</SelectItem>
                <SelectItem value="diabetes">Type II Diabetes</SelectItem>
              </SelectContent>
            </Select>
            <Badge
              variant="outline"
              className="h-10 px-4 py-0 flex items-center gap-2 bg-primary/5 text-primary border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Data
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Map Visualization (Placeholder for Leaflet/Mapbox) */}
          <Card className="lg:col-span-2 overflow-hidden border-2 border-primary/5 shadow-xl">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Interactive Sri Lanka Health Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative h-[600px] bg-slate-100 flex items-center justify-center">
              {/* Map Placeholder Graphic */}
              <div className="absolute inset-0 opacity-40 bg-[url('/images/attachments-gen-images-public-map-pattern.png')] bg-center bg-no-repeat bg-contain" />

              <div className="relative z-10 text-center p-8 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-2xl max-w-sm">
                <Layers className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Map Visualization Engine</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In a production environment, this would integrate with <strong>Leaflet.js</strong> to render GeoJSON
                  district boundaries colored by health risk intensity.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Badge className="bg-red-500 hover:bg-red-600">High Risk</Badge>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Moderate</Badge>
                  <Badge className="bg-green-500 hover:bg-green-600">Low Risk</Badge>
                </div>
              </div>

              {/* Mock Markers */}
              <div className="absolute top-[40%] left-[55%] h-8 w-8 rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center animate-pulse">
                <div className="h-2 w-2 rounded-full bg-red-500" />
              </div>
              <div className="absolute top-[30%] left-[45%] h-6 w-6 rounded-full bg-yellow-500/30 border-2 border-yellow-500 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
              </div>
            </CardContent>
          </Card>

          {/* District Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/5 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Risk Summary by District</CardTitle>
                <CardDescription>Anonymized regional trends.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {districtRisks.map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.risk} Risk Intensity</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={d.risk === "High" ? "destructive" : d.risk === "Moderate" ? "secondary" : "outline"}
                        >
                          {d.level}%
                        </Badge>
                        <p
                          className={`text-[10px] mt-1 ${d.trend === "up" ? "text-red-500" : d.trend === "down" ? "text-green-500" : "text-muted-foreground"}`}
                        >
                          {d.trend === "up" ? "↑ Increasing" : d.trend === "down" ? "↓ Decreasing" : "→ Stable"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  Research Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Data visualized here is collected from anonymized symptom checks within the university research
                  network. No personally identifiable information (PII) is displayed.
                </p>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <p className="text-xs font-bold text-destructive uppercase">Ethical Disclaimer</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  This map provides general risk assessments and is NOT for epidemiological tracking or emergency
                  response coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
