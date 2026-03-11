import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  Link2,
  FileText,
  Mic,
  MessageSquare,
  Sparkles,
  BookOpen,
  CheckCircle,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { quickGuideSteps } from '@/data/mockData';

const featureHighlights = [
  {
    icon: Upload,
    title: 'Upload Anything',
    description: 'PDFs, videos, audio files, and more',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Link2,
    title: 'Paste Links',
    description: 'YouTube videos, websites, articles',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Ask questions about your content',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: BookOpen,
    title: 'Smart Summaries',
    description: 'Get key insights instantly',
    color: 'bg-orange-100 text-orange-600'
  },
];

export default function QuickGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < quickGuideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (completed) {
    return (
      <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">You're all set!</h2>
            <p className="text-gray-600 mb-8">
              You've completed the quick guide. Start exploring NurseAI Academy and discover how AI can enhance your learning.
            </p>
            <div className="space-y-3">
              <Link to="/dashboard">
                <Button className="w-full py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" className="w-full py-3">
                  Explore More Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const step = quickGuideSteps[currentStep];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1">
          <div 
            className="bg-black h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / quickGuideSteps.length) * 100}%` }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Step Counter */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              Step {currentStep + 1} of {quickGuideSteps.length}
            </p>
            <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
              Skip guide
            </Link>
          </div>

          {/* Step Content */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">{step.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{step.subtitle}</p>
            
            <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
              <h3 className="font-medium text-gray-900 mb-2">{step.content}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>

          {/* Feature Highlights (on first step) */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {featureHighlights.map((feature) => (
                <div key={feature.title} className="text-center p-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Upload Options (on second step) */}
          {currentStep === 1 && (
            <div className="flex justify-center gap-4 mb-12">
              <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl w-32">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Upload</span>
              </div>
              <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl w-32">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-3">
                  <Link2 className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Link</span>
              </div>
              <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl w-32">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Paste</span>
              </div>
              <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl w-32">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-3">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Record</span>
              </div>
            </div>
          )}

          {/* AI Features (on third step) */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
              <div className="p-4 bg-gray-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-gray-700 mb-2" />
                <h4 className="font-medium text-gray-900">Summaries</h4>
                <p className="text-sm text-gray-500">Get key points instantly</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <MessageSquare className="w-6 h-6 text-gray-700 mb-2" />
                <h4 className="font-medium text-gray-900">AI Chat</h4>
                <p className="text-sm text-gray-500">Ask any question</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Sparkles className="w-6 h-6 text-gray-700 mb-2" />
                <h4 className="font-medium text-gray-900">Quizzes</h4>
                <p className="text-sm text-gray-500">Test your knowledge</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-gray-700 mb-2" />
                <h4 className="font-medium text-gray-900">Flashcards</h4>
                <p className="text-sm text-gray-500">Memorize faster</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            
            <div className="flex space-x-2">
              {quickGuideSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button onClick={handleNext}>
              {currentStep === quickGuideSteps.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
