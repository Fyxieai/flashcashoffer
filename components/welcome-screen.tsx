"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuiz } from "@/components/quiz-context"
import { Home, Clock, DollarSign } from "lucide-react"

export function WelcomeScreen() {
  const { nextStep } = useQuiz()

  return (
    <Card className="p-8 bg-card/90 backdrop-blur-sm border-border shadow-xl">
      <div className="text-center space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flashcash-hmxAt4GUT4oxplE8A2KbWzkfe8aaXc.png"
              alt="Flash Cash Offers"
              className="w-20 h-20 object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-foreground font-sans leading-tight">What's Your Home Really Worth?</h1>

          <p className="text-xl text-yellow-400 font-semibold">Cash or Creative Offer in 60 Seconds!</p>

          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Take our quick quiz to discover how much cash you could get for your property!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">60 seconds</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">Instant offer</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Home className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">No obligation</span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button
            onClick={nextStep}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-black font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Start My Free Valuation
          </Button>

          <p className="text-sm text-muted-foreground">Your answers are secure with us. Let's find out together!</p>
        </div>
      </div>
    </Card>
  )
}
