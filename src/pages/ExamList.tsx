import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, ClipboardCheck, Clock, Trophy, Target,
  ChevronRight, BarChart3, CheckCircle2, AlertCircle, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { exams, examAttempts, examCategories } from '@/data/mockData';

export default function ExamList() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredExams = selectedCategory === 'all'
    ? exams
    : exams.filter(e => e.category === selectedCategory);

  // Stats
  const totalExams = exams.length;
  const completedExams = exams.filter(e => e.status === 'completed').length;
  const avgScore = examAttempts.length > 0
    ? Math.round(examAttempts.reduce((a, b) => a + b.score, 0) / examAttempts.length)
    : 0;
  const totalQuestions = exams.reduce((a, b) => a + b.questionCount, 0);

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: string, bestScore?: number) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium text-green-600">{bestScore}% Best</span>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-600">In Progress</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1.5">
            <Play className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Not Started</span>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-2">
              <ClipboardCheck className="w-5 h-5 text-gray-900" />
              <h1 className="text-lg font-semibold text-gray-900">Practice Exams</h1>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-black text-white hover:bg-gray-800 h-9"
            onClick={() => navigate('/exam/config')}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Exam
          </Button>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Total Exams</span>
                <ClipboardCheck className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-3xl font-bold">{totalExams}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">Completed</span>
                <Trophy className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{completedExams}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">Avg Score</span>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{avgScore}%</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">Questions</span>
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Exam Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* New Exam Card */}
            <button
              onClick={() => navigate('/exam/config')}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-gray-400 transition-all cursor-pointer bg-gray-50/50 flex flex-col items-center justify-center min-h-[240px] group"
            >
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Plus className="w-7 h-7 text-gray-400" />
              </div>
              <p className="font-semibold text-gray-700 text-base">Create New Exam</p>
              <p className="text-sm text-gray-400 mt-1">Generate from your content</p>
            </button>

            {filteredExams.map(exam => {
              const attempt = examAttempts.find(a => a.examId === exam.id);
              return (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => {
                    if (exam.status === 'completed' && attempt) {
                      navigate(`/exam/${exam.id}/results/${attempt.id}`);
                    } else {
                      navigate(`/exam/config?examId=${exam.id}`);
                    }
                  }}
                >
                  {/* Card Image */}
                  <div className="h-36 relative overflow-hidden">
                    <img
                      src={exam.image}
                      alt={exam.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      {getStatusBadge(exam.status, exam.bestScore)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{exam.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{exam.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Target className="w-3.5 h-3.5 mr-1" />
                          {exam.questionCount} Q
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {exam.timeLimitMinutes}m
                        </span>
                        {exam.attemptCount > 0 && (
                          <span className="flex items-center">
                            <BarChart3 className="w-3.5 h-3.5 mr-1" />
                            {exam.attemptCount}x
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
