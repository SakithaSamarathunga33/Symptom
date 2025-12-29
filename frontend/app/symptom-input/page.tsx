"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronLeft, Loader2, X, AlertCircle } from "lucide-react"

const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Moneragala",
  "Ratnapura",
  "Kegalle",
]

const symptomSuggestions = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Chest Pain",
  "Shortness of breath",
  "Muscle ache",
  "Sore throat",
]

export default function SymptomInputPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    currentSymptom: "",
    ageGroup: "",
    gender: "",
    duration: "",
    district: "",
  })

  const addSymptom = (symptom: string) => {
    if (symptom && !formData.symptoms.includes(symptom)) {
      setFormData({ ...formData, symptoms: [...formData.symptoms, symptom], currentSymptom: "" })
    }
  }

  const removeSymptom = (symptom: string) => {
    setFormData({ ...formData, symptoms: formData.symptoms.filter((s) => s !== symptom) })
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    router.push("/results")
  }

  if (isProcessing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
        <div className="text-center max-w-md">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Analyzing Symptoms</h2>
          <p className="text-muted-foreground mb-8">
            Our rule-based engine is mapping your inputs to structured health features...
          </p>
          <div className="space-y-4 text-left bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 text-sm text-primary">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Tokenizing symptom descriptions...</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75" />
              <span>Mapping to clinical risk factors...</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>Running risk prediction model...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
              <p className="text-muted-foreground">Step {step} of 3</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-2 w-12 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>

          <Card className="shadow-lg border-2 border-primary/5">
            <CardHeader>
              <CardTitle>
                {step === 1 && "What symptoms are you experiencing?"}
                {step === 2 && "Tell us a bit about yourself"}
                {step === 3 && "Confirm details"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Add as many symptoms as you can for accurate prediction."}
                {step === 2 && "Basic demographic information helps refine the risk model."}
                {step === 3 && "Review your information before starting analysis."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a symptom..."
                      value={formData.currentSymptom}
                      onChange={(e) => setFormData({ ...formData, currentSymptom: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && addSymptom(formData.currentSymptom)}
                    />
                    <Button onClick={() => addSymptom(formData.currentSymptom)}>Add</Button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-10">
                    {formData.symptoms.map((s) => (
                      <Badge key={s} variant="secondary" className="pl-3 pr-1 py-1 gap-1">
                        {s}
                        <button onClick={() => removeSymptom(s)} className="p-0.5 hover:bg-muted rounded-full">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {formData.symptoms.length === 0 && (
                      <p className="text-sm text-muted-foreground">No symptoms added yet.</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Suggested</p>
                    <div className="flex flex-wrap gap-2">
                      {symptomSuggestions.map((s) => (
                        <Button
                          key={s}
                          variant="outline"
                          size="sm"
                          onClick={() => addSymptom(s)}
                          className="rounded-full"
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age Group</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, ageGroup: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-18">0-18</SelectItem>
                        <SelectItem value="19-35">19-35</SelectItem>
                        <SelectItem value="36-55">36-55</SelectItem>
                        <SelectItem value="56+">56+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Symptom Duration</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-day">Less than 24 hours</SelectItem>
                        <SelectItem value="1-3-days">1-3 days</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="longer">More than a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, district: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d} value={d.toLowerCase()}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm">
                      <strong>Symptoms:</strong> {formData.symptoms.join(", ") || "None"}
                    </p>
                    <p className="text-sm">
                      <strong>Age Group:</strong> {formData.ageGroup}
                    </p>
                    <p className="text-sm">
                      <strong>Gender:</strong> {formData.gender}
                    </p>
                    <p className="text-sm">
                      <strong>Duration:</strong> {formData.duration}
                    </p>
                    <p className="text-sm">
                      <strong>District:</strong> {formData.district}
                    </p>
                  </div>
                  <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      By proceeding, you acknowledge this system is for research only and not a clinical diagnosis.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={step === 1 && formData.symptoms.length === 0}>
                {step === 3 ? "Start Analysis" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
