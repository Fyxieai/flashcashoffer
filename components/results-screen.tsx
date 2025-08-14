"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuiz } from "@/components/quiz-context"
import { DollarSign, Calendar, Phone, Mail, Zap } from "lucide-react"

export function ResultsScreen() {
  const { quizData, calculateOffer } = useQuiz()
  const [showLightning, setShowLightning] = useState(false)
  const [displayOffer, setDisplayOffer] = useState(0)

  const finalOffer = calculateOffer()

  useEffect(() => {
    setShowLightning(true)

    // Hide lightning after animation completes
    setTimeout(() => setShowLightning(false), 800)

    // Animate the offer number counting up
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = finalOffer / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= finalOffer) {
        setDisplayOffer(finalOffer)
        clearInterval(timer)
      } else {
        setDisplayOffer(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [finalOffer])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const savings = Math.floor(Math.random() * 30000) + 30000 // Random savings between $30K-$60K

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {showLightning && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Zap
                className="w-16 h-16 text-[#F6BC3E] drop-shadow-2xl animate-pulse"
                style={{ animationDuration: "0.2s" }}
              />
            </div>

            <div
              className="absolute inset-0 bg-[#F6BC3E] opacity-30"
              style={{
                animation: "flash 0.3s ease-out",
              }}
            />
          </div>
        </div>
      )}

      {/* Main Results Card */}
      <Card className="p-8 border-2 border-border bg-card/90 backdrop-blur-sm shadow-xl">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
              Congratulations, {quizData.name}!
            </h1>
            <p className="text-lg text-muted-foreground">Here's your personalized cash offer estimate</p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 border-2 border-[#F6BC3E]/20 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#F6BC3E]/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#F6BC3E]" />
              </div>
              <span className="text-lg font-medium text-foreground">Your Estimated Cash Offer</span>
            </div>

            <div className="text-5xl md:text-6xl font-sans font-bold text-[#F6BC3E] mb-2">
              {formatCurrency(displayOffer)}
            </div>

            <p className="text-lg text-muted-foreground mb-4">Save {formatCurrency(savings)} vs. traditional sale!</p>

            <div className="bg-[#F6BC3E]/10 border border-[#F6BC3E]/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>This is an estimate.</strong> Want your EXACT offer? Book a 10-minute call with our team—no
                obligation.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <Calendar className="w-5 h-5 text-[#F6BC3E] mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Close Fast</h3>
                <p className="text-sm text-muted-foreground">As little as 7 days</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <DollarSign className="w-5 h-5 text-[#F6BC3E] mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">No Fees</h3>
                <p className="text-sm text-muted-foreground">No commissions or closing costs</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <Zap className="w-5 h-5 text-[#F6BC3E] mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">As-Is Sale</h3>
                <p className="text-sm text-muted-foreground">No repairs needed</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA Buttons */}
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-[#F6BC3E] to-amber-400 hover:from-[#F6BC3E]/90 hover:to-amber-500 text-black py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          onClick={() => window.open("https://app.fyxie.ai/widget/booking/tuJLSOgIBKY96Rgn7l0g", "_blank")}
        >
          <Phone className="w-5 h-5 mr-2" />
          Get Your REAL Offer—Book a Call Now!
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full border-2 border-border hover:bg-muted/50 py-4 text-lg font-medium rounded-xl bg-transparent text-foreground"
          onClick={() => {
            const subject = encodeURIComponent(`Home Offer Estimate: ${formatCurrency(finalOffer)}`)
            const body = encodeURIComponent(
              `Hi ${quizData.name},\n\nYour estimated cash offer is ${formatCurrency(finalOffer)}.\n\nWant to discuss your exact offer? Reply to this email or call us!\n\nBest regards,\nThe Home Buying Team`,
            )
            window.location.href = `mailto:${quizData.email}?subject=${subject}&body=${body}`
          }}
        >
          <Mail className="w-5 h-5 mr-2" />
          Email My Estimate
        </Button>
      </div>

      {/* Testimonial */}
      <Card className="p-6 bg-muted/30 border border-border">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#F6BC3E] text-xl">
                ★
              </span>
            ))}
          </div>
          <blockquote className="text-lg italic text-foreground">
            "Sold my home in 7 days—no stress, no repairs, no showings. These guys are the real deal!"
          </blockquote>
          <cite className="text-sm font-medium text-muted-foreground">— Sarah M., Recent Seller</cite>
        </div>
      </Card>

      <style jsx>{`
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
