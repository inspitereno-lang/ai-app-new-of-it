import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  MoreHorizontal,
  Wand2,
  Upload,
  Link2,
  FileText,
  Mic,
  MessageSquare,
  ChevronDown,
  FolderOpen,
  BookOpen,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  X,
  Loader2,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { spaces, contents, exploreCategories, historyData } from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('for-you');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localContents, setLocalContents] = useState(contents);
  const [newItemTitle, setNewItemTitle] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const userName = user?.name || 'User';
  const recentContents = localContents.slice(0, 6);
  const exploreContents = localContents.slice(0, 9);

  // Calculate stats
  const totalContents = localContents.length;
  const completedContents = localContents.filter(c => c.progress === 100).length;
  const inProgressContents = localContents.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalProgress = Math.round(localContents.reduce((acc, c) => acc + c.progress, 0) / localContents.length);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Untitled Space (0)</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300" onClick={() => setActiveModal('new-exam')}>
              <Wand2 className="w-4 h-4 mr-2" />
              New Exam
            </Button>
            <Button size="sm" className="bg-black text-white hover:bg-gray-800" onClick={() => setActiveModal('add-course')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Ready for clinical rounds, {userName}?
            </h1>
            <p className="text-gray-500 mb-8">Maintain clinical excellence with AI-powered insights</p>

            {/* Upload Options */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-5xl mx-auto">
              <button
                onClick={() => setActiveModal('upload')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white relative group"
              >
                <div className="absolute top-3 right-3 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Popular</div>
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Upload</span>
                <span className="text-xs text-gray-500 mt-1">Lab Results, Charts</span>
              </button>
              <button
                onClick={() => setActiveModal('link')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
              >
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Link2 className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Link</span>
                <span className="text-xs text-gray-500 mt-1">Medical Journal, Research</span>
              </button>
              <button
                onClick={() => setActiveModal('paste')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
              >
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Paste</span>
                <span className="text-xs text-gray-500 mt-1">Copied Text</span>
              </button>
              <button
                onClick={() => setActiveModal('record')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
              >
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Record</span>
                <span className="text-xs text-gray-500 mt-1">Clinical Rounds</span>
              </button>
              <button
                onClick={() => setActiveModal('download')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
              >
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Download</span>
                <span className="text-xs text-gray-500 mt-1">Study Guides, Handouts</span>
              </button>
            </div>

            {/* Learn Anything Button */}
            <button 
              onClick={() => setActiveModal('ai-tutor')}
              className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Consult AI Tutor
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">Courses</span>
                <BookOpen className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{totalContents}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">Completed</span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{completedContents}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">In Progress</span>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{inProgressContents}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">Avg Progress</span>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{totalProgress}%</p>
            </div>
          </div>

          {/* Spaces Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Spaces</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Newest</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <Link to="/spaces" className="text-sm text-gray-600 hover:text-gray-900 ml-4 flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link to="/spaces" className="p-4 border border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-all cursor-pointer bg-white">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">New Space</p>
              </Link>
              {spaces.map((space) => (
                <Link
                  key={space.id}
                  to={`/space/${space.id}`}
                  className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all bg-white"
                >
                  <div className={`w-10 h-10 ${space.color} rounded-lg flex items-center justify-center mb-3`}>
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">{space.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{space.contentCount} contents</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link to="/history" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {historyData.slice(0, 5).map((item, index) => (
                <div key={item.id} className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover mr-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{new Date(item.accessedAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recents Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recents</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">All</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <Link to="/library" className="text-sm text-gray-600 hover:text-gray-900 ml-4 flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentContents.map((content) => (
                <Link
                  key={content.id}
                  to={`/content/${content.id}`}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={content.image} alt={content.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="w-full bg-white/30 rounded-full h-1.5">
                        <div className="bg-white rounded-full h-1.5" style={{ width: `${content.progress}%` }} />
                      </div>
                      <p className="text-white text-xs mt-1">{content.progress}% complete</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{content.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{content.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Explore</h2>
              <Link to="/library" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {exploreCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exploreContents.map((content) => (
                <Link
                  key={content.id}
                  to={`/content/${content.id}`}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={content.image} alt={content.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="w-full bg-white/30 rounded-full h-1.5">
                        <div className="bg-white rounded-full h-1.5" style={{ width: `${content.progress}%` }} />
                      </div>
                      <p className="text-white text-xs mt-1">{content.progress}% complete</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{content.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{content.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header Image */}
            <div className="h-32 bg-gray-900 relative">
              <img
                src={
                  activeModal === 'upload' ? 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1000' :
                    activeModal === 'link' ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000' :
                      activeModal === 'paste' ? 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000' :
                        activeModal === 'record' ? 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000' :
                          activeModal === 'new-exam' ? 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000' :
                            activeModal === 'add-course' ? 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000' :
                              'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000'
                }
                className="w-full h-full object-cover opacity-60"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-8 -mt-10 relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-white shadow-lg rounded-2xl">
                  {activeModal === 'upload' && <Upload className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'link' && <Link2 className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'paste' && <FileText className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'record' && <Mic className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'download' && <Download className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'new-exam' && <Wand2 className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'add-course' && <Plus className="w-6 h-6 text-gray-900" />}
                  {activeModal === 'ai-tutor' && <MessageSquare className="w-6 h-6 text-gray-900" />}
                </div>
                <h2 className="text-2xl font-bold capitalize">{activeModal?.replace('-', ' ')} Content</h2>
              </div>

              <div className="space-y-6">
                {activeModal === 'upload' && (
                  <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 text-center hover:border-gray-200 transition-colors cursor-pointer bg-gray-50/50">
                    <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-900">Upload Clinical Data</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, Lab Reports, or Imaging</p>
                  </div>
                )}

                {activeModal === 'link' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Import research data or medical journal articles via URL.</p>
                    <div className="relative">
                      <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-gray-200 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {activeModal === 'paste' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Analyze patient notes or clinical observations with AI.</p>
                    <textarea
                      placeholder="Enter clinical notes here..."
                      className="w-full h-40 p-5 bg-gray-50/50 border border-gray-100 rounded-3xl focus:border-gray-200 outline-none resize-none transition-colors"
                    />
                  </div>
                )}

                {activeModal === 'record' && (
                  <div className="bg-gray-50/50 rounded-3xl p-10 text-center">
                    <div className="flex items-center justify-center mb-6 space-x-1.5">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-1.5 h-10 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p className="font-bold text-gray-900">Recording Clinical Rounds...</p>
                    <p className="text-sm text-gray-500 mt-1">Live transcription and analysis active</p>
                  </div>
                )}

                {activeModal === 'download' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Premium clinical resources for your offline study.</p>
                    <div className="space-y-2">
                      {['Emergency protocols.pdf', 'Clinical Cheat Sheet.png', 'Drug Dosage Guide.pdf'].map((item) => (
                        <div key={item} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                          <span className="text-sm font-medium text-gray-700">{item}</span>
                          <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(activeModal === 'new-exam' || activeModal === 'add-course') && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Enter details to create your new {activeModal === 'new-exam' ? 'Exam' : 'Course'}.</p>
                    <div className="relative">
                      {activeModal === 'new-exam' ? <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /> : <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
                      <input
                        placeholder={`Title of the ${activeModal === 'new-exam' ? 'Exam' : 'Course'}...`}
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-gray-200 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {activeModal === 'ai-tutor' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">How can I help you today?</p>
                    <textarea
                      placeholder="Ask the AI Tutor anything..."
                      className="w-full h-40 p-5 bg-gray-50/50 border border-gray-100 rounded-3xl focus:border-gray-200 outline-none resize-none transition-colors"
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1 py-7 rounded-2xl border-gray-100" onClick={() => setActiveModal(null)} disabled={isProcessing}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 py-7 rounded-2xl bg-gray-900 hover:bg-black text-white shadow-xl"
                    disabled={isProcessing}
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        if ((activeModal === 'new-exam' || activeModal === 'add-course') && newItemTitle.trim() !== '') {
                          const newItem = {
                            id: `custom-${Date.now()}`,
                            title: newItemTitle,
                            description: `Custom generated ${activeModal === 'new-exam' ? 'Exam' : 'Course'}.`,
                            type: activeModal === 'new-exam' ? ('exam' as const) : ('course' as const),
                            image: activeModal === 'new-exam' 
                              ? 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000' 
                              : 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
                            dateAdded: new Date().toISOString().split('T')[0],
                            lastAccessed: new Date().toISOString().split('T')[0],
                            spaceId: 'core-nursing',
                            progress: 0,
                            category: activeModal === 'new-exam' ? 'Exams' : 'Core Skills'
                          };
                          setLocalContents([newItem, ...localContents]);
                        }
                        setIsProcessing(false);
                        setNewItemTitle('');
                        setActiveModal(null);
                      }, 1800);
                    }}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      activeModal === 'record' ? 'Save Recording' : 
                      (activeModal === 'new-exam' || activeModal === 'add-course') ? `Create ${activeModal === 'new-exam' ? 'Exam' : 'Course'}` :
                      activeModal === 'ai-tutor' ? 'Send Message' :
                      'Process with AI'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
