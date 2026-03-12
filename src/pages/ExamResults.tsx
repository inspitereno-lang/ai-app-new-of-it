import { useMemo } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Clock, CheckCircle2, XCircle,
  SkipForward, TrendingUp, TrendingDown, RotateCcw, FileSearch, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { exams, examAttempts } from '@/data/mockData';

export default function ExamResults() {
  const { examId, attemptId } = useParams<{ examId: string; attemptId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const exam = exams.find(e => e.id === examId);

  // Check if we have live answers from state (just submitted), otherwise use pre-built attempt
  const stateData = location.state as { answers?: Record<string, string | string[] | null>; markedQuestions?: string[] } | null;
  const preBuiltAttempt = examAttempts.find(a => a.id === attemptId || a.examId === examId);

  const computedResults = useMemo(() => {
    if (stateData?.answers && exam) {
      const questions = exam.questions;
      let correct = 0, incorrect = 0, skipped = 0;

      questions.forEach(q => {
        const userAns = stateData.answers![q.id];
        if (!userAns || (Array.isArray(userAns) && userAns.length === 0) || userAns === '') {
          skipped++;
        } else if (Array.isArray(q.correctAnswer)) {
          const ua = Array.isArray(userAns) ? userAns : [userAns];
          const isCorrect = q.correctAnswer.length === ua.length && q.correctAnswer.every(a => ua.includes(a));
          if (isCorrect) correct++; else incorrect++;
        } else {
          if (typeof userAns === 'string' && userAns.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim()) {
            correct++;
          } else {
            incorrect++;
          }
        }
      });

      const score = Math.round((correct / questions.length) * 100);

      // Calculate strengths/weaknesses by topic
      const topicResults: Record<string, { correct: number; total: number }> = {};
      questions.forEach(q => {
        if (!topicResults[q.topic]) topicResults[q.topic] = { correct: 0, total: 0 };
        topicResults[q.topic].total++;
        const userAns = stateData.answers![q.id];
        if (Array.isArray(q.correctAnswer)) {
          const ua = Array.isArray(userAns) ? userAns : [];
          if (q.correctAnswer.length === ua.length && q.correctAnswer.every(a => ua.includes(a))) {
            topicResults[q.topic].correct++;
          }
        } else if (typeof userAns === 'string' && userAns.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim()) {
          topicResults[q.topic].correct++;
        }
      });

      const strengths = Object.entries(topicResults).filter(([, v]) => v.correct / v.total >= 0.7).map(([k]) => k);
      const weaknesses = Object.entries(topicResults).filter(([, v]) => v.correct / v.total < 0.7).map(([k]) => k);

      return {
        score,
        totalQuestions: questions.length,
        correctCount: correct,
        incorrectCount: incorrect,
        skippedCount: skipped,
        timeTaken: (exam.timeLimitMinutes * 60) - 300, // approximate
        strengths: strengths.length > 0 ? strengths : ['General Knowledge'],
        weaknesses: weaknesses.length > 0 ? weaknesses : []
      };
    }

    if (preBuiltAttempt) {
      return preBuiltAttempt;
    }

    return null;
  }, [stateData, preBuiltAttempt, exam]);

  if (!exam || !computedResults) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Results Not Found</h1>
            <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { score, totalQuestions, correctCount, incorrectCount, skippedCount, timeTaken, strengths, weaknesses } = computedResults;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const getScoreMessage = () => {
    if (score >= 90) return { text: 'Outstanding! You\'ve mastered this material! 🎉', color: 'text-green-600' };
    if (score >= 75) return { text: 'Great work! You have a solid understanding! 💪', color: 'text-blue-600' };
    if (score >= 60) return { text: 'Good effort! Keep studying to improve! 📚', color: 'text-amber-600' };
    return { text: 'Keep practicing! Every attempt helps you learn! 🌱', color: 'text-red-600' };
  };

  const msg = getScoreMessage();

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Link to="/exams" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{exam.title}</h1>
              <p className="text-xs text-gray-500">Exam Results</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Score Circle */}
          <div className="text-center mb-10">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle
                  cx="60" cy="60" r="52"
                  stroke={score >= 75 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{score}%</span>
                <span className="text-xs text-gray-500">Score</span>
              </div>
            </div>
            <div className="mb-3">
              <Trophy className={`w-6 h-6 mx-auto mb-1 ${score >= 75 ? 'text-yellow-500' : 'text-gray-300'}`} />
            </div>
            <p className={`text-base font-medium ${msg.color}`}>{msg.text}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-green-700">{correctCount}</p>
              <p className="text-[11px] text-green-600">Correct</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <XCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-red-700">{incorrectCount}</p>
              <p className="text-[11px] text-red-600">Incorrect</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <SkipForward className="w-5 h-5 text-gray-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-gray-700">{skippedCount}</p>
              <p className="text-[11px] text-gray-500">Skipped</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-blue-700">{minutes}:{seconds.toString().padStart(2, '0')}</p>
              <p className="text-[11px] text-blue-600">Time</p>
            </div>
          </div>

          {/* Visual Bar */}
          <div className="mb-8">
            <div className="flex rounded-full overflow-hidden h-4">
              <div className="bg-green-500 transition-all" style={{ width: `${(correctCount / totalQuestions) * 100}%` }} />
              <div className="bg-red-400 transition-all" style={{ width: `${(incorrectCount / totalQuestions) * 100}%` }} />
              <div className="bg-gray-200 transition-all" style={{ width: `${(skippedCount / totalQuestions) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-gray-400">
              <span>{Math.round((correctCount / totalQuestions) * 100)}% correct</span>
              <span>{totalQuestions} total questions</span>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-white border border-green-200 rounded-2xl p-5">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900">Strengths</h3>
              </div>
              <div className="space-y-2">
                {strengths.map(s => (
                  <div key={s} className="flex items-center text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-red-200 rounded-2xl p-5">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-gray-900">Needs Improvement</h3>
              </div>
              <div className="space-y-2">
                {weaknesses.length > 0 ? weaknesses.map(w => (
                  <div key={w} className="flex items-center text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
                    <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {w}
                  </div>
                )) : (
                  <p className="text-sm text-gray-400">No weak areas detected — great job!</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 py-5 rounded-2xl border-gray-200"
              onClick={() => navigate(`/exam/${examId}/review/${attemptId}`, { state: stateData })}
            >
              <FileSearch className="w-4 h-4 mr-2" />
              Review Answers
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-5 rounded-2xl border-gray-200"
              onClick={() => navigate(`/exam/${examId}/take`)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Exam
            </Button>
            <Button
              className="flex-1 py-5 rounded-2xl bg-gray-900 hover:bg-black text-white"
              onClick={() => navigate('/exams')}
            >
              Back to Exams
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
