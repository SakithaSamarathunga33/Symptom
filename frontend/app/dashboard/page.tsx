"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, BrainCircuit, TrendingUp, MapIcon, ShieldCheck, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    { label: "Total Predictions", value: "1,284", icon: Activity, trend: "+12%" },
    { label: "Active Users", value: "432", icon: Users, trend: "+5%" },
    { label: "Model Confidence", value: "89.4%", icon: BrainCircuit, trend: "Stable" },
    { label: "Districts Mapped", value: "25/25", icon: MapIcon, trend: "Complete" },
  ]

  const recentPredictions = [
    { id: "P-1024", disease: "Common Cold", risk: "Moderate", time: "2 mins ago" },
    { id: "P-1023", disease: "Influenza", risk: "Low", time: "15 mins ago" },
    { id: "P-1022", disease: "Dengue Fever", risk: "High", time: "1 hour ago" },
    { id: "P-1021", disease: "Type II Diabetes", risk: "Moderate", time: "3 hours ago" },
  ]

  const regionalTrends = [
    { district: "Colombo", risk: 85, trend: "High" },
    { district: "Gampaha", risk: 62, trend: "Moderate" },
    { district: "Kandy", risk: 45, trend: "Moderate" },
    { district: "Galle", risk: 28, trend: "Low" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Research Dashboard</h1>
          <p className="text-muted-foreground">Monitoring system usage and community health risk trends.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-2 border-primary/5 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Regional Risk Distribution */}
          <Card className="lg:col-span-4 border-2 border-primary/5 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Regional Risk Distribution</CardTitle>
              <CardDescription>Average risk intensity by major districts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {regionalTrends.map((trend) => (
                <div key={trend.district} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{trend.district}</span>
                    <Badge
                      variant={
                        trend.trend === "High" ? "destructive" : trend.trend === "Moderate" ? "secondary" : "outline"
                      }
                    >
                      {trend.risk}% Risk
                    </Badge>
                  </div>
                  <Progress value={trend.risk} className="h-2" />
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link href="/geo-map">
                    View full geographical map
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Predictions List */}
          <Card className="lg:col-span-3 border-2 border-primary/5 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recent Predictions</CardTitle>
              <CardDescription>Live feed of system assessments.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentPredictions.map((pred) => (
                  <div
                    key={pred.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${pred.risk === "High" ? "bg-red-500" : pred.risk === "Moderate" ? "bg-yellow-500" : "bg-green-500"}`}
                      />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{pred.disease}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {pred.time}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {pred.id}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <div className="rounded-lg bg-primary/5 p-3 flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Data is anonymized and displayed for research monitoring purposes. No personally identifiable
                    information is stored.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
