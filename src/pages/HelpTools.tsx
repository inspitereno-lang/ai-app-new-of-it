import { Link } from 'react-router-dom';
import {
  BookOpen,
  Keyboard,
  Download,
  MessageCircle,
  Video,
  FileText,
  ChevronRight,
  Search,
  HelpCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';

const helpCategories = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { title: 'Quick Guide', description: 'Learn the basics of using NurseAI Academy', link: '/guide', icon: BookOpen },
      { title: 'Upload Content', description: 'How to add your learning materials', link: '#', icon: Download },
      { title: 'AI Features', description: 'Understanding AI-powered tools', link: '#', icon: HelpCircle },
    ]
  },
  {
    title: 'Features',
    icon: Keyboard,
    items: [
      { title: 'Chat with Content', description: 'Ask questions and get answers', link: '#', icon: MessageCircle },
      { title: 'Generate Quizzes', description: 'Create practice tests', link: '#', icon: HelpCircle },
      { title: 'Flashcards', description: 'Memorize with flashcards', link: '#', icon: BookOpen },
      { title: 'Summaries', description: 'Get AI-generated summaries', link: '#', icon: FileText },
    ]
  },
  {
    title: 'Resources',
    icon: Video,
    items: [
      { title: 'Video Tutorials', description: 'Watch step-by-step guides', link: '#', icon: Video },
      { title: 'Keyboard Shortcuts', description: 'Speed up your workflow', link: '#', icon: Keyboard },
      { title: 'FAQ', description: 'Common questions answered', link: '#', icon: HelpCircle },
    ]
  }
];

const keyboardShortcuts = [
  { key: 'Ctrl + K', action: 'Open search' },
  { key: 'Ctrl + N', action: 'New content' },
  { key: 'Ctrl + /', action: 'Show shortcuts' },
  { key: 'Esc', action: 'Close modal' },
  { key: 'Space', action: 'Play/Pause video' },
  { key: '← / →', action: 'Seek video' },
];

export default function HelpTools() {
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900">Help & Tools</h1>
          <p className="text-sm text-gray-500">Find answers and learn how to use NurseAI Academy</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              className="pl-12 py-6 text-lg"
            />
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Link to="/guide" className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-medium text-gray-900">Quick Guide</h3>
              <p className="text-sm text-gray-600 mt-1">Get started quickly</p>
            </Link>
            <Link to="/feedback" className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-medium text-gray-900">Feedback</h3>
              <p className="text-sm text-gray-600 mt-1">Share your thoughts</p>
            </Link>
            <a href="#" className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <Video className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-medium text-gray-900">Tutorials</h3>
              <p className="text-sm text-gray-600 mt-1">Watch video guides</p>
            </a>
            <a href="#" className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              <Keyboard className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-medium text-gray-900">Shortcuts</h3>
              <p className="text-sm text-gray-600 mt-1">Work faster</p>
            </a>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {helpCategories.map((category) => (
              <div key={category.title} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <category.icon className="w-6 h-6 text-gray-700 mr-3" />
                  <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                </div>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <item.icon className="w-5 h-5 text-gray-400 mr-3 group-hover:text-gray-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Keyboard Shortcuts */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Keyboard className="w-6 h-6 text-gray-700 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {keyboardShortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{shortcut.action}</span>
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
