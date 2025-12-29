"use client"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Send, Stethoscope, User } from "lucide-react"

type Message = {
  id: number
  role: "assistant" | "user"
  content: string
}

export default function ExplanationChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm the SymptoCare Research Assistant. I can help explain your risk prediction results. What would you like to know about the Common Cold or Influenza risks identified?",
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now(), role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    // Rule-based mock response
    setTimeout(() => {
      let response = ""
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("why") || lowerInput.includes("reason")) {
        response =
          "Your risk for Common Cold (85% confidence) was identified primarily because you reported Fever, Cough, and Fatigue. These are hallmark symptoms mapped in our research database."
      } else if (lowerInput.includes("test") || lowerInput.includes("do next")) {
        response =
          "Based on these risks, a doctor might typically suggest a physical examination, a CBC (Complete Blood Count), or a rapid flu test to differentiate between viral strains."
      } else {
        response =
          "I can explain the technical reasoning behind your prediction or suggest common medical tests that health professionals use to verify these specific symptoms."
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: response }])
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto flex flex-col h-[700px]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              Risk Explanation Agent
            </h1>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              Research Prototype
            </Badge>
          </div>

          <Card className="flex-1 flex flex-col overflow-hidden shadow-xl border-2 border-primary/5">
            <CardHeader className="bg-muted/30 border-b py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Advisory conversation only • Not a medical diagnosis</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6" viewportRef={scrollRef}>
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        {m.role === "assistant" ? (
                          <>
                            <AvatarImage src="/medical-bot.jpg" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                              SC
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                          m.role === "assistant"
                            ? "bg-muted/50 text-foreground rounded-tl-none"
                            : "bg-primary text-primary-foreground rounded-tr-none"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="p-4 bg-muted/30 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex w-full gap-2"
              >
                <Input
                  placeholder="Ask why you have this risk or what tests to take..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-card"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>

          <p className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
            University Research Project • Non-Clinical Utility
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
