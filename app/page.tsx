"use client"
import { Progress } from "@/components/ui/progress"
import { QuizProvider, useQuiz } from "@/components/quiz-context"
import { WelcomeScreen } from "@/components/welcome-screen"
import { QuestionScreen } from "@/components/question-screen"
import { LeadCaptureScreen } from "@/components/lead-capture-screen"
import { ResultsScreen } from "@/components/results-screen"
import { Chatbot } from "@/components/chatbot"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">
                Step {currentStep} of {totalSteps - 2}
              </span>
              <span className="text-sm font-medium text-yellow-400">
                {Math.round((currentStep / (totalSteps - 2)) * 100)}% Complete
              </span>
            </div>
            <Progress value={(currentStep / (totalSteps - 2)) * 100} className="h-2 bg-gray-800" />
          </div>
        )}

        {/* Main Content */}
        <div className="animate-in fade-in-50 duration-500">{renderCurrentScreen()}</div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-sm rounded-full border border-slate-700/50 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-200">Over $50M in local deals closed!</span>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot webhookUrl="https://fyxie.app.n8n.cloud/webhook/flashcash" />
    </div>
  )
}

export default function HomePage() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  )
}
