import { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, XCircle, SkipForward, MessageSquare,
  FileText, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { exams, examAttempts } from '@/data/mockData';
import type { ExamQuestion } from '@/data/mockData';

type ReviewFilter = 'all' | 'correct' | 'incorrect' | 'skipped';

export default function ExamReview() {
  const { examId, attemptId } = useParams<{ examId: string; attemptId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const exam = exams.find(e => e.id === examId);
  const stateData = location.state as { answers?: Record<string, string | string[] | null> } | null;
  const preBuiltAttempt = examAttempts.find(a => a.id === attemptId || a.examId === examId);

  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showAiModal, setShowAiModal] = useState<string | null>(null);

  // Compute answers map
  const answersMap = useMemo(() => {
    if (stateData?.answers) return stateData.answers;
    if (preBuiltAttempt) {
      const map: Record<string, string | string[] | null> = {};
      preBuiltAttempt.answers.forEach(a => { map[a.questionId] = a.userAnswer; });
      return map;
    }
    return {};
  }, [stateData, preBuiltAttempt]);

  if (!exam) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Exam Not Found</h1>
            <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getQuestionResult = (q: ExamQuestion) => {
    const userAns = answersMap[q.id];
    if (!userAns || (Array.isArray(userAns) && userAns.length === 0) || userAns === '') {
      return 'skipped';
    }
    if (Array.isArray(q.correctAnswer)) {
      const ua = Array.isArray(userAns) ? userAns : [userAns];
      return q.correctAnswer.length === ua.length && q.correctAnswer.every(a => ua.includes(a)) ? 'correct' : 'incorrect';
    }
    return typeof userAns === 'string' && userAns.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim() ? 'correct' : 'incorrect';
  };

  const filteredQuestions = exam.questions.filter(q => {
    if (filter === 'all') return true;
    return getQuestionResult(q) === filter;
  });

  const toggleExpand = (qId: string) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId); else next.add(qId);
      return next;
    });
  };

  const filterCounts = {
    all: exam.questions.length,
    correct: exam.questions.filter(q => getQuestionResult(q) === 'correct').length,
    incorrect: exam.questions.filter(q => getQuestionResult(q) === 'incorrect').length,
    skipped: exam.questions.filter(q => getQuestionResult(q) === 'skipped').length        
  };

  const getStatusIcon = (result: string) => {
    switch (result) {
      case 'correct': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'incorrect': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <SkipForward className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBg = (result: string) => {
    switch (result) {
      case 'correct': return 'border-green-200 bg-green-50/30';
      case 'incorrect': return 'border-red-200 bg-red-50/30';
      default: return 'border-gray-200 bg-gray-50/30';
    }
  };

  const formatAnswer = (ans: string | string[] | null) => {
    if (!ans) return 'No answer';
    if (Array.isArray(ans)) return ans.join(', ');
    return ans;
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(`/exam/${examId}/results/${attemptId}`, { state: stateData })}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Answer Review</h1>
              <p className="text-xs text-gray-500">{exam.title}</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {([
              { key: 'all', label: 'All', color: 'bg-gray-900' },
              { key: 'correct', label: 'Correct', color: 'bg-green-600' },
              { key: 'incorrect', label: 'Incorrect', color: 'bg-red-600' },
              { key: 'skipped', label: 'Skipped', color: 'bg-gray-400' }
            ] as { key: ReviewFilter; label: string; color: string }[]).map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? `${f.color} text-white`
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f.label} ({filterCounts[f.key]})
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const result = getQuestionResult(q);
              const isExpanded = expandedQuestions.has(q.id);
              const questionIndex = exam.questions.findIndex(eq => eq.id === q.id) + 1;

              return (
                <div key={q.id} className={`border rounded-2xl overflow-hidden transition-all ${getStatusBg(result)}`}>
                  {/* Question Header */}
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {getStatusIcon(result)}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-gray-400 uppercase">Q{questionIndex}</span>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{q.question}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
                      {/* Your Answer */}
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Your Answer</p>
                        <div className={`p-3 rounded-xl text-sm ${
                          result === 'correct' ? 'bg-green-100 text-green-800' :
                          result === 'incorrect' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-500 italic'
                        }`}>
                          {formatAnswer(answersMap[q.id])}
                        </div>
                      </div>

                      {/* Correct Answer (if incorrect or skipped) */}
                      {result !== 'correct' && (
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase mb-1">Correct Answer</p>
                          <div className="p-3 rounded-xl text-sm bg-green-100 text-green-800">
                            {formatAnswer(Array.isArray(q.correctAnswer) ? q.correctAnswer : q.correctAnswer as string)}
                          </div>
                        </div>
                      )}

                      {/* Explanation */}
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Explanation</p>
                        <div className="p-3 rounded-xl text-sm bg-blue-50 text-blue-800 leading-relaxed">
                          {q.explanation}
                        </div>
                      </div>

                      {/* Source */}
                      {q.source && (
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{q.source}</span>
                          {q.sourcePage && <span>• {q.sourcePage}</span>}
                        </div>
                      )}

                      {/* Ask AI */}
                      <button
                        onClick={() => setShowAiModal(q.id)}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2.5 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Ask AI to explain</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No questions match this filter.</p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 py-5 rounded-2xl"
              onClick={() => navigate(`/exam/${examId}/results/${attemptId}`, { state: stateData })}
            >
              Back to Results
            </Button>
            <Button
              className="flex-1 py-5 rounded-2xl bg-gray-900 hover:bg-black text-white"
              onClick={() => navigate('/exams')}
            >
              All Exams
            </Button>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">AI Tutor</h3>
              </div>
              <button onClick={() => setShowAiModal(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-900 mb-2">📚 AI Explanation:</p>
              <p>{exam.questions.find(q => q.id === showAiModal)?.explanation}</p>
              <p className="mt-3 text-xs text-gray-400">This explanation was generated from your course materials. For deeper understanding, review the referenced source material.</p>
            </div>
            <textarea
              placeholder="Ask a follow-up question..."
              className="w-full h-20 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 resize-none mb-3"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowAiModal(null)}>Close</Button>
              <Button className="flex-1 rounded-xl bg-gray-900 text-white">Ask AI</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
