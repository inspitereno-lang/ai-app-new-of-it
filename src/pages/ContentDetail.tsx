import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  MessageSquare,
  FileQuestion,
  BookOpen,
  Layers,
  Share2,
  Download,
  Star,
  Clock,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { contents } from '@/data/mockData';

export default function ContentDetail() {
  const { contentId } = useParams<{ contentId: string }>();
  const [activeTab, setActiveTab] = useState<'summary' | 'chat' | 'quiz' | 'flashcards'>('summary');
  const [isPlaying, setIsPlaying] = useState(false);

  const content = contents.find(c => c.id === contentId);

  if (!content) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Content Not Found</h1>
            <p className="text-gray-500 mb-4">The content you're looking for doesn't exist.</p>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedContent = contents.filter(c => c.category === content.category && c.id !== content.id).slice(0, 3);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{content.title}</h1>
              <p className="text-sm text-gray-500">{content.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Star className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Video/Image Player */}
            <div className="relative aspect-video bg-gray-900">
              <img src={content.image} alt={content.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-gray-900 ml-0" />
                  ) : (
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  )}
                </button>
              </div>
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="w-full bg-white/30 rounded-full h-1 mb-2">
                  <div className="bg-white rounded-full h-1" style={{ width: `${content.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-white text-sm">
                  <span>{content.progress}% complete</span>
                  <div className="flex items-center space-x-4">
                    <Volume2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Added {new Date(content.dateAdded).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {content.progress}% complete
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Quiz
                  </Button>
                </div>
              </div>

              {/* AI Tools Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-1">
                  {[
                    { id: 'summary', label: 'Summary', icon: BookOpen },
                    { id: 'chat', label: 'Chat', icon: MessageSquare },
                    { id: 'quiz', label: 'Quiz', icon: FileQuestion },
                    { id: 'flashcards', label: 'Flashcards', icon: Layers },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-black text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === 'summary' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                      <h3 className="font-medium text-gray-900">AI-Generated Summary</h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {content.description}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This comprehensive course covers fundamental concepts and advanced topics in {content.category}. 
                        You'll learn through interactive lessons, practical examples, and hands-on exercises designed 
                        to reinforce your understanding.
                      </p>
                      <h4 className="font-medium text-gray-900 mb-2">Key Takeaways:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">Understanding core principles and fundamentals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">Practical applications and real-world examples</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">Advanced techniques and best practices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                      <h3 className="font-medium text-gray-900">Chat with Content</h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-sm max-w-lg">
                            <p className="text-gray-700">Hello! I'm your AI tutor for this content. What would you like to learn about?</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input 
                          type="text" 
                          placeholder="Ask a question..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <Button className="ml-3">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Ask
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <FileQuestion className="w-5 h-5 text-orange-500 mr-2" />
                      <h3 className="font-medium text-gray-900">Practice Quiz</h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileQuestion className="w-8 h-8 text-orange-500" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Ready to test your knowledge?</h4>
                        <p className="text-gray-500 mb-6">Generate a personalized quiz based on this content</p>
                        <Button>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Quiz
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'flashcards' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Layers className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-gray-900">Flashcards</h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Layers className="w-8 h-8 text-green-500" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Create flashcards</h4>
                        <p className="text-gray-500 mb-6">Generate flashcards to help you memorize key concepts</p>
                        <Button>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Flashcards
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Related Content</h3>
            <div className="space-y-4">
              {relatedContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/content/${item.id}`}
                  className="flex items-start space-x-3 group"
                >
                  <img src={item.image} alt={item.title} className="w-20 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Your Progress</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Completion</span>
                  <span className="text-sm font-medium">{content.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black rounded-full h-2" style={{ width: `${content.progress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Last accessed: {new Date(content.lastAccessed).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
