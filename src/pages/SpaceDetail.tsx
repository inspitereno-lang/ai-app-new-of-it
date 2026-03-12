import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MoreHorizontal,
  Plus,
  Search,
  Grid3X3,
  List,
  FolderOpen,
  Users,
  Settings,
  Share2,
  Trash2,
  Edit,
  Wand2,
  Upload,
  Link2,
  FileText,
  Mic,
  MessageSquare,
  ArrowRight,
  Download,
  X,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { spaces, contents } from '@/data/mockData';

export default function SpaceDetail() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const userName = user?.name?.split(' ')[0] || 'Nurse';

  const space = spaces.find(s => s.id === spaceId);
  const spaceContents = contents.filter(c => c.spaceId === spaceId);

  if (!space) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Space Not Found</h1>
            <p className="text-gray-500 mb-4">The space you're looking for doesn't exist.</p>
            <Link to="/spaces" className="text-blue-600 hover:underline">
              Back to Spaces
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center min-w-0">
            <Link to="/spaces" className="mr-2 sm:mr-4 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </Link>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${space.color} rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-4 flex-shrink-0`}>
              <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">{space.name}</h1>
              <p className="text-[10px] sm:text-sm text-gray-500 truncate">{space.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button variant="outline" size="sm" className="hidden xs:flex h-8 text-xs sm:text-sm px-2 sm:px-3">
              <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">New Exam</span>
            </Button>
            <Button size="sm" className="bg-gray-700 hover:bg-gray-800 text-white h-8 text-xs sm:text-sm px-2 sm:px-3">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Course</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Hero Action Section */}
          <div className="mb-10">
            <div className="bg-white border sm:border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-sm">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-2 px-2">
                  Ready for clinical rounds, {userName}?
                </h2>
                <p className="text-sm sm:text-base text-gray-500">How would you like to advance your knowledge today?</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-5xl mx-auto">
                <button 
                  onClick={() => setActiveModal('upload')}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white relative group"
                >
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Popular</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Upload</span>
                  <span className="text-xs text-gray-500 mt-1">Lab Results, Charts</span>
                </button>

                <button 
                  onClick={() => setActiveModal('link')}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Link2 className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Link</span>
                  <span className="text-xs text-gray-500 mt-1">Medical Journal, Research</span>
                </button>

                <button 
                  onClick={() => setActiveModal('paste')}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Paste</span>
                  <span className="text-xs text-gray-500 mt-1">Copied Text</span>
                </button>

                <button 
                  onClick={() => setActiveModal('record')}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mic className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Record</span>
                  <span className="text-xs text-gray-500 mt-1">Clinical Rounds</span>
                </button>

                <button 
                  onClick={() => setActiveModal('download')}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                >
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Download className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Download</span>
                  <span className="text-xs text-gray-500 mt-1">Study Guides, Handouts</span>
                </button>
              </div>

              <div className="max-w-xl mx-auto relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <MessageSquare className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                </div>
                <Input 
                  placeholder="Consult your clinical AI tutor..."
                  className="pl-12 pr-12 py-7 rounded-2xl border-gray-200 focus:ring-2 focus:ring-black/5 text-base"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-600 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search in this space..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                <Grid3X3 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Empty State */}
          {spaceContents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
              <p className="text-gray-500 mb-6">Start adding content to this space</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </div>
          ) : (
            /* Content Grid/List */
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spaceContents.map((content) => (
                  <Link
                    key={content.id}
                    to={`/content/${content.id}`}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all group"
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
            ) : (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {spaceContents.map((content, index) => (
                  <Link
                    key={content.id}
                    to={`/content/${content.id}`}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== spaceContents.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <img src={content.image} alt={content.title} className="w-20 h-14 rounded-lg object-cover mr-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{content.title}</p>
                      <p className="text-xs text-gray-500">{content.category} • {content.type}</p>
                    </div>
                    <div className="w-32 mr-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-black rounded-full h-2" style={{ width: `${content.progress}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right">{content.progress}%</p>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="fixed right-6 top-20 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-48 z-50">
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Edit className="w-4 h-4 mr-3" />
            Rename Space
          </button>
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Share2 className="w-4 h-4 mr-3" />
            Share Space
          </button>
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Users className="w-4 h-4 mr-3" />
            Manage Members
          </button>
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Space
          </button>
        </div>
      )}      {/* Action Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm shadow-2xl">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-white/20">
            {/* Modal Header Image */}
            <div className="h-32 bg-gray-900 relative">
              <img 
                src={
                  activeModal === 'upload' ? 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1000' :
                  activeModal === 'link' ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000' :
                  activeModal === 'paste' ? 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000' :
                  activeModal === 'record' ? 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000' :
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
                </div>
                <h2 className="text-2xl font-bold capitalize">{activeModal} Content</h2>
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
                      <Input 
                        placeholder="https://pubmed.ncbi.nlm.nih.gov/..." 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-gray-100 focus:ring-0 outline-none transition-colors"
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
                        setIsProcessing(false);
                        setActiveModal(null);
                      }, 1800);
                    }}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      activeModal === 'record' ? 'Save Recording' : 'Process with AI'
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
