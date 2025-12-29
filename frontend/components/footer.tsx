import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">SymptomPredict</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A university research project focused on early symptom analysis and disease risk prediction through
              machine learning and rule-based mapping systems.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Research</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  System Stats
                </Link>
              </li>
              <li>
                <Link href="/geo-map" className="text-muted-foreground hover:text-primary transition-colors">
                  Regional Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/symptom-input" className="text-muted-foreground hover:text-primary transition-colors">
                  Symptom Tool
                </Link>
              </li>
              <li>
                <Link href="/explanation-chat" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Symptom-to-Disease Prediction Research Project. All rights reserved.</p>
          <p className="mt-2">Educational research tool. Not for clinical diagnosis.</p>
        </div>
      </div>
    </footer>
  )
}
