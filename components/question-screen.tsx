"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuiz } from "@/components/quiz-context"
import { ChevronLeft } from "lucide-react"

const questions = [
  {
    id: 1,
    title: "What's your home's rough value?",
    subtitle: "Don't worry about being exact—we'll refine this later",
    type: "select",
    field: "homeValue",
    options: [
      "$100K - $200K",
      "$200K - $300K",
      "$300K - $500K",
      "$500K - $750K",
      "$750K - $1M",
      "$1M - $1.5M",
      "$1.5M+",
    ],
  },
  {
    id: 2,
    title: "How much equity do you have?",
    subtitle: "Approximate amount you'd walk away with after paying off loans",
    type: "input",
    field: "equity",
    placeholder: "e.g., $150,000",
  },
  {
    id: 3,
    title: "Any major repairs needed?",
    subtitle: "This helps us calculate a more accurate offer",
    type: "buttons",
    field: "repairs",
    options: ["None - Move-in ready", "Cosmetic - Paint, flooring, etc.", "Major structural - Foundation, roof, etc."],
  },
  {
    id: 4,
    title: "How fast do you need to sell?",
    subtitle: "Timeline affects our offer strategy",
    type: "buttons",
    field: "timeline",
    options: ["ASAP - Within 30 days", "1-3 months", "Just exploring options"],
  },
]

export function QuestionScreen() {
  const { currentStep, quizData, updateQuizData, nextStep, prevStep } = useQuiz()

  const currentQuestion = questions[currentStep - 1]
  const currentValue = quizData[currentQuestion.field as keyof typeof quizData]

  const handleInputChange = (value: string) => {
    updateQuizData({ [currentQuestion.field]: value })
  }

  const handleNext = () => {
    if (currentValue) {
      nextStep()
    }
  }

  const isValid = currentValue && currentValue.trim() !== ""

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 border-2 border-border shadow-lg">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" onClick={prevStep} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Question */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{currentQuestion.title}</h2>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.type === "select" && (
              <Select value={currentValue} onValueChange={handleInputChange}>
                <SelectTrigger className="w-full h-12 text-lg">
                  <SelectValue placeholder="Select your home's value range" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.map((option) => (
                    <SelectItem key={option} value={option} className="text-lg py-3">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {currentQuestion.type === "input" && (
              <div className="space-y-2">
                <Label htmlFor="equity" className="text-sm font-medium text-foreground">
                  Estimated Equity
                </Label>
                <Input
                  id="equity"
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
            )}

            {currentQuestion.type === "buttons" && (
              <div className="grid gap-3">
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option}
                    variant={currentValue === option ? "default" : "outline"}
                    onClick={() => handleInputChange(option)}
                    className={`h-14 text-left justify-start text-wrap p-4 ${
                      currentValue === option
                        ? "bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-black"
                        : "hover:bg-muted border-border"
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!isValid}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-black py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  )
}
