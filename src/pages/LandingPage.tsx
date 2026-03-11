import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Upload, 
  Link2, 
  Mic, 
  BookOpen, 
  Menu,
  X,
  FileQuestion,
  MessageSquare,
  Plus,
  Minus,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { testimonials } from '@/data/mockData';

// LearnIn Logo Component
function LearnInLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V26C12 27.1046 11.1046 28 10 28H6C4.89543 28 4 27.1046 4 26V6Z" fill="black"/>
        <path d="M14 10C14 8.89543 14.8954 8 16 8H18C19.1046 8 20 8.89543 20 10V22C20 23.1046 19.1046 24 18 24H16C14.8954 24 14 23.1046 14 22V10Z" fill="black"/>
        <path d="M22 14C22 12.8954 22.8954 12 24 12H26C27.1046 12 28 12.8954 28 14V18C28 19.1046 27.1046 20 26 20H24C22.8954 20 22 19.1046 22 18V14Z" fill="black"/>
      </svg>
      <span className="ml-2 text-xl font-semibold text-gray-900">NurseAI Academy</span>
    </div>
  );
}

// Navigation Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <LearnInLogo size={28} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                Features <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isFeaturesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                  onMouseEnter={() => setIsFeaturesOpen(true)}
                  onMouseLeave={() => setIsFeaturesOpen(false)}
                >
                  <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">AI Tutor</a>
                  <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Quiz Generator</a>
                  <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Study Notes</a>
                  <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Flashcards</a>
                </div>
              )}
            </div>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
                <Button onClick={handleGetStarted} className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <a href="#features" className="block py-2 text-gray-600">Features</a>
            <Link to="/pricing" className="block py-2 text-gray-600">Pricing</Link>
            <Link to="/careers" className="block py-2 text-gray-600">Careers</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-600">Dashboard</Link>
                <button onClick={logout} className="block py-2 text-gray-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-600">Log in</Link>
                <Link to="/signup" className="block py-2 text-gray-600">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-purple-600 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Nursing Education
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-6 tracking-tight">
          Master Nursing with AI
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          The specialized AI platform for nurses to master advanced clinical skills, pass certifications, and stay updated with medical informatics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6 text-lg border-gray-300"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See features
          </Button>
          <Button 
            className="rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-gray-800"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
          >
            Start Learning
          </Button>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex -space-x-3">
            {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'].map((color, i) => (
              <div key={i} className={`w-10 h-10 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-medium`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="ml-4 text-gray-600">Empowering <span className="font-semibold text-gray-900">25,000+</span> healthcare professionals</span>
        </div>

        {/* App Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">What clinical skill would you like to master?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-900">Upload</span>
                  <span className="text-sm text-gray-500">Charts, Lab reports</span>
                </div>
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
                    <Link2 className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-900">Link</span>
                  <span className="text-sm text-gray-500">Medical Journal, Research</span>
                </div>
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-900">Paste</span>
                  <span className="text-sm text-gray-500">Copied text</span>
                </div>
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3">
                    <Mic className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-900">Record</span>
                  <span className="text-sm text-gray-500">Clinical Rounds</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="bg-gray-100 rounded-full px-6 py-3 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Revolutionizing nursing care with AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'AI Summaries',
      description: 'Get instant summaries of any content. Understand key points in minutes, not hours.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Chat with Content',
      description: 'Ask questions and get answers with references. Your personal AI tutor available 24/7.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <FileQuestion className="w-8 h-8" />,
      title: 'Smart Quizzes',
      description: 'Generate personalized quizzes and practice tests to reinforce your learning.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Flashcards',
      description: 'Create flashcards automatically. Memorize faster with spaced repetition.',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Precision learning for clinical excellence.
          </h2>
          <p className="text-xl text-gray-600">
            From critical care simulation to EHR optimization, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Trusted by nurses in top hospital systems
          </h2>
          <p className="text-xl text-gray-600">
            See how NurseAI Academy is transforming healthcare education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  {testimonial.author[0]}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is NurseAI Academy?',
      answer: 'NurseAI Academy is an AI-powered education platform specifically designed for nursing professionals. We help you master clinical concepts, prepare for certifications (NCLEX, specialty certs), and learn advanced nursing informatics through interactive notes, AI-generated quizzes, and clinical simulation guides.'
    },
    {
      question: 'How does NurseAI help me with certifications?',
      answer: 'NurseAI Academy creates personalized quizzes and practice tests focused on clinical scenarios and specialty exams. Our AI tutor explains complex medical concepts and pharmacological interactions using the latest evidence-based practice guidelines.'
    },
    {
      question: 'What kinds of medical materials can I use?',
      answer: 'You can upload clinical guidelines (PDF), research papers, medical journals, lab results, or even record clinical rounds (audio). Our platform is optimized to understand healthcare terminology and data.'
    },
    {
      question: 'Can I ask questions and chat with my materials?',
      answer: 'Yes! Our AI tutor allows you to have interactive conversations with your learning materials. Ask specific questions, get detailed explanations, and receive answers with references back to the original content.'
    },
    {
      question: 'Does LearnIn make quizzes, flashcards, and practice tests?',
      answer: 'Absolutely! LearnIn automatically generates quizzes, flashcards, and practice tests from your materials. You can customize the difficulty level and focus on specific topics you want to master.'
    },
    {
      question: 'Is NurseAI Academy free for students?',
      answer: 'We offer a free starter plan for nursing students. For professional nursing staff and hospital systems needing unlimited uploads and enterprise clinical data analysis, we offer comprehensive premium tiers.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Advance your nursing career today
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of nurses using AI to provide better patient care
          </p>

          <Button 
            className="rounded-full px-10 py-6 text-lg bg-white text-gray-900 hover:bg-gray-100 mb-8"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
          >
            Get Started Free
          </Button>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free forever plan
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const links = [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '/help' },
    { label: 'Careers', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Contact', href: '/feedback' },
  ];

  return (
    <footer className="py-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <LearnInLogo size={24} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-4 md:mb-0">
            {links.map((link, i) => (
              <Link key={i} to={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 NurseAI Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
