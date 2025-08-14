"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuiz } from "@/components/quiz-context"
import { ChevronLeft, Shield, Clock } from "lucide-react"

export function LeadCaptureScreen() {
  const { quizData, updateQuizData, nextStep, prevStep } = useQuiz()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    updateQuizData({ [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!quizData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!quizData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(quizData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!quizData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      const phoneDigits = quizData.phone.replace(/\D/g, "")
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-900">
      <Card className="p-8 border-2 border-slate-100 shadow-lg">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Almost there! Get your instant offer
            </h2>
            <p className="text-gray-300">We'll send your personalized home valuation report right to your inbox</p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 py-4 border-y border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Instant Results</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={quizData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={quizData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={quizData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                Property Address <span className="text-slate-400">(Optional)</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main St, City, State"
                value={quizData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-12"
              />
              <p className="text-xs text-slate-500">Helps us provide a more accurate valuation</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanBalance" className="text-sm font-medium text-slate-700">
                Current Loan Balance <span className="text-slate-400">(Optional)</span>
              </Label>
              <Input
                id="loanBalance"
                type="text"
                placeholder="$200,000"
                value={quizData.loanBalance}
                onChange={(e) => handleInputChange("loanBalance", e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full bg-gradient-to-r from-[#F6BC3E] to-amber-400 hover:from-[#F6BC3E]/90 hover:to-amber-500 text-black py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get My Instant Cash Offer
          </Button>

          <p className="text-xs text-center text-slate-500">
            By continuing, you agree to receive calls and texts about your home sale inquiry. Message and data rates may
            apply.
          </p>
        </div>
      </Card>
    </div>
  )
}
