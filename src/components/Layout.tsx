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
  X,
  Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { spaces } from '@/data/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

// ProntoTech Logo Component
export function ProntoTechLogo() {
  return (
    <div className="flex items-center">
      <img
        src="https://img1.wsimg.com/isteam/ip/bd25398c-5bc5-4a04-b529-d558df7fc5b8/Logo%20ProntoTech%20Ai.png/:/rs=w:120,h:80,cg:true,m/cr=w:120,h:80/qt=q:95"
        alt="ProntoTech AI Logo"
        className="h-8 w-auto"
      />
      <span className="ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">ProntoTech AI</span>
    </div>
  );
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['spaces']);
  const [searchQuery, setSearchQuery] = useState('');

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
    { id: 'history', icon: <Clock className="w-4 h-4" />, label: 'History', path: '/history' },
  ];

  const helpItems = [
    { id: 'guide', icon: <BookOpen className="w-4 h-4" />, label: 'Quick Guide', path: '/guide' },
    { id: 'contact', icon: <Mail className="w-4 h-4" />, label: 'Contact Support', path: '/contact' },
  ];

  const filteredMainMenu = mainMenuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <ProntoTechLogo />
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Menu */}
          <div className="p-2">
            {filteredMainMenu.map((item) => (
              item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isActive(item.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
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
                {filteredSpaces.map((space) => (
                  <Link
                    key={space.id}
                    to={`/space/${space.id}`}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === `/space/${space.id}`
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
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${isActive('/library') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
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
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isActive(item.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
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
          <ProntoTechLogo />
          <div className="w-6" />
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
