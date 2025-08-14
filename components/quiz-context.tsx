"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface QuizData {
  homeValue: string
  equity: string
  repairs: string
  timeline: string
  name: string
  email: string
  phone: string
  address: string
  loanBalance: string
}

interface QuizContextType {
  currentStep: number
  totalSteps: number
  quizData: QuizData
  setCurrentStep: (step: number) => void
  updateQuizData: (data: Partial<QuizData>) => void
  nextStep: () => void
  prevStep: () => void
  calculateOffer: () => number
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 7 // Welcome, 4 questions, lead capture, results

  const [quizData, setQuizData] = useState<QuizData>({
    homeValue: "",
    equity: "",
    repairs: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    loanBalance: "",
  })

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateOffer = () => {
    const homeValueNum = Number.parseInt(quizData.homeValue.replace(/[^0-9]/g, "")) || 0
    let offerPercentage = 0.87 // Base 87% (middle of 85-90% range)

    // Adjust based on repairs - smaller deductions to keep offers attractive
    if (quizData.repairs === "major")
      offerPercentage -= 0.02 // Only 2% reduction
    else if (quizData.repairs === "cosmetic") offerPercentage -= 0.01 // Only 1% reduction

    // Adjust based on timeline - reward urgency
    if (quizData.timeline === "asap")
      offerPercentage += 0.03 // 3% bonus for urgency
    else if (quizData.timeline === "1-3 months") offerPercentage += 0.01 // 1% bonus

    // Ensure we stay within 85-90% range
    offerPercentage = Math.max(0.85, Math.min(0.9, offerPercentage))

    return Math.round(homeValueNum * offerPercentage)
  }

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        totalSteps,
        quizData,
        setCurrentStep,
        updateQuizData,
        nextStep,
        prevStep,
        calculateOffer,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
