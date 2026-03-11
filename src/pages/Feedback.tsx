import { useState } from 'react';
import {
  MessageCircle,
  Star,
  Send,
  Bug,
  Lightbulb,
  Heart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';

const feedbackTypes = [
  { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-100 text-red-600' },
  { id: 'praise', label: 'Praise', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { id: 'other', label: 'Other', icon: MessageCircle, color: 'bg-blue-100 text-blue-600' },
];

export default function Feedback() {
  const [selectedType, setSelectedType] = useState('suggestion');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setRating(0);
    }, 3000);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900">Feedback</h1>
          <p className="text-sm text-gray-500">Help us improve NurseAI Academy</p>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h2>
              <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Feedback Type */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What type of feedback do you have?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 border rounded-xl transition-all ${
                        selectedType === type.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mb-2 ${type.color.split(' ')[1]}`} />
                      <p className="text-sm font-medium text-gray-900">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tell us more
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, ideas, or report an issue..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              {/* Email (optional) */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email (optional)
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We'll only use this to follow up on your feedback
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!message.trim()}
                className="w-full py-3"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
              </Button>
            </form>
          )}

          {/* FAQ */}
          {!submitted && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">How do I upload content?</span>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </summary>
                  <p className="p-4 text-sm text-gray-600">
                    You can upload content by clicking the "Add Content" button on your dashboard. 
                    We support PDFs, videos, audio files, and more.
                  </p>
                </details>
                <details className="group">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">What AI features are available?</span>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </summary>
                  <p className="p-4 text-sm text-gray-600">
                    NurseAI Academy offers AI-powered summaries, quizzes, flashcards, and a clinical chat feature 
                    that lets you ask questions about your nursing content.
                  </p>
                </details>
                <details className="group">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium text-gray-900">Is my data secure?</span>
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  </summary>
                  <p className="p-4 text-sm text-gray-600">
                    Yes, we take data security seriously. All your content is encrypted and stored securely. 
                    We never share your data with third parties.
                  </p>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
