import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ShieldCheck,
  Search,
  BarChart3,
  MapPin,
  ArrowRight,
  ClipboardList,
  MessageSquare,
  AlertCircle,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Understand Your Symptoms. <br />
                <span className="text-primary">Predict Health Risks Early.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                AI-powered symptom analysis & risk prediction. Get insights into your health and understand potential
                risks with our university research project.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/symptom-input">
                    Check Symptoms
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" asChild>
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 -z-10">
            <div className="h-[600px] w-[600px] rounded-full bg-primary blur-[100px]" />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How the system works</h2>
              <p className="mt-4 text-muted-foreground">Four simple steps to understand your health better.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Input Symptoms",
                  desc: "Detail your symptoms, age, and duration in our secure interface.",
                  icon: ClipboardList,
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  desc: "Our engine maps symptoms to potential disease features.",
                  icon: Search,
                },
                {
                  step: "03",
                  title: "Risk Prediction",
                  desc: "Get predictions on potential diseases and risk levels.",
                  icon: BarChart3,
                },
                {
                  step: "04",
                  title: "Actionable Insights",
                  desc: "Chat with our assistant for advice and recommended tests.",
                  icon: MessageSquare,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <span className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </span>
                  <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Core Research Components</h2>
              <p className="mt-4 text-muted-foreground">Technical pillars driving our health prediction system.</p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              {[
                {
                  title: "Multilingual Engine",
                  desc: "Advanced rule-based mapping system that understands symptoms across different linguistic nuances.",
                  icon: ShieldCheck,
                },
                {
                  title: "Multi-Disease ML Model",
                  desc: "Research-driven machine learning models trained to identify patterns across multiple disease categories.",
                  icon: BarChart3,
                },
                {
                  title: "Conversational Agent",
                  desc: "Context-aware explanation agent that provides risk assessments and suggests medical tests.",
                  icon: MessageSquare,
                },
                {
                  title: "Geo-Health Mapping",
                  desc: "Visualizing community health trends through interactive heatmaps for localized risk assessment.",
                  icon: MapPin,
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-2xl bg-card border-2 border-primary/20 p-8 text-center shadow-lg">
              <AlertCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-2xl font-bold">Advisory Only</h2>
              <p className="text-muted-foreground leading-relaxed">
                This system is a university research project designed for educational and awareness purposes. It is{" "}
                <strong>NOT a medical diagnosis tool</strong>. All predictions are advisory and should not be used as
                professional medical advice. Always consult with a qualified healthcare provider for any medical
                concerns.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
