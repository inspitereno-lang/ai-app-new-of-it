import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { libraryData, contents } from '@/data/mockData';

interface LibraryItemProps {
  item: typeof libraryData[0];
  level?: number;
}

function LibraryItem({ item, level = 0 }: LibraryItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={`${level > 0 ? 'ml-6' : ''}`}>
      <div 
        className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <button className="mr-2 p-0.5 hover:bg-gray-200 rounded">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        {item.type === 'folder' ? (
          <Folder className="w-5 h-5 text-blue-500 mr-3" />
        ) : (
          <FileText className="w-5 h-5 text-gray-400 mr-3" />
        )}
        
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{item.title}</p>
          {item.description && (
            <p className="text-xs text-gray-500">{item.description}</p>
          )}
        </div>
        
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <LibraryItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Library() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContents = contents.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Clinical Library</h1>
            <p className="text-sm text-gray-500">Organize and access all your nursing study materials</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Favorites
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar - Folder Structure */}
          <div className="w-72 border-r border-gray-200 min-h-[calc(100vh-140px)] p-4">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Collections</h2>
            {libraryData.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search your library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
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

            {/* Content Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredContents.map((content) => (
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
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{content.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{content.category}</p>
                      <p className="text-xs text-gray-400 mt-1">{content.progress}% complete</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {filteredContents.map((content, index) => (
                  <Link
                    key={content.id}
                    to={`/content/${content.id}`}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== filteredContents.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <img src={content.image} alt={content.title} className="w-16 h-12 rounded-lg object-cover mr-4" />
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
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
