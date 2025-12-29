import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">SymptomPredict</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/symptom-input" className="text-sm font-medium hover:text-primary transition-colors">
            Analysis
          </Link>
          <Link href="/geo-map" className="text-sm font-medium hover:text-primary transition-colors">
            Health Map
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/explanation-chat">AI Assistant</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/symptom-input">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
