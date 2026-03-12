import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
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
  Sparkles,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { testimonials } from '@/data/mockData';

// ProntoTech Logo Component
function ProntoTechLogo() {
  return (
    <div className="flex items-center">
      <img 
        src="https://img1.wsimg.com/isteam/ip/bd25398c-5bc5-4a04-b529-d558df7fc5b8/Logo%20ProntoTech%20Ai.png/:/rs=w:120,h:80,cg:true,m/cr=w:120,h:80/qt=q:95" 
        alt="ProntoTech AI Logo" 
        className="h-8 w-auto"
      />
      <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">ProntoTech AI</span>
    </div>
  );
}

// Navigation Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <ProntoTechLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-6 tracking-tight px-4">
          Master Nursing with AI
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto px-4">
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
            <div className="p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 px-2">What clinical skill would you like to master?</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
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
      answer: 'Absolutely! ProntoTech AI automatically generates quizzes, flashcards, and practice tests from your materials. You can customize the difficulty level and focus on specific topics you want to master.'
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

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Ready to revolutionize your business with AI? Get in touch with our team today.
            </p>
            
            <Link to="/contact">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg mb-12">
                Visit Contact Page
              </Button>
            </Link>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Office Location</h4>
                  <p className="text-gray-600">828 Busse Highway, Park Ridge, IL, USA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Email Address</h4>
                  <a href="mailto:info@prontotech.ai" className="text-blue-600 hover:underline">info@prontotech.ai</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://img1.wsimg.com/isteam/getty/2159943683/:/cr=t:0%25,l:28.91%25,w:42.19%25,h:100%25/rs=w:1200,h:1600,cg:true" 
                alt="AI Robotic Hand" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">AI Innovation</p>
                  <p className="text-xs text-gray-500">ProntoTech Solutions</p>
                </div>
              </div>
            </div>
          </div>
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
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <ProntoTechLogo />
            <p className="mt-4 text-gray-500 max-w-sm">
              Providing cutting-edge AI solutions to empower healthcare professionals and organizations.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {links.map((link, i) => (
                <Link key={i} to={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>828 Busse Highway</p>
              <p>Park Ridge, IL, USA</p>
              <p className="pt-2">info@prontotech.ai</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © 2024 ProntoTech AI Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-600">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Privacy</a>
          </div>
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
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  );
}
