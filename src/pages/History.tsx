import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Calendar,
  ChevronDown,
  Eye,
  MoreVertical,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { historyData } from '@/data/mockData';

export default function History() {
  const [filter, setFilter] = useState<'all' | 'viewed' | 'created'>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const filteredHistory = historyData.filter(item => {
    if (filter !== 'all' && item.action !== filter) return false;
    return true;
  });

  const groupedHistory = filteredHistory.reduce((acc, item) => {
    const date = new Date(item.accessedAt).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof historyData>);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Study Logs</h1>
            <p className="text-sm text-gray-500">Track your clinical learning activity</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search history..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="all">All Activity</option>
                  <option value="viewed">Viewed</option>
                  <option value="created">Created</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">{historyData.length}</p>
                  <p className="text-sm text-gray-500">Items Viewed</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">24h</p>
                  <p className="text-sm text-gray-500">Clinical Learning Time</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">7</p>
                  <p className="text-sm text-gray-500">Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <img src={item.image} alt={item.title} className="w-20 h-14 rounded-lg object-cover mr-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.accessedAt).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} • {item.type}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.action === 'viewed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.action}
                        </span>
                        <Link 
                          to={`/content/${item.contentId}`}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </Link>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
