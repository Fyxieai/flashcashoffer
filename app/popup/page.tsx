"use client"
import { Progress } from "@/components/ui/progress"
import { QuizProvider, useQuiz } from "@/components/quiz-context"
import { WelcomeScreen } from "@/components/welcome-screen"
import { QuestionScreen } from "@/components/question-screen"
import { LeadCaptureScreen } from "@/components/lead-capture-screen"
import { ResultsScreen } from "@/components/results-screen"

function QuizContent() {
  const { currentStep, totalSteps } = useQuiz()

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen />
      case 1:
      case 2:
      case 3:
      case 4:
        return <QuestionScreen />
      case 5:
        return <LeadCaptureScreen />
      case 6:
        return <ResultsScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black overflow-hidden">
      <div className="container mx-auto px-3 py-4 max-w-lg">
        {/* Progress Bar - Compact for popup */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-300">
                Step {currentStep} of {totalSteps - 2}
              </span>
              <span className="text-xs font-medium text-yellow-400">
                {Math.round((currentStep / (totalSteps - 2)) * 100)}%
              </span>
            </div>
            <Progress value={(currentStep / (totalSteps - 2)) * 100} className="h-1.5 bg-gray-800" />
          </div>
        )}

        {/* Main Content - Optimized for popup */}
        <div className="animate-in fade-in-50 duration-300">{renderCurrentScreen()}</div>

        {/* Compact Trust Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm rounded-full border border-slate-700/50 shadow-lg">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-200">$50M+ in deals closed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PopupPage() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  )
}
