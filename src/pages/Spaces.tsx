import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  FolderOpen,
  MoreVertical,
  Grid3X3,
  List,
  Clock,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { spaces, contents } from '@/data/mockData';

export default function Spaces() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredSpaces = spaces.filter(space => 
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSpaceContents = (spaceId: string) => {
    return contents.filter(c => c.spaceId === spaceId);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Spaces</h1>
            <p className="text-sm text-gray-500">Organize your learning materials into spaces</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Space
          </Button>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search spaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Create New Space Card */}
          <button 
            onClick={() => setShowCreateModal(true)}
            className={`mb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-all cursor-pointer bg-gray-50 ${
              viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center'
            }`}
          >
            <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${viewMode === 'grid' ? 'w-14 h-14 mb-3' : 'w-10 h-10 mr-4'}`}>
              <Plus className="w-6 h-6 text-gray-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Create New Space</p>
              <p className="text-sm text-gray-500">Start a new collection</p>
            </div>
          </button>

          {/* Spaces Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSpaces.map((space) => {
                const spaceContents = getSpaceContents(space.id);
                return (
                  <Link
                    key={space.id}
                    to={`/space/${space.id}`}
                    className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all bg-white group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${space.color} rounded-xl flex items-center justify-center`}>
                        <FolderOpen className="w-6 h-6 text-white" />
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{space.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{space.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {space.contentCount} items
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(space.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {spaceContents.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex -space-x-2">
                          {spaceContents.slice(0, 3).map((content, i) => (
                            <img 
                              key={i} 
                              src={content.image} 
                              alt="" 
                              className="w-8 h-8 rounded-lg object-cover border-2 border-white"
                            />
                          ))}
                          {spaceContents.length > 3 && (
                            <div className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
                              +{spaceContents.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {filteredSpaces.map((space, index) => (
                <Link
                  key={space.id}
                  to={`/space/${space.id}`}
                  className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== filteredSpaces.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className={`w-12 h-12 ${space.color} rounded-xl flex items-center justify-center mr-4`}>
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{space.name}</h3>
                    <p className="text-sm text-gray-500">{space.description}</p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {space.contentCount} items
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(space.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="ml-4 p-2 hover:bg-gray-200 rounded-lg"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Space Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Space</h2>
            <p className="text-gray-500 mb-6">Create a new space to organize your learning materials</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Space Name</label>
                <Input placeholder="Enter space name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <Input placeholder="Enter description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <div className="flex space-x-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'].map((color) => (
                    <button key={color} className={`w-8 h-8 ${color} rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-300`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Create Space
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
