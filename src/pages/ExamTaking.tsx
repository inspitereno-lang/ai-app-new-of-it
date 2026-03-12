import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle,
  CheckCircle2, Circle, BookmarkCheck, X, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exams } from '@/data/mockData';
import type { ExamQuestion } from '@/data/mockData';

export default function ExamTaking() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const exam = exams.find(e => e.id === examId);
  const questions = exam?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | null>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState((exam?.timeLimitMinutes || 30) * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== '' && (Array.isArray(answers[k]) ? (answers[k] as string[]).length > 0 : true)).length;

  const setAnswer = useCallback((qId: string, answer: string | string[] | null) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  }, []);

  const toggleMark = (qId: string) => {
    setMarkedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId); else next.add(qId);
      return next;
    });
  };

  const handleSubmit = () => {
    // Build attempt and navigate to results
    const attemptId = `attempt-${Date.now()}`;
    navigate(`/exam/${examId}/results/${attemptId}`, {
      state: { answers, markedQuestions: Array.from(markedQuestions) }
    });
  };

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Exam Not Found</h1>
          <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
        </div>
      </div>
    );
  }

  const getQuestionStatus = (qId: string) => {
    const answered = answers[qId] !== undefined && answers[qId] !== null && answers[qId] !== '' && (Array.isArray(answers[qId]) ? (answers[qId] as string[]).length > 0 : true);
    const marked = markedQuestions.has(qId);
    if (marked && answered) return 'marked_answered';
    if (marked) return 'marked';
    if (answered) return 'answered';
    return 'unanswered';
  };

  const renderQuestion = (q: ExamQuestion) => {
    const userAnswer = answers[q.id];

    switch (q.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {q.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswer(q.id, opt)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  userAnswer === opt
                    ? 'border-gray-900 bg-gray-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                    userAnswer === opt ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                  }`}>
                    {userAnswer === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {['True', 'False'].map(opt => (
              <button
                key={opt}
                onClick={() => setAnswer(q.id, opt)}
                className={`flex-1 p-5 rounded-xl border-2 text-center font-medium transition-all ${
                  userAnswer === opt
                    ? 'border-gray-900 bg-gray-50 shadow-sm text-gray-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case 'short_answer':
        return (
          <div className="relative">
            <textarea
              value={(userAnswer as string) || ''}
              onChange={e => setAnswer(q.id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-gray-900 outline-none resize-none text-sm transition-colors"
            />
          </div>
        );

      case 'multi_answer_mcq':
        const selectedOptions = (userAnswer as string[]) || [];
        return (
          <div className="space-y-3">
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 font-medium">Select all that apply</p>
            {q.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const curr = selectedOptions;
                  const next = curr.includes(opt) ? curr.filter(o => o !== opt) : [...curr, opt];
                  setAnswer(q.id, next);
                }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOptions.includes(opt)
                    ? 'border-gray-900 bg-gray-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                    selectedOptions.includes(opt) ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(opt) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <button onClick={() => setShowSubmitModal(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">{exam.title}</h1>
            <p className="text-xs text-gray-400">{answeredCount}/{questions.length} answered</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Timer */}
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-bold ${
            timeLeft < 300 ? 'bg-red-100 text-red-600' : timeLeft < 600 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          {/* Navigator Toggle */}
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-gray-900 transition-all duration-300"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Question Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Question {currentIndex + 1} of {questions.length}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500 uppercase">
                  {currentQuestion.type === 'mcq' ? 'MCQ' : currentQuestion.type === 'true_false' ? 'T/F' : currentQuestion.type === 'multi_answer_mcq' ? 'Multi' : 'Short'}
                </span>
              </div>
              <button
                onClick={() => toggleMark(currentQuestion.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  markedQuestions.has(currentQuestion.id)
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{markedQuestions.has(currentQuestion.id) ? 'Marked' : 'Mark'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            {renderQuestion(currentQuestion)}

            {/* Topic */}
            <div className="mt-6 text-xs text-gray-400">
              Topic: {currentQuestion.topic}
            </div>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        {showNavigator && (
          <div className="w-64 border-l border-gray-100 bg-gray-50 p-4 overflow-y-auto hidden sm:block">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((q, i) => {
                const status = getQuestionStatus(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      i === currentIndex ? 'ring-2 ring-gray-900 ring-offset-1' : ''
                    } ${
                      status === 'answered' ? 'bg-green-500 text-white' :
                      status === 'marked' ? 'bg-amber-400 text-white' :
                      status === 'marked_answered' ? 'bg-amber-500 text-white ring-2 ring-green-400' :
                      'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-green-500" />
                <span>Answered ({questions.filter(q => getQuestionStatus(q.id) === 'answered' || getQuestionStatus(q.id) === 'marked_answered').length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-amber-400" />
                <span>Marked ({markedQuestions.size})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-white border border-gray-200" />
                <span>Unanswered ({questions.length - answeredCount})</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-gray-100 bg-white">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="rounded-xl"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            size="sm"
            className="bg-gray-900 hover:bg-black text-white rounded-xl px-6"
            onClick={() => setShowSubmitModal(true)}
          >
            <Send className="w-4 h-4 mr-2" /> Submit Exam
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-gray-900 hover:bg-black text-white rounded-xl"
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Submit Exam?</h2>
              <p className="text-sm text-gray-500 mb-4">
                You have answered <strong>{answeredCount}</strong> out of <strong>{questions.length}</strong> questions.
                {questions.length - answeredCount > 0 && (
                  <span className="text-amber-600"> {questions.length - answeredCount} questions are unanswered.</span>
                )}
              </p>

              {/* Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-green-600"><CheckCircle2 className="w-4 h-4 mr-2" /> Answered</span>
                  <span className="font-medium">{answeredCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-amber-600"><BookmarkCheck className="w-4 h-4 mr-2" /> Marked for Review</span>
                  <span className="font-medium">{markedQuestions.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-gray-400"><Circle className="w-4 h-4 mr-2" /> Unanswered</span>
                  <span className="font-medium">{questions.length - answeredCount}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 py-5 rounded-xl"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Continue Exam
                </Button>
                <Button
                  className="flex-1 py-5 rounded-xl bg-gray-900 hover:bg-black text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
