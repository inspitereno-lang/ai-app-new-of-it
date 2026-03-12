import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Settings2, Clock, Target,
  CheckSquare, Wand2, Upload, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { exams, contents } from '@/data/mockData';

export default function ExamConfig() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examIdParam = searchParams.get('examId');

  const existingExam = examIdParam ? exams.find(e => e.id === examIdParam) : null;

  const [selectedContents, setSelectedContents] = useState<string[]>(
    existingExam ? contents.filter(c => c.spaceId === existingExam.spaceId).map(c => c.id) : []
  );
  const [questionCount, setQuestionCount] = useState(existingExam?.questionCount || 10);
  const [timeLimit, setTimeLimit] = useState(existingExam?.timeLimitMinutes || 30);
  const [questionTypes, setQuestionTypes] = useState<string[]>(['mcq', 'true_false', 'short_answer']);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleContent = (id: string) => {
    setSelectedContents(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleQuestionType = (type: string) => {
    setQuestionTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleStartExam = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const targetExamId = existingExam?.id || exams[0].id;
      navigate(`/exam/${targetExamId}/take`);
    }, 2000);
  };

  const allContents = contents.filter(c => c.type !== 'exam');

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
              <h1 className="text-lg font-semibold text-gray-900">
                {existingExam ? existingExam.title : 'Create New Exam'}
              </h1>
              <p className="text-xs text-gray-500">Configure your exam settings</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Generating Overlay */}
          {isGenerating && (
            <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-gray-900 rounded-full animate-spin" />
                  <Wand2 className="absolute inset-0 m-auto w-8 h-8 text-gray-700" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Exam</h2>
                <p className="text-sm text-gray-500">Analyzing contents and creating questions...</p>
                <div className="mt-6 max-w-xs mx-auto space-y-3">
                  {['Analyzing contents', 'Generating questions', 'Structuring exam'].map((phase, i) => (
                    <div key={phase} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${i < 2 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {i < 2 ? (
                          <CheckSquare className="w-3 h-3 text-green-600" />
                        ) : (
                          <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
                        )}
                      </div>
                      <span className={`text-sm ${i < 2 ? 'text-green-700' : 'text-gray-500'}`}>{phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Select Content */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <h2 className="text-base font-semibold text-gray-900">Select Source Content</h2>
            </div>
            <p className="text-sm text-gray-500 ml-10 mb-4">Choose the materials your exam questions will be based on.</p>
            <div className="ml-10 space-y-2 max-h-64 overflow-y-auto pr-2">
              <button
                onClick={() => setSelectedContents(selectedContents.length === allContents.length ? [] : allContents.map(c => c.id))}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium mb-2"
              >
                {selectedContents.length === allContents.length ? 'Deselect All' : 'Select All'}
              </button>
              {allContents.map(content => (
                <label
                  key={content.id}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedContents.includes(content.id)
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedContents.includes(content.id)}
                    onChange={() => toggleContent(content.id)}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 mr-3"
                  />
                  <img src={content.image} alt="" className="w-10 h-10 rounded-lg object-cover mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{content.type} • {content.category}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Reference File (Optional) */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <h2 className="text-base font-semibold text-gray-900">Reference Material <span className="text-gray-400 font-normal text-sm">(Optional)</span></h2>
            </div>
            <div className="ml-10">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-colors cursor-pointer bg-gray-50/50">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">Upload a past exam paper or syllabus</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or TXT</p>
              </div>
            </div>
          </div>

          {/* Step 3: Exam Settings */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <h2 className="text-base font-semibold text-gray-900">Exam Settings</h2>
            </div>
            <div className="ml-10 space-y-6">
              {/* Question Count */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 mr-2 text-gray-400" />
                  Number of Questions
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[5, 10, 15, 20, 25].map(n => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        questionCount === n
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Limit */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Time Limit (minutes)
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[15, 20, 25, 30, 45, 60].map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeLimit(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        timeLimit === t
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {t}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Types */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Settings2 className="w-4 h-4 mr-2 text-gray-400" />
                  Question Types
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'mcq', label: 'Multiple Choice' },
                    { id: 'true_false', label: 'True / False' },
                    { id: 'short_answer', label: 'Short Answer' },
                    { id: 'multi_answer_mcq', label: 'Multi-Select' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => toggleQuestionType(type.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        questionTypes.includes(type.id)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-2xl border-gray-200"
              onClick={() => navigate('/exams')}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 py-6 rounded-2xl bg-gray-900 hover:bg-black text-white shadow-lg"
              disabled={selectedContents.length === 0 || questionTypes.length === 0 || isGenerating}
              onClick={handleStartExam}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Start Exam
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
