import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Clock,
  Plus,
  FolderOpen,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Library,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { spaces } from '@/data/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

// NurseAI Logo Component
export function NurseAILogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V26C12 27.1046 11.1046 28 10 28H6C4.89543 28 4 27.1046 4 26V6Z" fill="black"/>
        <path d="M14 10C14 8.89543 14.8954 8 16 8H18C19.1046 8 20 8.89543 20 10V22C20 23.1046 19.1046 24 18 24H16C14.8954 24 14 23.1046 14 22V10Z" fill="black"/>
        <path d="M22 14C22 12.8954 22.8954 12 24 12H26C27.1046 12 28 12.8954 28 14V18C28 19.1046 27.1046 20 26 20H24C22.8954 20 22 19.1046 22 18V14Z" fill="black"/>
      </svg>
      <span className="ml-2 font-semibold text-gray-900">NurseAI</span>
    </div>
  );
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['spaces']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainMenuItems = [
    { id: 'add', icon: <Plus className="w-4 h-4" />, label: 'Add course', action: () => navigate('/dashboard') },
    { id: 'search', icon: <Search className="w-4 h-4" />, label: 'Search', action: () => {} },
    { id: 'history', icon: <Clock className="w-4 h-4" />, label: 'History', path: '/history' },
  ];

  const helpItems = [
    { id: 'guide', icon: <BookOpen className="w-4 h-4" />, label: 'Quick Guide', path: '/guide' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/dashboard">
            <NurseAILogo size={28} />
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Menu */}
          <div className="p-2">
            {mainMenuItems.map((item) => (
              item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive(item.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              )
            ))}
          </div>

          {/* Spaces Section */}
          <div className="px-4 py-2">
            <button 
              onClick={() => toggleSection('spaces')}
              className="flex items-center justify-between w-full mb-2"
            >
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Spaces</span>
              <div className="flex items-center">
                <Link to="/spaces" onClick={(e) => e.stopPropagation()}>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 mr-2" />
                </Link>
                {expandedSections.includes('spaces') ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>
            {expandedSections.includes('spaces') && (
              <div className="space-y-1">
                {spaces.map((space) => (
                  <Link
                    key={space.id}
                    to={`/space/${space.id}`}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      location.pathname === `/space/${space.id}`
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      <span className="truncate">{space.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Library Section */}
          <div className="px-2 py-2">
            <Link
              to="/library"
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/library') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <Library className="w-4 h-4 mr-2" />
                <span>My Library</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Help & Tools Section */}
          <div className="px-2 py-2">
            <div className="space-y-1">
              {helpItems.map((item) => (
                item.path ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(item.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Help items only */}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="ml-3 text-sm text-gray-700 font-medium">{user?.name || 'User'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
              <button onClick={handleLogout} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Main Layout Component
export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <NurseAILogo size={24} />
          <div className="w-6" />
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
